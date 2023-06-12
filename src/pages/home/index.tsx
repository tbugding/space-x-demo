// import { Link } from "react-router-dom";
// import Button from '@mui/material/Button';
// import { styled, alpha } from '@mui/material/styles';
import {Box} from "@mui/material";
import Header from "./header";
import List from "./list";

export default function Home() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header />
      <List />
    </Box>
  )
}