'use server'
import { prisma } from '@/lib/prisma'
import { UploadBackgroundImage } from '@/components/UploadBackgroundImage'

export default async function Home() {
  const layout = await prisma.layout.findUnique({
    where: { location: 'home' },
  })
  const cacheBuster = new Date().getTime();

  return (
    <main
      style={{
        backgroundImage: `url(${layout.background}?v=${cacheBuster})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className='h-screen w-screen m-0 p-0'
    >
      <UploadBackgroundImage />
      <h1>Jakerz EDM</h1>
      <p>in progress</p>
    </main>
  )
}