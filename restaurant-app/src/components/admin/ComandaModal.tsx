'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { formatPrice } from '@/lib/utils/formatPrice'
import { ChefHat, Printer } from 'lucide-react'

interface ComandaModalProps {
  order: any
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export function ComandaModal({ order, open, onClose, onConfirm }: ComandaModalProps) {
  if (!order) return null

  const now = new Date()
  const timeStr = now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
  const dateStr = now.toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' })

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ChefHat className="w-5 h-5" />
            Comanda para Cocina
          </DialogTitle>
        </DialogHeader>

        {/* Ticket-style comanda */}
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-5 font-mono text-sm">
          <div className="text-center border-b border-gray-300 pb-3 mb-3">
            <p className="font-bold text-lg">COMANDA #{order.order_number}</p>
            <p className="text-gray-500">{dateStr} - {timeStr}</p>
          </div>

          <div className="flex justify-between mb-3 text-gray-600">
            <span>Mesa: <strong className="text-gray-900">{order.table_number}</strong></span>
            {order.customer_name && (
              <span>{order.customer_name}</span>
            )}
          </div>

          <div className="border-t border-b border-gray-300 py-3 space-y-2">
            {order.items?.map((item: any) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  <strong className="text-base">{item.quantity}x</strong>{' '}
                  {item.menu_item?.name}
                </span>
              </div>
            ))}
          </div>

          {order.notes && (
            <div className="mt-3 p-2 bg-yellow-100 rounded text-yellow-800">
              <strong>NOTAS:</strong> {order.notes}
            </div>
          )}

          <div className="text-center mt-3 pt-3 border-t border-gray-300">
            <p className="text-gray-400 text-xs">Total: {formatPrice(order.total_amount)}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onConfirm}
            className="flex-1 flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl transition-all active:scale-95 cursor-pointer"
          >
            <ChefHat className="w-5 h-5" />
            Enviar a Cocina
          </button>
          <button
            onClick={() => {
              window.print()
            }}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-all cursor-pointer"
          >
            <Printer className="w-5 h-5" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
