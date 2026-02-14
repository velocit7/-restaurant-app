'use client'

import { useEffect, useState } from 'react'
import { subscribeToOrders } from '@/lib/supabase/realtime'

export function useRealtimeOrders(initialOrders: any[]) {
  const [orders, setOrders] = useState(initialOrders)

  useEffect(() => {
    const channel = subscribeToOrders((payload) => {
      if (payload.eventType === 'INSERT') {
        setOrders(prev => [payload.new, ...prev])
      } else if (payload.eventType === 'UPDATE') {
        setOrders(prev => prev.map(order =>
          order.id === payload.new.id ? payload.new : order
        ))
      } else if (payload.eventType === 'DELETE') {
        setOrders(prev => prev.filter(order => order.id !== payload.old.id))
      }
    })

    return () => {
      channel.unsubscribe()
    }
  }, [])

  return orders
}
