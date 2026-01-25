"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Send, Mail, MapPin, Phone, Briefcase } from "lucide-react"
import { toast } from "sonner"

export function Contact() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        toast.success("Message sent! I'll get back to you soon.")
    }

    return (
        <section id="contact" className="py-24 px-4">
            <div className="max-w-4xl mx-auto space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Get In Touch</h2>
                    <p className="text-muted-foreground text-lg">Have a project in mind or just want to say hello?</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="md:col-span-1 space-y-6"
                    >
                        {[
                            { icon: <Mail className="h-5 w-5" />, label: "Email", value: "mark.taratynov@gmail.com" },
                            { icon: <Briefcase className="h-5 w-5" />, label: "Status", value: "Currently employed" },
                            { icon: <MapPin className="h-5 w-5" />, label: "Location", value: "Stockholm, Sweden" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 group">
                                <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">{item.label}</p>
                                    <p className="font-medium text-sm md:text-base">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="md:col-span-2"
                    >
                        <Card className="border-none shadow-2xl bg-muted/20 backdrop-blur-sm">
                            <CardContent className="p-8">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Input placeholder="Name" required className="bg-background/50 border-none shadow-inner" />
                                        </div>
                                        <div className="space-y-2">
                                            <Input type="email" placeholder="Email" required className="bg-background/50 border-none shadow-inner" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Input placeholder="Subject" required className="bg-background/50 border-none shadow-inner" />
                                    </div>
                                    <div className="space-y-2">
                                        <Textarea placeholder="Your message..." required className="min-h-[150px] bg-background/50 border-none shadow-inner resize-none" />
                                    </div>
                                    <Button type="submit" className="w-full rounded-full h-12 text-md transition-all hover:scale-[1.02]">
                                        Send Message <Send className="ml-2 h-4 w-4" />
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
