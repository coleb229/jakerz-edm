'use server'
import { prisma } from '@/lib/prisma'
import { MainContainer } from '@/components/MainContainer'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { VideoStack } from '@/components/videos/VideoStack'
import { PageHeader } from '@/components/PageHeader'

export default async function Home() {
  const layout = await prisma.pageParams.findUnique({
    where: { location: 'videos' },
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

  const data = await prisma.video.findMany()

  return (
    <MainContainer layout='videos'>
      <PageHeader layout={layout} />
      {data.length > 0 ? <VideoStack data={data} /> : <p className='text-white'>No videos found</p>}
    </MainContainer>
  )
}