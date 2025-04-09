package main

import (
	"encoding/csv"
	"fmt"
	"os"
	"strconv"
	"strings"
)

// DataRecord represents a single record in the data
type DataRecord struct {
	ID       int
	Name     string
	Email    string
	Amount   float64
	Quantity int
}

// IndexData reads a CSV file, processes the data, and returns a slice of DataRecord
func IndexData(filePath string) ([]DataRecord, error) {
	file, err := os.Open(filePath)
	if err != nil {
		return nil, fmt.Errorf("failed to open file: %w", err)
	}
	defer file.Close()

	reader := csv.NewReader(file)
	records, err := reader.ReadAll()
	if err != nil {
		return nil, fmt.Errorf("failed to read CSV file: %w", err)
	}

	var data []DataRecord
	for i, record := range records {
		if i == 0 {
			// Skip header row
			continue
		}

		id, err := strconv.Atoi(record[0])
		if err != nil {
			return nil, fmt.Errorf("invalid ID at row %d: %w", i+1, err)
		}

		amount, err := strconv.ParseFloat(record[3], 64)
		if err != nil {
			return nil, fmt.Errorf("invalid amount at row %d: %w", i+1, err)
		}

		quantity, err := strconv.Atoi(record[4])
		if err != nil {
			return nil, fmt.Errorf("invalid quantity at row %d: %w", i+1, err)
		}

		data = append(data, DataRecord{
			ID:       id,
			Name:     strings.TrimSpace(record[1]),
			Email:    strings.TrimSpace(record[2]),
			Amount:   amount,
			Quantity: quantity,
		})
	}

	return data, nil
}
