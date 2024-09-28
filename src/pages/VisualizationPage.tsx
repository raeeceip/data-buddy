import React, { useState, useCallback, useRef, useEffect } from 'react';
import * as Plot from '@observablehq/plot';
import { Box, Typography, Card, CardContent, Button, Select, MenuItem, Grid } from '@mui/material';

const plotTypes = [
  { value: 'scatterplot', label: 'Scatterplot' },
  { value: 'lineChart', label: 'Line Chart' },
  { value: 'barChart', label: 'Bar Chart' },
  { value: 'histogram', label: 'Histogram' },
];

const VisualizationPage: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [selectedPlot, setSelectedPlot] = useState<string>('scatterplot');
  const [xAxis, setXAxis] = useState<string>('');
  const [yAxis, setYAxis] = useState<string>('');
  const [availableColumns, setAvailableColumns] = useState<string[]>([]);
  const plotRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csv = e.target?.result as string;
        const parsedData = parseCSV(csv);
        setData(parsedData);
        if (parsedData.length > 0) {
          setAvailableColumns(Object.keys(parsedData[0]));
        }
      };
      reader.readAsText(file);
    }
  };

  const parseCSV = (csv: string) => {
    const lines = csv.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    return lines.slice(1).map(line => {
      const values = line.split(',');
      return headers.reduce((obj, header, index) => {
        obj[header] = values[index]?.trim();
        return obj;
      }, {} as any);
    });
  };

  const renderPlot = useCallback(() => {
    if (data.length === 0 || !xAxis || (!yAxis && selectedPlot !== 'histogram')) return null;

    const plotOptions = {
      width: 800,
      height: 400,
      x: { label: xAxis },
      y: selectedPlot !== 'histogram' ? { label: yAxis } : undefined,
    };

    let plot;
    switch (selectedPlot) {
      case 'scatterplot':
        plot = Plot.plot({
          ...plotOptions,
          marks: [Plot.dot(data, { x: xAxis, y: yAxis })]
        });
        break;
      case 'lineChart':
        plot = Plot.plot({
          ...plotOptions,
          marks: [Plot.line(data, { x: xAxis, y: yAxis })]
        });
        break;
      case 'barChart':
        plot = Plot.plot({
          ...plotOptions,
          marks: [Plot.barY(data, { x: xAxis, y: yAxis })]
        });
        break;
      case 'histogram':
        plot = Plot.plot({
          ...plotOptions,
          marks: [Plot.rectY(data, Plot.binX({ y: "count" }, { x: xAxis }))]
        });
        break;
      default:
        return null;
    }

    if (plotRef.current) {
      plotRef.current.innerHTML = '';
      plotRef.current.appendChild(plot);
    }
  }, [data, selectedPlot, xAxis, yAxis]);

  useEffect(() => {
    renderPlot();
  }, [renderPlot]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Data Visualization</Typography>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button variant="contained" component="label">
                Upload CSV
                <input type="file" hidden accept=".csv" onChange={handleFileUpload} />
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Select
                value={selectedPlot}
                onChange={(e) => setSelectedPlot(e.target.value as string)}
                fullWidth
              >
                {plotTypes.map((plot) => (
                  <MenuItem key={plot.value} value={plot.value}>{plot.label}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={4}>
              <Select
                value={xAxis}
                onChange={(e) => setXAxis(e.target.value as string)}
                fullWidth
                displayEmpty
              >
                <MenuItem value="" disabled>Select X Axis</MenuItem>
                {availableColumns.map((column) => (
                  <MenuItem key={column} value={column}>{column}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={4}>
              <Select
                value={yAxis}
                onChange={(e) => setYAxis(e.target.value as string)}
                fullWidth
                displayEmpty
                disabled={selectedPlot === 'histogram'}
              >
                <MenuItem value="" disabled>Select Y Axis</MenuItem>
                {availableColumns.map((column) => (
                  <MenuItem key={column} value={column}>{column}</MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <div ref={plotRef}></div>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default VisualizationPage;