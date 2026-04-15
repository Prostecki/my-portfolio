"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"
import { ArrowRight, MousePointer2 } from "lucide-react"
import { BackgroundCanvas } from "@/components/visuals/BackgroundCanvas"

const EASE_CUSTOM = [0, 0.71, 0.2, 1.01] as const

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay }
})

const scaleIn = (delay: number, initialScale = 0.9) => ({
    initial: { opacity: 0, scale: initialScale },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, delay }
})

export function Hero() {
    const [mounted, setMounted] = React.useState(false)
    const shouldReduceMotion = useReducedMotion()

    React.useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <section id="hero" aria-label="Hero" className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-4 overflow-hidden">
            <BackgroundCanvas />
            <div className="max-w-4xl w-full text-center space-y-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.1,
                        ease: EASE_CUSTOM
                    }}
                    className="flex justify-center"
                >
                    <div className="relative">
                        <Avatar className="h-32 w-32 md:h-48 md:w-48 border-4 border-background shadow-2xl overflow-hidden">
                            <Image
                                src="/avatar.png"
                                alt="Mark Taratynov"
                                width={192}
                                height={192}
                                priority
                                className="aspect-square h-full w-full object-cover"
                            />
                            <AvatarFallback>MT</AvatarFallback>
                        </Avatar>
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: shouldReduceMotion ? 0 : Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute -top-4 -right-4 bg-primary text-primary-foreground p-3 rounded-2xl shadow-lg hidden md:block"
                        >
                            <MousePointer2 className="h-6 w-6" aria-hidden="true" />
                        </motion.div>
                    </div>
                </motion.div>

                <div className="space-y-4">
                    <motion.div
                        {...scaleIn(0.2)}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2 border border-primary/20"
                    >
                        <span className="relative flex h-2 w-2" aria-hidden="true">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Open to work
                    </motion.div>

                    <motion.h1
                        {...fadeUp(0.3)}
                        className="text-4xl md:text-7xl font-bold tracking-tighter"
                    >
                        I&apos;m <span className="text-primary italic">Mark Taratynov</span>, <br className="hidden md:block" />
                        Fullstack Cloud Engineer
                    </motion.h1>

                    <motion.p
                        {...fadeUp(0.4)}
                        className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto"
                    >
                        Specializing in Cloud Infrastructure (GCP) and Agentic AI.
                        Bridging application logic and scalable cloud reliability using TypeScript and Terraform.
                    </motion.p>
                </div>

                <motion.div
                    {...fadeUp(0.5)}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Button size="xl" className="rounded-full transition-all hover:scale-105 active:scale-95" asChild>
                        <a href="#projects">View My Work <ArrowRight className="ml-2 h-4 w-4" /></a>
                    </Button>
                    <Button size="xl" variant="outline" className="rounded-full transition-all hover:scale-105 active:scale-95" asChild>
                        <a href="#contact">Contact me!</a>
                    </Button>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
            >
                <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center p-1">
                    <motion.div
                        animate={{
                            y: [0, 12, 0],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: shouldReduceMotion ? 0 : Infinity,
                        }}
                        className="w-1 h-2 bg-muted-foreground/50 rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    )
}
