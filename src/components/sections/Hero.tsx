"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight, MousePointer2 } from "lucide-react"
import { BackgroundCanvas } from "@/components/visuals/BackgroundCanvas"

export function Hero() {
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-4 overflow-hidden">
            <BackgroundCanvas />
            <div className="max-w-4xl w-full text-center space-y-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.1,
                        ease: [0, 0.71, 0.2, 1.01]
                    }}
                    className="flex justify-center"
                >
                    <div className="relative">
                        <Avatar className="h-32 w-32 md:h-48 md:w-48 border-4 border-background shadow-2xl">
                            <AvatarImage src="/avatar.png" alt="Avatar" />
                            <AvatarFallback>MT</AvatarFallback>
                        </Avatar>
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute -top-4 -right-4 bg-primary text-primary-foreground p-3 rounded-2xl shadow-lg hidden md:block"
                        >
                            <MousePointer2 className="h-6 w-6" />
                        </motion.div>
                    </div>
                </motion.div>

                <div className="space-y-4">
                    {mounted && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2 border border-primary/20"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Currently employed
                        </motion.div>
                    )}

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-4xl md:text-7xl font-bold tracking-tighter"
                    >
                        I&apos;m <span className="text-primary italic">Mark Taratynov</span>, <br />
                        Fullstack Developer
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto"
                    >
                        I build and enjoy things for the web. I focus on building web applications
                        that are both useful and easy to use.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Button size="lg" className="rounded-full px-8 h-12 text-md transition-all hover:scale-105 active:scale-95" asChild>
                        <a href="#projects">View My Work <ArrowRight className="ml-2 h-4 w-4" /></a>
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-md transition-all hover:scale-105 active:scale-95" asChild>
                        <a href="#contact">Contact me!</a>
                    </Button>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center p-1">
                    <motion.div
                        animate={{
                            y: [0, 12, 0],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                        }}
                        className="w-1 h-2 bg-muted-foreground/50 rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    )
}
