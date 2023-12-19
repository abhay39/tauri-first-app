import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { MyAuthProvider } from '@/hooks'
import { Toaster } from "react-hot-toast";
import { cookies } from 'next/headers'

const poppins = Poppins({ subsets: ['latin'],weight:['400','500','600','700'] })

export const metadata = {
  title: 'ExTracker',
  description: 'ExTracker is a software for the daily managment of income and expense',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Toaster position="top-center " />
        <MyAuthProvider>
          {children}
        </MyAuthProvider>
      </body>
    </html>
  )
}
