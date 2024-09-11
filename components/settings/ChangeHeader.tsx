'use client'
import { useDisclosure } from '@mantine/hooks';
import { Dialog, Group, Button, TextInput, Text } from '@mantine/core';
import { updatePageHeader } from '@/lib/db';

export const ChangeHeader = ({ page }:any) => {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <>
      <Group justify="center">
        <Text size="lg" fw={500}>Change Header ={'>'} </Text>
        <Button onClick={toggle}>Open Form</Button>
      </Group>

      <Dialog opened={opened} withCloseButton onClose={close} size="lg" radius="md">
        <Text size="sm" mb="xs" fw={500}>
          Change Page Header Text
        </Text>

        <Form page={page} />
      </Dialog>
    </>
  )
}

const Form = ({ page }:any) => {
  return (
    <form action={updatePageHeader}>
      <input type="text" hidden name='location' value={page} />
      <div className='flex items-center justify-between'>
        <Text size="lg" mb="xs" fw={500}>Main Text ={'>'}</Text>
        <TextInput placeholder="Main Text" required name='headerText' />
      </div>
      <div className='flex items-center justify-between'>
        <Text size="lg" mb="xs" fw={500}>Subtitle Text ={'>'}</Text>
        <TextInput placeholder="Sub Text" required name='subtitle' />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}