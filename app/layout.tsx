import './globals.css'
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import { createTheme, MantineProvider, ColorSchemeScript } from '@mantine/core'

export const metadata = {
  title: 'Next.js',
  description: 'AWS S3 Upload Example',
}

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>My awesome app</title>

        <ColorSchemeScript />
      </head>
        <body>
          <MantineProvider theme={theme}>
            {children}
          </MantineProvider>
        </body>
    </html>
  )
}
