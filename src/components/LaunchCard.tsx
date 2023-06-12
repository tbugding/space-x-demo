import {FC, useMemo} from 'react'
import {alpha, Button, Card, CardActions, CardContent, CardMedia, styled, Typography} from "@mui/material";
import {SpacexLaunchItem} from "../types";
import {formatDate} from "../utils/index";
import {useNavigate} from "react-router-dom";

const StyleButton = styled(Button)(({theme})=>({
    borderColor: `${theme.palette.mode ==='dark'? alpha('#fff',0.8): theme.palette.common.black}`,
    color:`${theme.palette.text.primary}`,
    background:'transparent',
    '&:hover':{
        borderColor:`${theme.palette.mode ==='dark'? '#fff': theme.palette.common.black}`
    }
}))

const LaunchCard: FC<{item: SpacexLaunchItem}> = ({item}) => {
    const {name, date_unix, links, id} = item;
    const navigate = useNavigate();
    const thumbImage = useMemo(() => (links.flickr?.original[0] ?? "https://live.staticflickr.com/65535/49635401403_96f9c322dc_o.jpg"), [links])
    return (
      <Card sx={{maxWidth: '100%'}}>
          <CardMedia
            sx={{height: 280}}
            image={thumbImage}
            component='img'
            loading='lazy'
            title={name}
          />
          <CardContent>
              <Typography gutterBottom variant="h6" >
                  { formatDate(date_unix * 1000)}
              </Typography>
              <Typography variant="h5" sx={{textTransform:'uppercase'}}>
                  {name}
              </Typography>
          </CardContent>
          <CardActions sx={{pb:3,px:2}}>
              <StyleButton variant="outlined" size="large" onClick={()=> navigate(`/details/${id}`)}>Learn More</StyleButton>
          </CardActions>
      </Card>
    )
}

export default LaunchCard