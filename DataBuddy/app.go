package main

import (
	"DataBuddy/backend/api"
	"context"
	"fmt"
)

// App struct
type App struct {
	ctx            context.Context
	indexService   *api.IndexService
	arrangeService *api.ArrangeService
}

func (a *App) IndexFile(filePath string) error {
	return a.indexService.IndexFile(filePath)
}

func (a *App) ArrangeDocuments(docs []api.Document, opts api.ArrangeOptions) (*api.ArrangeResult, error) {
	return a.arrangeService.Arrange(docs, opts)
}

func (a *App) GetUniqueValues(docs []api.Document, field string) ([]interface{}, error) {
	return a.arrangeService.GetUniqueValues(docs, field)
}

func (a *App) AggregateField(docs []api.Document, field string, aggregationType string) (float64, error) {
	return a.arrangeService.Aggregate(docs, field, aggregationType)
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}
