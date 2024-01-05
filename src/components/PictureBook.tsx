'use client';

import { createContext, useContext, useEffect, useRef, useState, forwardRef, useImperativeHandle, use } from "react";

import Image from 'next/image';

export interface PictureBookBackgroundContext {
  nextImage: () => void;
  prevImage: () => void;
  goToImage: (i: number) => void;
}

const Context = createContext<PictureBookBackgroundContext | null>(null);

export function usePictureBookBackground() {
  const context = useContext(Context);
  if (!context) {
    throw new Error('usePictureBookBackground must be used within a PictureBookBackground');
  }
  
  return context;
}

type PictureBookBackgroundProps = {
  children?: React.ReactNode,
  images: string[],
  imagePlaceholder: string,
  className: string,
  selected: number,
} 

export const PictureBookBackground = forwardRef<PictureBookBackgroundContext, PictureBookBackgroundProps>(({ children, images, imagePlaceholder, className = '', selected }, ref) => {
  return (
    <div className={`relative bg-white flex w-full h-full justify-center items-center overflow-hidden ${className}`}>
      {images.map((image, i) => (
        <Image
          key={image}
          src={image}
          alt=''
          fill
          quality={100}
          className={`w-100 h-100 ease-in-out`}
          style={{
            objectFit: 'contain',
            objectPosition: 'center',
            opacity: i === selected ? 1 : 0,
            filter: i === selected ? 'blur(0px)' : 'blur(3px)',
            transform: (i === selected ? 'scale(1.001)' : 'scale(2)') + (i === selected ? 'rotate(0deg)' : (i % 2 == 0 ? 'rotate(20deg)' : (i % 3 == 0) ? 'rotate(-20deg)' : 'rotate(0deg)')),
            transitionDuration: '3s',
            transitionProperty: 'opacity filter transform',
          }}
          sizes="100vw"
          priority={i === selected}
        />
      ))}
      {children}
    </div>
  );
});
PictureBookBackground.displayName = 'PictureBookBackground';

export default function PictureBook({ children, images, imagePlaceholder, className = '' }: Readonly<{ children: React.ReactNode, images: string[], imagePlaceholder: string, className: string }>) {
  const [isFirstLoad, setFirstLoad] = useState(true);
  const [i, setI] = useState(0);
  const [j, setJ] = useState(1);
  const [beginAnimation, setBeginAnimation] = useState(false);

  useEffect(() => {

    let counter = 1;
    const interval = setInterval(() => {
      if (isFirstLoad) return;

      counter++;
      if (counter % 3 === 0) {
        setBeginAnimation(true);
      } else if (counter % 4 === 0) {
        setI(i => (i + 1) % images.length);
      } else if (counter % 5 === 0) {
        setBeginAnimation(false);
        setJ(i => (i + 1) % images.length);
        counter = 1;
      }
      
    }, 1000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstLoad]);

  return (
    <div className={`relative flex w-full h-full justify-center items-center overflow-hidden overflow-y-auto ${className}`}>
      <Image
        src={images[j]}
        alt=''
        fill
        quality={100}
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: isFirstLoad ? 0 : 1 }}
        sizes="100vw"
        className={`${beginAnimation ? 'animate-blur-in' : ''}`}
        priority

      />
      <Image
        src={images[i]}
        alt=''
        fill
        quality={100}
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        sizes="100vw"
        className={`${beginAnimation ? 'animate-fade-out' : ''}`}
        priority
        onLoad={
          () => setTimeout(() => {
            setFirstLoad(false)
          }, 1000)
        }
          {
           ...(isFirstLoad ? {
            placeholder: "blur",
            blurDataURL: imagePlaceholder
           } : {})
          }
      />
    
      <div
        className="flex w-full sm:max-w-md z-10 flex-col items-center p-4 py-8 sm:p-8 sm:rounded-md shadow-md"
        style={{
          backgroundColor: '#FFFFFFD0',
          backdropFilter: 'blur(3px)',            
        }}
      >
        {children}
      </div>
    </div>
  );

}
