import React, { useState } from 'react';
import { IndexFile } from '../../wailsjs/go/main/App';

export default function DataUpload() {
  const [file, setFile] = useState(null);
  const [indexing, setIndexing] = useState(false);
  const [indexed, setIndexed] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      setIndexing(true);
      try {
        await IndexFile(file.path);
        setIndexed(true);
      } catch (error) {
        console.error('Indexing failed:', error);
      } finally {
        setIndexing(false);
      }
    }
  };

  return (
    <div className="p-4 border rounded shadow-sm">
      <h2 className="text-xl font-bold mb-4">Upload and Index CSV</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="file" 
          onChange={handleFileChange} 
          accept=".csv"
          className="mb-4"
        />
        <button 
          type="submit" 
          disabled={!file || indexing}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {indexing ? 'Indexing...' : 'Index File'}
        </button>
      </form>
      {indexed && <p className="mt-4 text-green-600">File indexed successfully!</p>}
    </div>
  );
}