'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { formatPrice } from '@/lib/utils/formatPrice'
import Link from 'next/link'

interface CartItem {
  id: string
  menu_item_id: string
  name: string
  price: number
  quantity: number
}

interface CartData {
  period_id: string
  items: CartItem[]
}

const CART_KEY = 'restaurant-cart'

export default function OrderPage() {
  const [cartData, setCartData] = useState<CartData | null>(null)
  const [tableNumber, setTableNumber] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [orderResult, setOrderResult] = useState<any>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.items?.length) {
          setCartData(parsed)
        }
      }
    } catch {}
  }, [])

  const total = cartData?.items.reduce((sum, item) => sum + item.price * item.quantity, 0) ?? 0

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!cartData || !tableNumber) return

    setSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          table_number: parseInt(tableNumber),
          period_id: cartData.period_id,
          customer_name: customerName || undefined,
          notes: notes || undefined,
          items: cartData.items.map(item => ({
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

      localStorage.removeItem(CART_KEY)
      setOrderResult(result.data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  // Success screen
  if (orderResult) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto animate-fade-in-up">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-in">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Pedido Confirmado</h1>
          <p className="text-gray-500 mb-8">
            Tu pedido ha sido enviado a la cocina
          </p>
          <Card className="mb-8 text-left">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Numero de orden</p>
                <p className="text-2xl font-extrabold text-primary">
                  #{orderResult.id?.slice(0, 8).toUpperCase()}
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
          <Link href="/menu">
            <Button size="lg" className="w-full">Volver al Menu</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Empty cart
  if (!cartData || cartData.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center animate-fade-in-up">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
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
      {/* Header */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white py-10 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
        <div className="container mx-auto px-4 relative z-10">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-sm text-blue-200 hover:text-white transition-colors mb-4 group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
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
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-xl font-extrabold text-gray-900">Resumen del Pedido</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {cartData.items.map(item => (
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
            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
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
                onChange={e => setTableNumber(e.target.value)}
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
                onChange={e => setCustomerName(e.target.value)}
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
                onChange={e => setNotes(e.target.value)}
                rows={3}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                placeholder="Instrucciones especiales, alergias, etc."
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium flex items-center gap-2 animate-scale-in border border-red-100">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
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
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
