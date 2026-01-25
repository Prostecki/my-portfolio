"use client"

import * as React from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm"
import { useTheme } from "next-themes"

function StarField(props: any) {
    const ref = React.useRef<any>(null)
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

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="absolute inset-0 -z-10 h-full w-full">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <React.Suspense fallback={null}>
                    <StarField />
                </React.Suspense>
            </Canvas>
        </div>
    )
}
