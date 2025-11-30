declare module 'react-simple-maps' {
  import React, { ReactNode } from 'react';

  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: any;
    width?: number;
    height?: number;
    style?: React.CSSProperties;
    children?: ReactNode;
  }

  export interface GeographiesProps {
    geography: string | object;
    children: (props: { geographies: any[] }) => React.ReactNode;
  }

  export interface GeographyProps {
    geography: any;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    onClick?: (event: React.MouseEvent) => void;
    [key: string]: any;
  }

  export interface ZoomableGroupProps {
    center?: [number, number];
    zoom?: number;
    onMoveStart?: (position: any) => void;
    onMoveEnd?: (position: any) => void;
    children?: ReactNode;
    [key: string]: any;
  }

  export const ComposableMap: React.FC<ComposableMapProps>;
  export const Geographies: React.FC<GeographiesProps>;
  export const Geography: React.FC<GeographyProps>;
  export const ZoomableGroup: React.FC<ZoomableGroupProps>;
}