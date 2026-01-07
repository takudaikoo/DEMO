'use client'

import React, { useState } from 'react'
import { useCart } from '../context/CartContext'


export default function CheckoutPage() {
    const { items, totalAmount } = useCart()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
    })

    // Disable checkout if cart is empty
    const isCartEmpty = items.length === 0

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch('/api/checkout_session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items,
                    customerEmail: formData.email,
                    customerName: formData.name,
                }),
            })

            const { sessionId, url, error } = await response.json()

            if (error) {
                throw new Error(error)
            }

            if (url) {
                window.location.href = url
            } else {
                throw new Error('決済用URLが取得できませんでした')
            }
        } catch (err: any) {
            console.error('Checkout Error:', err)
            alert('決済の開始に失敗しました: ' + err.message)
        } finally {
            setLoading(false)
        }
    }

    if (isCartEmpty) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">カートは空です</h1>
                    <a href="/" className="text-indigo-400 hover:text-indigo-300">ホームへ戻る</a>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* Order Summary */}
                <div className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800">
                    <h2 className="text-2xl font-bold mb-6">注文内容</h2>
                    <div className="space-y-4 mb-6">
                        {items.map((item) => (
                            <div key={item.id} className="flex justify-between py-4 border-b border-neutral-800">
                                <div>
                                    <p className="font-bold">{item.name}</p>
                                    <p className="text-sm text-neutral-400">数量: {item.quantity}</p>
                                </div>
                                <p>¥{item.price.toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-xl font-bold pt-4 border-t border-neutral-700">
                        <span>合計</span>
                        <span>¥{totalAmount.toLocaleString()}</span>
                    </div>
                </div>

                {/* Checkout Form */}
                <div>
                    <h2 className="text-2xl font-bold mb-6">購入者情報</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">お名前</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 focus:outline-none focus:border-indigo-500 transition-colors"
                                placeholder="山田 太郎"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">メールアドレス</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 focus:outline-none focus:border-indigo-500 transition-colors"
                                placeholder="taro@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-400 mb-2">住所</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 focus:outline-none focus:border-indigo-500 transition-colors"
                                placeholder="東京都渋谷区..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 text-white font-bold rounded-lg shadow-lg flex items-center justify-center transition-all
                        ${loading ? 'bg-neutral-600 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20'}
                    `}
                        >
                            {loading ? '処理中...' : '決済へ進む'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
