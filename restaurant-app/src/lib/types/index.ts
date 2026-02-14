export type OrderStatus = 'nueva' | 'confirmada' | 'en_preparacion' | 'lista' | 'entregada' | 'cancelada'

export const STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  nueva: ['confirmada', 'cancelada'],
  confirmada: ['en_preparacion', 'cancelada'],
  en_preparacion: ['lista'],
  lista: ['entregada'],
  entregada: [],
  cancelada: [],
}

export const STATUS_LABELS: Record<OrderStatus, string> = {
  nueva: 'Nueva',
  confirmada: 'Confirmada',
  en_preparacion: 'En Preparacion',
  lista: 'Lista',
  entregada: 'Entregada',
  cancelada: 'Cancelada',
}

export const STATUS_COLORS: Record<OrderStatus, { bg: string; text: string; border: string }> = {
  nueva: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-400' },
  confirmada: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-400' },
  en_preparacion: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-400' },
  lista: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-400' },
  entregada: { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-400' },
  cancelada: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-400' },
}

export const ORDER_STEPS: OrderStatus[] = ['nueva', 'confirmada', 'en_preparacion', 'lista', 'entregada']

export interface MenuCategory {
  id: string
  name: string
  display_order: number
}

export interface MenuItem {
  id: string
  name: string
  description: string | null
  image_url: string | null
  category: MenuCategory | null
}

export interface MenuItemSchedule {
  id: string
  price: number
  is_featured: boolean
  menu_item: MenuItem
}

export interface OrderItem {
  id: string
  order_id: string
  menu_item_id: string
  quantity: number
  unit_price: number
  subtotal: number
  notes: string | null
  menu_item?: { name: string }
}

export interface Order {
  id: string
  order_number: number
  table_number: string
  period_id: string
  status: OrderStatus
  total_amount: number
  customer_name: string | null
  notes: string | null
  created_at: string
  updated_at: string
  confirmed_at: string | null
  prepared_at: string | null
  delivered_at: string | null
  items?: OrderItem[]
  period?: { name: string; display_name: string }
}

export interface CartItem {
  id: string
  menu_item_id: string
  name: string
  price: number
  quantity: number
}

export interface DayPeriod {
  id: string
  name: string
  display_name: string
  start_time: string
  end_time: string
  description: string | null
  is_active: boolean
}
