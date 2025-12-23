'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Star, Heart, ArrowRight } from 'lucide-react'
import { useRef, useState } from 'react'
import Image from 'next/image'

export default function ServicePage() {
    const [cartCount, setCartCount] = useState(2)
    const [flyingItems, setFlyingItems] = useState<{ id: number, x: number, y: number, img: string }[]>([])
    const gridRef = useRef<HTMLDivElement>(null)

    // Product Data
    const products = [
        { id: 1, name: "STEALTH BIKE", price: "$ 12,999", tag: "NEW", img: "/ec_bike.png" },
        { id: 2, name: "GRAND PIANO X", price: "$ 58,000", tag: "PREMIUM", img: "/ec_piano.png" },
        { id: 3, name: "DESIGN BIBLE", price: "$ 45", tag: "BESTSELLER", img: "/ec_book.png" },
        { id: 4, name: "DEV TERMINAL", price: "$ 2,400", tag: "SALE", img: "/ec_code.png" },
    ]

    // Scroll to Grid
    const handleShopNow = () => {
        gridRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    // Effect: Flying Items
    const handleViewAll = () => {
        // Create a batch of flying items from all product positions
        const newItems: { id: number, x: number, y: number, img: string }[] = []

        // Simple "burst" simulation: we will spawn 20 particles from random positions in the grid area 
        // and fly them to top-right
        for (let i = 0; i < 20; i++) {
            const randomProduct = products[i % 4]
            // Random start pos roughly in window center/bottom
            newItems.push({
                id: Date.now() + i,
                x: Math.random() * 80 + 10, // 10-90vw
                y: Math.random() * 50 + 40, // 40-90vh
                img: randomProduct.img
            })
        }
        setFlyingItems(newItems)
    }

    // On animation limit reached for a particle (it reached the cart)
    const onParticleFinish = (id: number) => {
        setFlyingItems(prev => prev.filter(item => item.id !== id))
        setCartCount(prev => prev + 1)
    }

    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white overflow-hidden relative pt-24">

            {/* Floating Particles Overlay */}
            <div className="fixed inset-0 pointer-events-none z-50">
                <AnimatePresence>
                    {flyingItems.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{
                                left: `${item.x}vw`,
                                top: `${item.y}vh`,
                                scale: 0.5,
                                opacity: 1
                            }}
                            animate={{
                                left: '95vw', // Approx cart position
                                top: '2vh',
                                scale: 0.1,
                                opacity: 0,
                                rotate: 360
                            }}
                            transition={{
                                duration: 0.8 + Math.random() * 0.5,
                                ease: "backIn"
                            }}
                            onAnimationComplete={() => onParticleFinish(item.id)}
                            className="absolute w-20 h-20 rounded-full overflow-hidden shadow-lg border-2 border-white"
                        >
                            <Image src={item.img} alt="" fill className="object-cover" />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Top Runner (Fixed) */}
            <div className="fixed top-0 left-0 w-full bg-black text-white text-xs text-center py-2 tracking-widest uppercase z-[70]">
                Free Shipping on all orders over $500 // Limited Time Offer
            </div>

            {/* Nav (Fixed) */}
            <nav className="fixed top-8 left-0 w-full bg-white/90 backdrop-blur-md z-[60] px-8 py-6 border-b border-gray-100 flex items-center justify-between transition-all">
                <div className="text-xl font-bold tracking-tighter">DEMO SERVICE</div>
                <div className="hidden md:flex gap-8 text-sm font-medium text-gray-500">
                    <a href="#" className="text-black">New Arrivals</a>
                    <a href="#" className="hover:text-black transition-colors">Apparel</a>
                    <a href="#" className="hover:text-black transition-colors">Accessories</a>
                    <a href="#" className="hover:text-black transition-colors">Tech</a>
                </div>
                <motion.div
                    className="flex gap-4 relative"
                    animate={{ scale: cartCount > 2 ? [1, 1.5, 1] : 1 }}
                    key={cartCount} // Trigger animation on count change
                >
                    <ShoppingCart className="w-5 h-5" />
                    <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold">
                        {cartCount}
                    </div>
                </motion.div>
            </nav>

            {/* Hero */}
            <div className="relative h-[60vh] bg-gray-100 overflow-hidden flex items-center justify-center mt-2">
                <div className="absolute inset-0 grid grid-cols-2">
                    <div className="bg-[#f0f0f0]"></div>
                    <div className="bg-[#e5e5e5]"></div>
                </div>
                <div className="relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-9xl font-black tracking-tighter mb-4 opacity-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none">
                            SPRING COLLECTION
                        </h1>
                        <h2 className="text-6xl font-bold mb-6 tracking-tight relative z-20">
                            NEXT GENERATION<br />WEAR
                        </h2>
                        <button
                            onClick={handleShopNow}
                            className="bg-black text-white px-8 py-3 rounded-full font-medium hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
                        >
                            SHOP NOW <ArrowRight size={16} />
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Product Grid */}
            <div ref={gridRef} className="max-w-7xl mx-auto px-8 py-20 bg-white scroll-mt-24">
                <div className="flex justify-between items-end mb-12">
                    <h3 className="text-2xl font-bold">LATEST DROPS</h3>
                    <button
                        onClick={handleViewAll}
                        className="text-sm border-b border-black pb-1 hover:text-blue-600 hover:border-blue-600 transition-colors"
                    >
                        View All (Demo Animation)
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {products.map((p) => (
                        <div key={p.id} className="group cursor-pointer">
                            <div className="relative aspect-[3/4] bg-gray-100 mb-4 overflow-hidden rounded-md border border-gray-100 shadow-sm transition-all hover:shadow-xl">
                                {p.tag && (
                                    <span className="absolute top-3 left-3 bg-white px-2 py-1 text-[10px] font-bold tracking-wider z-20 shadow-sm">
                                        {p.tag}
                                    </span>
                                )}
                                <div className="absolute top-3 right-3 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-sm">
                                    <Heart size={14} />
                                </div>

                                {/* Product Image */}
                                <div className="w-full h-full p-4 group-hover:scale-105 transition-transform duration-500 relative">
                                    <Image
                                        src={p.img}
                                        alt={p.name}
                                        fill
                                        className="object-contain p-4 mix-blend-multiply"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-bold text-sm mb-1">{p.name}</h4>
                                    <p className="text-xs text-gray-500">Premium Series</p>
                                </div>
                                <p className="font-medium text-sm">{p.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Banner */}
            <div className="bg-black text-white py-24 px-8 text-center sticky bottom-0 -z-10">
                <h3 className="text-4xl font-bold mb-6">JOIN THE MEMBERSHIP</h3>
                <p className="space-y-4 max-w-md mx-auto text-gray-400 mb-8">
                    Get exclusive access to new drops, special events, and member-only sales.
                </p>
                <div className="flex max-w-sm mx-auto border-b border-white pb-2">
                    <input type="email" placeholder="ENTER ADDRESS" className="bg-transparent flex-1 outline-none text-white placeholder-gray-500" />
                    <button className="text-sm font-bold">SUBSCRIBE</button>
                </div>
            </div>
        </div>
    )
}
