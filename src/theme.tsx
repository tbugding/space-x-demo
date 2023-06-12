import { ThemeProvider, createTheme } from '@mui/material/';
import {FC, ReactElement,} from 'react'
import { Global, css } from '@emotion/react'
import din from "./assets/D-DIN.woff2";
import {useRecoilValue} from "recoil";
import {themeState} from "./states";

const AppThemeProvider:FC<{ children:ReactElement }> = ({children})=> {
  const currentTheme = useRecoilValue(themeState);
  const theme = createTheme({
    palette: {
      mode: currentTheme,
      background: {
        body: currentTheme === "dark" ? "#000" : "#fff"
      }
    },
    typography: {
      fontFamily: [
        'din',
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif"
      ].join(','),
    },
    components: {
      MuiCard: {
        styleOverrides: {
          backgroundColor: "transparent"
        }
      }
    },
  });
  return (
    <>
      <Global styles={css`
        @font-face {
          font-family: din;
          src: url(${din});
        }
        html {
          scroll-behavior: smooth;
        }
        body {
          font-family: din, "Roboto","Helvetica","Arial",sans-serif;
          background-color: ${theme.palette.background.body};
        }`}
      />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  )
}
export default AppThemeProvider