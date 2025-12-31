'use client'

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useCart } from '../../context/CartContext'
import { motion } from 'framer-motion'
import { ShoppingCart, ArrowLeft } from 'lucide-react'

export default function ProductPage() {
    const router = useRouter()
    const { addItem, items } = useCart()

    // Mock Product Data
    const product = {
        id: '1',
        name: 'プレミアム3Dモデル',
        price: 9999,
        description: '次世代の3Dコマース体験を提供する、高品質なデジタルアセットです。',
    }

    const handleAddToCart = () => {
        addItem({ ...product, quantity: 1 })
    }

    const handleCheckout = () => {
        router.push('/checkout')
    }

    // Check if item is already in cart
    const isInCart = items.some((item) => item.id === product.id)

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl w-full bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
                {/* Visual Section */}
                <div className="md:w-1/2 h-64 md:h-auto bg-gradient-to-br from-indigo-900 to-black flex items-center justify-center p-8 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                    <div className="w-32 h-32 md:w-48 md:h-48 rounded-xl bg-indigo-500 shadow-[0_0_50px_rgba(99,102,241,0.5)] flex items-center justify-center transform rotate-12">
                        <span className="text-4xl">💎</span>
                    </div>
                </div>

                {/* Info Section */}
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <button
                        onClick={() => router.push('/')}
                        className="flex items-center text-sm text-neutral-400 hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft size={16} className="mr-2" />
                        ホームへ戻る
                    </button>

                    <h1 className="text-3xl md:text-4xl font-bold mb-4 font-tracking-tight">{product.name}</h1>
                    <p className="text-neutral-400 mb-8 leading-relaxed">
                        {product.description}
                    </p>

                    <div className="text-3xl font-bold mb-8 text-indigo-400">
                        ¥{product.price.toLocaleString()}
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={handleAddToCart}
                            className="w-full py-4 bg-white text-black font-bold rounded-lg hover:bg-neutral-200 transition-colors flex items-center justify-center"
                        >
                            <ShoppingCart size={20} className="mr-2" />
                            {isInCart ? 'カートに追加済み (さらに追加)' : 'カートに追加'}
                        </button>

                        {items.length > 0 && (
                            <button
                                onClick={handleCheckout}
                                className="w-full py-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20"
                            >
                                購入手続きへ進む
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
