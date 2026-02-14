import { createClient } from './client'

export function subscribeToOrders(callback: (payload: any) => void) {
  const supabase = createClient()

  const channel = supabase
    .channel('orders-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'orders' },
      callback
    )
    .subscribe()

  return channel
}
