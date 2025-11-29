// Augment the types for Material-UI's Grid component to allow the 'item' prop

import '@mui/material/Grid';

declare module '@mui/material/Grid' {
  interface GridProps {
    item?: boolean;
  }
}