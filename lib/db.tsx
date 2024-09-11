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

export const addShowDate = async(formData:FormData) => {
  try {
    const newShowDate = await prisma.showDate.create({
      data: {
        date: formData.get('date') as string,
        time: formData.get('time') as string,
        name: formData.get('name') as string,
        location: formData.get('location') as string,
      }
    })

    return newShowDate
  } catch (error) {
    console.error(error)
    return null
  }
}

export const updatePageHeader = async(formData:FormData) => {
  try {
    const layout = await prisma.pageParams.update({
      where: { location: formData.get('location') as string },
      data: {
        headerText: formData.get('headerText') as string,
        subheaderText: formData.get('subtitle') as string,
      }
    })

    return layout
  } catch (error) {
    console.error(error)
    return null
  }
}