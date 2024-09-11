'use client'
import { Card, Image, Text, Dialog, Button, Group, SimpleGrid, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import styles from './ImageGalleryTable.module.css';

export const ImageGalleryTable = ({ data }:any) => {
  return (
    <>
      {data.length === 0 ? (
        <p>No images found.</p>
      ) : (
        <div className='px-40 py-20'>
          <SimpleGrid cols={4}>
            {data.map((item:any) => (
              <ImageContainer item={item} key={item.id} />
            ))}
          </SimpleGrid>
        </div>
      )
      }
    </>
  )
}

const ImageContainer = ({ item }:any) => {
  const [opened, { toggle, close }] = useDisclosure(false);

  const findWindowMiddle = () => {
    const top = window.innerHeight / 2 - 200;
    const left = window.innerWidth / 2 - 200;
    return { top, left };
  }

  const { top, left } = findWindowMiddle();
  
  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder className={styles.card}>
        <button onClick={toggle}>
          <Card.Section>
            <Image
              src={item.url}
              height={400}
              alt={item.title}
            />
          </Card.Section>
        </button>

        <Dialog opened={opened} withCloseButton onClose={close} size="2xl" radius="md" position={{left, top}} className={styles.popout}>
          <Image src={item.url} width='auto' alt={item.title} />

          <Text size="xl" mb="xs" px={20} py={10} fw={500} className={styles.text}>
            {item.title}
          </Text>

          <NavLink href={item.url} className={styles.link} target="_blank" rel="noreferrer" label='Open image in new tab' />

          <Group justify='center' className='w-full'>
            <Button onClick={close}>Close</Button>
          </Group>
        </Dialog>

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500} className={styles.text}>{item.title}</Text>
        </Group>

        <Text size="sm" c="dimmed" className={styles.text}>
          {item.description}
        </Text>
      </Card>
    </>
  );
}