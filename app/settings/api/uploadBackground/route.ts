import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { v4 as uuidv4 } from 'uuid'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const { filename, contentType, location } = await request.json()

  try {
    const client = new S3Client({ region: process.env.AWS_REGION })
    const { url, fields } = await createPresignedPost(client, {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: uuidv4(),
      Conditions: [
        ['content-length-range', 0, 10485760], // up to 10 MB
        ['starts-with', '$Content-Type', contentType],
      ],
      Fields: {
        acl: 'public-read',
        'Content-Type': contentType,
      },
      Expires: 600, // Seconds before the presigned post expires. 3600 by default.
    })

    const previousPost = await prisma.pageParams.findUnique({
      where: { location },
    })
    const previousKey = previousPost.background.split('/').pop()
    console.log('Previous key:', previousKey)
    
    // Delete previous background image from S3
    await client.send(new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: previousKey,
    }))

    await prisma.pageParams.update({
      where: { location },
      data: { background: url + fields.key },
    })

    return Response.json({ url, fields })
  } catch (error) {
    return Response.json({ error: error.message })
  }
}
