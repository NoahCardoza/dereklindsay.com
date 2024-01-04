'use client';

import { useEffect, useState } from "react";
import { useTransition, animated, config } from 'react-spring'

export default function PictureBook({ children, images, className='' }: Readonly<{ children: React.ReactNode, images: string[], className: string }>) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setI(i => (i + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    
  const transitions = useTransition(
    images.slice(i, i + 1),
    {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0.8, filter: 'blur(3px)' },
      config: config.molasses,
    }
  );

  return (
    <div className={`relative flex w-full h-full justify-center items-center overflow-none ${className}`}>
      {
        transitions((style, item) => (
          <animated.div
            className="absolute left-0 right-0 top-0 bottom-0"
            style={{ ...style, backgroundImage: `url(${item})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
        ))
      }
      <div
        className="flex z-5 flex-col items-center p-8 rounded-md shadow-md"
        style={{
          width: '400px',
          backgroundColor: '#FFFFFFD0',
          backdropFilter: 'blur(3px)',            
        }}
      >
        {children}
      </div>
    </div>
  );
  
  // return (
  //   <div className="landing-image flex w-full h-full justify-center items-center shadow-lg"
  //     style={{
  //       backgroundImage: `url("${images[i % images.length]}")`,
  //     }}
  //   >
      // <div
      //   className="flex z-5 flex-col items-center p-8 rounded-md shadow-md"
      //   style={{
      //     width: '400px',
      //     backgroundColor: '#FFFFFFD0',
      //     backdropFilter: 'blur(3px)',            
      //   }}
      // >
      //   {children}
      // </div>
  //   </div>
  // );
}
