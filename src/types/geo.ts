// Define types for geography objects

export interface GeographyProperties {
  name: string;
  [key: string]: any;
}

export interface Geography {
  rsmKey: string;
  id: string;
  properties: GeographyProperties;
  [key: string]: any;
}