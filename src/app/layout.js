import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { MyAuthProvider } from '@/hooks'
import { Toaster } from "react-hot-toast";
import Head from 'next/head';

const poppins = Poppins({ subsets: ['latin'],weight:['400','500','600','700'] })

export const metadata = {
  title: 'ExTracker',
  description: 'ExTracker is a software for the daily managment of income and expense',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" type="image/png" sizes="48x48" href="/icon.png" />
      </Head>
      <body className={poppins.className}>
        <Toaster position="top-center " />
        <MyAuthProvider>
          {children}
        </MyAuthProvider>
      </body>
    </html>
  )
}
