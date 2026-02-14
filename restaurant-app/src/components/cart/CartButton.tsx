'use client'

import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart-store'
import { motion, AnimatePresence } from 'framer-motion'

export function CartButton() {
  const { openDrawer, getTotalItems } = useCartStore()
  const totalItems = getTotalItems()

  if (totalItems === 0) return null

  return (
    <button
      onClick={openDrawer}
      className="relative p-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
    >
      <ShoppingCart className="w-5 h-5" />
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.span
            key={totalItems}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm"
          >
            {totalItems}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
