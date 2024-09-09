import React, { useState } from 'react';
import DataUpload from './components/DataUpload';
import SearchComponent from './components/SearchComponent';
import DataView from './components/DataView';

export default function App() {
  const [documents, setDocuments] = useState([]);

  const handleSearchResults = (results) => {
    setDocuments(results);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">DataBuddy</h1>
      <DataUpload />
      <SearchComponent onSearchResults={handleSearchResults} />
      <DataView documents={documents} />
    </div>
  );
}
