import '@mui/material/Grid';
import { ElementType, ReactNode } from 'react';

declare module '@mui/material/Grid' {
  interface GridProps {
    children?: ReactNode;
    container?: boolean;
    item?: boolean;
    xs?: number | boolean;
    sm?: number | boolean;
    md?: number | boolean;
    lg?: number | boolean;
    xl?: number | boolean;
    component?: ElementType;
  }
}