import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Switch, FormControlLabel, Button } from '@mui/material';

const SettingsPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('settings') || '{}');
    if (savedSettings) {
      setDarkMode(savedSettings.darkMode || false);
      setAutoSave(savedSettings.autoSave || true);
    }
  }, []);

  const handleSave = () => {
    const settings = { darkMode, autoSave };
    localStorage.setItem('settings', JSON.stringify(settings));
    console.log('Settings saved:', settings);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Settings</Typography>
      <Card>
        <CardContent>
          <FormControlLabel
            control={<Switch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />}
            label="Dark Mode"
          />
          <FormControlLabel
            control={<Switch checked={autoSave} onChange={(e) => setAutoSave(e.target.checked)} />}
            label="Auto Save"
          />
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" onClick={handleSave}>Save Settings</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SettingsPage;
