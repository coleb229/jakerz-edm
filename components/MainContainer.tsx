'use client'
import { useState, useEffect } from 'react'
import { fetchLayout } from '@/lib/db'

export const MainContainer = ({ children, layout }: { children: React.ReactNode, layout: any }) => {

  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      const layoutObj = await fetchLayout(layout);
      const imageUrl = layoutObj.background;
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
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '0 0 0 10px'
      }}
      className='max-h-screen w-screen overflow-auto m-0 p-0'
    >
      {children}
    </main>
  )
}