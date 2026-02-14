'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useCartStore } from '@/lib/store/cart-store'
import { formatPrice } from '@/lib/utils/formatPrice'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export function CartDrawer() {
  const { items, isOpen, closeDrawer, addItem, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCartStore()

  const totalPrice = getTotalPrice()
  const totalItems = getTotalItems()

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeDrawer()}>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Tu Pedido ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">Tu carrito esta vacio</p>
              <p className="text-gray-400 text-sm mt-1">Agrega items desde el menu</p>
            </div>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="py-4 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
                        <p className="text-sm text-gray-500">{formatPrice(item.price)}</p>
                      </div>
                      <p className="font-bold text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-semibold text-sm w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => addItem(item)}
                        className="w-7 h-7 rounded-lg bg-primary text-white hover:bg-primary/90 flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => updateQuantity(item.id, 0)}
                        className="w-7 h-7 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 flex items-center justify-center transition-colors ml-auto cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </ScrollArea>

            {/* Footer */}
            <div className="border-t border-gray-200 pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-600">Total</span>
                <span className="text-2xl font-extrabold text-primary">{formatPrice(totalPrice)}</span>
              </div>
              <Link
                href="/order"
                onClick={closeDrawer}
                className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-bold text-lg px-8 py-3.5 rounded-2xl shadow-glow hover:shadow-xl hover:scale-[1.02] transition-all duration-200 active:scale-95"
              >
                Confirmar Pedido
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
