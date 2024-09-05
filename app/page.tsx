'use server'
import { prisma } from '@/lib/prisma'
import { UploadBackgroundImage } from '@/components/UploadBackgroundImage'
import { MainContainer } from '@/components/MainContainer'
import { SideNav } from '@/components/SideNav/SideNav'

export default async function Home() {
  const layout = await prisma.layout.findUnique({
    where: { location: 'home' },
  })

  return (
    <MainContainer layout='home'>
      <SideNav />
      <UploadBackgroundImage />
      <h1 className='text-white'>Jakerz EDM</h1>
      <p>in progress</p>
    </MainContainer>
  )
}