'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Monitor, ShoppingCart, Database } from 'lucide-react'

export default function Home() {
  const demos = [
    {
      path: '/corporate',
      title: 'CORPORATE SITE',
      desc: 'High-end branding, 3D Typography, Smooth Scroll',
      icon: Monitor,
      color: 'from-blue-600 to-indigo-900'
    },
    {
      path: '/service',
      title: 'EC / SERVICE',
      desc: 'Product Grid, Modern Retail Interface, Clean Design',
      icon: ShoppingCart,
      color: 'from-emerald-500 to-teal-900'
    },
    {
      path: '/dashboard',
      title: 'CUSTOMER DB',
      desc: 'Data Dense, Admin Panel, Real-time Status',
      icon: Database,
      color: 'from-orange-600 to-red-900'
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-8 selection:bg-white selection:text-black">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-6xl font-black mb-4 tracking-tighter">DEMO SUITE</h1>
        <p className="text-gray-400 max-w-lg mx-auto">
          Select a demonstration module below. These environments are simulated to represent production-grade video assets.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        {demos.map((d, i) => (
          <Link href={d.path} key={d.path} className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 hover:border-white/30 transition-all duration-300">
            <div className={`absolute inset-0 bg-gradient-to-br ${d.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
            <div className="p-8 h-full flex flex-col">
              <div className="mb-6 p-4 bg-white/5 w-fit rounded-xl border border-white/5 group-hover:scale-110 transition-transform">
                <d.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-2 tracking-wide">{d.title}</h3>
              <p className="text-sm text-gray-400 mb-8 flex-1 leading-relaxed">
                {d.desc}
              </p>
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase group-hover:gap-4 transition-all">
                Launch Demo <ArrowRight size={14} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <footer className="fixed bottom-8 text-xs text-gray-600 tracking-widest">
        NEX-SEPIA // VIDEO ASSET GENERATOR
      </footer>
    </div>
  )
}
