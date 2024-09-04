'use client'
import { useState, useEffect } from 'react'

export const MainContainer = ({ children, layout }: { children: React.ReactNode, layout: any }) => {

  const cacheBuster = new Date().getTime();

  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBackgroundImage = () => {
      const imageUrl = layout.background;
      const cacheBuster = new Date().getTime(); // Unique timestamp
      setBackgroundImage(`${imageUrl}?v=${cacheBuster}`);
    };

    fetchBackgroundImage();
  }, []);

  return (
    <main
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className='h-screen w-screen m-0 p-0'
    >
      {children}
    </main>
  )
}