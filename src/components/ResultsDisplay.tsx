import React from 'react';
import { Paper, Typography, Box, Grid } from '@mui/material';
import { getCountryNameByIso3 } from '../data/countryMapping';

interface ResultsDisplayProps {
  countryCode: string;
  duty: number;
  rate: number;
  tradeValue: number;
  details: string;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  countryCode,
  duty,
  rate,
  tradeValue,
  details
}) => {
  const countryName = getCountryNameByIso3(countryCode);

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Tariff Impact Results
      </Typography>
      <Grid container spacing={2}>
        <Grid component="div" item xs={12} md={6}>
          <Box mb={2}>
            <Typography variant="subtitle1">Country</Typography>
            <Typography variant="h6">{countryName}</Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="subtitle1">Trade Value</Typography>
            <Typography variant="h6">
              ${tradeValue.toLocaleString()}
            </Typography>
          </Box>
        </Grid>
        <Grid component="div" item xs={12} md={6}>
          <Box mb={2}>
            <Typography variant="subtitle1">Duty Rate</Typography>
            <Typography variant="h6" color="primary">
              {rate.toFixed(1)}%
            </Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="subtitle1">Total Duty</Typography>
            <Typography variant="h6" color="secondary">
              ${duty.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </Typography>
          </Box>
        </Grid>
        <Grid component="div" item xs={12}>
          <Box mt={2} p={2} bgcolor="#f5f5f5" borderRadius={1}>
            <Typography variant="subtitle2" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
              {details}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ResultsDisplay;