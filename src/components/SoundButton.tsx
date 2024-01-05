'use client';

import { useSpotifyPlayer } from "@/providers/SpotifyPlayer";

export function SoundButton() {
  const { isOpen, isPaused, togglePlayer } = useSpotifyPlayer();

  return (
    <div className='flex items-center'>
      <a
        className="leading-none"
        href="#"
        onClick={(e) => { e.preventDefault(); togglePlayer(); }}
      >
        sound
      </a>
      <div className={`relative flex h-3 w-3 ml-2 ${!isOpen && 'opacity-0'}`}>
        <div className={`${!isPaused ? 'animate-ping' : ''} absolute inline-flex h-full w-full rounded-full opacity-75`}
          style={{
          backgroundColor: '#1DB954',
        }}
        ></div>
        <div className="relative inline-flex rounded-full h-3 w-3" style={{
          backgroundColor: '#1DB954',
        }}></div>
      </div>
    </div>
  )
}