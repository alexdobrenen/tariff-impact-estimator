import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Grid,
  AppBar,
  Toolbar
} from '@mui/material';

import ChoroplethMap from './components/ChoroplethMap';
import InputControls from './components/InputControls';
import ResultsDisplay from './components/ResultsDisplay';
import MapLegend from './components/MapLegend';
import MapToolbar from './components/MapToolbar';
import { calculateDuty } from './utils/dutyCalculator';
import { InputControls as InputControlsType } from './types';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  // State for input controls
  const [inputs, setInputs] = useState<InputControlsType>({
    selectedCountry: 'CHN',
    tradeValue: 10000,
    entryDate: new Date().toISOString().split('T')[0], // Today's date
    modeOfTransport: 'OCEAN',
    advanced: true,
  });

  // State for map display
  const [mapDataType, setMapDataType] = useState<'duty' | 'trade'>('duty');

  // State for calculation results
  const [results, setResults] = useState<{
    duty: number;
    rate: number;
    details: string;
  }>({ duty: 0, rate: 0, details: '' });

  // Calculate duties when inputs change
  useEffect(() => {
    const { duty, rate, details } = calculateDuty(
      inputs.selectedCountry,
      inputs.tradeValue,
      inputs.entryDate,
      inputs.modeOfTransport,
      inputs.advanced
    );

    setResults({ duty, rate, details });
  }, [inputs]);

  // Handle input changes
  const handleInputChange = (field: keyof InputControlsType, value: any) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle country selection from the map
  const handleCountryClick = (countryCode: string) => {
    if (countryCode) {
      setInputs((prev) => ({
        ...prev,
        selectedCountry: countryCode,
      }));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Tariff Impact Estimator
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid component="div" container spacing={3} sx={{ width: '100%' }}>
            <Grid component="div" sx={{ width: '100%', mt: 2 }}>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Estimate US Import Tariffs
                </Typography>
                <InputControls values={inputs} onChange={handleInputChange} />
              </Paper>
            </Grid>
            <Grid component="div" sx={{ width: '100%', mt: 2 }}>
              <Paper sx={{ p: 3 }}>
                <Box mb={2}>
                  <Typography variant="h6">Global Tariff Map</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Click on a country to select it for calculation
                  </Typography>
                </Box>
                <MapToolbar dataType={mapDataType} onDataTypeChange={setMapDataType} />
                <MapLegend dataType={mapDataType} />
                <ChoroplethMap
                  dataType={mapDataType}
                  onCountryClick={handleCountryClick}
                />
              </Paper>
            </Grid>
            <Grid component="div" sx={{ width: '100%', mt: 2 }}>
              <ResultsDisplay
                countryCode={inputs.selectedCountry}
                duty={results.duty}
                rate={results.rate}
                tradeValue={inputs.tradeValue}
                details={results.details}
              />
            </Grid>
          </Grid>
          <Box mt={8} textAlign="center">
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} Tariff Impact Estimator | Disclaimer: For educational purposes only
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;