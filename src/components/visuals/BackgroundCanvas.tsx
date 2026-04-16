"use client"

import * as React from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"
// @ts-expect-error maath types are not available
import * as random from "maath/random/dist/maath-random.esm"
import { useTheme } from "next-themes"

interface StarFieldProps {
    [key: string]: unknown
}

function StarField(props: StarFieldProps) {
    const ref = React.useRef<THREE.Points>(null)
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === "dark"

    const [sphere] = React.useState(() => random.inSphere(new Float32Array(9000), { radius: 1.5 }))
    const [distantStars] = React.useState(() => random.inSphere(new Float32Array(3000), { radius: 2.5 }))

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 15
            ref.current.rotation.y -= delta / 20
        }
    })

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color={isDark ? "#8b5cf6" : "#6d28d9"}
                    size={0.003}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
            <Points positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color={isDark ? "#3b82f6" : "#2563eb"}
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
            <Points positions={distantStars} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color={isDark ? "#ffffff" : "#000000"}
                    size={0.001}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={isDark ? 0.4 : 0.2}
                />
            </Points>
        </group>
    )
}

export function BackgroundCanvas() {
    const [mounted, setMounted] = React.useState(false)
    const [isVisible, setIsVisible] = React.useState(true)
    const containerRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        setMounted(true)

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0 }
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => observer.disconnect()
    }, [])

    if (!mounted) return null

    return (
        <div ref={containerRef} className="absolute inset-0 -z-10 h-full w-full">
            <Canvas 
                camera={{ position: [0, 0, 1] }}
                frameloop={isVisible ? "always" : "demand"}
                dpr={[1, 2]}
            >
                <React.Suspense fallback={null}>
                    <StarField />
                </React.Suspense>
            </Canvas>
        </div>
    )
}
