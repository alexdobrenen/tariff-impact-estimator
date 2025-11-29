// Define types for our application

export interface Country {
  id: string;
  name: string;
  iso2: string;
  iso3: string;
}

export interface TariffData {
  countryCode: string;
  dutyPercentage: number;
  tradeValue: number;
}

export interface MapDataItem {
  id: string;
  name: string;
  value: number; // This will represent duty percentage or trade value
  color?: string;
}

export interface InputControls {
  selectedCountry: string;
  tradeValue: number;
  entryDate: string;
  modeOfTransport: 'OCEAN' | 'AIR' | 'GROUND';
  advanced: boolean;
}