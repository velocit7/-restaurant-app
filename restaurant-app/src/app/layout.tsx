import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import { CartDrawer } from '@/components/cart/CartDrawer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Restaurante - Cafeteria, Restaurante y Menu Premium',
  description: 'Tres experiencias unicas en un solo lugar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
        <CartDrawer />
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  )
}
