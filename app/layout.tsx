import './globals.css'
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import { createTheme, MantineProvider, ColorSchemeScript } from '@mantine/core'
import { SideNav } from '@/components/SideNav/SideNav';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'Next.js',
  description: 'AWS S3 Upload Example',
}

const theme = createTheme({
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);
  
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
          <SideNav session={session} />
          {children}
          <ToastContainer />
        </MantineProvider>
      </body>
    </html>
  )
}
