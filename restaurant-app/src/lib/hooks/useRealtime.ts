'use client'

import { useEffect, useState, useCallback } from 'react'
import { subscribeToOrders } from '@/lib/supabase/realtime'
import type { Order } from '@/lib/types'

export function useRealtimeOrders(initialOrders: any[]) {
  const [orders, setOrders] = useState<any[]>(initialOrders)

  // Re-fetch full order with items when we get a realtime event
  const fetchOrder = useCallback(async (orderId: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`)
      const { data } = await res.json()
      return data
    } catch {
      return null
    }
  }, [])

  useEffect(() => {
    setOrders(initialOrders)
  }, [initialOrders])

  useEffect(() => {
    const channel = subscribeToOrders(async (payload) => {
      if (payload.eventType === 'INSERT') {
        const fullOrder = await fetchOrder(payload.new.id)
        if (fullOrder) {
          setOrders((prev) => [fullOrder, ...prev.filter((o) => o.id !== fullOrder.id)])
        }
      } else if (payload.eventType === 'UPDATE') {
        const fullOrder = await fetchOrder(payload.new.id)
        if (fullOrder) {
          setOrders((prev) =>
            prev.map((order) => (order.id === fullOrder.id ? fullOrder : order))
          )
        }
      } else if (payload.eventType === 'DELETE') {
        setOrders((prev) => prev.filter((order) => order.id !== payload.old.id))
      }
    })

    return () => {
      channel.unsubscribe()
    }
  }, [fetchOrder])

  return orders
}

export function useOrderTracking(orderId: string) {
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    if (!orderId) return

    // Initial fetch
    fetch(`/api/orders/${orderId}`)
      .then((r) => r.json())
      .then(({ data }) => setOrder(data))
      .catch(() => {})

    // Subscribe to realtime changes
    const channel = subscribeToOrders((payload) => {
      if (payload.new?.id === orderId) {
        fetch(`/api/orders/${orderId}`)
          .then((r) => r.json())
          .then(({ data }) => setOrder(data))
          .catch(() => {})
      }
    })

    return () => {
      channel.unsubscribe()
    }
  }, [orderId])

  return order
}
