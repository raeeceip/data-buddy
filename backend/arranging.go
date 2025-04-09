package main

import (
	"fmt"
	"sort"
)

// ArrangeData sorts the data based on the specified field and order
func ArrangeData(data []DataRecord, field string, ascending bool) ([]DataRecord, error) {
	switch field {
	case "ID":
		sort.Slice(data, func(i, j int) bool {
			if ascending {
				return data[i].ID < data[j].ID
			}
			return data[i].ID > data[j].ID
		})
	case "Name":
		sort.Slice(data, func(i, j int) bool {
			if ascending {
				return data[i].Name < data[j].Name
			}
			return data[i].Name > data[j].Name
		})
	case "Email":
		sort.Slice(data, func(i, j int) bool {
			if ascending {
				return data[i].Email < data[j].Email
			}
			return data[i].Email > data[j].Email
		})
	case "Amount":
		sort.Slice(data, func(i, j int) bool {
			if ascending {
				return data[i].Amount < data[j].Amount
			}
			return data[i].Amount > data[j].Amount
		})
	case "Quantity":
		sort.Slice(data, func(i, j int) bool {
			if ascending {
				return data[i].Quantity < data[j].Quantity
			}
			return data[i].Quantity > data[j].Quantity
		})
	default:
		return nil, fmt.Errorf("invalid field: %s", field)
	}

	return data, nil
}
