import {Box, CircularProgress, Container, Grid} from "@mui/material";
import {useMount} from "ahooks";
import {useEffect, useRef} from "react";
import LaunchCard from "../../components/LaunchCard";
import useList from "../../hooks/useList";

export default function List() {
  const loadingRef = useRef()
  const {getList, listData, loading, hasNextPage} = useList()

  useMount(() => {
    getList(true);
  })
  /**
   * 使用Observer API实现下拉加载
   * */
  useEffect(() => {
    let observer = null
    if (loadingRef.current) {
      observer = new IntersectionObserver(entries => {
          entries.forEach(item => {
            if (item.isIntersecting) {
              !loading && getList();
            }
          });
        },
      );
      observer.observe(loadingRef.current as HTMLElement)
    }

    return () => {
      observer && loadingRef.current && observer.unobserve(loadingRef.current as HTMLElement)
    }
  }, [getList, loading])

  return (
    <Container maxWidth="lg" sx={{mt: 2}}>
      <Grid container spacing={2} >
        {listData.map(item => {
          return (
            <Grid key={item.id} item xs={12} md={6}>
              <LaunchCard  item={item}/>
            </Grid>
          )
        })}
      </Grid>

      <Box sx={{ display: hasNextPage && listData.length ? 'flex' : 'none', justifyContent: "center", my: 6}}>
        <CircularProgress ref={loadingRef} />
      </Box>

    </Container>
  )
}