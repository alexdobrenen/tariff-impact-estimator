// This is sample data. In a real application, this would come from an API.
import { TariffData } from '../types';

export const sampleTariffData: TariffData[] = [
  { countryCode: "CHN", dutyPercentage: 25.0, tradeValue: 500000000000 },
  { countryCode: "MEX", dutyPercentage: 0.0, tradeValue: 320000000000 },
  { countryCode: "CAN", dutyPercentage: 0.0, tradeValue: 280000000000 },
  { countryCode: "JPN", dutyPercentage: 2.5, tradeValue: 120000000000 },
  { countryCode: "DEU", dutyPercentage: 3.0, tradeValue: 110000000000 },
  { countryCode: "KOR", dutyPercentage: 2.8, tradeValue: 90000000000 },
  { countryCode: "GBR", dutyPercentage: 3.0, tradeValue: 50000000000 },
  { countryCode: "IND", dutyPercentage: 10.0, tradeValue: 45000000000 },
  { countryCode: "ITA", dutyPercentage: 3.0, tradeValue: 40000000000 },
  { countryCode: "FRA", dutyPercentage: 3.0, tradeValue: 35000000000 },
  { countryCode: "VNM", dutyPercentage: 7.5, tradeValue: 30000000000 },
  { countryCode: "MYS", dutyPercentage: 5.0, tradeValue: 28000000000 },
  { countryCode: "BRA", dutyPercentage: 8.0, tradeValue: 25000000000 },
  { countryCode: "THA", dutyPercentage: 6.5, tradeValue: 22000000000 },
  { countryCode: "SGP", dutyPercentage: 0.0, tradeValue: 20000000000 },
];

// Helper function to get tariff data by country code
export const getTariffDataByCountry = (countryCode: string): TariffData | undefined => {
  return sampleTariffData.find(item => item.countryCode === countryCode);
};

// Helper function to get maximum trade value
export const getMaxTradeValue = (): number => {
  return Math.max(...sampleTariffData.map(item => item.tradeValue));
};

// Helper function to get maximum duty percentage
export const getMaxDutyPercentage = (): number => {
  return Math.max(...sampleTariffData.map(item => item.dutyPercentage));
};