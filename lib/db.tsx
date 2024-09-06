'use server'
import { prisma } from '@/lib/prisma'

export const fetchLayout = async(location: string) => {
  try {
    const layout = await prisma.pageParams.findUnique({
      where: { location },
    })

    return layout
  } catch (error) {
    console.error(error)
    return null
  }
}