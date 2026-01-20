'use client';

import React, { useRef } from 'react';
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faImage, faImages  } from '@fortawesome/free-solid-svg-icons'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import Image from 'next/image';
import { PictureBookBackground } from './PictureBook';
import { getImageProps } from 'next/image';

export default function Slideshow({ album, images, firstImageBlurredPlaceholder }: { firstImageBlurredPlaceholder: string, album: string, images: { src: string, caption: string }[] }) {
  const [index, setIndexInternal] = React.useState(0);
  const [blockViewImageExplorerEnabled, setBlockViewEnabled] = React.useState(true);
  const imageThumbnails = React.useRef<Map<number, HTMLButtonElement | null>>(new Map());
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  const setIndex = (i: number) => {
    setIndexInternal(i);
    imageThumbnails.current.get(i)?.scrollIntoView({ behavior: 'smooth', inline: 'center' });
  }

  const changeIndex = (i: number) => {
    setIndex((index + i + images.length) % images.length);
  }

  useEffect(() => {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setIndexInternal((prev) => (prev - 1 + images.length) % images.length);
    } else if (e.key === 'ArrowRight') {
      setIndexInternal((prev) => (prev + 1) % images.length);
    }
  };

  document.addEventListener('keydown', onKeyDown);
  return () => document.removeEventListener('keydown', onKeyDown);
}, [images.length]);

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
        <div className={`transition-opacity duration-1000 ease-in-out ${blockViewImageExplorerEnabled ? 'opacity-100' : 'opacity-0 '}`}>
            {mounted ? <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
              <Masonry gutter={blockViewImageExplorerEnabled ? "0.5rem" : '0'}>{
                images.map((image, i) => (
                  <img
                    key={image.src}
                    {...getImageProps({ src: image.src, alt: image.caption, width: 300, height: 300 }).props}
                    className="rounded-sm w-full block cursor-pointer"
                    onClick={() => {
                      setBlockViewEnabled(false);
                      setIndex(i);
                    }}
                  />
                ))
              }</Masonry>
          </ResponsiveMasonry> : null}
        </div>
        <div className={(!blockViewImageExplorerEnabled ? 'opacity-100 h-full' : 'opacity-0 pointer-events-none	') + ' w-full flex min-w-0 transition-opacity duration-1000 ease-in-out'}>
          <button
            className="items-center px-3 bg-slate-50 hidden sm:block"
            onClick={() => { changeIndex(-1) }}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <div className="w-full h-full flex flex-col min-w-0">
                <PictureBookBackground
                  className=''
                  selected={index}
                  images={images.map(({ src }) => src)}
                  imagePlaceholder={firstImageBlurredPlaceholder}
                >
                  <button
                  className="absolute top-0 left-0 w-1/2 h-full"
                  onClick={() => { changeIndex(-1) }}
                />
                <button
                  className="absolute top-0 right-0 w-1/2 h-full"
                  onClick={() => { changeIndex(1) }}
                />
                </PictureBookBackground>
            <div className="flex justify-center min-w-0">
            <div className="overflow-x-scroll whitespace-nowrap pb-1 mb-1" >
            {images.map((image, i) => (
              <button
                ref={(el) => {
                  imageThumbnails.current.set(i, el);
                }}
                key={i}
                className={`relative overflow-hidden rounded-sm inline-block w-12 h-12 m-1 ${i === index ? 'opacity-60' : ''}`}
                onClick={
                  () => {
                    setIndex(i)
                  }
                }
              >
                <Image
                  src={image.src}
                  alt={`${image.caption}`}
                  className='object-cover object-center w-full h-full'
                  width={48}
                  height={48}
                />
              </button>
            ))}
          </div>
            </div>
        </div>
          <button
            className="items-center px-3 bg-slate-50 hidden sm:block"
                onClick={() => { 
                  changeIndex(1);
             }}
          >
            <FontAwesomeIcon icon={faAngleRight} />
            </button>
            </div>
          </div>
        
      </div>
      
  )
}