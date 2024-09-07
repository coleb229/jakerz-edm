import { Stack } from '@mantine/core';
import { VideoContainer } from './VideoContainer';

export const VideoStack = ({ data }:any) => {
  return (
    <Stack
      h={0}
      bg="var(--mantine-color-body)"
      align="stretch"
      justify="flex-start"
      gap="md"
    >
      {data.map((video:any) => (
        <VideoContainer key={video.id} data={video} />
      ))}
    </Stack>
  );
}