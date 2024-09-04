'use server'
import { prisma } from '@/lib/prisma'
import { UploadBackgroundImage } from '@/components/UploadBackgroundImage'
import { MainContainer } from '@/components/MainContainer'

export default async function Home() {
  const layout = await prisma.layout.findUnique({
    where: { location: 'home' },
  })

  return (
    <MainContainer layout='home'>
      <UploadBackgroundImage />
      <h1>Jakerz EDM</h1>
      <p>in progress</p>
    </MainContainer>
  )
}