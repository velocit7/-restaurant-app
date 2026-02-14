'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Star, Plus, Minus, ShoppingCart } from 'lucide-react'
import { formatPrice } from '@/lib/utils/formatPrice'
import { useState } from 'react'

interface MenuItemModalProps {
  item: any
  open: boolean
  onClose: () => void
  onAddToCart: (quantity: number) => void
  currentQuantity: number
}

export function MenuItemModal({ item, open, onClose, onAddToCart, currentQuantity }: MenuItemModalProps) {
  const [qty, setQty] = useState(1)

  if (!item) return null

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">{item.menu_item?.name}</DialogTitle>
        </DialogHeader>

        {/* Image */}
        <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center -mx-2">
          <span className="text-6xl">🍽️</span>
          {item.is_featured && (
            <span className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" />
              Destacado
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-500 leading-relaxed">
          {item.menu_item?.description || 'Delicioso platillo preparado con los mejores ingredientes'}
        </p>

        {/* Category */}
        {item.menu_item?.category?.name && (
          <span className="inline-flex w-fit bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
            {item.menu_item.category.name}
          </span>
        )}

        {/* Price and quantity */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-3xl font-extrabold text-primary">{formatPrice(item.price)}</p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-bold text-xl w-8 text-center">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="w-10 h-10 rounded-xl bg-primary text-white hover:bg-primary/90 flex items-center justify-center transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Add button */}
        <button
          onClick={() => {
            onAddToCart(qty)
            setQty(1)
            onClose()
          }}
          className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold py-3.5 rounded-2xl hover:bg-primary/90 transition-all hover:shadow-glow active:scale-95 cursor-pointer"
        >
          <ShoppingCart className="w-5 h-5" />
          Agregar {qty > 1 ? `(${qty})` : ''} - {formatPrice(item.price * qty)}
        </button>

        {currentQuantity > 0 && (
          <p className="text-center text-sm text-gray-400">
            Ya tienes {currentQuantity} en tu carrito
          </p>
        )}
      </DialogContent>
    </Dialog>
  )
}
