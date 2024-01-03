'use client';

import Script from 'next/script'
import { useEffect, useRef, useState, createContext, useContext, useCallback } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faXmark } from '@fortawesome/free-solid-svg-icons';

const Context = createContext<{
  isOpen: boolean;
  isPaused: boolean;
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
  pause: () => void;
  togglePlayer: () => void;
} | null>(null);

export function useSpotifyPlayer() {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useSpotifyPlayer must be used within a SpotifyPlayer');
  }
 
  return context;
}

export function SpotifyPlayerProvider({ children }: Readonly<{ children: React.ReactNode}>) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const spotifyClient = useRef<Promise<any> | null>(null);
  const element = useRef(null);

  useEffect(() => {
    spotifyClient.current = new Promise((res) => {
      window.onSpotifyIframeApiReady = (iframeApi: any) => {
        const options = {
          uri: 'spotify:artist:67Od6ScenjP82pq9i4jxVO',
          theme: 'dark',
        };
        iframeApi.createController(element.current, options, (controllerApi: any) => {
          controllerApi.once('ready', () => {
            controllerApi.addListener('playback_update', ({ data: { isPaused } }: { data: { isPaused: boolean }}) => {
              setIsPaused(isPaused);
            });
            res(controllerApi);
          });
        });
      };
    });
  }, []);

  const togglePlayer = useCallback(() => {
    setIsOpen((isOpen) => {
      if (isOpen) {
        spotifyClient.current?.then((api) => {
          api.pause();
        });
      } else {
        spotifyClient.current?.then((api) => {
          api.resume();
        });
      }
      return !isOpen;
    });
  }, []);

  const pause = useCallback(() => {
    spotifyClient.current?.then((api) => {
      if (!isPaused) {
        api.pause();
      }
    });
  }, [isPaused]);
  
  return (
    <Context.Provider value={{ isOpen, isPaused, isExpanded, setIsExpanded, togglePlayer, pause,  }}>
      {children}
      <div key="spotify-player" id="spotify-player" className={`${isOpen ? 'open' : ''} ${isExpanded ? 'expanded' : ''} z-50`}>
        <div className="flex flex-col justify-end wrapper">
          <div className="flex justify-between mt-2 px-2">
            <button onClick={togglePlayer}>
              <FontAwesomeIcon size="lg" color='white' icon={faXmark} />
            </button>
            <button onClick={() => setIsExpanded(state => !state)}>
                <FontAwesomeIcon
                  size="lg"
                  color='white'
                  icon={faAngleUp}
                />
            </button>
            <div className='opacity-0'>
              <FontAwesomeIcon size="lg" color='white' icon={faXmark} />
            </div>
          </div>
          <div id="spotify-embed" ref={element}></div>  
        </div>
      </div>
      <Script src="https://open.spotify.com/embed/iframe-api/v1" strategy="lazyOnload" />
    </Context.Provider>
  );
}