// Country code to name mapping
import { Country } from '../types';

export const countries: Country[] = [
  { id: "USA", name: "United States", iso2: "US", iso3: "USA" },
  { id: "CHN", name: "China", iso2: "CN", iso3: "CHN" },
  { id: "MEX", name: "Mexico", iso2: "MX", iso3: "MEX" },
  { id: "CAN", name: "Canada", iso2: "CA", iso3: "CAN" },
  { id: "JPN", name: "Japan", iso2: "JP", iso3: "JPN" },
  { id: "DEU", name: "Germany", iso2: "DE", iso3: "DEU" },
  { id: "KOR", name: "South Korea", iso2: "KR", iso3: "KOR" },
  { id: "GBR", name: "United Kingdom", iso2: "GB", iso3: "GBR" },
  { id: "IND", name: "India", iso2: "IN", iso3: "IND" },
  { id: "ITA", name: "Italy", iso2: "IT", iso3: "ITA" },
  { id: "FRA", name: "France", iso2: "FR", iso3: "FRA" },
  { id: "VNM", name: "Vietnam", iso2: "VN", iso3: "VNM" },
  { id: "MYS", name: "Malaysia", iso2: "MY", iso3: "MYS" },
  { id: "BRA", name: "Brazil", iso2: "BR", iso3: "BRA" },
  { id: "THA", name: "Thailand", iso2: "TH", iso3: "THA" },
  { id: "SGP", name: "Singapore", iso2: "SG", iso3: "SGP" },
  // Add more countries as needed
];

// Helper function to get country by ISO3 code
export const getCountryByIso3 = (iso3: string): Country | undefined => {
  return countries.find(country => country.iso3 === iso3);
};

// Helper function to get country name by ISO3 code
export const getCountryNameByIso3 = (iso3: string): string => {
  const country = getCountryByIso3(iso3);
  return country ? country.name : iso3;
};