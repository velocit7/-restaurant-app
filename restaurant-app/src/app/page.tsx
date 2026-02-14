import Link from 'next/link'
import { Card } from '@/components/ui/Card'

const services = [
  {
    emoji: '☕',
    title: 'Cafeteria',
    schedule: '7:00 AM - 12:00 PM',
    description: 'Desayunos deliciosos, cafes especiales y pasteles frescos para comenzar tu dia.',
    gradient: 'from-amber-500 to-orange-600',
    bgLight: 'bg-amber-50',
    iconBg: 'bg-amber-100',
  },
  {
    emoji: '🍽️',
    title: 'Restaurante',
    schedule: '12:00 PM - 6:00 PM',
    description: 'Almuerzos y comidas completas con ingredientes frescos y recetas tradicionales.',
    gradient: 'from-blue-500 to-indigo-600',
    bgLight: 'bg-blue-50',
    iconBg: 'bg-blue-100',
  },
  {
    emoji: '🌟',
    title: 'Premium & Comedy',
    schedule: '6:00 PM - 12:00 AM',
    description: 'Cena exclusiva con menu premium mientras disfrutas de stand-up comedy en vivo.',
    gradient: 'from-purple-500 to-pink-600',
    bgLight: 'bg-purple-50',
    iconBg: 'bg-purple-100',
  },
]

const steps = [
  {
    number: '01',
    title: 'Elige tu periodo',
    description: 'Selecciona cafeteria, restaurante o menu premium segun la hora del dia.',
    icon: '📋',
  },
  {
    number: '02',
    title: 'Selecciona platillos',
    description: 'Explora nuestro menu y agrega tus platillos favoritos al pedido.',
    icon: '🛒',
  },
  {
    number: '03',
    title: 'Recibe en tu mesa',
    description: 'Confirma tu mesa y tu pedido llega fresco y delicioso.',
    icon: '✨',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white py-28 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full animate-float" />
          <div className="absolute top-40 -left-10 w-60 h-60 bg-white/5 rounded-full animate-float animation-delay-300" />
          <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-white/5 rounded-full animate-float animation-delay-600" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-up">
            <span className="inline-block glass text-sm font-medium px-4 py-2 rounded-full mb-6">
              3 experiencias unicas en un solo lugar
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-in-up animation-delay-100 leading-tight">
            Bienvenido a<br />
            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
              Nuestro Restaurante
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Donde cada momento del dia tiene su sabor especial
          </p>
          <div className="animate-fade-in-up animation-delay-300">
            <Link
              href="/menu"
              className="inline-flex items-center gap-3 bg-white text-blue-700 font-bold text-lg px-10 py-4 rounded-2xl shadow-float hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <span>Ver Menu</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 40C360 80 720 0 1080 40C1260 60 1380 80 1440 80V100H0V40Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">Lo que ofrecemos</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-3">
              Nuestros Servicios
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mt-5" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 stagger-children">
            {services.map((service) => (
              <Card key={service.title} hover className="relative overflow-hidden group">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className={`w-16 h-16 ${service.iconBg} rounded-2xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    {service.emoji}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">{service.title}</h3>
                  <div className={`inline-flex items-center gap-1.5 ${service.bgLight} px-3 py-1 rounded-full mb-4`}>
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-semibold text-gray-600">{service.schedule}</span>
                  </div>
                  <p className="text-gray-500 leading-relaxed">{service.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">Simple y rapido</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-3">
              Como Funciona
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-accent to-primary rounded-full mx-auto mt-5" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto stagger-children">
            {steps.map((step, index) => (
              <div key={step.number} className="text-center group">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-700 rounded-2xl flex items-center justify-center text-3xl shadow-glow group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    {step.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-accent text-white text-sm font-bold rounded-full flex items-center justify-center shadow-md">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16 animate-fade-in-up">
            <Link
              href="/menu"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-blue-700 text-white font-bold text-lg px-10 py-4 rounded-2xl shadow-glow hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <span>Ordenar Ahora</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-1">Nuestro Restaurante</h3>
              <p className="text-gray-400 text-sm">&copy; 2024. Todos los derechos reservados.</p>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link href="/kitchen" className="hover:text-white transition-colors duration-200">
                Vista de Cocina
              </Link>
              <span className="w-1 h-1 bg-gray-600 rounded-full" />
              <Link href="/admin" className="hover:text-white transition-colors duration-200">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
