'use client'
import { Text, Instances, Instance, OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function Particles({ count = 1000 }) {
    const mesh = useRef<THREE.InstancedMesh>(null)
    const dummy = useMemo(() => new THREE.Object3D(), [])

    // Random positions
    const particles = useMemo(() => {
        return Array.from({ length: count }).map(() => ({
            t: Math.random() * 100,
            factor: 20 + Math.random() * 100,
            speed: 0.01 + Math.random() / 200,
            xFactor: -50 + Math.random() * 100,
            yFactor: -50 + Math.random() * 100,
            zFactor: -50 + Math.random() * 100,
        }))
    }, [count])

    useFrame((state, delta) => {
        if (!mesh.current) return
        particles.forEach((data, i) => {
            data.t += data.speed
            // Lissajous curve-like movement for "data flow"
            dummy.position.set(
                Math.sin(data.t) * 10 + Math.cos(data.t * 2) * 5,
                Math.cos(data.t) * 10 + Math.sin(data.t * 3) * 5,
                Math.sin(data.t * 3) * 2 + Math.cos(data.t) * 15
            )
            dummy.rotation.x = Math.sin(data.t)
            dummy.scale.setScalar(Math.sin(data.t * 2) + 1.5)
            dummy.updateMatrix()
            mesh.current!.setMatrixAt(i, dummy.matrix)
        })
        mesh.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]} frustumCulled={false}>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshBasicMaterial color="#00ff88" wireframe />
        </instancedMesh>
    )
}

export default function DBVisual() {
    return (
        <group>
            <Particles count={2000} />
            <Text position={[0, 0, 0]} fontSize={1.5} color="#00ff88" anchorX="center" anchorY="middle">
                データベース
            </Text>
            <Text position={[0, -1.5, 0]} fontSize={0.5} color="#ffffff" anchorX="center" anchorY="middle">
                システム統合
            </Text>
        </group>
    )
}
