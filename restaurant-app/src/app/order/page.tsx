'use client'

import { useState, useEffect } from 'react'
import { useCartStore } from '@/lib/store/cart-store'
import { useOrderTracking } from '@/lib/hooks/useRealtime'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Navbar } from '@/components/layout/Navbar'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { formatPrice } from '@/lib/utils/formatPrice'
import { ORDER_STEPS, STATUS_LABELS, type OrderStatus } from '@/lib/types'
import { ChevronLeft, Check, ClipboardList, Pencil, ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

function OrderTracker({ orderId }: { orderId: string }) {
  const order = useOrderTracking(orderId)

  if (!order) return null

  const currentIdx = ORDER_STEPS.indexOf(order.status as OrderStatus)
  const isCancelled = order.status === 'cancelada'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8"
    >
      <Card>
        <div className="flex items-center gap-2 mb-6">
          <StatusBadge status={order.status as OrderStatus} />
          <span className="text-sm text-gray-400">Orden #{order.order_number}</span>
        </div>

        {isCancelled ? (
          <div className="text-center py-4">
            <p className="text-red-600 font-semibold">Esta orden fue cancelada</p>
          </div>
        ) : (
          <div className="relative">
            {/* Progress bar */}
            <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200 rounded-full">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${(currentIdx / (ORDER_STEPS.length - 1)) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <div className="relative flex justify-between">
              {ORDER_STEPS.map((step, idx) => {
                const isCompleted = idx <= currentIdx
                const isCurrent = idx === currentIdx
                return (
                  <div key={step} className="flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: isCurrent ? 1.1 : 1 }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold z-10 ${
                        isCompleted
                          ? 'bg-primary text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4" /> : idx + 1}
                    </motion.div>
                    <span className={`text-xs mt-2 font-medium text-center ${
                      isCompleted ? 'text-primary' : 'text-gray-400'
                    }`}>
                      {STATUS_LABELS[step]}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  )
}

export default function OrderPage() {
  const { items, getTotalPrice, clearCart, periodId } = useCartStore()
  const [tableNumber, setTableNumber] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [orderResult, setOrderResult] = useState<any>(null)
  const [error, setError] = useState('')

  const total = getTotalPrice()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!items.length || !tableNumber) return

    setSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          table_number: parseInt(tableNumber),
          period_id: periodId,
          customer_name: customerName || undefined,
          notes: notes || undefined,
          items: items.map((item) => ({
            menu_item_id: item.menu_item_id,
            quantity: item.quantity,
            unit_price: item.price,
          })),
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Error al crear el pedido')
      }

      clearCart()
      setOrderResult(result.data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  // Success screen with tracker
  if (orderResult) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-gray-50">
        <Navbar />
        <div className="pt-24 px-4">
          <div className="max-w-md mx-auto animate-fade-in-up">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Check className="w-12 h-12 text-green-600" />
              </motion.div>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Pedido Creado</h1>
              <p className="text-gray-500">
                Tu pedido ha sido creado. Un mesero lo confirmara en breve.
              </p>
            </div>

            <Card className="mb-4">
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Numero de orden</p>
                  <p className="text-2xl font-extrabold text-primary">
                    #{orderResult.order_number || orderResult.id?.slice(0, 8).toUpperCase()}
                  </p>
                </div>
                <div className="flex gap-8">
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Mesa</p>
                    <p className="text-xl font-bold text-gray-900">{orderResult.table_number}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total</p>
                    <p className="text-xl font-bold text-primary">{formatPrice(orderResult.total_amount)}</p>
                  </div>
                </div>
              </div>
            </Card>

            <OrderTracker orderId={orderResult.id} />

            <div className="mt-8">
              <Link href="/menu">
                <Button size="lg" className="w-full">Volver al Menu</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Empty cart
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Navbar />
        <div className="text-center animate-fade-in-up">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-800 mb-2">Tu carrito esta vacio</h1>
          <p className="text-gray-500 mb-8">Agrega items desde el menu para hacer un pedido</p>
          <Link href="/menu">
            <Button size="lg">Ir al Menu</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white pt-24 pb-10 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
        <div className="container mx-auto px-4 relative z-10">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-sm text-blue-200 hover:text-white transition-colors mb-4 group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver al menu
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold animate-fade-in-up">Confirmar Pedido</h1>
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full">
            <path d="M0 20C480 60 960 0 1440 20V60H0V20Z" fill="#f9fafb" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Order summary */}
        <Card className="mb-6 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-extrabold text-gray-900">Resumen del Pedido</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {items.map((item) => (
              <div key={item.id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-400">
                    {item.quantity} x {formatPrice(item.price)}
                  </p>
                </div>
                <p className="font-bold text-gray-900">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
          <div className="border-t-2 border-gray-100 mt-2 pt-4 flex justify-between items-center">
            <span className="text-lg font-bold text-gray-600">Total</span>
            <span className="text-2xl font-extrabold text-primary">{formatPrice(total)}</span>
          </div>
        </Card>

        {/* Order form */}
        <Card className="animate-fade-in-up animation-delay-100">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center">
              <Pencil className="w-5 h-5 text-amber-600" />
            </div>
            <h2 className="text-xl font-extrabold text-gray-900">Datos del Pedido</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="table" className="block text-sm font-semibold text-gray-700 mb-2">
                Numero de Mesa <span className="text-red-500">*</span>
              </label>
              <input
                id="table"
                type="number"
                min="1"
                required
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-lg"
                placeholder="Ej: 5"
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre <span className="text-gray-400 font-normal">(opcional)</span>
              </label>
              <input
                id="name"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-2">
                Notas <span className="text-gray-400 font-normal">(opcional)</span>
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                placeholder="Instrucciones especiales, alergias, etc."
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium flex items-center gap-2 animate-scale-in border border-red-100">
                {error}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={submitting || !tableNumber}
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Enviando...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Confirmar Pedido
                  <Check className="w-5 h-5" />
                </span>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
