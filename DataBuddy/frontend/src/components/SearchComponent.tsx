import React, { useState } from 'react';
import { Search } from '../../wailsjs/go/main/App';



export default function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    setSearching(true);
    try {
      const searchResults = await Search(query);
      setResults(searchResults);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow-sm mt-4">
      <h2 className="text-xl font-bold mb-4">Search Indexed Data</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search query"
          className="w-full p-2 border rounded mb-4"
        />
        <button 
          type="submit"
          disabled={searching}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          {searching ? 'Searching...' : 'Search'}
        </button>
      </form>
      <div className="mt-4">
        <h3 className="font-bold">Results:</h3>
        <ul>
          {results.map((doc, index) => (
            <li key={index} className="mt-2">
              {Object.entries(doc.Fields).map(([key, value]) => (
                <p key={key}><strong>{key}:</strong> {value}</p>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}