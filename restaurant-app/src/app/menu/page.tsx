'use client'

import { useEffect, useState, useMemo } from 'react'
import { getCurrentPeriod } from '@/lib/utils/getCurrentPeriod'
import { useCartStore } from '@/lib/store/cart-store'
import { MenuFilters } from '@/components/menu/MenuFilters'
import { MenuItemCard } from '@/components/menu/MenuItemCard'
import { MenuItemModal } from '@/components/menu/MenuItemModal'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function MenuPage() {
  const [period, setPeriod] = useState<any>(null)
  const [menu, setMenu] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<any>(null)

  const { items: cartItems, addItem, removeItem, setPeriodId } = useCartStore()

  useEffect(() => {
    async function loadMenu() {
      const currentPeriod = await getCurrentPeriod()
      setPeriod(currentPeriod)

      if (currentPeriod) {
        setPeriodId(currentPeriod.id)
        const response = await fetch(`/api/menu?period_id=${currentPeriod.id}`)
        const { data } = await response.json()
        setMenu(data || [])
      }

      setLoading(false)
    }
    loadMenu()
  }, [setPeriodId])

  // Derive categories
  const categories = useMemo(() => {
    const grouped = menu.reduce((acc: any, item: any) => {
      const cat = item.menu_item?.category?.name || 'Otros'
      if (!acc[cat]) {
        acc[cat] = { name: cat, order: item.menu_item?.category?.display_order || 999 }
      }
      return acc
    }, {})
    return Object.values(grouped)
      .sort((a: any, b: any) => a.order - b.order)
      .map((c: any) => c.name)
  }, [menu])

  // Filter items
  const filteredMenu = useMemo(() => {
    let items = menu
    if (search) {
      const q = search.toLowerCase()
      items = items.filter(
        (item: any) =>
          item.menu_item?.name?.toLowerCase().includes(q) ||
          item.menu_item?.description?.toLowerCase().includes(q)
      )
    }
    if (activeCategory) {
      items = items.filter((item: any) => (item.menu_item?.category?.name || 'Otros') === activeCategory)
    }
    return items
  }, [menu, search, activeCategory])

  // Group filtered by category
  const grouped = useMemo(() => {
    const acc: any = {}
    filteredMenu.forEach((item: any) => {
      const cat = item.menu_item?.category?.name || 'Otros'
      if (!acc[cat]) {
        acc[cat] = { name: cat, order: item.menu_item?.category?.display_order || 999, items: [] }
      }
      acc[cat].items.push(item)
    })
    return Object.values(acc).sort((a: any, b: any) => a.order - b.order)
  }, [filteredMenu])

  function getCartQuantity(itemId: string) {
    return cartItems.find((i) => i.id === itemId)?.quantity || 0
  }

  function handleAddToCart(item: any, qty = 1) {
    for (let i = 0; i < qty; i++) {
      addItem({
        id: item.id,
        menu_item_id: item.menu_item?.id || item.menu_item_id,
        name: item.menu_item?.name || '',
        price: item.price,
        quantity: 1,
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="h-4 w-32 skeleton rounded-full mb-4" />
            <div className="h-10 w-64 skeleton rounded-xl mb-2" />
            <div className="h-5 w-48 skeleton rounded-full" />
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
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
        <Navbar />
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white pt-24 pb-12 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
        <div className="absolute bottom-5 -left-5 w-24 h-24 bg-white/5 rounded-full" />

        <div className="container mx-auto px-4 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-blue-200 hover:text-white transition-colors mb-4 group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver al inicio
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 animate-fade-in-up">
            {period.display_name}
          </h1>
          <p className="text-blue-200 text-lg animate-fade-in-up animation-delay-100">
            {period.description}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full">
            <path d="M0 20C480 60 960 0 1440 20V60H0V20Z" fill="#f9fafb" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <MenuFilters
          search={search}
          onSearchChange={setSearch}
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {filteredMenu.length === 0 ? (
          <div className="text-center py-16 animate-fade-in-up">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">&#x1F50D;</span>
            </div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">
              {search ? 'Sin resultados' : 'Menu no disponible'}
            </h2>
            <p className="text-gray-500">
              {search
                ? `No encontramos platillos para "${search}"`
                : 'No hay items disponibles en el menu para este periodo'}
            </p>
          </div>
        ) : (
          grouped.map((category: any) => (
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

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {category.items.map((item: any) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      quantity={getCartQuantity(item.id)}
                      onAdd={() => handleAddToCart(item)}
                      onRemove={() => removeItem(item.id)}
                      onOpenDetail={() => setSelectedItem(item)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ))
        )}
      </div>

      <MenuItemModal
        item={selectedItem}
        open={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddToCart={(qty) => selectedItem && handleAddToCart(selectedItem, qty)}
        currentQuantity={selectedItem ? getCartQuantity(selectedItem.id) : 0}
      />

      <Footer />
    </div>
  )
}
