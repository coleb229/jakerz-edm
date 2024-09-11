'use server'
import { prisma } from '@/lib/prisma'
import { MainContainer } from '@/components/MainContainer'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { ImageGalleryTable } from '@/components/gallery/ImageGalleryTable'
import { PageHeader } from '@/components/PageHeader'

export default async function Home() {
  const layout = await prisma.pageParams.findUnique({
    where: { location: 'gallery' },
  })
  const session = await getServerSession(authOptions)
  const user = session?.user

  const users = await prisma.user.findMany()

  // Create user if none with session's email exists
  if(session !== null && users.filter(u => u.email === user.email).length === 0) {
    await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        image: user.image,
      }
    })
  }

  const data = await prisma.galleryImage.findMany({})

  return (
    <MainContainer layout='gallery'>
      <PageHeader layout={layout} />
      <ImageGalleryTable data={data} />
    </MainContainer>
  )
}