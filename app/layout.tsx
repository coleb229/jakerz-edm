import './globals.css'
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import { createTheme, MantineProvider, ColorSchemeScript } from '@mantine/core'
import { fetchLayout } from '@/lib/db'
import Image from 'next/image'

export const metadata = {
  title: 'Next.js',
  description: 'AWS S3 Upload Example',
}

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const layout = await fetchLayout('home')
  
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>Jakerz EDM</title>

        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Image
            src={layout.background}
            width={1920}
            height={1080}
            className='absolute inset-0 z-[-1]'
            alt="Background Image"
          />
          {children}
        </MantineProvider>
      </body>
    </html>
  )
}
