import { create } from 'zustand'
import type { Order, OrderStatus } from '@/lib/types'

interface OrderStore {
  orders: Order[]
  filter: OrderStatus | 'todas'

  setOrders: (orders: Order[]) => void
  updateOrder: (updated: Order) => void
  addOrder: (order: Order) => void
  removeOrder: (id: string) => void
  setFilter: (filter: OrderStatus | 'todas') => void

  getFilteredOrders: () => Order[]
  getOrdersByStatus: (status: OrderStatus) => Order[]
}

export const useOrderStore = create<OrderStore>()((set, get) => ({
  orders: [],
  filter: 'todas',

  setOrders: (orders) => set({ orders }),

  updateOrder: (updated) =>
    set((state) => ({
      orders: state.orders.map((o) => (o.id === updated.id ? updated : o)),
    })),

  addOrder: (order) =>
    set((state) => ({
      orders: [order, ...state.orders],
    })),

  removeOrder: (id) =>
    set((state) => ({
      orders: state.orders.filter((o) => o.id !== id),
    })),

  setFilter: (filter) => set({ filter }),

  getFilteredOrders: () => {
    const { orders, filter } = get()
    if (filter === 'todas') return orders
    return orders.filter((o) => o.status === filter)
  },

  getOrdersByStatus: (status) =>
    get().orders.filter((o) => o.status === status),
}))
