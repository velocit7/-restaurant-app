'use client'

import { useState, useEffect, useRef } from 'react'
import { useRealtimeOrders } from '@/lib/hooks/useRealtime'
import { OrderCard } from './OrderCard'
import { ComandaModal } from './ComandaModal'
import { STATUS_LABELS, STATUS_COLORS, type OrderStatus } from '@/lib/types'
import { AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

const KANBAN_COLUMNS: OrderStatus[] = ['nueva', 'confirmada', 'en_preparacion', 'lista', 'entregada']

interface OrderKanbanProps {
  initialOrders: any[]
}

export function OrderKanban({ initialOrders }: OrderKanbanProps) {
  const orders = useRealtimeOrders(initialOrders)
  const [comandaOrder, setComandaOrder] = useState<any>(null)
  const prevCountRef = useRef(initialOrders.length)

  // Alert on new orders
  useEffect(() => {
    const newOrders = orders.filter((o) => o.status === 'nueva')
    if (newOrders.length > prevCountRef.current) {
      toast.success('Nueva orden recibida!', {
        description: `Orden #${newOrders[0]?.order_number} - Mesa ${newOrders[0]?.table_number}`,
      })
      // Play sound
      try {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2Nkol8bn+Gi4+LiIB6dnd+h42RjYiAfnl7f4WJi4qHg4B+fn+ChIaGhYSDgoGBgoKDhISDg4KBgYGCgoODg4OCgoGBgYKCgoKCgoKBgYGBgYKCgoKCgYGBgYGBgoKCgoGBgYGBgQ==')
        audio.volume = 0.3
        audio.play().catch(() => {})
      } catch {}
    }
    prevCountRef.current = newOrders.length
  }, [orders])

  async function handleUpdateStatus(orderId: string, newStatus: OrderStatus) {
    // If transitioning to en_preparacion, show comanda first
    if (newStatus === 'en_preparacion') {
      const order = orders.find((o) => o.id === orderId)
      if (order) {
        setComandaOrder(order)
        return
      }
    }

    await updateOrderStatus(orderId, newStatus)
  }

  async function updateOrderStatus(orderId: string, newStatus: OrderStatus) {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, changed_by: 'Mesero' }),
      })

      if (!res.ok) {
        const { error } = await res.json()
        toast.error(error || 'Error al actualizar orden')
        return
      }

      toast.success(`Orden actualizada a "${STATUS_LABELS[newStatus]}"`)
    } catch {
      toast.error('Error de conexion')
    }
  }

  async function handleComandaConfirm() {
    if (comandaOrder) {
      await updateOrderStatus(comandaOrder.id, 'en_preparacion')
      setComandaOrder(null)
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 min-h-[calc(100vh-200px)]">
        {KANBAN_COLUMNS.map((status) => {
          const columnOrders = orders.filter((o) => o.status === status)
          const colors = STATUS_COLORS[status]

          return (
            <div key={status} className="flex flex-col">
              {/* Column header */}
              <div className={`${colors.bg} p-3 rounded-lg mb-3`}>
                <h3 className={`font-bold ${colors.text} flex items-center justify-between`}>
                  {STATUS_LABELS[status]}
                  <span className={`text-sm ${colors.text} bg-white/50 px-2 py-0.5 rounded-full`}>
                    {columnOrders.length}
                  </span>
                </h3>
              </div>

              {/* Cards */}
              <div className="space-y-3 flex-1">
                <AnimatePresence mode="popLayout">
                  {columnOrders.length === 0 ? (
                    <div className="text-center py-8 text-gray-400 text-sm">
                      Sin ordenes
                    </div>
                  ) : (
                    columnOrders.map((order) => (
                      <OrderCard
                        key={order.id}
                        order={order}
                        onUpdateStatus={handleUpdateStatus}
                      />
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>
          )
        })}
      </div>

      <ComandaModal
        order={comandaOrder}
        open={!!comandaOrder}
        onClose={() => setComandaOrder(null)}
        onConfirm={handleComandaConfirm}
      />
    </>
  )
}
