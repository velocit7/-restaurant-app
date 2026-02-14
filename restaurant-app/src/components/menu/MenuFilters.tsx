'use client'

import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MenuFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  categories: string[]
  activeCategory: string | null
  onCategoryChange: (category: string | null) => void
}

export function MenuFilters({
  search,
  onSearchChange,
  categories,
  activeCategory,
  onCategoryChange,
}: MenuFiltersProps) {
  return (
    <div className="space-y-4 mb-8">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar platillos..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-11 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
        />
        {search && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-gray-100 text-gray-400 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => onCategoryChange(null)}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all cursor-pointer',
            !activeCategory
              ? 'bg-primary text-white shadow-glow'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
        >
          Todos
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat === activeCategory ? null : cat)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all cursor-pointer',
              cat === activeCategory
                ? 'bg-primary text-white shadow-glow'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}
