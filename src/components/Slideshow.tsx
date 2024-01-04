'use client';

import React from 'react';
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faImage, faImages  } from '@fortawesome/free-solid-svg-icons'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import Image from 'next/image';

export default function Slideshow({ album, images }: { album: string, images: { src: string, caption: string }[] }) {
  const [index, setIndexInternal] = React.useState(0);
  const [blockViewImageExplorerEnabled, setBlockViewEnabled] = React.useState(false);
  const imageThumbnails = React.useRef<Map<number, HTMLDivElement | null>>(new Map());


  const setIndex = (i: number) => {
    setIndexInternal(i);
    imageThumbnails.current.get(i)?.scrollIntoView({ behavior: 'smooth', inline: 'center' });
  }

  const changeIndex = (i: number) => {
    setIndex((index + i + images.length) % images.length);
  }

  useEffect(() => {
    const callback = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setIndex((index - 1 + images.length) % images.length);
      } else if (e.key === 'ArrowRight') {
        setIndex((index + 1) % images.length);
      }
    }
    document.addEventListener('keydown', callback);
    return () => {
      document.removeEventListener('keydown', callback);
    }
  })

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between mb-3 px-3 mt-5 sm:mt-0 items-center">
        <h2 className="text-xl">
          {album} ({index + 1}/{images.length}) - {images[index].caption}
        </h2>
        <div>
          <button onClick={
            () => {
              setBlockViewEnabled(val => !val);
            }
          }>
            <FontAwesomeIcon
              size="lg"
              icon={
              blockViewImageExplorerEnabled ? faImage : faImages
            } />
          </button>
        </div>
      </div>
      <div className={`sm:rounded-lg sm:shadow-md bg-slate-10 ${blockViewImageExplorerEnabled ? 'overflow-y-auto p-5' : 'flex flex-grow overflow-hidden'}`}>
        {blockViewImageExplorerEnabled ? (
          <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
            <Masonry gutter="0.5rem">{
              images.map((image, i) => (
                <img
                  key={i}
                  className="rounded-sm w-full block"
                  alt={`Caption: ${image.caption}`}
                  src={image.src}
                  onClick={() => {
                    setBlockViewEnabled(false);
                    setIndex(i);
                    setTimeout(() => {
                      setIndex(i);
                    }, 250);
                  }}
                />
              ))
            }</Masonry>
          </ResponsiveMasonry>
        ) : (
          <>
          <button
            className="flex items-center px-3 bg-slate-50 hidden sm:block"
            onClick={() => { changeIndex(-1); }}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
        <div className="w-full h-full flex flex-col min-w-0">
          <div
            className="slideshow-slide w-full h-full"
            style={{
              backgroundImage: `url("${images[index].src}")`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >    
            </div>
            <div className="flex justify-center min-w-0">
            <div className="overflow-x-scroll whitespace-nowrap pb-1 mb-1" >
            {images.map((image, i) => (
              <div
                ref={(el) => {
                  imageThumbnails.current.set(i, el);
                }}
                key={i}
                className={`relative overflow-hidden rounded-sm inline-block w-12 h-12 m-1 ${i === index ? 'opacity-60' : ''}`}
                onClick={() => setIndex(i)}
              >
                <Image
                  src={image.src}
                  alt={`Caption: ${image.caption}`}
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                    width: '100%',
                    height: '100%',
                  }}
                  width={48}
                  height={48}
                />
              </div>
            ))}
          </div>
            </div>
        </div>
          <button
            className="flex items-center px-3 bg-slate-50 hidden sm:block"
            onClick={() => { changeIndex(1); }}
          >
            <FontAwesomeIcon icon={faAngleRight} />
            </button>
            </>)}
          </div>
        
      </div>
      
  )
}