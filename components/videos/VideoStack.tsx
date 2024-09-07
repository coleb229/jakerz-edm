import { Stack } from '@mantine/core';
import { VideoContainer } from './VideoContainer';

export const VideoStack = ({ data }:any) => {
  return (
    <Stack
      h={0}
      bg="var(--mantine-color-body)"
      align="stretch"
      justify="flex-start"
      pb={20}
      gap="md"
      className='mb-20'
    >
      {data.map((video:any) => (
        <VideoContainer key={video.id} data={video} />
      ))}
    </Stack>
  );
}