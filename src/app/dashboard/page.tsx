'use client'
import { motion, useSpring, useTransform, animate, AnimatePresence } from 'framer-motion'
import { Users, Activity, BarChart2, Shield, Search, MoreHorizontal, Bell, ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'

// Animated Number Component
function AnimatedNumber({ value, duration = 1, isFloat = false }: { value: number, duration?: number, isFloat?: boolean }) {
    const spring = useSpring(0, { duration: duration * 1000, bounce: 0 })
    const display = useTransform(spring, (current) =>
        isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString()
    )

    useEffect(() => {
        spring.set(value)
    }, [value, spring])

    return <motion.span>{display}</motion.span>
}

// Stat Card Component
function StatCard({
    label,
    startVal,
    endVal,
    unit = "",
    change,
    color,
    speed,
    isFlash = false
}: {
    label: string,
    startVal: number,
    endVal: number,
    unit?: string,
    change: string,
    color: string,
    speed: number,
    isFlash?: boolean
}) {
    const [currentVal, setCurrentVal] = useState(startVal)
    const [flashing, setFlashing] = useState(false)

    const handleClick = () => {
        if (isFlash) {
            setFlashing(true)
            setTimeout(() => {
                setCurrentVal(endVal)
                setFlashing(false)
            }, 200)
        } else {
            setCurrentVal(endVal)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-[#0f0f0f] border border-gray-800 p-6 rounded-lg hover:border-gray-700 transition-colors cursor-pointer select-none ${flashing ? 'bg-white' : ''}`}
            onClick={handleClick}
        >
            <div className={`text-[10px] tracking-widest mb-2 ${flashing ? 'text-black' : 'text-gray-500'}`}>{label}</div>
            <div className={`text-3xl font-bold font-sans flex items-baseline gap-1 ${flashing ? 'text-black' : color}`}>
                {isFlash ? (
                    <span>{currentVal}</span>
                ) : (
                    <AnimatedNumber value={currentVal} duration={speed} isFloat={unit === "TB"} />
                )}
                {unit && <span className="text-sm">{unit}</span>}
            </div>
            <div className={`text-xs mt-2 ${flashing ? 'text-black' : 'text-gray-600'}`}>{change} vs last week</div>
        </motion.div>
    )
}

// Analytics View Component
function AnalyticsView() {
    // Data points for the chart - Modified for upward trend (Bottom-Left to Top-Right)
    const lines = [
        // Green: Steady strong growth
        { color: "#10B981", data: [5, 12, 25, 30, 45, 50, 65, 75, 85, 95], delay: 0 },
        // Blue: Organic growth
        { color: "#3B82F6", data: [2, 8, 15, 20, 35, 40, 50, 60, 70, 80], delay: 0.2 },
        // Yellow: Volatile but growing
        { color: "#F59E0B", data: [0, 15, 10, 35, 30, 55, 45, 70, 65, 90], delay: 0.4 },
    ]

    return (
        <div className="h-full flex flex-col p-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white tracking-widest">REAL-TIME TRENDS</h2>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div> GROWTH
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div> TRAFFIC
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <div className="w-2 h-2 rounded-full bg-amber-500"></div> REQUESTS
                    </div>
                </div>
            </div>

            {/* Chart Container */}
            <div className="flex-1 bg-[#0f0f0f] border border-gray-800 rounded-lg p-6 relative overflow-hidden flex items-end">
                {/* Grid Lines */}
                <div className="absolute inset-0 z-0 flex flex-col justify-between p-6 opacity-20 pointer-events-none">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-full h-px bg-gray-700 border-t border-dashed border-gray-600"></div>
                    ))}
                </div>

                {/* SVG Chart */}
                <svg className="w-full h-full z-10 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {lines.map((line, i) => {
                        // Generate Path "d" attribute
                        // We map X from 0 to 100
                        // We map Y from 100 down to (100 - value)
                        const d = line.data.reduce((acc, val, idx) => {
                            const x = (idx / (line.data.length - 1)) * 100
                            const y = 100 - val
                            return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`
                        }, "")

                        return (
                            <motion.path
                                key={i}
                                d={d}
                                fill="none"
                                stroke={line.color}
                                strokeWidth="0.3"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5, ease: "easeOut", delay: line.delay }}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        )
                    })}
                </svg>
            </div>

            <div className="grid grid-cols-5 gap-4 mt-8">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="bg-[#111] border border-gray-800 p-4 rounded h-32 animate-pulse flex flex-col justify-end">
                        <div className="w-full bg-gray-900 rounded mb-2" style={{ height: `${20 + Math.random() * 60}%` }}></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function DashboardPage() {
    const [view, setView] = useState<'overview' | 'analytics'>('overview')

    const users = [
        { id: "USR-001", name: "ALEXANDER SMITH", role: "ADMIN", status: "ACTIVE", lastLogin: "10 min ago" },
        { id: "USR-002", name: "SARAH CONNOR", role: "EDITOR", status: "OFFLINE", lastLogin: "2 hours ago" },
        { id: "USR-003", name: "JOHN DOE", role: "VIEWER", status: "ACTIVE", lastLogin: "Just now" },
        { id: "USR-004", name: "KATE WINSLET", role: "VIEWER", status: "WARNING", lastLogin: "3 days ago" },
        { id: "USR-005", name: "MICHAEL BAY", role: "EDITOR", status: "ACTIVE", lastLogin: "1 hour ago" },
    ]

    const stats = [
        { label: "TOTAL USERS", start: 2964, end: 8942, speed: 0.8, color: "text-white", change: "+201%" },
        { label: "ACTIVE SESSIONS", start: 198, end: 421, speed: 1.5, color: "text-green-400", change: "+112%" },
        { label: "DATA USAGE", start: 0.9, end: 1.2, unit: "TB", speed: 3.0, color: "text-blue-400", change: "+33%" },
        { label: "SECURITY ALERTS", start: 5, end: 0, speed: 0, color: "text-gray-400", change: "-100%", isFlash: true }
    ]

    return (
        <div className="flex h-screen bg-[#0a0a0a] text-gray-300 font-mono overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 border-r border-gray-800 bg-[#050505] flex flex-col p-6 z-20">
                <div className="flex items-center gap-2 mb-10 text-white">
                    <Shield className="text-green-500" />
                    <span className="font-bold tracking-wider">SECURE_DB</span>
                </div>

                <nav className="flex flex-col gap-2 flex-1">
                    <button
                        onClick={() => setView('overview')}
                        className={`flex items-center gap-3 px-4 py-3 rounded transition-colors w-full ${view === 'overview' ? 'bg-white/5 text-white border border-white/10' : 'hover:bg-white/5'}`}
                    >
                        <Users size={18} />
                        <span className="text-sm">CUSTOMERS</span>
                    </button>
                    <button
                        onClick={() => setView('analytics')}
                        className={`flex items-center gap-3 px-4 py-3 rounded transition-colors w-full ${view === 'analytics' ? 'bg-white/5 text-white border border-white/10' : 'hover:bg-white/5'}`}
                    >
                        <Activity size={18} />
                        <span className="text-sm">ANALYTICS</span>
                    </button>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded transition-colors">
                        <BarChart2 size={18} />
                        <span className="text-sm">REPORTS</span>
                    </a>
                </nav>

                <div className="mt-auto pt-6 border-t border-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-green-500 to-emerald-700"></div>
                        <div className="text-xs">
                            <div className="text-white">ADMINISTRATOR</div>
                            <div className="text-green-500">Connected</div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                {/* Background Grid */}
                <div className="absolute inset-0 pointer-events-none opacity-5"
                    style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
                </div>

                {/* Header */}
                <header className="h-16 border-b border-gray-800 flex items-center justify-between px-8 bg-[#0a0a0a]/80 backdrop-blur-sm z-10">
                    <h1 className="font-bold text-white tracking-widest flex items-center gap-2">
                        {view === 'analytics' && <ArrowLeft className="cursor-pointer hover:text-green-500" onClick={() => setView('overview')} size={18} />}
                        CUSTOMER DATABASE // {view === 'overview' ? 'V.2.4' : 'ANALYTICS'}
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                            <input
                                type="text"
                                placeholder="SEARCH_QUERY..."
                                className="bg-black border border-gray-800 rounded-full pl-10 pr-4 py-1.5 text-xs focus:border-green-500 outline-none w-64 transition-colors"
                            />
                        </div>
                        <div className="p-2 border border-gray-800 rounded-full hover:bg-white/5 relative">
                            <Bell size={16} />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        </div>
                    </div>
                </header>

                {/* View Content */}
                <div className="flex-1 overflow-hidden relative z-10 w-full h-full">
                    <AnimatePresence mode="wait">
                        {view === 'overview' ? (
                            <motion.div
                                key="overview"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="absolute inset-0 overflow-auto p-8"
                            >
                                {/* Stats Row */}
                                <div className="grid grid-cols-4 gap-6 mb-8">
                                    {stats.map((stat, i) => (
                                        <StatCard
                                            key={i}
                                            label={stat.label}
                                            startVal={stat.start}
                                            endVal={stat.end}
                                            unit={stat.unit}
                                            change={stat.change}
                                            color={stat.color}
                                            speed={stat.speed}
                                            isFlash={stat.isFlash}
                                        />
                                    ))}
                                </div>

                                {/* Main Table */}
                                <div className="bg-[#0f0f0f] border border-gray-800 rounded-lg overflow-hidden">
                                    <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-[#0d0d0d]">
                                        <h2 className="text-sm font-bold text-white tracking-widest">RECENT ENTRIES</h2>
                                        <button
                                            onClick={() => setView('analytics')}
                                            className="text-xs text-green-500 border border-green-900 bg-green-900/10 px-3 py-1 rounded hover:bg-green-900/20 transition-colors"
                                        >
                                            EXPORT CSV
                                        </button>
                                    </div>
                                    <table className="w-full text-left text-xs">
                                        <thead>
                                            <tr className="border-b border-gray-800 text-gray-500 uppercase tracking-wider">
                                                <th className="px-6 py-3 font-medium">ID</th>
                                                <th className="px-6 py-3 font-medium">USER IDENTITY</th>
                                                <th className="px-6 py-3 font-medium">ROLE</th>
                                                <th className="px-6 py-3 font-medium">STATUS</th>
                                                <th className="px-6 py-3 font-medium">LAST ACTIVITY</th>
                                                <th className="px-6 py-3 font-medium"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((u, i) => (
                                                <motion.tr
                                                    key={u.id}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.3 + (i * 0.05) }}
                                                    className="border-b border-gray-800/50 hover:bg-white/[0.02] transition-colors group"
                                                >
                                                    <td className="px-6 py-4 font-mono text-gray-600">{u.id}</td>
                                                    <td className="px-6 py-4 font-bold text-white">{u.name}</td>
                                                    <td className="px-6 py-4">
                                                        <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-[10px] border border-gray-700">{u.role}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className={`w-1.5 h-1.5 rounded-full ${u.status === 'ACTIVE' ? 'bg-green-500 animate-pulse' : u.status === 'WARNING' ? 'bg-orange-500' : 'bg-gray-500'}`}></div>
                                                            <span className={u.status === 'ACTIVE' ? 'text-green-500' : u.status === 'WARNING' ? 'text-orange-500' : 'text-gray-500'}>{u.status}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-500">{u.lastLogin}</td>
                                                    <td className="px-6 py-4 text-right">
                                                        <MoreHorizontal size={16} className="ml-auto text-gray-600 cursor-pointer hover:text-white" />
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="analytics"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="absolute inset-0"
                            >
                                <AnalyticsView />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    )
}
