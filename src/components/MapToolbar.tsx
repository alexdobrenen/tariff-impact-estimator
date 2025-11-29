import React from 'react';
import { Box, ToggleButtonGroup, ToggleButton, Tooltip } from '@mui/material';
import { MonetizationOn, Percent } from '@mui/icons-material';

interface MapToolbarProps {
  dataType: 'duty' | 'trade';
  onDataTypeChange: (dataType: 'duty' | 'trade') => void;
}

const MapToolbar: React.FC<MapToolbarProps> = ({ dataType, onDataTypeChange }) => {
  const handleDataTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newDataType: 'duty' | 'trade' | null
  ) => {
    if (newDataType !== null) {
      onDataTypeChange(newDataType);
    }
  };

  return (
    <Box display="flex" justifyContent="flex-end" mb={2}>
      <ToggleButtonGroup
        value={dataType}
        exclusive
        onChange={handleDataTypeChange}
        aria-label="map data type"
        size="small"
      >
        <ToggleButton value="duty" aria-label="duty percentage">
          <Tooltip title="Display Duty Percentages">
            <Percent />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value="trade" aria-label="trade value">
          <Tooltip title="Display Trade Values">
            <MonetizationOn />
          </Tooltip>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default MapToolbar;