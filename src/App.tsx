import CssBaseline from '@mui/material/CssBaseline';
import {RouterProvider,} from "react-router-dom";
import router from "./routes.tsx";
import AppThemeProvider from "./theme";
import {RecoilRoot} from "recoil";
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import {useMount} from "ahooks";


function App() {


  return (
    <>
      <CssBaseline />
      <RecoilRoot>
        <AppThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RouterProvider router={router}/>
          </LocalizationProvider>
        </AppThemeProvider>
      </RecoilRoot>

    </>
  )
}

export default App
