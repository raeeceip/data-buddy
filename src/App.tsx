import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <div className="App">
      <header className="App-header">

        <h1>Shaft</h1>
      </header>
    </div>
    </ThemeProvider>
  );
}

export default App;
