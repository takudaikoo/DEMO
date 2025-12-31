'use client'
import { Float, Text, Grid } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export default function HPVisual() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Main Interface Board */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[6, 4, 0.2]} />
          <meshPhysicalMaterial
            color="#001aff"
            transmission={0.9}
            opacity={0.5}
            metalness={0.8}
            roughness={0.2}
            ior={1.5}
            thickness={2}
            transparent
          />
        </mesh>

        <Text
          position={[-2.5, 1.5, 0.15]}
          fontSize={0.3}
          color="white"
          anchorX="left"
        >
          デモ ホームページ
        </Text>

        {/* Abstract UI Elements */}
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh key={i} position={[Math.random() * 4 - 2, Math.random() * 2 - 1, 0.3 + Math.random()]}>
            <planeGeometry args={[1, 0.2]} />
            <meshBasicMaterial color="#00aaff" wireframe />
          </mesh>
        ))}

        {/* Connecting Lines */}
        <Grid position={[0, -2, 0]} args={[10, 10]} cellColor="white" sectionColor="#001aff" fadeDistance={10} />
      </Float>

      {/* Background Particles */}
      <points>
        <sphereGeometry args={[10, 64, 64]} />
        <pointsMaterial size={0.02} color="#4488ff" transparent opacity={0.4} />
      </points>
    </group>
  )
}
