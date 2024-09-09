# DataBuddy

DataBuddy is a desktop application for indexing and arranging data, built with Wails, Next.js, and Go.

## Design Overview

DataBuddy consists of two main components:

1. Frontend: A Next.js application with shadcn/ui for the user interface.
2. Backend: A Go application handling data processing and storage.

### Features

- Data Indexing based on Maestro: Upload and index data from CSV files or other data types.
- Data Arranging: Organize and view indexed data.
- SQLite Database: Store processed data locally.

### Project Structure

```
DataBuddy/
├── frontend/           # Next.js frontend
│   ├── src/
│   │   ├── app/        # Next.js app router
│   │   ├── components/ # React components
│   │   └── lib/        # Utility functions and services
├── backend/            # Go backend
│   ├── main.go         # Main application entry
│   └── api/
│       ├── indexing.go # Data indexing logic
│       └── arranging.go # Data arranging logic
├── wails.json          # Wails configuration
└── go.mod              # Go module file
```

### Frontend (Next.js with shadcn/ui)

The frontend is responsible for:
- Providing a user-friendly interface for data upload and viewing.
- Communicating with the backend for data processing and retrieval.

### Backend (Go)

The backend handles:
- Data extraction from uploaded files.
- Data processing and indexing.
- Storing data in SQLite database.
- Providing API endpoints for the frontend to interact with the data.

## Getting Started

1. Install Wails: https://wails.io/docs/gettingstarted/installation
2. Clone this repository
3. Run `wails dev` in the project root to start the development server

## Development

- Frontend development: Work in the `frontend` directory using Next.js conventions.
- Backend development: Implement Go logic in the `backend` directory.
- Use Wails bindings to connect frontend and backend.

