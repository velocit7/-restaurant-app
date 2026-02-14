'use client'

import { motion } from 'framer-motion'
import { Star, Plus, Minus } from 'lucide-react'
import { formatPrice } from '@/lib/utils/formatPrice'

interface MenuItemCardProps {
  item: any
  quantity: number
  onAdd: () => void
  onRemove: () => void
  onOpenDetail: () => void
}

export function MenuItemCard({ item, quantity, onAdd, onRemove, onOpenDetail }: MenuItemCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl shadow-card border border-gray-100/50 overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
    >
      {/* Image area - clickable for detail */}
      <div
        onClick={onOpenDetail}
        className="relative h-44 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden group cursor-pointer"
      >
        <span className="text-5xl group-hover:scale-125 transition-transform duration-500">
          🍽️
        </span>
        {item.is_featured && (
          <div className="absolute top-3 left-3">
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-glow-accent flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" />
              Destacado
            </span>
          </div>
        )}
        {quantity > 0 && (
          <div className="absolute top-3 right-3">
            <motion.span
              key={quantity}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-primary text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shadow-md"
            >
              {quantity}
            </motion.span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          onClick={onOpenDetail}
          className="text-lg font-bold text-gray-900 mb-1 cursor-pointer hover:text-primary transition-colors"
        >
          {item.menu_item?.name}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
          {item.menu_item?.description || 'Delicioso platillo preparado con los mejores ingredientes'}
        </p>

        <div className="flex items-center justify-between">
          <p className="text-2xl font-extrabold text-primary">
            {formatPrice(item.price)}
          </p>

          {quantity > 0 ? (
            <div className="flex items-center gap-1">
              <button
                onClick={onRemove}
                className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-all active:scale-90 cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-bold text-lg w-8 text-center text-gray-900">
                {quantity}
              </span>
              <button
                onClick={onAdd}
                className="w-9 h-9 rounded-xl bg-primary hover:bg-primary-dark text-white flex items-center justify-center transition-all active:scale-90 shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onAdd}
              className="w-10 h-10 rounded-xl bg-primary hover:bg-primary-dark text-white flex items-center justify-center text-xl transition-all hover:shadow-glow active:scale-90 cursor-pointer"
            >
              <Plus className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
