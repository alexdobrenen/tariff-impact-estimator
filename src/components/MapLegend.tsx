import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { createDutyColorScale, createTradeValueColorScale } from '../utils/colorScales';
import { getMaxDutyPercentage, getMaxTradeValue } from '../data/sampleTariffData';

interface MapLegendProps {
  dataType: 'duty' | 'trade';
}

const MapLegend: React.FC<MapLegendProps> = ({ dataType }) => {
  const maxDuty = getMaxDutyPercentage();
  const maxTradeValue = getMaxTradeValue();

  const dutyColorScale = createDutyColorScale(maxDuty);
  const tradeColorScale = createTradeValueColorScale(maxTradeValue);

  // Create legend items based on dataType
  const getLegendItems = () => {
    if (dataType === 'duty') {
      return [
        { color: dutyColorScale(0), label: '0%' },
        { color: dutyColorScale(maxDuty / 4), label: `${(maxDuty / 4).toFixed(1)}%` },
        { color: dutyColorScale(maxDuty / 2), label: `${(maxDuty / 2).toFixed(1)}%` },
        { color: dutyColorScale(maxDuty), label: `${maxDuty.toFixed(1)}%+` }
      ];
    } else {
      return [
        { color: tradeColorScale(0), label: '$0' },
        { color: tradeColorScale(maxTradeValue / 8), label: `$${(maxTradeValue / 8 / 1e9).toFixed(0)}B` },
        { color: tradeColorScale(maxTradeValue / 4), label: `$${(maxTradeValue / 4 / 1e9).toFixed(0)}B` },
        { color: tradeColorScale(maxTradeValue / 2), label: `$${(maxTradeValue / 2 / 1e9).toFixed(0)}B` },
        { color: tradeColorScale(maxTradeValue), label: `$${(maxTradeValue / 1e9).toFixed(0)}B+` }
      ];
    }
  };

  const items = getLegendItems();

  return (
    <Paper elevation={2} sx={{ p: 2, my: 2 }}>
      <Typography variant="subtitle2" gutterBottom>
        {dataType === 'duty' ? 'Duty Percentage' : 'Trade Value'}
      </Typography>
      <Box display="flex" alignItems="center" mt={1}>
        {items.map((item, index) => (
          <Box key={index} display="flex" alignItems="center" mr={2}>
            <Box
              width={20}
              height={20}
              bgcolor={item.color}
              border="1px solid #ccc"
              mr={0.5}
            />
            <Typography variant="caption">{item.label}</Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default MapLegend;