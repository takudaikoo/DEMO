'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Monitor, ShoppingCart, Database } from 'lucide-react'
import styles from './Overlay.module.css'

interface OverlayProps {
    mode: number
    setMode: (m: number) => void
}

export default function Overlay({ mode, setMode }: OverlayProps) {
    const scenes = [
        { id: 0, label: 'HOMEPAGE', icon: Monitor, sub: 'WEB INTERFACE' },
        { id: 1, label: 'EC SITE', icon: ShoppingCart, sub: 'COMMERCE LOGIC' },
        { id: 2, label: 'DATABASE', icon: Database, sub: 'SYSTEM INTEGRATION' },
    ]

    return (
        <div className={styles.container}>
            {/* Header */}
            <header className={styles.header}>
                <div>
                    <h1 className={styles.titleMain}>NEX-SEPIA</h1>
                    <p className={styles.titleSub}>FLOW DEMONSTRATION</p>
                </div>
                <div className={styles.versionTag}>
                    VER. 1.0.0 // DEMO BUILD
                </div>
            </header>

            {/* Center Label (Animated) */}
            <AnimatePresence mode='wait'>
                <motion.div
                    key={mode}
                    className={styles.centerLabel}
                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className={styles.hugeText}>
                        {scenes[mode].label}
                    </h2>
                </motion.div>
            </AnimatePresence>

            {/* Footer Controls */}
            <footer className={styles.footer}>
                <div className={styles.controls}>
                    {scenes.map((scene) => (
                        <button
                            key={scene.id}
                            onClick={() => setMode(scene.id)}
                            className={`${styles.button} ${mode === scene.id ? styles.buttonActive : ''}`}
                        >
                            <scene.icon size={20} strokeWidth={1.5} />
                            <div className={styles.btnText}>
                                <div className={styles.btnSub}>{scene.sub}</div>
                                <div className={styles.btnLabel}>{scene.label}</div>
                            </div>
                        </button>
                    ))}
                </div>

                <div className={styles.status}>
                    <p>RENDER_ENGINE: THREE.JS</p>
                    <p>SYSTEM_STATUS: ONLINE</p>
                    <p>FPS: 60 (CAP)</p>
                </div>
            </footer>
        </div>
    )
}
