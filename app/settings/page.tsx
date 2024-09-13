'use server'
import { prisma } from '@/lib/prisma'
import { SettingsStack } from '@/components/settings/SettingsStack'
import { MainContainer } from '@/components/MainContainer'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Image from 'next/image'

export default async function Page() {
  const layout = await prisma.pageParams.findMany({})

  const session = await getServerSession(authOptions)
  const user = session !== null ? session?.user : { email: 'none', name: 'none', image: 'none' }

  const userProfile = await prisma.user.findUnique({
    where: { email: user.email }
  })

  if (!userProfile || userProfile.role !== 'ADMIN') {
    return (
      <MainContainer layout='home'>
        <h1 className='text-white'>Access Denied</h1>
        <div className='flex flex-col items-center'>
          <Image
            src='https://m.media-amazon.com/images/I/61zcSevCQ1L._AC_UF1000,1000_QL80_.jpg'
            alt='403 Access Denied'
            className='rounded-2xl overflow-hidden shadow-2xl'
            width={900}
            height={900}
          />
          <p className='text-white text-xl py-10'>Get lost, fucker</p>
        </div>
      </MainContainer>
    )
  } else {
    return (
      <MainContainer layout='home'>
        <h1 className='text-white'>Settings</h1>
        <SettingsStack layout={layout} />
      </MainContainer>
    )
  }
}