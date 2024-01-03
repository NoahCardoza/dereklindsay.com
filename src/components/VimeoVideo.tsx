'use client';

import VimeoPlayer from '@vimeo/player'
import { useSpotifyPlayer } from "@/providers/SpotifyPlayer";
import { useRef, useEffect } from "react";


export function VimeoVideo({ id }: { id: string }) {
  const iframe = useRef<HTMLDivElement>(null);
  const spotifyPlayer = useSpotifyPlayer();

  useEffect(() => {
    if (!iframe.current) {
      return;
    }

    const vimeoPlayer = new VimeoPlayer(iframe.current, {
      id: parseInt(id),
      autoplay: true,
      loop: true,
      responsive: true,
    });

    const onPlay = () => {
      spotifyPlayer.pause();
      spotifyPlayer.setIsExpanded(false);
    }
    
    vimeoPlayer.on('play', onPlay);

    return () => {
      vimeoPlayer.off('play', onPlay);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div ref={iframe}></div>
  )
}
