package api

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"strings"
	"sync"

	"github.com/blevesearch/bleve/v2"
)

type IndexService struct {
	index bleve.Index
	mu    sync.RWMutex
}

type Document struct {
	ID     string
	Fields map[string]interface{}
}

func NewIndexService() (*IndexService, error) {
	mapping := bleve.NewIndexMapping()
	index, err := bleve.New("databuddy.bleve", mapping)
	if err != nil {
		return nil, fmt.Errorf("failed to create index: %v", err)
	}

	return &IndexService{index: index}, nil
}

func (s *IndexService) IndexFile(filePath string) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	file, err := os.Open(filePath)
	if err != nil {
		return fmt.Errorf("failed to open file: %v", err)
	}
	defer file.Close()

	switch {
	case strings.HasSuffix(filePath, ".csv"):
		return s.indexCSV(file)
	case strings.HasSuffix(filePath, ".json"):
		return s.indexJSON(file)
	default:
		return fmt.Errorf("unsupported file type")
	}
}

func (s *IndexService) indexCSV(file io.Reader) error {
	reader := csv.NewReader(file)
	headers, err := reader.Read()
	if err != nil {
		return fmt.Errorf("failed to read CSV headers: %v", err)
	}

	batch := s.index.NewBatch()
	var id int
	for {
		record, err := reader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to read CSV record: %v", err)
		}

		doc := Document{
			ID:     fmt.Sprintf("doc_%d", id),
			Fields: make(map[string]interface{}),
		}
		for i, value := range record {
			doc.Fields[headers[i]] = value
		}

		if err := batch.Index(doc.ID, doc); err != nil {
			return fmt.Errorf("failed to index document: %v", err)
		}

		id++
		if id%1000 == 0 {
			if err := s.index.Batch(batch); err != nil {
				return fmt.Errorf("failed to execute batch: %v", err)
			}
			batch = s.index.NewBatch()
		}
	}

	if batch.Size() > 0 {
		if err := s.index.Batch(batch); err != nil {
			return fmt.Errorf("failed to execute final batch: %v", err)
		}
	}

	return nil
}

func (s *IndexService) indexJSON(file io.Reader) error {
	decoder := json.NewDecoder(file)
	batch := s.index.NewBatch()
	var id int
	for {
		var doc Document
		if err := decoder.Decode(&doc); err == io.EOF {
			break
		} else if err != nil {
			return fmt.Errorf("failed to decode JSON: %v", err)
		}

		doc.ID = fmt.Sprintf("doc_%d", id)
		if err := batch.Index(doc.ID, doc); err != nil {
			return fmt.Errorf("failed to index document: %v", err)
		}

		id++
		if id%1000 == 0 {
			if err := s.index.Batch(batch); err != nil {
				return fmt.Errorf("failed to execute batch: %v", err)
			}
			batch = s.index.NewBatch()
		}
	}

	if batch.Size() > 0 {
		if err := s.index.Batch(batch); err != nil {
			return fmt.Errorf("failed to execute final batch: %v", err)
		}
	}

	return nil
}

func (s *IndexService) Search(query string) ([]Document, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	q := bleve.NewQueryStringQuery(query)
	searchRequest := bleve.NewSearchRequest(q)
	searchResults, err := s.index.Search(searchRequest)
	if err != nil {
		return nil, fmt.Errorf("failed to execute search: %v", err)
	}

	var results []Document
	for _, hit := range searchResults.Hits {
		var doc Document
		_, err := s.index.GetInternal([]byte(hit.ID))
		if err != nil {
			return nil, fmt.Errorf("failed to retrieve document: %v", err)
		}
		results = append(results, doc)
	}

	return results, nil
}
