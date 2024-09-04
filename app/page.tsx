'use server'
import { prisma } from '@/lib/prisma'
import { UploadBackgroundImage } from '@/components/UploadBackgroundImage'

export default async function Home() {
  const layout = await prisma.layout.findUnique({
    where: { location: 'home' },
  })

  return (
    <main
      style={{
        backgroundImage: `url(${layout.background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className='h-screen w-screen m-0 p-0'
    >
      <UploadBackgroundImage />
      <h1>Hello Jakerz</h1>
    </main>
  )
}