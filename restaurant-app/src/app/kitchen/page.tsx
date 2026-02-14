'use client'

import { useEffect, useState } from 'react'
import { useRealtimeOrders } from '@/lib/hooks/useRealtime'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function KitchenPage() {
  const [initialOrders, setInitialOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOrders() {
      const response = await fetch('/api/orders?status=pending,in_progress,ready')
      const { data } = await response.json()
      setInitialOrders(data || [])
      setLoading(false)
    }
    fetchOrders()
  }, [])

  const orders = useRealtimeOrders(initialOrders)

  async function updateStatus(orderId: string, newStatus: string) {
    await fetch(`/api/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="text-4xl mb-4">👨‍🍳</div>
          <p className="text-xl text-gray-600">Cargando pedidos...</p>
        </div>
      </div>
    )
  }

  const pending = orders.filter(o => o.status === 'pending')
  const inProgress = orders.filter(o => o.status === 'in_progress')
  const ready = orders.filter(o => o.status === 'ready')

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          👨‍🍳 Pantalla de Cocina
        </h1>
        <p className="text-center text-gray-600">
          Actualización en tiempo real
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pendientes */}
        <div>
          <div className="bg-yellow-100 p-3 rounded-lg mb-4">
            <h2 className="text-xl font-bold text-yellow-900">
              Pendientes ({pending.length})
            </h2>
          </div>
          <div className="space-y-4">
            {pending.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-3xl mb-2">✅</div>
                <p>No hay pedidos pendientes</p>
              </div>
            ) : (
              pending.map(order => (
                <Card key={order.id} className="border-l-4 border-yellow-500">
                  <div className="font-bold text-lg mb-2">
                    Orden #{order.order_number}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    Mesa: <span className="font-semibold">{order.table_number}</span>
                  </p>
                  {order.customer_name && (
                    <p className="text-sm text-gray-600 mb-2">
                      Cliente: {order.customer_name}
                    </p>
                  )}
                  <div className="my-3 py-2 border-t border-b border-gray-200">
                    {order.items?.map((item: any, idx: number) => (
                      <div key={item.id} className="text-sm mb-1">
                        <span className="font-semibold">{item.quantity}x</span> {item.menu_item?.name}
                        {item.notes && (
                          <div className="text-xs text-gray-500 ml-4">
                            Nota: {item.notes}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {order.notes && (
                    <div className="text-sm mb-3 bg-yellow-50 p-2 rounded">
                      <span className="font-semibold">Notas:</span> {order.notes}
                    </div>
                  )}
                  <Button
                    size="sm"
                    onClick={() => updateStatus(order.id, 'in_progress')}
                    className="w-full"
                  >
                    Iniciar Preparación
                  </Button>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* En Preparación */}
        <div>
          <div className="bg-blue-100 p-3 rounded-lg mb-4">
            <h2 className="text-xl font-bold text-blue-900">
              En Preparación ({inProgress.length})
            </h2>
          </div>
          <div className="space-y-4">
            {inProgress.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-3xl mb-2">🍳</div>
                <p>No hay pedidos en preparación</p>
              </div>
            ) : (
              inProgress.map(order => (
                <Card key={order.id} className="border-l-4 border-blue-500">
                  <div className="font-bold text-lg mb-2">
                    Orden #{order.order_number}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    Mesa: <span className="font-semibold">{order.table_number}</span>
                  </p>
                  {order.customer_name && (
                    <p className="text-sm text-gray-600 mb-2">
                      Cliente: {order.customer_name}
                    </p>
                  )}
                  <div className="my-3 py-2 border-t border-b border-gray-200">
                    {order.items?.map((item: any) => (
                      <div key={item.id} className="text-sm mb-1">
                        <span className="font-semibold">{item.quantity}x</span> {item.menu_item?.name}
                      </div>
                    ))}
                  </div>
                  <Button
                    size="sm"
                    onClick={() => updateStatus(order.id, 'ready')}
                    className="w-full"
                  >
                    Marcar como Listo
                  </Button>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Listos */}
        <div>
          <div className="bg-green-100 p-3 rounded-lg mb-4">
            <h2 className="text-xl font-bold text-green-900">
              Listos ({ready.length})
            </h2>
          </div>
          <div className="space-y-4">
            {ready.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-3xl mb-2">⏰</div>
                <p>No hay pedidos listos</p>
              </div>
            ) : (
              ready.map(order => (
                <Card key={order.id} className="border-l-4 border-green-500">
                  <div className="font-bold text-lg mb-2">
                    Orden #{order.order_number}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    Mesa: <span className="font-semibold">{order.table_number}</span>
                  </p>
                  {order.customer_name && (
                    <p className="text-sm text-gray-600 mb-2">
                      Cliente: {order.customer_name}
                    </p>
                  )}
                  <div className="my-3 py-2 border-t border-b border-gray-200">
                    {order.items?.map((item: any) => (
                      <div key={item.id} className="text-sm mb-1">
                        <span className="font-semibold">{item.quantity}x</span> {item.menu_item?.name}
                      </div>
                    ))}
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => updateStatus(order.id, 'delivered')}
                    className="w-full"
                  >
                    Marcar como Entregado
                  </Button>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
