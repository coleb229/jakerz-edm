'use client'
import { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { Box, Button, Collapse, Group, Text, rem, Dialog, TextInput } from '@mantine/core'
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react'

export const AddNewPicturesToGallery = () => {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <>
      <div className='flex justify-between'>
        <Text size="xl">Add New Image ={'>'}</Text>
        <Button onClick={toggle}>Open Form</Button>
      </div>

      <Dialog opened={opened} withCloseButton onClose={close} size="lg" radius="md">
        <Text size='xl'>Add New Image to Gallery</Text>
        <Form />
      </Dialog>
    </>
  );
}

const Form = (props: Partial<DropzoneProps>) => {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [opened, { toggle }] = useDisclosure(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!file) {
      alert('Please select a file to upload.')
      return
    }

    setUploading(true)

    const formData = {
      title: e.currentTarget.imgTitle.value,
      description: e.currentTarget.description.value,
    };

    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + '/settings/api/uploadGalleryImage',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename: file.name, contentType: file.type, formData }),
      }
    )

    if (response.ok) {
      const { url, fields } = await response.json()

      const uploadFormData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        uploadFormData.append(key, value as string);
      });
      uploadFormData.append('file', file);
  
      const uploadResponse = await fetch(url, {
        method: 'POST',
        body: uploadFormData,
      });

      if (uploadResponse.ok) {
        alert('Upload successful!')
      } else {
        console.error('S3 Upload Error:', uploadResponse)
        alert('Upload failed.')
      }
    } else {
      alert('Failed to get pre-signed URL.')
    }

    setUploading(false)
  }

  return (
    <Box maw={400} mx="auto">
      <form onSubmit={handleSubmit}>
        <Group justify="center" mb={5}>
          <Text size="xl">Title ={'>'}</Text>
          <TextInput placeholder="Image Title" required name='imgTitle' />
        </Group>

        <Group justify="center" mb={5}>
          <Text size="xl">Title ={'>'}</Text>
          <TextInput placeholder="Image Description" required name='description' />
        </Group>

        <div className='flex justify-between'>
          <Text size="lg" mb="xs" fw={500}>Image:</Text>
          <input
            id="file"
            type="file"
            onChange={(e) => {
              const files = e.target.files
              if (files) {
                setFile(files[0])
              }
            }}
            accept="image/png, image/jpeg"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </Box>
  )
}