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
        title: "Med Voice",
        description: "AI-automation platform for clinical workflows using a grounded Gemini Live voice agent (Google ADK). Engineered with GCP Cloud Tasks for autonomous patient rescheduling and a zero-trust serverless architecture on Cloud Run. Features real-time Firestore sync and a hybrid Twilio Voice/WebSocket integration for seamless telephony interactions.",
        image: "/med_voice.png",
        tags: ["Gemini Live", "Google ADK", "GCP", "Cloud Run", "Terraform", "Twilio", "Firestore"],
        link: "https://github.com/Prostecki/med-voice",
        github: "https://github.com/Prostecki/med-voice",
    },
    {
        title: "AI Bookstore Agent",
        description: "Architected a hierarchical multi-agent system (Root + Sub-agents) using Python and Google ADK, automating the end-to-end e-commerce flow from discovery to checkout. Engineered semantic retrieval pipelines via Vertex AI Vector Search and Embeddings across 270,000+ records in BigQuery. Deployed a Next.js/TypeScript conversational UI and provisioned the entire cloud infrastructure via Terraform.",
        image: "/ai_bookstore_agent.png",
        tags: ["Python", "Google ADK", "Vertex AI", "BigQuery", "Terraform", "Next.js"],
        link: "#",
        github: "#",
    },
    {
        title: "GCP Event-Driven Image Processing Pipeline",
        description: "Engineered a serverless, event-driven pipeline using Terraform to provision GCP resources (Storage, Pub/Sub, Cloud Functions). Developed Node.js microservices for automated image analysis and metadata extraction, leveraging the Vision API.",
        image: "/gcp_pipeline.png",
        tags: ["GCP", "Terraform", "Node.js", "Eventarc", "Vision API", "Cloud Functions"],
        link: "https://github.com/Prostecki/gcp-event-driven-image-pipeline",
        github: "https://github.com/Prostecki/gcp-event-driven-image-pipeline",
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex"
                        >
                            <Card className="group overflow-hidden border border-muted-foreground/10 bg-card/30 backdrop-blur-sm hover:border-primary/30 transition-all flex flex-col w-full">
                                {/* Image Section */}
                                <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-gradient-to-br from-primary/5 to-transparent flex items-center justify-center p-6 border-b border-muted-foreground/10">
                                    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.03] border border-muted-foreground/20">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            priority={index < 2}
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover object-top"
                                        />
                                    </div>
                                </div>
                                
                                {/* Content Section */}
                                <CardContent className="p-6 md:p-8 flex flex-col flex-1">
                                    <div className="space-y-4">
                                        <h3 className="text-xl md:text-2xl font-bold font-mono tracking-tight group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mt-6 mb-8 flex-1 content-start">
                                        {project.tags.map((tag) => (
                                            <Badge 
                                                key={tag} 
                                                variant="secondary" 
                                                className="text-[10px] uppercase font-bold tracking-widest bg-primary/5 text-primary border border-primary/10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="flex gap-4 mt-auto pt-4 border-t border-muted-foreground/10">
                                        <Button size="sm" variant="default" className="rounded-full group/btn flex-1 sm:flex-none" asChild>
                                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                                                View Project <ExternalLink className="ml-2 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                                            </a>
                                        </Button>
                                        <Button size="sm" variant="outline" className="rounded-full flex-1 sm:flex-none" asChild>
                                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                                                <Github className="mr-2 h-3 w-3" /> Code
                                            </a>
                                        </Button>
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
