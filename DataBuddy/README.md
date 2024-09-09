# DataBuddy

DataBuddy is a desktop application for indexing and arranging data, built with Wails, React, and Go.

## Design Overview

DataBuddy consists of two main components:

1. Frontend: A React application with Chakra UI for the user interface.
2. Backend: A Go application handling data processing and storage.

### Features

- Data Indexing (Maestro): Upload and index data from CSV files or other data types.
- Data Arranging: Organize and view indexed data.
- SQLite Database: Store processed data locally.

### Project Structure

```
DataBuddy/
├── frontend/           # React frontend
│   ├── src/
│   │   ├── components/ # React components
│   │   │   ├── DataUpload.tsx
│   │   │   └── DataView.tsx
│   │   └── services/   # Frontend services
│   │       ├── indexingService.ts
│   │       └── arrangingService.ts
├── backend/            # Go backend
│   ├── main.go         # Main application entry
│   └── api/
│       ├── indexing.go # Data indexing logic
│       └── arranging.go # Data arranging logic
├── wails.json          # Wails configuration
└── go.mod              # Go module file
```

### Frontend (React with Chakra UI)

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

1. Ensure you have Go and npm installed.
2. Run `wails dev` in the project root to start the development server.

## Development

- Frontend development: Work in the `frontend` directory using React conventions.
- Backend development: Implement Go logic in the `backend` directory.
- Use Wails bindings to connect frontend and backend.

