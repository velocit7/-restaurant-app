'use client'

import { useEffect, useState } from 'react'
import { getCurrentPeriod } from '@/lib/utils/getCurrentPeriod'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils/formatPrice'
import Link from 'next/link'

interface CartItem {
  id: string
  menu_item_id: string
  name: string
  price: number
  quantity: number
}

const CART_KEY = 'restaurant-cart'

function saveCart(cart: Map<string, CartItem>, periodId: string) {
  const data = {
    period_id: periodId,
    items: Array.from(cart.values()),
  }
  localStorage.setItem(CART_KEY, JSON.stringify(data))
}

export default function MenuPage() {
  const [period, setPeriod] = useState<any>(null)
  const [menu, setMenu] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState<Map<string, CartItem>>(new Map())
  const [addedItemId, setAddedItemId] = useState<string | null>(null)

  useEffect(() => {
    async function loadMenu() {
      const currentPeriod = await getCurrentPeriod()
      setPeriod(currentPeriod)

      if (currentPeriod) {
        const response = await fetch(`/api/menu?period_id=${currentPeriod.id}`)
        const { data } = await response.json()
        setMenu(data || [])

        // Restore cart from localStorage if same period
        try {
          const saved = localStorage.getItem(CART_KEY)
          if (saved) {
            const parsed = JSON.parse(saved)
            if (parsed.period_id === currentPeriod.id && parsed.items?.length) {
              const restored = new Map<string, CartItem>()
              parsed.items.forEach((item: CartItem) => restored.set(item.id, item))
              setCart(restored)
            }
          }
        } catch {}
      }

      setLoading(false)
    }

    loadMenu()
  }, [])

  function addToCart(item: any) {
    setCart(prev => {
      const next = new Map(prev)
      const existing = next.get(item.id)
      if (existing) {
        next.set(item.id, { ...existing, quantity: existing.quantity + 1 })
      } else {
        next.set(item.id, {
          id: item.id,
          menu_item_id: item.menu_item?.id || item.menu_item_id,
          name: item.menu_item?.name || '',
          price: item.price,
          quantity: 1,
        })
      }
      saveCart(next, period.id)
      return next
    })

    // Trigger add animation
    setAddedItemId(item.id)
    setTimeout(() => setAddedItemId(null), 400)
  }

  function removeFromCart(itemId: string) {
    setCart(prev => {
      const next = new Map(prev)
      const existing = next.get(itemId)
      if (existing && existing.quantity > 1) {
        next.set(itemId, { ...existing, quantity: existing.quantity - 1 })
      } else {
        next.delete(itemId)
      }
      saveCart(next, period.id)
      return next
    })
  }

  const totalItems = Array.from(cart.values()).reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = Array.from(cart.values()).reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="h-4 w-32 skeleton rounded-full mb-4" />
            <div className="h-10 w-64 skeleton rounded-xl mb-2" />
            <div className="h-5 w-48 skeleton rounded-full" />
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-2xl shadow-card p-6">
                <div className="h-44 skeleton rounded-xl mb-4" />
                <div className="h-6 w-3/4 skeleton rounded-lg mb-3" />
                <div className="h-4 w-full skeleton rounded-lg mb-2" />
                <div className="h-4 w-2/3 skeleton rounded-lg mb-4" />
                <div className="flex justify-between items-center">
                  <div className="h-8 w-24 skeleton rounded-lg" />
                  <div className="h-10 w-10 skeleton rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!period) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center animate-fade-in-up">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">&#x23F0;</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">No hay periodo activo</h1>
          <p className="text-gray-500 mb-6">Vuelve durante nuestro horario de servicio</p>
          <Link href="/">
            <Button size="lg">Volver al Inicio</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Group by category
  const grouped = menu.reduce((acc: any, item: any) => {
    const category = item.menu_item?.category?.name || 'Otros'
    if (!acc[category]) {
      acc[category] = {
        name: category,
        order: item.menu_item?.category?.display_order || 999,
        items: []
      }
    }
    acc[category].items.push(item)
    return acc
  }, {})

  const categories = Object.values(grouped).sort((a: any, b: any) => a.order - b.order)

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white py-12 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
        <div className="absolute bottom-5 -left-5 w-24 h-24 bg-white/5 rounded-full" />

        <div className="container mx-auto px-4 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-blue-200 hover:text-white transition-colors mb-4 group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al inicio
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 animate-fade-in-up">
            {period.display_name}
          </h1>
          <p className="text-blue-200 text-lg animate-fade-in-up animation-delay-100">
            {period.description}
          </p>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full">
            <path d="M0 20C480 60 960 0 1440 20V60H0V20Z" fill="#f9fafb" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {categories.length === 0 ? (
          <div className="text-center py-16 animate-fade-in-up">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">&#x1F4CB;</span>
            </div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">Menu no disponible</h2>
            <p className="text-gray-500">
              No hay items disponibles en el menu para este periodo
            </p>
          </div>
        ) : (
          <>
            {categories.map((category: any, catIndex: number) => (
              <div key={category.name} className="mb-14">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                    {category.name}
                  </h2>
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-primary/30 to-transparent rounded-full" />
                  <span className="text-sm font-semibold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                    {category.items.length} {category.items.length === 1 ? 'platillo' : 'platillos'}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
                  {category.items.map((item: any) => {
                    const cartItem = cart.get(item.id)
                    const quantity = cartItem?.quantity || 0
                    const justAdded = addedItemId === item.id

                    return (
                      <div
                        key={item.id}
                        className={`bg-white rounded-2xl shadow-card border border-gray-100/50 overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 ${
                          justAdded ? 'ring-2 ring-primary ring-offset-2' : ''
                        }`}
                      >
                        {/* Image placeholder */}
                        <div className="relative h-44 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden group">
                          <span className="text-5xl group-hover:scale-125 transition-transform duration-500">
                            🍽️
                          </span>
                          {item.is_featured && (
                            <div className="absolute top-3 left-3">
                              <span className="bg-gradient-to-r from-accent to-accent-dark text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-glow-accent flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                Destacado
                              </span>
                            </div>
                          )}
                          {quantity > 0 && (
                            <div className="absolute top-3 right-3">
                              <span className="bg-primary text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shadow-md animate-bounce-in">
                                {quantity}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">
                            {item.menu_item?.name}
                          </h3>
                          <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                            {item.menu_item?.description || 'Delicioso platillo preparado con los mejores ingredientes'}
                          </p>

                          <div className="flex items-center justify-between">
                            <p className="text-2xl font-extrabold text-primary">
                              {formatPrice(item.price)}
                            </p>

                            {quantity > 0 ? (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 font-bold transition-all active:scale-90 cursor-pointer"
                                >
                                  -
                                </button>
                                <span className="font-bold text-lg w-8 text-center text-gray-900">
                                  {quantity}
                                </span>
                                <button
                                  onClick={() => addToCart(item)}
                                  className="w-9 h-9 rounded-xl bg-primary hover:bg-primary-dark text-white flex items-center justify-center font-bold transition-all active:scale-90 shadow-sm cursor-pointer"
                                >
                                  +
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => addToCart(item)}
                                className="w-10 h-10 rounded-xl bg-primary hover:bg-primary-dark text-white flex items-center justify-center font-bold text-xl transition-all hover:shadow-glow active:scale-90 cursor-pointer"
                              >
                                +
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Floating cart bar - using Link for reliable navigation */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
          <div className="bg-white/80 backdrop-blur-xl border-t border-gray-200 shadow-float">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                    </svg>
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                    {totalItems}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </p>
                  <p className="text-xl font-extrabold text-gray-900">{formatPrice(totalPrice)}</p>
                </div>
              </div>
              <Link
                href="/order"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-blue-700 text-white font-bold text-lg px-8 py-3.5 rounded-2xl shadow-glow hover:shadow-xl hover:scale-105 transition-all duration-200 active:scale-95"
              >
                Ver Pedido
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
