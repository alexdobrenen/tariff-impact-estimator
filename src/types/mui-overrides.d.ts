// This file overrides the type definitions for Material-UI

import '@mui/material';
import { ElementType } from 'react';

declare module '@mui/material/Grid' {
  interface GridProps {
    children?: React.ReactNode;
    item?: boolean;
    container?: boolean;
    component?: ElementType;
  }
}