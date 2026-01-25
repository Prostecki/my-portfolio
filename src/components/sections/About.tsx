"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export function About() {
    return (
        <section id="about" className="py-24 px-4 bg-muted/30">
            <div className="max-w-4xl mx-auto space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center md:text-left"
                >
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">About Me</h2>
                    <div className="h-1 w-20 bg-primary mb-8" />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6 text-lg text-muted-foreground leading-relaxed"
                    >
                        <p>
                            Since my childhood, I&apos;ve been eager to solve problems. When I got my first PC with an AMD Duron 700MHz processor, something went wrong. Without the internet, I managed to fix it on my own by delving into the BIOS and installing different drivers, and I was just 10 y.o.
                        </p>
                        <p>
                            I&apos;m highly motivated by a growth mindset, always looking for opportunities to learn, improve, and contribute. My journey started with curiosity and grew through consistent practice.
                        </p>
                        <blockquote className="border-l-4 border-primary pl-6 py-2 italic font-medium text-foreground">
                            &quot;Patience and diligent effort are the keys to personal development and progress.&quot;
                        </blockquote>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <Card className="border-none shadow-2xl bg-background/50 backdrop-blur-sm overflow-hidden group">
                            <CardContent className="p-8 space-y-4">
                                <div className="space-y-2">
                                    <h3 className="font-bold text-xl">My Story</h3>
                                    <div className="h-px w-full bg-muted-foreground/20" />
                                </div>
                                <ul className="space-y-4">
                                    {[
                                        { label: "Location", value: "Stockholm, Sweden" },
                                        { label: "Current Role", value: "Fullstack Developer" },
                                        { label: "Experience", value: "Aclarity Tech AB" },
                                        { label: "Interests", value: "Problem Solving, AI, Web Dev" },
                                    ].map((fact, i) => (
                                        <li key={i} className="flex justify-between items-center group/item">
                                            <span className="text-sm font-medium text-muted-foreground">{fact.label}</span>
                                            <span className="text-sm font-bold group-hover/item:text-primary transition-colors">{fact.value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
