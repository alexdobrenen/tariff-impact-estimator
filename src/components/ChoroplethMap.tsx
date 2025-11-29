import React, { useState, useEffect } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps';
import { Tooltip } from '@mui/material';
import { sampleTariffData, getMaxDutyPercentage, getMaxTradeValue } from '../data/sampleTariffData';
import { getCountryNameByIso3 } from '../data/countryMapping';
import { createDutyColorScale, createTradeValueColorScale } from '../utils/colorScales';
import { TariffData, MapDataItem } from '../types';
import { Geography as GeoType } from '../types/geo';

// URL for the world map topojson
const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

interface ChoroplethMapProps {
  dataType: 'duty' | 'trade'; // Whether to display duty percentages or trade values
  onCountryClick?: (countryCode: string) => void;
}

const ChoroplethMap: React.FC<ChoroplethMapProps> = ({ dataType, onCountryClick }) => {
  const [mapData, setMapData] = useState<MapDataItem[]>([]);
  // This state is not used in the current implementation, but kept for future tooltip enhancements
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  // Prepare data for the map
  useEffect(() => {
    const maxDuty = getMaxDutyPercentage();
    const maxTrade = getMaxTradeValue();

    const dutyColorScale = createDutyColorScale(maxDuty);
    const tradeColorScale = createTradeValueColorScale(maxTrade);

    const data: MapDataItem[] = sampleTariffData.map((item: TariffData) => {
      return {
        id: item.countryCode,
        name: getCountryNameByIso3(item.countryCode),
        value: dataType === 'duty' ? item.dutyPercentage : item.tradeValue,
        color: dataType === 'duty'
          ? dutyColorScale(item.dutyPercentage)
          : tradeColorScale(item.tradeValue)
      };
    });

    setMapData(data);
  }, [dataType]);

  const handleGeographyClick = (geo: GeoType) => {
    if (onCountryClick) {
      onCountryClick(geo.id);
    }
  };

  const handleMoveEnd = (position: { coordinates: [number, number]; zoom: number }) => {
    setPosition(position);
  };

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 100 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates as [number, number]}
          onMoveEnd={handleMoveEnd}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }: { geographies: GeoType[] }) =>
              geographies.map((geo: GeoType) => {
                // Find the corresponding data for this geography
                const d = mapData.find((s) => s.id === geo.id);

                return (
                  <Tooltip
                    key={geo.rsmKey}
                    title={
                      d
                        ? `${d.name}: ${dataType === 'duty'
                            ? d.value.toFixed(1) + '%'
                            : '$' + (d.value / 1e9).toFixed(1) + ' billion'
                          }`
                        : `${geo.properties.name}: No data`
                    }
                    arrow
                  >
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={d?.color || "#F5F5F5"}
                      stroke="#D6D6DA"
                      onClick={() => handleGeographyClick(geo)}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", fill: "#E42" },
                        pressed: { outline: "none" },
                      }}
                    />
                  </Tooltip>
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default ChoroplethMap;