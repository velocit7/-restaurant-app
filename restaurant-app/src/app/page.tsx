'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Coffee, UtensilsCrossed, Sparkles, Clock, ChevronRight, Star, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { formatPrice } from '@/lib/utils/formatPrice'

const services = [
  {
    icon: Coffee,
    title: 'Cafeteria',
    schedule: '7:00 AM - 12:00 PM',
    description: 'Desayunos deliciosos, cafes especiales y pasteles frescos para comenzar tu dia.',
    gradient: 'from-amber-500 to-orange-600',
    bgLight: 'bg-amber-50',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
  {
    icon: UtensilsCrossed,
    title: 'Restaurante',
    schedule: '12:00 PM - 6:00 PM',
    description: 'Almuerzos y comidas completas con ingredientes frescos y recetas tradicionales.',
    gradient: 'from-blue-500 to-indigo-600',
    bgLight: 'bg-blue-50',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    icon: Sparkles,
    title: 'Premium & Comedy',
    schedule: '6:00 PM - 12:00 AM',
    description: 'Cena exclusiva con menu premium mientras disfrutas de stand-up comedy en vivo.',
    gradient: 'from-purple-500 to-pink-600',
    bgLight: 'bg-purple-50',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
]

const steps = [
  { title: 'Elige tu periodo', description: 'Selecciona cafeteria, restaurante o menu premium segun la hora del dia.' },
  { title: 'Selecciona platillos', description: 'Explora nuestro menu y agrega tus platillos favoritos al pedido.' },
  { title: 'Recibe en tu mesa', description: 'Confirma tu mesa y tu pedido llega fresco y delicioso.' },
]

const testimonials = [
  { name: 'Maria G.', rating: 5, text: 'Los desayunos son increibles. El avocado toast es mi favorito de toda la ciudad.' },
  { name: 'Carlos R.', rating: 5, text: 'La noche premium con comedy es una experiencia unica. El rib eye es espectacular.' },
  { name: 'Ana L.', rating: 4, text: 'Excelente servicio y comida deliciosa. Los chilaquiles verdes son adictivos.' },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
}

export default function Home() {
  const [featured, setFeatured] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/menu/featured')
      .then((r) => r.json())
      .then((d) => setFeatured(d.data || []))
      .catch(() => {})
  }, [])

  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white pt-32 pb-28 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full animate-float" />
          <div className="absolute top-40 -left-10 w-60 h-60 bg-white/5 rounded-full animate-float animation-delay-300" />
          <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-white/5 rounded-full animate-float animation-delay-600" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span
              variants={fadeInUp}
              className="inline-block glass text-sm font-medium px-4 py-2 rounded-full mb-6"
            >
              3 experiencias unicas en un solo lugar
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
            >
              Bienvenido a<br />
              <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                Nuestro Restaurante
              </span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto"
            >
              Donde cada momento del dia tiene su sabor especial
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link
                href="/menu"
                className="inline-flex items-center gap-3 bg-white text-blue-700 font-bold text-lg px-10 py-4 rounded-2xl shadow-float hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <span>Ver Menu</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 40C360 80 720 0 1080 40C1260 60 1380 80 1440 80V100H0V40Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="text-primary font-semibold text-sm uppercase tracking-widest">
              Lo que ofrecemos
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-3">
              Nuestros Servicios
            </motion.h2>
            <motion.div variants={fadeInUp} className="w-20 h-1.5 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mt-5" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-8"
          >
            {services.map((service) => (
              <motion.div key={service.title} variants={fadeInUp}>
                <Card hover className="relative overflow-hidden group h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <div className={`w-16 h-16 ${service.iconBg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className={`w-8 h-8 ${service.iconColor}`} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-900">{service.title}</h3>
                    <div className={`inline-flex items-center gap-1.5 ${service.bgLight} px-3 py-1 rounded-full mb-4`}>
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-semibold text-gray-600">{service.schedule}</span>
                    </div>
                    <p className="text-gray-500 leading-relaxed">{service.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Items Carousel */}
      {featured.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={stagger}
              className="text-center mb-12"
            >
              <motion.span variants={fadeInUp} className="text-accent font-semibold text-sm uppercase tracking-widest">
                Lo mas popular
              </motion.span>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-3">
                Platos Destacados
              </motion.h2>
              <motion.div variants={fadeInUp} className="w-20 h-1.5 bg-gradient-to-r from-accent to-primary rounded-full mx-auto mt-5" />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {featured.slice(0, 8).map((item: any) => (
                <motion.div key={item.id} variants={fadeInUp}>
                  <div className="bg-white rounded-2xl shadow-card border border-gray-100/50 overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group">
                    <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <UtensilsCrossed className="w-10 h-10 text-gray-300 group-hover:scale-110 transition-transform" />
                      <span className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        Destacado
                      </span>
                      {item.period && (
                        <span className="absolute top-2 right-2 bg-white/90 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full">
                          {item.period.display_name}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-1">{item.menu_item?.name}</h3>
                      <p className="text-gray-400 text-xs line-clamp-2 mb-3">{item.menu_item?.description}</p>
                      <p className="text-xl font-extrabold text-primary">{formatPrice(item.price)}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mt-10"
            >
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                Ver menu completo <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="text-accent font-semibold text-sm uppercase tracking-widest">
              Simple y rapido
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-3">
              Como Funciona
            </motion.h2>
            <motion.div variants={fadeInUp} className="w-20 h-1.5 bg-gradient-to-r from-accent to-primary rounded-full mx-auto mt-5" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {steps.map((step, index) => (
              <motion.div key={step.title} variants={fadeInUp} className="text-center group">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-700 rounded-2xl flex items-center justify-center shadow-glow group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <span className="text-3xl font-extrabold text-white">{index + 1}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mt-16"
          >
            <Link
              href="/menu"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-blue-700 text-white font-bold text-lg px-10 py-4 rounded-2xl shadow-glow hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <span>Ordenar Ahora</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.span variants={fadeInUp} className="text-primary font-semibold text-sm uppercase tracking-widest">
              Opiniones
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-3">
              Lo que dicen nuestros clientes
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={fadeInUp}>
                <Card className="h-full">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                  <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
