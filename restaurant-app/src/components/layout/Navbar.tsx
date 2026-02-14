'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { UtensilsCrossed, Menu, X } from 'lucide-react'
import { CartButton } from '@/components/cart/CartButton'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className={cn(
                'w-9 h-9 rounded-xl flex items-center justify-center transition-colors',
                scrolled ? 'bg-primary text-white' : 'bg-white/20 text-white'
              )}
            >
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <span
              className={cn(
                'font-bold text-lg transition-colors',
                scrolled ? 'text-gray-900' : 'text-white'
              )}
            >
              Restaurante
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={cn(
                'text-sm font-medium transition-colors',
                scrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/80 hover:text-white'
              )}
            >
              Inicio
            </Link>
            <Link
              href="/menu"
              className={cn(
                'text-sm font-medium transition-colors',
                scrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/80 hover:text-white'
              )}
            >
              Menu
            </Link>
            <CartButton />
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-3">
            <CartButton />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                'p-2 rounded-lg transition-colors cursor-pointer',
                scrolled ? 'text-gray-600' : 'text-white'
              )}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={cn(
                'block px-4 py-2 rounded-lg text-sm font-medium',
                scrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-white/80 hover:bg-white/10'
              )}
            >
              Inicio
            </Link>
            <Link
              href="/menu"
              onClick={() => setMobileOpen(false)}
              className={cn(
                'block px-4 py-2 rounded-lg text-sm font-medium',
                scrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-white/80 hover:bg-white/10'
              )}
            >
              Menu
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
