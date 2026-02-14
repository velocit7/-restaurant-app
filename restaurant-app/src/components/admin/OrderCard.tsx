'use client'

import { motion } from 'framer-motion'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { OrderTimer } from '@/components/ui/OrderTimer'
import { formatPrice } from '@/lib/utils/formatPrice'
import { STATUS_TRANSITIONS, type OrderStatus } from '@/lib/types'
import { Check, ChefHat, Send, X, Truck } from 'lucide-react'

interface OrderCardProps {
  order: any
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void
}

const ACTION_CONFIG: Partial<Record<OrderStatus, { label: string; icon: any; className: string }>> = {
  confirmada: {
    label: 'Confirmar',
    icon: Check,
    className: 'bg-blue-600 hover:bg-blue-700 text-white',
  },
  en_preparacion: {
    label: 'Enviar a Cocina',
    icon: ChefHat,
    className: 'bg-orange-600 hover:bg-orange-700 text-white',
  },
  lista: {
    label: 'Marcar Lista',
    icon: Send,
    className: 'bg-green-600 hover:bg-green-700 text-white',
  },
  entregada: {
    label: 'Entregada',
    icon: Truck,
    className: 'bg-gray-600 hover:bg-gray-700 text-white',
  },
}

export function OrderCard({ order, onUpdateStatus }: OrderCardProps) {
  const validTransitions = STATUS_TRANSITIONS[order.status as OrderStatus] || []
  const primaryAction = validTransitions.find((s) => s !== 'cancelada')
  const canCancel = validTransitions.includes('cancelada')

  return (
    <motion.div
      layout
      layoutId={order.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-xl shadow-card border border-gray-100 p-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg font-extrabold text-gray-900">
            #{order.order_number}
          </span>
          <StatusBadge status={order.status} />
        </div>
        <OrderTimer createdAt={order.created_at} />
      </div>

      {/* Info */}
      <div className="flex gap-4 mb-3 text-sm">
        <div>
          <span className="text-gray-400">Mesa</span>
          <p className="font-bold text-gray-900">{order.table_number}</p>
        </div>
        {order.customer_name && (
          <div>
            <span className="text-gray-400">Cliente</span>
            <p className="font-bold text-gray-900">{order.customer_name}</p>
          </div>
        )}
        <div className="ml-auto text-right">
          <span className="text-gray-400">Total</span>
          <p className="font-bold text-primary">{formatPrice(order.total_amount)}</p>
        </div>
      </div>

      {/* Items */}
      <div className="border-t border-gray-100 pt-3 mb-3">
        {order.items?.map((item: any) => (
          <div key={item.id} className="flex justify-between text-sm py-0.5">
            <span className="text-gray-700">
              <span className="font-semibold">{item.quantity}x</span> {item.menu_item?.name}
            </span>
          </div>
        ))}
      </div>

      {/* Notes */}
      {order.notes && (
        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-2 mb-3 text-sm text-yellow-800">
          <span className="font-semibold">Nota:</span> {order.notes}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        {primaryAction && ACTION_CONFIG[primaryAction] && (
          <button
            onClick={() => onUpdateStatus(order.id, primaryAction)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all active:scale-95 cursor-pointer ${ACTION_CONFIG[primaryAction]!.className}`}
          >
            {(() => {
              const Icon = ACTION_CONFIG[primaryAction]!.icon
              return <Icon className="w-4 h-4" />
            })()}
            {ACTION_CONFIG[primaryAction]!.label}
          </button>
        )}
        {canCancel && (
          <button
            onClick={() => onUpdateStatus(order.id, 'cancelada')}
            className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition-all active:scale-95 cursor-pointer"
          >
            <X className="w-4 h-4" />
            Cancelar
          </button>
        )}
      </div>
    </motion.div>
  )
}
