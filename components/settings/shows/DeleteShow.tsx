import { useDisclosure } from '@mantine/hooks';
import { Dialog, Button, Text } from '@mantine/core';
import { deleteShow } from '@/lib/db';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';

export const DeleteShow = ({ data }:any) => {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <>
      <div className='flex justify-between'>
        <Text size="lg" fw={500}>Delete Show ={'>'} </Text>
        <Button onClick={toggle}>Choose</Button>
      </div>

      <Dialog opened={opened} withCloseButton onClose={close} size="lg" radius="md">
        <Text size="sm" mb="xs" fw={500}>
          Delete Show
        </Text>
        <div className='flex flex-col'>
          {data.map((show: any) => (
            <Confirmation key={show.id} id={show.id}>
              <div className='flex justify-between'>
                <p>{show.date} - </p>
                <p>{show.name} - </p>
                <p>{show.location}</p>
              </div>
            </Confirmation>
          ))}
        </div>
      </Dialog>
    </>
  );
}

const Confirmation = ({ id, children }: any) => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const clientDeleteShow = async (formData: FormData) => {
    const result = await deleteShow(formData);
    if (result?.error) {
      toast.error('Error deleting show');
    } else {
      toast.success('Show Deleted');
    }
    redirect('/settings');
  }

  return (
    <>
      <Button onClick={toggle} color='red'>{children}</Button>

      <Dialog opened={opened} withCloseButton onClose={close} size="lg" radius="md">
        <Text size="sm" mb="xs" fw={500}>
          Are you sure you want to delete this show?
        </Text>
        <form action={clientDeleteShow}>
          <input type="text" hidden name='id' value={id} />
          <button type="submit">Delete</button>
        </form>
      </Dialog>
    </>
  )
}