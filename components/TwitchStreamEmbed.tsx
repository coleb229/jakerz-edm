import { Box, Center } from "@mantine/core"

export const TwitchStreamEmbed = () => {
  return (
    <Box mx='auto'>
      <Center>
        <iframe /* This will not center */
          src={`https://player.twitch.tv/?channel=jakerz7z&parent=${process.env.NEXT_PUBLIC_DOMAIN}`}
          height="720"
          width="1280"
          style={{}}
          allowFullScreen={true}
        />
      </Center>
    </Box>
  )
}