'use client'
import { useState } from 'react'
import { Group, Text, rem, Button, Collapse, Box } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useRouter } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';

export const UploadBackgroundImage = ({ location }:any, props: Partial<DropzoneProps>) => {
  const router = useRouter()
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

    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + '/settings/api/uploadBackground',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename: file.name, contentType: file.type, location }),
      }
    )

    if (response.ok) {
      const { url, fields } = await response.json()

      const formData = new FormData()
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string)
      })
      formData.append('file', file)

      const uploadResponse = await fetch(url, {
        method: 'POST',
        body: formData,
      })

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
    router.push('/settings');
  }

  return (
    <Box maw={400} mx="auto">
      <Group justify="center" mb={5}>
        <Text size="xl">Background Image ={'>'}</Text>
        <Button onClick={toggle}>Change</Button>
      </Group>

      <Collapse in={opened}>
        <div className='bg-slate-800 opacity-90 rounded-lg p-6'>
          <form onSubmit={handleSubmit}>
            <Dropzone
              onDrop={(files) => setFile(files[0])}
              onReject={(files) => console.log('rejected files', files)}
              maxSize={5 * 1024 ** 2}
              maxFiles={1}
              accept={IMAGE_MIME_TYPE}
              id='file'
              {...props}
            >
              <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                <Dropzone.Accept>
                  <IconUpload
                    style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                    stroke={1.5}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX
                    style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                    stroke={1.5}
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconPhoto
                    style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                    stroke={1.5}
                  />
                </Dropzone.Idle>

                <div>
                  <Text size="xl" inline>
                    Drag images here or click to select files
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7}>
                    Attach as many files as you like, each file should not exceed 5mb
                  </Text>
                </div>
              </Group>
            </Dropzone>
            <p className='text-white text-center mt-4'>{file ? file.name : 'No file selected'}</p>
            <Button
              type="submit"
              variant="light"
              color="blue"
              fullWidth
              loading={uploading}
              disabled={uploading}
            >
              Upload
            </Button>
          </form>
        </div>
      </Collapse>
    </Box>
  )
}
