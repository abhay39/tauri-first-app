import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { MyAuthProvider } from '@/hooks'
import { Toaster } from "react-hot-toast";
import Head from 'next/head';
import { SpeedInsights } from "@vercel/speed-insights/next"

const poppins = Poppins({ subsets: ['latin'],weight:['400','500','600','700'] })

export const metadata = {
  title: 'ExTracker',
  description: 'ExTracker is a software for the daily management of income and expense',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" type="image/png"  href="/icon.ico" />
      </Head>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2244249864037808"
     crossorigin="anonymous"></script>
      <body className={poppins.className}>
        <Toaster position="top-center " />
        <MyAuthProvider>
          <SpeedInsights/>  
          {children}
        </MyAuthProvider>
      </body>
    </html>
  )
}
