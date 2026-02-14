'use client'

import { useEffect, useState, useRef } from 'react'
import { useRealtimeOrders } from '@/lib/hooks/useRealtime'
import { OrderTimer } from '@/components/ui/OrderTimer'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { motion, AnimatePresence } from 'framer-motion'
import { ChefHat, CheckCircle2, RefreshCw, Volume2, VolumeX } from 'lucide-react'
import { toast } from 'sonner'
import type { OrderStatus } from '@/lib/types'

export default function KitchenPage() {
  const [initialOrders, setInitialOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const prevCountRef = useRef(0)

  useEffect(() => {
    async function fetchOrders() {
      const response = await fetch('/api/orders?status=en_preparacion,lista')
      const { data } = await response.json()
      setInitialOrders(data || [])
      prevCountRef.current = (data || []).filter((o: any) => o.status === 'en_preparacion').length
      setLoading(false)
    }
    fetchOrders()
  }, [])

  const orders = useRealtimeOrders(initialOrders)
  const enPreparacion = orders.filter((o) => o.status === 'en_preparacion')
  const listas = orders.filter((o) => o.status === 'lista')

  // Alert on new kitchen orders
  useEffect(() => {
    if (enPreparacion.length > prevCountRef.current && prevCountRef.current >= 0) {
      toast.info('Nueva orden en cocina!', {
        description: `Orden #${enPreparacion[0]?.order_number}`,
      })
      if (soundEnabled) {
        try {
          const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2Nkol8bn+Gi4+LiIB6dnd+h42RjYiAfnl7f4WJi4qHg4B+fn+ChIaGhYSDgoGBgoKDhISDg4KBgYGCgoODg4OCgoGBgYKCgoKCgoKBgYGBgYKCgoKCgYGBgYGBgoKCgoGBgYGBgQ==')
          audio.volume = 0.5
          audio.play().catch(() => {})
        } catch {}
      }
    }
    prevCountRef.current = enPreparacion.length
  }, [enPreparacion.length, soundEnabled])

  async function markAsReady(orderId: string) {
    await fetch(`/api/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'lista', changed_by: 'Cocina' }),
    })
    toast.success('Orden marcada como lista!')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <RefreshCw className="w-10 h-10 text-orange-400 animate-spin mx-auto mb-4" />
          <p className="text-xl text-gray-300">Cargando pedidos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
            <ChefHat className="w-7 h-7 text-orange-400" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">Pantalla de Cocina</h1>
            <p className="text-gray-400 text-sm">Actualizacion en tiempo real</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer"
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 text-green-400" />
            ) : (
              <VolumeX className="w-5 h-5 text-gray-500" />
            )}
          </button>
          <div className="bg-gray-800 px-4 py-2 rounded-lg text-sm">
            <span className="text-orange-400 font-bold">{enPreparacion.length}</span>
            <span className="text-gray-400"> en preparacion</span>
            <span className="mx-2 text-gray-600">|</span>
            <span className="text-green-400 font-bold">{listas.length}</span>
            <span className="text-gray-400"> listas</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* En Preparacion */}
        <div>
          <div className="bg-orange-500/20 border border-orange-500/30 p-3 rounded-xl mb-4">
            <h2 className="text-lg font-bold text-orange-400 flex items-center gap-2">
              <ChefHat className="w-5 h-5" />
              En Preparacion ({enPreparacion.length})
            </h2>
          </div>
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {enPreparacion.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <ChefHat className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No hay pedidos en preparacion</p>
                </div>
              ) : (
                enPreparacion.map((order) => (
                  <motion.div
                    key={order.id}
                    layout
                    layoutId={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-gray-800 border border-gray-700 rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xl font-extrabold text-orange-400">
                          #{order.order_number}
                        </span>
                        <span className="bg-gray-700 text-gray-300 text-sm px-2 py-0.5 rounded-full">
                          Mesa {order.table_number}
                        </span>
                      </div>
                      <OrderTimer createdAt={order.prepared_at || order.created_at} />
                    </div>

                    {order.customer_name && (
                      <p className="text-gray-400 text-sm mb-2">{order.customer_name}</p>
                    )}

                    <div className="border-t border-gray-700 pt-3 mb-3 space-y-1.5">
                      {order.items?.map((item: any) => (
                        <div key={item.id} className="flex items-center gap-2 text-gray-200">
                          <span className="bg-orange-500/20 text-orange-300 text-sm font-bold px-2 py-0.5 rounded">
                            {item.quantity}x
                          </span>
                          <span>{item.menu_item?.name}</span>
                          {item.notes && (
                            <span className="text-xs text-yellow-400 ml-auto">({item.notes})</span>
                          )}
                        </div>
                      ))}
                    </div>

                    {order.notes && (
                      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-2 mb-3 text-sm text-yellow-300">
                        <strong>Nota:</strong> {order.notes}
                      </div>
                    )}

                    <button
                      onClick={() => markAsReady(order.id)}
                      className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl transition-all active:scale-95 cursor-pointer"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Marcar como Lista
                    </button>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Listas */}
        <div>
          <div className="bg-green-500/20 border border-green-500/30 p-3 rounded-xl mb-4">
            <h2 className="text-lg font-bold text-green-400 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Listas para Entregar ({listas.length})
            </h2>
          </div>
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {listas.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No hay pedidos listos</p>
                </div>
              ) : (
                listas.map((order) => (
                  <motion.div
                    key={order.id}
                    layout
                    layoutId={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-gray-800 border border-green-500/30 rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xl font-extrabold text-green-400">
                          #{order.order_number}
                        </span>
                        <span className="bg-gray-700 text-gray-300 text-sm px-2 py-0.5 rounded-full">
                          Mesa {order.table_number}
                        </span>
                      </div>
                      <span className="text-green-400 text-sm font-semibold animate-pulse-soft">
                        Esperando mesero
                      </span>
                    </div>

                    <div className="border-t border-gray-700 pt-3 space-y-1">
                      {order.items?.map((item: any) => (
                        <div key={item.id} className="flex items-center gap-2 text-gray-300 text-sm">
                          <span className="font-bold">{item.quantity}x</span>
                          <span>{item.menu_item?.name}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
