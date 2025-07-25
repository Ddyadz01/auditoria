import { Ubuntu } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Index'
import { SITENAME } from '@/constans'

const Ubuntu_Latin = Ubuntu({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
})

export const metadata = {
  title: {
    template: `%s | ${SITENAME}`,
    default: SITENAME,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${Ubuntu_Latin.className} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
