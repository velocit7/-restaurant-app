'use client'

import { useEffect, useState } from 'react'
import { OrderKanban } from '@/components/admin/OrderKanban'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { OrderTimer } from '@/components/ui/OrderTimer'
import { formatPrice } from '@/lib/utils/formatPrice'
import { ClipboardList, History, RefreshCw } from 'lucide-react'
import type { OrderStatus } from '@/lib/types'

export default function AdminPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [historyOrders, setHistoryOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('ordenes')

  async function fetchOrders() {
    setLoading(true)
    const res = await fetch('/api/orders?status=nueva,confirmada,en_preparacion,lista')
    const { data } = await res.json()
    setOrders(data || [])
    setLoading(false)
  }

  async function fetchHistory() {
    const res = await fetch('/api/orders?status=entregada,cancelada')
    const { data } = await res.json()
    setHistoryOrders(data || [])
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  useEffect(() => {
    if (activeTab === 'historial') {
      fetchHistory()
    }
  }, [activeTab])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Cargando ordenes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-gray-900">Panel de Ordenes</h1>
              <p className="text-sm text-gray-500">Gestiona las ordenes del restaurante</p>
            </div>
          </div>
          <button
            onClick={fetchOrders}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Actualizar
          </button>
        </div>
      </div>

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="ordenes" className="gap-2">
              <ClipboardList className="w-4 h-4" />
              Ordenes Activas
            </TabsTrigger>
            <TabsTrigger value="historial" className="gap-2">
              <History className="w-4 h-4" />
              Historial
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ordenes">
            <OrderKanban initialOrders={orders} />
          </TabsContent>

          <TabsContent value="historial">
            <div className="bg-white rounded-xl shadow-card overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">#</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Mesa</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Cliente</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Items</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Total</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Status</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Tiempo</th>
                  </tr>
                </thead>
                <tbody>
                  {historyOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-3 font-bold text-gray-900">#{order.order_number}</td>
                      <td className="px-4 py-3 text-gray-700">{order.table_number}</td>
                      <td className="px-4 py-3 text-gray-700">{order.customer_name || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {order.items?.map((i: any) => `${i.quantity}x ${i.menu_item?.name}`).join(', ')}
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-900">{formatPrice(order.total_amount)}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={order.status as OrderStatus} />
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleString('es-MX', {
                          hour: '2-digit',
                          minute: '2-digit',
                          day: '2-digit',
                          month: '2-digit',
                        })}
                      </td>
                    </tr>
                  ))}
                  {historyOrders.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-gray-400">
                        No hay ordenes en el historial
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
