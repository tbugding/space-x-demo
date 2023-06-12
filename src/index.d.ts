declare module '@mui/material/styles' {
  interface Theme {
    palette: {
      background: {
        body: string
      };
    };
    
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    palette?: {
      background?: {
        body: string
      };
    };
  }
}