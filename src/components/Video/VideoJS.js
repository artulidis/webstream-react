import React, { useEffect, useRef } from 'react'
import videojs from 'video.js';
import "video.js/dist/video-js.css";
import styles from '../../css/video.module.css'
import '../../css/videojs.scss'
import '@videojs/themes/dist/sea/index.css';
import "videojs-contrib-quality-levels";
import "videojs-http-source-selector";

export const VideoJS = () => {

  const player = useRef()
  const demo = useRef()

  const options = {
    muted: false,
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
      pictureInPictureToggle: false,
      textTrackSettings: false
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
        <video
          ref={player}
          id="player"
          className={`${styles.videoJS} video-js vjs-theme-sea`} 
          controls
          playsInline
          preload="auto"
          data-setup="{}"
        >
          <source
            src="https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
            type='application/x-mpegURL'
          />
        </video>
    </div>
  );
}

export default VideoJS;
