"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

const projects = [
    {
        title: "Pokémon App",
        description: "A comprehensive React application for exploring Pokémon data with interactive features: Browse Pokémon, view detailed stats, check evolution chains, and more.",
        image: "/pokemon.png",
        tags: ["React.js", "JavaScript", "TailwindCSS", "Framer Motion"],
        link: "#",
        github: "#",
    },
    {
        title: "Hakim Livs",
        description: "Hakim Livs Webshop is a full-stack e-commerce application built by modern concepts and technologies with user authentication through JWT auth.",
        image: "/hakim_livs.png",
        tags: ["MongoDB", "Node.js", "Express", "JWT", "Jest"],
        link: "#",
        github: "#",
    },
    {
        title: "Sortify",
        description: "An efficient sorting and organization tool with intuitive interface and powerful features.",
        image: "/sortify.png",
        tags: ["React.js", "JavaScript", "TailwindCSS"],
        link: "#",
        github: "#",
    },
    {
        title: "Quiz App",
        description: "A dynamic quiz application built with modern web technologies, featuring interactive questions and real-time scoring.",
        image: "/project1.png",
        tags: ["HTML", "CSS", "JavaScript"],
        link: "#",
        github: "#",
    },
    {
        title: "Advent Calendar 2024",
        description: "An interactive advent calendar application with daily surprises and festive animations.",
        image: "/advent_calendar.png",
        tags: ["React.js", "JavaScript", "TailwindCSS"],
        link: "#",
        github: "#",
    },
    {
        title: "Weather App 2025",
        description: "A modern weather application providing accurate forecasts with beautiful UI and responsive design.",
        image: "/weather_app.png",
        tags: ["React.js", "Node.js", "TailwindCSS"],
        link: "#",
        github: "#",
    },
]

export function Projects() {
    return (
        <section id="projects" className="py-24 px-4 bg-muted/30">
            <div className="max-w-4xl mx-auto space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center md:text-left"
                >
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Selected Works</h2>
                    <div className="h-1 w-20 bg-primary mb-8" />
                </motion.div>

                <div className="grid grid-cols-1 gap-12">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: index * 0.2 }}
                        >
                            <Card className="group overflow-hidden border-none shadow-xl bg-background/50 backdrop-blur-md">
                                <div className="grid md:grid-cols-2">
                                    <div className="relative h-72 md:h-auto md:min-h-[400px] overflow-hidden">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            priority={index < 2}
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <CardContent className="p-8 md:p-12 flex flex-col justify-center space-y-6">
                                        <div className="space-y-2">
                                            <h3 className="text-2xl md:text-3xl font-bold font-mono tracking-tighter">
                                                {project.title}
                                            </h3>
                                            <p className="text-muted-foreground text-lg">
                                                {project.description}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag) => (
                                                <Badge key={tag} variant="outline" className="rounded-full">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>

                                        <div className="flex gap-4 pt-4">
                                            <Button size="sm" variant="default" className="rounded-full group/btn">
                                                View Project <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                            </Button>
                                            <Button size="sm" variant="ghost" className="rounded-full">
                                                <Github className="mr-2 h-4 w-4" /> Code
                                            </Button>
                                        </div>
                                    </CardContent>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
