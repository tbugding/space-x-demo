import {useCallback, useEffect, useState} from "react";
import AppBar from '@mui/material/AppBar';
import {
  Typography,
  Box,
  Toolbar,
  IconButton,
  InputBase,
  Stack,
  Drawer,
  Tooltip,
  Button,
  Fab,
  useTheme,
  Divider
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { styled, alpha } from '@mui/material/styles';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {useSetRecoilState} from "recoil";
import {themeState} from "../../states";
import ButtonGroup from '@mui/material/ButtonGroup';
import {DateRangePicker} from "@mui/x-date-pickers-pro/DateRangePicker";
import useList from "../../hooks/useList";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  height: "40px",
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  display: "flex",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 0, 1, 1),
    // vertical padding + font size from searchIcon
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    '&:focus': {
      width: '20ch !important',
    },
    [theme.breakpoints.up('xs')]: {
      width: '10ch',
      // marginLeft: '6ch',
      '&:focus': {
        width: '10ch',
      },
    },
  },
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: "400px"
}));

const btns = [
  { value: -1, label: "All"},
  { value: 0, label: "Failure"},
  { value: 1, label: "Success"},
]

const Header = () => {
  // theme
  const setThemeState = useSetRecoilState(themeState);
  const theme = useTheme();

  // filter status
  const [openFilter, setOpenFilter] = useState(false);
  const handleToggleFilter = function (open: boolean) {
    setOpenFilter(open)
  }

  // scroll to top
  const scrollToTop = () => {
    document.documentElement.scrollTo(0, 0)
  }

  // filter condition
  const {
    keywordsState,
    setKeyWords,
    typeState,
    setType,
    rangeState,
    setRange,
    sortState,
    setSort,
    getList
  } = useList()

  const handleSort = useCallback(() => {
    setSort(sortState === 'asc' ? 'desc' : 'asc')
    getList(true);
  }, [getList, setSort, sortState])

  const handleSearch = useCallback(() => {
    getList(true);
  }, [getList])

  return (
    <>
      {/**
       * 导航条
       */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginRight: "1em", fontSize: "1em", whiteSpace: "nowrap" }}>
            Space X
          </Typography>
          <Stack direction="row">
            <Search>
              <StyledInputBase
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search' }}
                value={keywordsState}
                onChange={(e) => {
                  setKeyWords(e.target.value)
                }}
              />
              <Button variant="text" onClick={handleSearch}>
                <SearchIcon />
              </Button>
            </Search>
            <Tooltip title="Filter">
              <IconButton
                size="middle"
                color="inherit"
                onClick={() => {handleToggleFilter(true)}}
              >
                <FilterListIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Sort">
              <IconButton
                size="middle"
                color="inherit"
                onClick={handleSort}
              >
                <SwapVertIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>
      </AppBar>

      {/**
       * 过滤条件
       */}
      <StyledDrawer
        anchor="right"
        open={openFilter}
        onClose={() => {handleToggleFilter(false)}}
      >
        <Box sx={{width: "320px", padding: '8px'}}>
          <Typography sx={{textTransform: 'uppercase',my:1,color:theme.palette.text.primary}}>
            Launch results
          </Typography>
          <ButtonGroup
            size="small"
            aria-label="vertical outlined button group"
          >
            {btns.map(({value, label}) => {
              return (
                <Button
                  key={value}
                  variant={value === typeState ? "contained" : "outlined"}
                  onClick={() => {
                    setType(value as -1 | 0 | 1)
                  }}
                >{label}</Button>
              )
            })}
          </ButtonGroup>
          <Typography sx={{textTransform: 'uppercase', my:1, mt: '2em', color:theme.palette.text.primary}}>
            Time Period
          </Typography>
          <DateRangePicker
            onChange={setRange}
            value={rangeState}
          />
          <div style={{marginTop: '20px'}} />
          <Stack spacing={2} direction="row">
            <Button variant="text" onClick={() => {handleToggleFilter(false)}}>CANCEL</Button>
            <Button variant="contained" onClick={() => {
              getList(true);
              handleToggleFilter(false);
            }}>SEARCH</Button>
          </Stack>
        </Box>
      </StyledDrawer>

      {/**
       * 回到顶部
       */}
      <Box
        role="setting"
        sx={{position: 'fixed', bottom: 30, right: 20}}
      >
        <Stack spacing={{ xs: 2, sm: 3 }}>
          <Fab size="small" onClick={scrollToTop}>
            <ArrowUpwardIcon />
          </Fab>

          {theme.palette.mode === 'dark' ?
            <Fab size="small" onClick={() => {setThemeState('light')}}><DarkModeIcon color="primary" /></Fab> :
            <Fab size="small" onClick={() => {setThemeState('dark')}}><Brightness7Icon /></Fab>
          }
        </Stack>
      </Box>
    </>
  )
}

export default Header;