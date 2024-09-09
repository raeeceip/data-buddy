import React, { useState, useEffect } from 'react';
import { ArrangeDocuments, GetUniqueValues, AggregateField } from '../../wailsjs/go/main/App';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function DataView({ documents }) {
  const [arrangedData, setArrangedData] = useState([]);
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState('');
  const [aggregationType, setAggregationType] = useState('sum');

  useEffect(() => {
    if (documents.length > 0) {
      setFields(Object.keys(documents[0].Fields));
    }
  }, [documents]);

  const handleVisualize = async () => {
    if (selectedField) {
      const uniqueValues = await GetUniqueValues(documents, selectedField);
      const data = await Promise.all(
        uniqueValues.map(async (value) => {
          const filteredDocs = documents.filter(doc => doc.Fields[selectedField] === value);
          const aggregateValue = await AggregateField(filteredDocs, selectedField, aggregationType);
          return { name: value, value: aggregateValue };
        })
      );
      setArrangedData(data);
    }
  };

  return (
    <div className="p-4 border rounded shadow-sm mt-4">
      <h2 className="text-xl font-bold mb-4">Data Visualization</h2>
      <div className="mb-4">
        <select 
          value={selectedField} 
          onChange={(e) => setSelectedField(e.target.value)}
          className="mr-2 p-2 border rounded"
        >
          <option value="">Select Field</option>
          {fields.map(field => (
            <option key={field} value={field}>{field}</option>
          ))}
        </select>
        <select 
          value={aggregationType} 
          onChange={(e) => setAggregationType(e.target.value)}
          className="mr-2 p-2 border rounded"
        >
          <option value="sum">Sum</option>
          <option value="avg">Average</option>
          <option value="max">Maximum</option>
          <option value="min">Minimum</option>
        </select>
        <button 
          onClick={handleVisualize}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Visualize
        </button>
      </div>
      {arrangedData.length > 0 && (
        <BarChart width={600} height={300} data={arrangedData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      )}
    </div>
  );
}