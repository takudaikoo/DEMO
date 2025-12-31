'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle } from 'lucide-react'

export default function SuccessPage() {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
            <div className="text-center">
                <div className="flex justify-center mb-6">
                    <CheckCircle className="text-green-500 w-24 h-24" />
                </div>
                <h1 className="text-3xl font-bold mb-4">決済完了</h1>
                <p className="text-neutral-400 mb-8">ご購入ありがとうございます。確認メールを送信しました。</p>
                <button
                    onClick={() => router.push('/')}
                    className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-colors"
                >
                    ホームへ戻る
                </button>
            </div>
        </div>
    )
}
