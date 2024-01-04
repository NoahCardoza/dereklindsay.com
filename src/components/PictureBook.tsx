'use client';

import { useEffect, useState } from "react";

export default function PictureBook({ children, images }: Readonly<{ children: React.ReactNode, images: string[] }>) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setI(i => i + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setI(i => i + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing-image flex w-full h-full justify-center items-center shadow-lg"
      style={{
        backgroundImage: `url("${images[i % images.length]}")`,
      }}
    >
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
}
