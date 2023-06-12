import {useEffect} from "react";
import {Link, useMatches} from "react-router-dom";
import {getDetails} from "../../api";
import {useRequest} from "ahooks";
import {Container, Button, Skeleton, Stack, Typography, useTheme, alpha} from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import styled from "@emotion/styled";
import VideoPlayer from "../../components/VideoPlayer";
import {formatDate} from "../../utils/index";

const VideoSkeleton = styled(Skeleton)`
     width: 100%;
     height: auto;
     aspect-ratio: 16/9; //视频默认长宽比
`;

const StyleButton = styled(Button)(({theme})=>({
  color:`${theme.palette.text.primary}`,
}))

export default function Details() {
  const [match] = useMatches();
  const theme = useTheme();
  const { data, error, loading, run } = useRequest(getDetails, {
    manual: true,
    throttleWait: 1000,
  });

  useEffect(() => {
    run(match.params.id);
  }, [match.params.id]);

  return (
    <Container maxWidth="lg">
      <Link to="/">
        <StyleButton sx={{px: 1, my: 1}} variant="text" size="small" startIcon={<NavigateBeforeIcon/>}>
          BACK TO LUNCHES
        </StyleButton>
      </Link>

      {loading ?
        <div>
          <VideoSkeleton variant="rectangular" animation="wave" />
          <Skeleton variant="text" animation="wave" height={40} sx={{mt: 4}} />
          <Skeleton variant="text" animation="wave" height={40} />
          <Skeleton variant="text" animation="wave" height={40} />
          <Skeleton variant="text" animation="wave" height={40} />
        </div> :
        error ? <div /> :
        <Stack>
          <VideoPlayer youtube_id={data?.links?.youtube_id as string}/>
          <Typography  sx={{ color:theme.palette.text.secondary, mt: 4, display:'flex',alignItems:'center',gap:2}} variant='h6'>
            {formatDate((data?.date_unix || 0) * 1000)}
          </Typography>
          <Typography variant="h4" sx={{textTransform: 'uppercase',my:2,color:theme.palette.text.primary}}>
            {data?.name}
          </Typography>
          <Typography sx={{my:4 , lineHeight: 2, color:theme.palette.text.primary}}>
            {data?.details ? data.details : "On Monday, June 5 at 11:47 a.m. ET, Falcon 9 launched Dragon’s 28th Commercial Resupply Services mission (CRS-28) to the International Space Station from Launch Complex 39A (LC-39A) at NASA’s Kennedy Space Center in Florida. Following stage separation, Falcon 9’s first stage landed on the Just a Shortfall of Gravitas droneship in the Atlantic Ocean."}
          </Typography>
        </Stack>
      }
    </Container>
  );
}