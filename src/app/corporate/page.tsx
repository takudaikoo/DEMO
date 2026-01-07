'use client'
import { Canvas } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Suspense } from 'react'
import Image from 'next/image'

function Background() {
    return (
        <group>
            <mesh position={[0, 0, -5]}>
                <planeGeometry args={[20, 10]} />
                <meshBasicMaterial color="#050505" />
            </mesh>
            <Float floatIntensity={2} speed={1}>
                <mesh position={[2, 1, -2]} rotation={[0.5, 0.5, 0]}>
                    <torusKnotGeometry args={[1, 0.3, 100, 16]} />
                    <meshStandardMaterial color="#333" wireframe />
                </mesh>
            </Float>
            <Float floatIntensity={1} speed={0.5}>
                <mesh position={[-3, -1, -3]} rotation={[0.2, 0.2, 0]}>
                    <icosahedronGeometry args={[1.5, 1]} />
                    <meshStandardMaterial color="#111" wireframe transparent opacity={0.3} />
                </mesh>
            </Float>

            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        </group>
    )
}

export default function CorporatePage() {
    return (
        <div className="w-full h-screen bg-black text-white font-sans overflow-hidden">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <Canvas>
                    <Suspense fallback={null}>
                        <Background />
                    </Suspense>
                </Canvas>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full overflow-y-auto no-scrollbar scroll-smooth">
                {/* Header */}
                <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center bg-black/50 backdrop-blur-md z-50 border-b border-white/5">
                    <h1 className="text-2xl font-bold tracking-widest uppercase">株式会社デモ</h1>
                    <nav className="flex gap-8 text-sm tracking-widest opacity-70">
                        <a href="#about" className="hover:text-white transition-colors">会社概要</a>
                        <a href="#careers" className="hover:text-white transition-colors">採用情報</a>
                        <a href="#contact" className="hover:text-white transition-colors">お問い合わせ</a>
                    </nav>
                </header>

                <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
                    {/* Hero */}
                    <section className="h-[80vh] flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <p className="text-sm tracking-[0.5em] text-gray-400 mb-4">未来へのイノベーション</p>
                            <h2 className="text-8xl font-black leading-tight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                                REDEFINING<br />
                                POSSIBILITIES
                            </h2>
                            <p className="max-w-xl text-gray-400 leading-relaxed text-lg">
                                私たち株式会社デモは、明日のデジタルバックボーンを構築します。<br />
                                シームレスな統合から圧倒的な映像体験まで、<br />
                                私たちは新しいWebのスタンダードを設計するアーキテクトです。
                            </p>

                            <button className="mt-12 px-8 py-3 border border-white text-sm tracking-widest hover:bg-white hover:text-black transition-colors duration-300">
                                ビジョンを見る
                            </button>
                        </motion.div>
                    </section>

                    {/* About Section */}
                    <section id="about" className="min-h-[60vh] flex items-center gap-12 border-t border-gray-800 pt-20 mb-32">
                        <div className="w-1/2">
                            <h3 className="text-4xl font-bold mb-6">グローバルスケール</h3>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                世界25拠点に広がるネットワークは、私たちのビジョンの広がりそのものです。<br />
                                セキュリティを核に、デザインを最前線に置き、<br />
                                瞬時に拡張するソリューションを展開しています。
                            </p>
                            <div className="grid grid-cols-2 gap-8 mt-12">
                                <div>
                                    <div className="text-4xl font-bold text-blue-500 mb-2">25+</div>
                                    <div className="text-xs tracking-widest text-gray-500">グローバル拠点</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold text-blue-500 mb-2">500M</div>
                                    <div className="text-xs tracking-widest text-gray-500">1日のリクエスト数</div>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2 h-80 bg-gradient-to-br from-gray-900 to-black border border-gray-800 flex items-center justify-center relative overflow-hidden rounded-lg">
                            <div className="absolute inset-0 bg-[#001133] opacity-20"></div>
                            {/* "Fake" 3D or Image placeholder */}
                            <div className="w-3/4 h-3/4 border border-blue-500/30 rounded-full animate-pulse"></div>
                            <div className="absolute text-center">
                                <p className="text-xs tracking-[0.3em] font-mono">SYSTEM_STATUS: OPTIMAL</p>
                            </div>
                        </div>
                    </section>

                    {/* Careers / CEO Message Section */}
                    <section id="careers" className="py-32 border-t border-gray-800">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="flex gap-16 items-start"
                        >
                            {/* Lion CEO Image */}
                            <div className="w-1/3 relative aspect-[3/4] rounded-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                                <Image
                                    src="/ceo_lion.png"
                                    alt="CEO Portrait"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                                    <div className="text-xl font-bold tracking-widest">LEONIDAS KING</div>
                                    <div className="text-xs text-gray-400 tracking-[0.2em]">代表取締役</div>
                                </div>
                            </div>

                            {/* CEO Bio */}
                            <div className="w-2/3 pt-8">
                                <p className="text-xs tracking-[0.3em] text-blue-500 mb-6">代表メッセージ</p>
                                <h3 className="text-5xl font-bold leading-tight mb-12">
                                    "デジタルにも<br />ジャングルの掟を。"
                                </h3>

                                <div className="space-y-8 text-gray-400 leading-relaxed font-light border-l border-gray-800 pl-8">
                                    <div>
                                        <div className="text-white font-bold mb-2 tracking-widest text-sm">2015 - 設立</div>
                                        <p>株式会社デモを設立。「捕食的イノベーション」を理念に掲げ、デジタルランドスケープの変革に着手。</p>
                                    </div>
                                    <div>
                                        <div className="text-white font-bold mb-2 tracking-widest text-sm">2018 - グローバル展開</div>
                                        <p>主要テック企業3社の買収を主導し、アジア・欧州市場へ進出。Tech分野で「Top Apex Predator」賞を受賞。</p>
                                    </div>
                                    <div>
                                        <div className="text-white font-bold mb-2 tracking-widest text-sm">2023 - AI インテグレーション</div>
                                        <p>全サービスへの生成AI統合を先駆けて完了。群れをリードする存在としての地位を確立しました。</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </section>

                    {/* Contact Section */}
                    <section id="contact" className="py-32 border-t border-gray-800 flex justify-center">
                        <div className="w-full max-w-2xl bg-[#0a0a0a] p-12 border border-gray-800 rounded-2xl relative overflow-hidden group">
                            {/* Decorative gradient blob */}
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/20 blur-[100px] pointer-events-none group-hover:bg-blue-600/30 transition-colors"></div>

                            <div className="text-center mb-12">
                                <h3 className="text-3xl font-bold mb-4">お問い合わせ</h3>
                                <p className="text-gray-500 text-sm">新たなプロジェクトのご提案をお待ちしております。</p>
                            </div>

                            <form className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs tracking-widest text-gray-500">名</label>
                                        <input type="text" className="w-full bg-[#111] border border-gray-800 p-4 text-sm focus:border-white outline-none transition-colors rounded" placeholder="太郎" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs tracking-widest text-gray-500">姓</label>
                                        <input type="text" className="w-full bg-[#111] border border-gray-800 p-4 text-sm focus:border-white outline-none transition-colors rounded" placeholder="山田" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs tracking-widest text-gray-500">メールアドレス</label>
                                    <input type="email" className="w-full bg-[#111] border border-gray-800 p-4 text-sm focus:border-white outline-none transition-colors rounded" placeholder="taro@example.com" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs tracking-widest text-gray-500">メッセージ</label>
                                    <textarea rows={6} className="w-full bg-[#111] border border-gray-800 p-4 text-sm focus:border-white outline-none transition-colors rounded resize-none" placeholder="プロジェクトの詳細をお聞かせください..."></textarea>
                                </div>

                                <button type="button" className="w-full bg-white text-black font-bold tracking-widest py-4 hover:bg-gray-200 transition-colors uppercase text-sm mt-4">
                                    送信する
                                </button>
                            </form>
                        </div>
                    </section>
                </main>

                <footer className="border-t border-gray-800 py-12 text-center text-xs text-gray-600 tracking-widest">
                    © 2025 DEMO LTD. CORPORATE. ALL RIGHTS RESERVED.
                </footer>
            </div>
        </div>
    )
}
