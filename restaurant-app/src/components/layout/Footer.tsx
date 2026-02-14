import Link from 'next/link'
import { UtensilsCrossed } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold">Nuestro Restaurante</h3>
              <p className="text-gray-400 text-sm">&copy; 2025. Todos los derechos reservados.</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="/kitchen" className="hover:text-white transition-colors duration-200">
              Cocina
            </Link>
            <span className="w-1 h-1 bg-gray-600 rounded-full" />
            <Link href="/admin" className="hover:text-white transition-colors duration-200">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
