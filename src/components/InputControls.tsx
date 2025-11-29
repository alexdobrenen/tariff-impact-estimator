import React from 'react';
import {
  Container,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  SelectChangeEvent
} from '@mui/material';
import { countries } from '../data/countryMapping';
import { InputControls as InputControlsType } from '../types';

interface InputControlsProps {
  values: InputControlsType;
  onChange: (field: keyof InputControlsType, value: any) => void;
}

const InputControls: React.FC<InputControlsProps> = ({ values, onChange }) => {
  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    onChange('selectedCountry', event.target.value);
  };

  const handleTradeValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (!isNaN(value)) {
      onChange('tradeValue', value);
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange('entryDate', event.target.value);
  };

  const handleTransportChange = (event: SelectChangeEvent<string>) => {
    onChange('modeOfTransport', event.target.value as 'OCEAN' | 'AIR' | 'GROUND');
  };

  const handleAdvancedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange('advanced', event.target.checked);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel id="country-select-label">Country</InputLabel>
            <Select
              labelId="country-select-label"
              id="country-select"
              value={values.selectedCountry}
              label="Country"
              onChange={handleCountryChange}
            >
              {countries.map((country) => (
                <MenuItem key={country.id} value={country.id}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id="trade-value"
            label="Trade Value (USD)"
            type="number"
            value={values.tradeValue}
            onChange={handleTradeValueChange}
            InputProps={{ inputProps: { min: 0 } }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            id="entry-date"
            label="Entry Date"
            type="date"
            value={values.entryDate}
            onChange={handleDateChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="transport-select-label">Mode of Transport</InputLabel>
            <Select
              labelId="transport-select-label"
              id="transport-select"
              value={values.modeOfTransport}
              label="Mode of Transport"
              onChange={handleTransportChange}
            >
              <MenuItem value="OCEAN">Ocean</MenuItem>
              <MenuItem value="AIR">Air</MenuItem>
              <MenuItem value="GROUND">Ground</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControlLabel
            control={
              <Switch
                checked={values.advanced}
                onChange={handleAdvancedChange}
                name="advanced"
                color="primary"
              />
            }
            label="Advanced Options"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default InputControls;