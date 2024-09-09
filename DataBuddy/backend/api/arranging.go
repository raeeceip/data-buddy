package api

import (
	"fmt"
	"sort"
	"sync"
)

type ArrangeService struct {
	mu sync.RWMutex
}

type ArrangeOptions struct {
	SortBy    string
	SortOrder string // "asc" or "desc"
	GroupBy   string
	Limit     int
	Offset    int
}

type ArrangeResult struct {
	TotalCount int
	Groups     map[string][]Document
}

func NewArrangeService() *ArrangeService {
	return &ArrangeService{}
}

func (s *ArrangeService) Arrange(docs []Document, opts ArrangeOptions) (*ArrangeResult, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	result := &ArrangeResult{
		TotalCount: len(docs),
		Groups:     make(map[string][]Document),
	}

	// Apply sorting
	if opts.SortBy != "" {
		sort.Slice(docs, func(i, j int) bool {
			vi, vj := docs[i].Fields[opts.SortBy], docs[j].Fields[opts.SortBy]
			if opts.SortOrder == "desc" {
				vi, vj = vj, vi
			}
			switch v := vi.(type) {
			case string:
				return v < vj.(string)
			case float64:
				return v < vj.(float64)
			case int:
				return v < vj.(int)
			default:
				return fmt.Sprintf("%v", vi) < fmt.Sprintf("%v", vj)
			}
		})
	}

	// Apply grouping
	if opts.GroupBy != "" {
		for _, doc := range docs {
			groupKey := fmt.Sprintf("%v", doc.Fields[opts.GroupBy])
			result.Groups[groupKey] = append(result.Groups[groupKey], doc)
		}
	} else {
		result.Groups[""] = docs
	}

	// Apply pagination
	for groupKey, groupDocs := range result.Groups {
		start := opts.Offset
		end := opts.Offset + opts.Limit
		if start > len(groupDocs) {
			start = len(groupDocs)
		}
		if end > len(groupDocs) || opts.Limit == 0 {
			end = len(groupDocs)
		}
		result.Groups[groupKey] = groupDocs[start:end]
	}

	return result, nil
}

func (s *ArrangeService) GetUniqueValues(docs []Document, field string) ([]interface{}, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	uniqueValues := make(map[interface{}]struct{})
	for _, doc := range docs {
		if value, ok := doc.Fields[field]; ok {
			uniqueValues[value] = struct{}{}
		}
	}

	result := make([]interface{}, 0, len(uniqueValues))
	for value := range uniqueValues {
		result = append(result, value)
	}

	sort.Slice(result, func(i, j int) bool {
		return fmt.Sprintf("%v", result[i]) < fmt.Sprintf("%v", result[j])
	})

	return result, nil
}

func (s *ArrangeService) Aggregate(docs []Document, field string, aggregationType string) (float64, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	var result float64
	count := 0

	for _, doc := range docs {
		if value, ok := doc.Fields[field]; ok {
			if floatValue, ok := value.(float64); ok {
				count++
				switch aggregationType {
				case "sum":
					result += floatValue
				case "avg":
					result += floatValue
				case "max":
					if count == 1 || floatValue > result {
						result = floatValue
					}
				case "min":
					if count == 1 || floatValue < result {
						result = floatValue
					}
				default:
					return 0, fmt.Errorf("unsupported aggregation type: %s", aggregationType)
				}
			}
		}
	}

	if aggregationType == "avg" && count > 0 {
		result /= float64(count)
	}

	return result, nil
}
