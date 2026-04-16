"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Monitor, Code2, Zap, Brain } from "lucide-react"

const skillCategories = [
    {
        title: "Languages",
        icon: <Code2 className="h-6 w-6" />,
        skills: ["TypeScript", "JavaScript", "Python", "SQL"],
    },
    {
        title: "Frameworks",
        icon: <Monitor className="h-6 w-6" />,
        skills: ["React/Next.js", "Node.js", "Hono", "Express.js", "FastAPI"],
    },
    {
        title: "Cloud/DevOps",
        icon: <Zap className="h-6 w-6" />,
        skills: ["GCP", "Terraform", "Docker", "CI/CD", "Firebase"],
    },
    {
        title: "AI/LLM",
        icon: <Brain className="h-6 w-6" />,
        skills: ["Vertex AI", "Google ADK", "Genkit", "Gemini", "RAG", "Agentic Workflows"],
    },
]

export function Skills() {
    return (
        <section id="skills" className="py-24 px-4 overflow-hidden">
            <div className="max-w-4xl mx-auto space-y-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Tech Stack</h2>
                    <p className="text-muted-foreground text-lg">Tools and technologies I work with daily</p>
                    <p className="text-muted-foreground text-sm max-w-2xl mx-auto mt-4">
                        Here&apos;s a collection of technologies I&apos;ve been working with across frontend, backend, and development tools.
                        Each of them plays a role in how I build, test, and ship modern web applications.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full border border-muted-foreground/10 bg-card/50 backdrop-blur-md overflow-hidden hover:border-primary/50 transition-colors group">
                                <CardContent className="p-8 space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                                            {category.icon}
                                        </div>
                                        <h3 className="text-xl font-bold">{category.title}</h3>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {category.skills.map((skill) => (
                                            <Badge
                                                key={skill}
                                                variant="secondary"
                                                className="bg-muted-foreground/5 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all cursor-default"
                                            >
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
