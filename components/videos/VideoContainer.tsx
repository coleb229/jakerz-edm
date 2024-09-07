'use client'
import { BackgroundImage, Center, Text, Box } from '@mantine/core';
import { useState, useEffect } from 'react';

export const VideoContainer = ({ data }:any) => {
  const [dimensions, setDimensions] = useState({
    width: undefined, // Start with undefined during SSR
    height: undefined,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Set dimensions once the window object is available
      const updateDimensions = () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener('resize', updateDimensions);
      updateDimensions(); // Initial setting

      return () => {
        window.removeEventListener('resize', updateDimensions);
      };
    }
  }, []);

  return (
    <Box maw={1500} mx="auto">
      <BackgroundImage
        src={data.background}
        radius="md"
        className='px-20 py-8'
      >
        <iframe
          src={data.url}
          height={
            dimensions.width >= 2000 ? (
              (dimensions.width - 1500) * 0.5625 ) : (
              (dimensions.width - 900) * 0.5625
            )
          } // 16:9 aspect ratio
          width={
            dimensions.width >= 2000 ? (
                dimensions.width - 1500 ) : (
                dimensions.width - 900  
              )
            }
        />
        <div className='bg-slate-800 opacity-90 py-4 px-10'>
          <div className='flex justify-between'>
            <Text size="xl" c="white">
              {data.title}
            </Text>
            <Text size="lg" c="white">
              {data.location}
            </Text>
          </div>
          <Text size='lg' c="white">
            {data.date}
          </Text>
          <Text c="white">
            {data.description}
          </Text>
        </div>
      </BackgroundImage>
    </Box>
  );
}