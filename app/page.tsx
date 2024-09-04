'use server'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import { UploadBackgroundImage } from '@/components/UploadBackgroundImage'

export default async function Home() {
  const layout = await prisma.layout.findUnique({
    where: { location: 'home' },
  })

  return (
    <main className={`bg-[url(${layout.background})]`}>
      <UploadBackgroundImage />
      <h1>Hello Jakerz</h1>
    </main>
  )
}