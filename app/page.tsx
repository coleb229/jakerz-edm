'use server'
import { prisma } from '@/lib/prisma'
import { UploadBackgroundImage } from '@/components/UploadBackgroundImage'
import { MainContainer } from '@/components/MainContainer'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function Home() {
  const layout = await prisma.layout.findUnique({
    where: { location: 'home' },
  })
  const session = await getServerSession(authOptions)
  const user = session?.user

  const users = await prisma.user.findMany()

  // Create user if none with session's email exists
  if(users.filter(u => u.email === user.email).length === 0) {
    await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        image: user.image,
      }
    })
  }

  return (
    <MainContainer layout='home'>
      <h1 className='text-white'>Jakerz EDM</h1>
      <p>in progress</p>
    </MainContainer>
  )
}