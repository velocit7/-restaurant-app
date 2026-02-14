import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '@/lib/types'

interface CartStore {
  items: CartItem[]
  periodId: string | null
  isOpen: boolean

  addItem: (item: CartItem) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  setPeriodId: (id: string) => void
  toggleDrawer: () => void
  openDrawer: () => void
  closeDrawer: () => void

  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      periodId: null,
      isOpen: false,

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            }
          }
          return { items: [...state.items, { ...item, quantity: 1 }] }
        }),

      removeItem: (itemId) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === itemId)
          if (existing && existing.quantity > 1) {
            return {
              items: state.items.map((i) =>
                i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
              ),
            }
          }
          return { items: state.items.filter((i) => i.id !== itemId) }
        }),

      updateQuantity: (itemId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((i) => i.id !== itemId) }
          }
          return {
            items: state.items.map((i) =>
              i.id === itemId ? { ...i, quantity } : i
            ),
          }
        }),

      clearCart: () => set({ items: [], periodId: null }),
      setPeriodId: (id) => set({ periodId: id }),
      toggleDrawer: () => set((state) => ({ isOpen: !state.isOpen })),
      openDrawer: () => set({ isOpen: true }),
      closeDrawer: () => set({ isOpen: false }),

      getTotalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
      getTotalPrice: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: 'restaurant-cart',
      partialize: (state) => ({
        items: state.items,
        periodId: state.periodId,
      }),
    }
  )
)
