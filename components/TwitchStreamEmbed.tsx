'use client'
import { Box, Center } from "@mantine/core"
import { useEffect, useState } from "react"

export const TwitchStreamEmbed = () => {
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
    <Box mx='auto'>
      <Center>
        <iframe /* This will not center */
          src={`https://player.twitch.tv/?channel=jakerz7z&parent=${process.env.NEXT_PUBLIC_DOMAIN}`}
          height={
            dimensions.width >= 2000 ? (
              (dimensions.width - 1280) * 0.5625 ) : (
              (dimensions.width - 640) * 0.5625
            )
          } // 16:9 aspect ratio
          width={
            dimensions.width >= 2000 ? (
                dimensions.width - 1280 ) : (
                dimensions.width - 640  
              )
            }
          style={{ border: 'none' }}
          allowFullScreen={true}
          title="Twitch Stream"
        />
      </Center>
    </Box>
  )
}