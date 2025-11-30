import React, { useState, useEffect, useRef } from 'react';
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
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface ChoroplethMapProps {
  dataType: 'duty' | 'trade'; // Whether to display duty percentages or trade values
  onCountryClick?: (countryCode: string) => void;
}

const ChoroplethMap: React.FC<ChoroplethMapProps> = ({ dataType, onCountryClick }) => {
  const [mapData, setMapData] = useState<MapDataItem[]>([]);
  // This state is not used in the current implementation, but kept for future tooltip enhancements
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  // Ref to track if we've already logged geography data
  const hasLoggedGeo = useRef(false);

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
    console.log("Map data prepared:", data);
  }, [dataType]);

  // Add debug logging for GeoJSON data
  useEffect(() => {
    // Fetch the topojson data to examine its structure
    fetch(geoUrl)
      .then(response => response.json())
      .then(data => {
        console.log("TopoJSON/GeoJSON data loaded:", data);
        if (data.objects && data.objects.countries) {
          console.log("Found countries feature collection");
        } else if (data.objects && Object.keys(data.objects)[0]) {
          const firstKey = Object.keys(data.objects)[0];
          console.log(`Found feature collection: ${firstKey}`);
        }
      })
      .catch(error => {
        console.error("Error loading topojson:", error);
      });
  }, []);

  const handleGeographyClick = (geo: GeoType) => {
    if (onCountryClick) {
      // Get country code from properties.ISO_A3 or fall back to geo.id
      const countryCode = geo.properties.ISO_A3 || geo.id;
      onCountryClick(countryCode);
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
            {({ geographies }: { geographies: GeoType[] }) => {
              // Debug: Log the first geography to see its structure
              if (geographies.length > 0 && !hasLoggedGeo.current) {
                console.log("Sample geography object:", geographies[0]);
                hasLoggedGeo.current = true;
              }

              return geographies.map((geo: GeoType) => {
                // Find the corresponding data for this geography
                // The world-atlas TopoJSON uses 3-letter ISO codes in geo.properties.id (non-standard)
                // But it also uses 3-letter ISO codes in geo.id (standard format)
                const countryCode = geo.properties.ISO_A3 || geo.id;

                // Debug the country code mapping
                if (countryCode === "CHN" || countryCode === "USA") {
                  console.log(`Found country ${countryCode}:`, geo.properties);
                }

                const d = mapData.find((s) => s.id === countryCode);

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
              });
            }}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default ChoroplethMap;