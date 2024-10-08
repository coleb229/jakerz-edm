'use client'
import { useDisclosure } from '@mantine/hooks';
import { Dialog, Group, Button, TextInput, Text, Box } from '@mantine/core';
import { updatePageHeader } from '@/lib/db';
import { redirect } from 'next/navigation';
import { toast } from 'react-toastify';

export const ChangeHeader = ({ page, layout }:any) => {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <Box>
      <div className='flex justify-between'>
        <Text size="lg" fw={500}>Change Header ={'>'} </Text>
        <Button onClick={toggle}>Open Form</Button>
      </div>

      <Dialog opened={opened} withCloseButton onClose={close} size="lg" radius="md">
        <Text size="sm" mb="xs" fw={500}>
          Change Page Header Text
        </Text>

        <Form page={page} layout={layout} />
      </Dialog>
    </Box>
  )
}

const Form = ({ page, layout }:any) => {
  const clientUpdatePageHeader = async(formData: FormData) => {
    const result = await updatePageHeader(formData);
    if(result?.error) {
      toast.error('Error updating page header');
    } else {
      toast.success('Page Header Updated');
    }
    redirect('/settings');
  }

  return (
    <form action={clientUpdatePageHeader}>
      <input type="text" hidden name='location' value={page} />
      <div className='flex items-center justify-between'>
        <Text size="lg" mb="xs" fw={500}>Main Text ={'>'}</Text>
        <TextInput placeholder="Main Text" defaultValue={layout.headerText} required name='headerText' />
      </div>
      <div className='flex items-center justify-between'>
        <Text size="lg" mb="xs" fw={500}>Subtitle Text ={'>'}</Text>
        <TextInput placeholder="Sub Text" defaultValue={layout.subheaderText} required name='subtitle' />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}