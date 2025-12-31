'use client'
import { Float, Text, useGLTF, RoundedBox, useCursor } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three'

export default function ECVisual() {
    const carouselRef = useRef<THREE.Group>(null)
    const [hovered, setHover] = useState<number | null>(null)
    useCursor(hovered !== null)

    useFrame((state) => {
        if (carouselRef.current) {
            carouselRef.current.rotation.y += 0.005
        }
    })

    // Mock Products
    const products = Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2
        const radius = 3.5
        return {
            id: i,
            position: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius],
            color: new THREE.Color().setHSL(Math.random(), 0.8, 0.5),
            isTarget: i === 3, // Leftmost item
        }
    })

    const handleClick = (i: number) => {
        if (i === 3) {
            window.location.href = '/product/1'
        }
    }

    return (
        <group>
            <group ref={carouselRef}>
                {products.map((p, i) => (
                    <group
                        key={i}
                        position={p.position as [number, number, number]}
                        onClick={(e) => {
                            e.stopPropagation()
                            handleClick(i)
                        }}
                        onPointerOver={(e) => {
                            e.stopPropagation()
                            if (p.isTarget) setHover(i)
                        }}
                        onPointerOut={(e) => {
                            e.stopPropagation()
                            if (p.isTarget) setHover(null)
                        }}
                    >
                        <Float speed={5} rotationIntensity={1} floatIntensity={1}>
                            <RoundedBox args={[1.5, 2, 0.2]} radius={0.1} smoothness={4}>
                                <meshStandardMaterial
                                    color={hovered === i ? '#ff0088' : p.color}
                                    emissive={hovered === i ? '#ff0088' : 'black'}
                                    emissiveIntensity={hovered === i ? 0.5 : 0}
                                    metalness={0.6}
                                    roughness={0.2}
                                />
                            </RoundedBox>
                            <Text position={[0, -1.3, 0]} fontSize={0.3} color="white">
                                商品 #{i + 1}
                            </Text>
                            <Text position={[0, -1.6, 0]} fontSize={0.25} color="#88ddff">
                                ¥9,999
                            </Text>
                            {p.isTarget && (
                                <Text position={[0, 1.2, 0]} fontSize={0.2} color="#ff0088">
                                    クリックで購入
                                </Text>
                            )}
                        </Float>
                    </group>
                ))}
            </group>

            <Text position={[0, 2.5, 0]} fontSize={0.8} color="white" font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff">
                Eコマース
            </Text>
        </group>
    )
}
