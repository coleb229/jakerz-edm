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
    await prisma.showDate.create({
      data: {
        date: formData.get('date') as string,
        time: formData.get('time') as string,
        name: formData.get('name') as string,
        location: formData.get('location') as string,
      }
    })

  } catch (error) {
    console.error(error)
    return {
      error: 'Error adding show date'
    }
  }
}

export const deleteShow = async(formData:FormData) => {
  try {
    await prisma.showDate.delete({
      where: { id: formData.get('id') as string }
    })
  } catch (error) {
    console.error(error)
    return {
      error: 'Error deleting show'
    }
  }
}

export const updatePageHeader = async(formData:FormData) => {
  try {
    await prisma.pageParams.update({
      where: { location: formData.get('location') as string },
      data: {
        headerText: formData.get('headerText') as string,
        subheaderText: formData.get('subtitle') as string,
      }
    })
  } catch (error) {
    console.error(error)
    return {
      error: 'Error updating page header'
    }
  }
}

export const updateBioHeader = async(formData:FormData) => {
  try {
    await prisma.pageParams.update({
      where: { location: formData.get('location') as string },
      data: {
        bioHeader: formData.get('bioHeader') as string
      }
    })
  } catch (error) {
    console.error(error)
    return {
      error: 'Error updating bio header'
    }
  }
}

export const updateBioText = async(formData:FormData) => {
  try {
    await prisma.pageParams.update({
      where: { location: formData.get('location') as string },
      data: {
        bioText: formData.get('bioText') as string
      }
    })
  } catch (error) {
    console.error(error)
    return {
      error: 'Error updating bio text'
    }
  }
}