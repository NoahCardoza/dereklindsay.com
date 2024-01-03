'use client';

import { useSpotifyPlayer } from "@/providers/SpotifyPlayer";
import VimeoPlayer from '@vimeo/player'
import { useRef, useEffect } from "react";


export function VimeoVideo({ id }: { id: string }) {
  const iframe = useRef<HTMLDivElement>(null);
  const spotifyPlayer = useSpotifyPlayer();

  useEffect(() => {
    const vimeoPlayer = new VimeoPlayer(iframe.current, {
      id,
      autoplay: true,
      loop: true,
      responsive: true,
    });
    
    vimeoPlayer.on('play', () => {
      spotifyPlayer.pause()
      spotifyPlayer.setIsExpanded(false);
      ;
    });

  }, []);
  return (
    // <div key="vimeo-player" style={{
    //   padding: '41.89% 0 0 0',
    //   position: 'relative',
    // }}>
      <div ref={iframe}></div>
      // {/* <div key="video" dangerouslySetInnerHTML={{ __html: `<iframe src="https://player.vimeo.com/video/${id}?h=333381c04c&autoplay=1&loop=1&color=ffffff" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>` }}></div> */}
    // </div>
    
  )
}
