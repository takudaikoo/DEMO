'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, Noise, ChromaticAberration } from '@react-three/postprocessing'
import HPVisual from './visuals/HPVisual'
import ECVisual from './visuals/ECVisual'
import DBVisual from './visuals/DBVisual'
import { Suspense } from 'react'

export default function Scene({ mode }: { mode: number }) {
    return (
        <div className="w-full h-full absolute top-0 left-0 -z-10">
            <Canvas dpr={1} gl={{ antialias: false }}>
                <PerspectiveCamera makeDefault position={[0, 0, 12]} />
                <color attach="background" args={['#030303']} />

                <Suspense fallback={null}>
                    <group visible={mode === 0}>
                        {mode === 0 && <HPVisual />}
                    </group>
                    <group visible={mode === 1}>
                        {mode === 1 && <ECVisual />}
                    </group>
                    <group visible={mode === 2}>
                        {mode === 2 && <DBVisual />}
                    </group>
                </Suspense>

                <EffectComposer>
                    <Bloom luminanceThreshold={0.2} intensity={1.2} radius={0.5} levels={9} />
                    <Noise opacity={0.05} />
                    <Vignette eskil={false} offset={0.1} darkness={1.1} />
                    <ChromaticAberration offset={[0.002, 0.002]} />
                </EffectComposer>

                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={10} />
                <pointLight position={[-10, -10, -10]} intensity={5} color="blue" />

                {/* Helper Controls */}
                <OrbitControls makeDefault />
            </Canvas>
        </div>
    )
}
