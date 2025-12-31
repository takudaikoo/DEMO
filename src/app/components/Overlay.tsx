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
        { id: 0, label: 'ホームページ', icon: Monitor, sub: 'WEBインターフェース' },
        { id: 1, label: 'ECサイト', icon: ShoppingCart, sub: 'コマースロジック' },
        { id: 2, label: 'データベース', icon: Database, sub: 'システム統合' },
    ]

    return (
        <div className={styles.container}>
            {/* Header */}
            <header className={styles.header}>
                <div>
                    <h1 className={styles.titleMain}>NEX-SEPIA</h1>
                    <p className={styles.titleSub}>フロー・デモンストレーション</p>
                </div>
                <div className={styles.versionTag}>
                    Ver. 1.0.0 // デモビルド
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
                    <p>描画エンジン: THREE.JS</p>
                    <p>システムステータス: オンライン</p>
                    <p>FPS: 60 (制限)</p>
                </div>
            </footer>
        </div>
    )
}
