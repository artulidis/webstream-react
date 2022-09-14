import React, { useEffect, useRef } from 'react'
import videojs from 'video.js';
import "video.js/dist/video-js.css";
import styles from '../../css/video.module.css'
import video from '../../icons/general/video.mp4'
import '../../css/videojs.scss'
import "videojs-contrib-quality-levels";
import "videojs-http-source-selector";


export const VideoJS = () => {

  const player = useRef()
  const demo = useRef()

  const options = {
    muted: true,
    language: "en",
    preload: "auto",
    fluid: true,
    html5: {
      hls: {
        overrideNative: true,
        limitRenditionByPlayerDimensions: true,
        useDevicePixelRatio: true
        // bandwidth: 16777216,
      },
      nativeAudioTracks: false,
      nativeVideoTracks: false,
      useBandwidthFromLocalStorage: true
    },
    controlBar: {
      pictureInPictureToggle: false
    }
  };

  useEffect(() => {
    const video = videojs(player.current, options, () => {
      demo.current.style.opacity = "1";
    });
    video.httpSourceSelector();
  },[])
  
  return (
    <div ref={demo} className={styles.demo}>
      <div className={styles.center}>
        <video
          ref={player}
          id="player"
          className={`${styles.videoJS} video-js`}
          controls
          playsInline
          preload="auto"
        >
          <source
            src={video}
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
}

export default VideoJS;
