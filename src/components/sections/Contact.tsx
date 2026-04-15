"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Send, Mail, MapPin, Phone, Loader2 } from "lucide-react"
import { toast } from "sonner"

type ContactInfoItem = {
    icon: React.ReactNode
    label: string
    value: string
    href?: string
}

export function Contact() {
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const shouldReduceMotion = useReducedMotion()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const formData = new FormData(e.currentTarget)
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message'),
            }

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            const responseData = await response.json()

            if (!response.ok) {
                console.error("Server responded with error:", responseData)
                throw new Error(responseData.error || 'Failed to send message')
            }

            toast.success("Message sent! I'll get back to you soon.")
            ;(e.target as HTMLFormElement).reset()
        } catch (error) {
            toast.error("Failed to send message. Please try again later.")
            console.error("Contact form error:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const contactInfo: ContactInfoItem[] = [
        {
            icon: <Mail className="h-5 w-5" aria-hidden="true" />,
            label: "Email",
            value: "mark.taratynov@gmail.com",
            href: "mailto:mark.taratynov@gmail.com",
        },
        {
            icon: <Phone className="h-5 w-5" aria-hidden="true" />,
            label: "Phone",
            value: "+46 70 493 71 31",
            href: "tel:+46704937131",
        },
        {
            icon: <MapPin className="h-5 w-5" aria-hidden="true" />,
            label: "Location",
            value: "Stockholm, Sweden",
        },
    ]

    return (
        <section id="contact" aria-labelledby="contact-heading" className="py-24 px-4">
            <div className="max-w-4xl mx-auto space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h2 id="contact-heading" className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Get In Touch</h2>
                    <div className="h-1 w-20 bg-primary mb-4 mx-auto" aria-hidden="true" />
                    <p className="text-muted-foreground text-lg">Have a project in mind or just want to say hello?</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="md:col-span-1 space-y-6"
                    >
                        {contactInfo.map((item, i) => (
                            <div key={i} className="flex items-center gap-4 group">
                                <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">{item.label}</p>
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            className="font-medium text-sm md:text-base hover:text-primary transition-colors"
                                        >
                                            {item.value}
                                        </a>
                                    ) : (
                                        <p className="font-medium text-sm md:text-base">{item.value}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="md:col-span-2"
                    >
                        <Card className="border-none shadow-2xl bg-muted/20 backdrop-blur-sm">
                            <CardContent className="p-8">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="sr-only">Name</label>
                                            <Input
                                                id="name"
                                                name="name"
                                                placeholder="Name"
                                                required
                                                disabled={isSubmitting}
                                                autoComplete="name"
                                                className="bg-background/50 border-none shadow-inner"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="sr-only">Email</label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="Email"
                                                required
                                                disabled={isSubmitting}
                                                autoComplete="email"
                                                className="bg-background/50 border-none shadow-inner"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="sr-only">Subject</label>
                                        <Input
                                            id="subject"
                                            name="subject"
                                            placeholder="Subject"
                                            required
                                            disabled={isSubmitting}
                                            autoComplete="off"
                                            className="bg-background/50 border-none shadow-inner"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="sr-only">Message</label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            placeholder="Your message..."
                                            required
                                            disabled={isSubmitting}
                                            autoComplete="off"
                                            className="min-h-[150px] bg-background/50 border-none shadow-inner resize-none"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        size="xl"
                                        disabled={isSubmitting}
                                        className="w-full rounded-full transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 transform-gpu"
                                    >
                                        {isSubmitting
                                            ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> Sending...</>
                                            : <>Send Message <Send className="ml-2 h-4 w-4" aria-hidden="true" /></>
                                        }
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
