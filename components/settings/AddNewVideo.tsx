'use client'
import { useDisclosure } from '@mantine/hooks';
import { Dialog, Group, Button, TextInput, Text, Textarea } from '@mantine/core';
import { useState } from 'react';

export const AddNewVideo = () => {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <>
      <Group justify="center">
        <Text size="xl">Add New Video ={'>'}</Text>
        <Button onClick={toggle}>Open Form</Button>
      </Group>

      <Dialog opened={opened} withCloseButton onClose={close} size="lg" radius="md">
        <Text size='xl'>Add New Video</Text>
        <Form />
      </Dialog>
    </>
  );
}

const Form = () => {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }
  
    setUploading(true);
  
    const formData = {
      title: e.currentTarget.title.valueOf, //this is fucking fine
      url: e.currentTarget.url.value,
      location: e.currentTarget.location.value,
      date: e.currentTarget.date.value,
      description: e.currentTarget.description.value,
    };
  
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + '/settings/api/addNewVideo',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename: file.name, contentType: file.type, formData }),
      }
    );
  
    if (response.ok) {
      const { url, fields } = await response.json();
  
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
        alert('Upload successful!');
      } else {
        console.error('S3 Upload Error:', uploadResponse);
        alert('Upload failed.');
      }
    } else {
      alert('Failed to get pre-signed URL.');
    }
  
    setUploading(false);
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex items-center justify-between'>
        <Text size="lg" mb="xs" fw={500}>Video Title ={'>'}</Text>
        <TextInput placeholder="Video Title" required name='title' />
      </div>
      <div className='flex items-center justify-between'>
        <Text size="lg" mb="xs" fw={500}>Video URL ={'>'}</Text>
        <TextInput placeholder="Video URL" required name='url' />
      </div>
      <div className='flex items-center justify-between'>
        <Text size="lg" mb="xs" fw={500}>Club ={'>'}</Text>
        <TextInput placeholder="Location" required name='location' />
      </div>
      <div className='flex items-center justify-between'>
        <Text size="lg" mb="xs" fw={500}>Date ={'>'}</Text>
        <TextInput placeholder="Date" required name='date' />
      </div>
      <Textarea
        label="Video description"
        description="Input description"
        placeholder="Input placeholder"
        required
        name='description'
      />
      <div className='flex items-center justify-between'>
        <Text size="lg" mb="xs" fw={500}>Background: </Text>
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
  )
}