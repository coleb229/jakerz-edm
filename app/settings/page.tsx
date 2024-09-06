'use server'
import { prisma } from '@/lib/prisma'
import { SettingsStack } from '@/components/settings/SettingsStack'
import { MainContainer } from '@/components/MainContainer'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function Page() {
  const layout = await prisma.layout.findUnique({
    where: { location: 'home' },
  })

  const session = await getServerSession(authOptions)
  const user = session !== null ? session?.user : { email: 'none', name: 'none', image: 'none' }

  const userProfile = await prisma.user.findUnique({
    where: { email: user.email }
  })

  if (!userProfile || userProfile.role !== 'ADMIN') {
    return (
      <MainContainer layout='home'>
        <h1 className='text-white'>Access Denied</h1>
      </MainContainer>
    )
  } else {
    return (
      <MainContainer layout='home'>
        <h1 className='text-white'>Settings</h1>
        <SettingsStack />
      </MainContainer>
    )
  }
}