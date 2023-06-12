import {useEffect, FC} from 'react'
import {Box, styled} from "@mui/material";
import {Container} from "@mui/material";
import YouTubePlayer from 'youtube-player';
import {delay} from "../utils";

const VideoWrapper = styled(Container)`
  width: 100%;
  height: auto;
  padding: 0 !important;
  position: relative;

  & > div {
    width: 100%;
    height: 100%;
  }
`
const VideoPlayer: FC<{ youtube_id: string }> = ({youtube_id}) => {
    useEffect(() => {
        let player: any = null
        const initPlayer = async () => {
            await delay()
            player = YouTubePlayer('video_player', {
                videoId: youtube_id,
                width: "100%",
                height: "auto"
            })
            if (await player.playVideo() as boolean) {
                player?.suggestedQuality('hd720')
            }
        }
        youtube_id && initPlayer()
        return () => {
            player?.destroy()
        }
    }, [youtube_id])

    return (
      <VideoWrapper>
          <Box id="video_player"  sx={{
              top: 0,
              left: 0,
              zIndex: 1000,
              height: "auto",
              aspectRatio: "16/9"
          }}/>
      </VideoWrapper>
    )
}

export default VideoPlayer