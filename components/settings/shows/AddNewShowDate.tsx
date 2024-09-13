import { useDisclosure } from '@mantine/hooks';
import { Dialog, Group, Button, TextInput, Text } from '@mantine/core';
import { addShowDate } from '@/lib/db';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';

export const AddNewShowDate = () => {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <>
      <div className='flex justify-between'>
        <Text size="lg" fw={500}>Add New Show Date ={'>'} </Text>
        <Button onClick={toggle}>Open Form</Button>
      </div>

      <Dialog opened={opened} withCloseButton onClose={close} size="lg" radius="md">
        <Text size="sm" mb="xs" fw={500}>
          Add New Show Date
        </Text>

        <Form />
      </Dialog>
    </>
  );
}

const Form = () => {
  const clientAddShowDate = async(formData: FormData) => {
    const result = await addShowDate(formData);
    if(result?.error) {
      toast.error('Error adding show date');
    } else {
      toast.success('Show Date Added');
    }
    redirect('/settings');
  }
  return (
    <form action={clientAddShowDate}>
      <div className='flex items-center justify-between'>
        <Text size="lg" mb="xs" fw={500}>Show Name ={'>'}</Text>
        <TextInput placeholder="Show Name" required name='name' />
      </div>
      <div className='flex items-center justify-between'>
        <Text size="lg" mb="xs" fw={500}>Club / Location ={'>'}</Text>
        <TextInput placeholder="Club / Location" required name='location' />
      </div>
      <div className='flex items-center justify-between'>
        <Text size="lg" mb="xs" fw={500}>Show Date ={'>'}</Text>
        <TextInput placeholder="Show Date" required name='date' />
      </div>
      <div className='flex items-center justify-between'>
        <Text size="lg" mb="xs" fw={500}>Show Time ={'>'}</Text>
        <TextInput placeholder="Show Time" required name='time' />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}