"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Briefcase, GraduationCap } from "lucide-react"

const experiences = [
    {
        company: "Aclarity Tech",
        location: "Stockholm, Sweden",
        roles: [
            {
                title: "Software Developer",
                type: "Internship",
                period: "Nov 2025 - Present",
                duration: "3 mos",
                location: "Stockholm · On-site",
                description: "Contribute to the full-stack development of our retail SaaS product, covering both the frontend (React) and backend (Node.js/Python). Build, test, and maintain scalable backend services deployed on the Google Cloud Platform (GCP). Work with data modeling, AI integrations, and analytics pipelines to generate insights and create significant value for users. Contribute to customized implementations and integrations within the Google Cloud environment for client-specific needs. Collaborate closely with our team of developers, designers, and business specialists to translate requirements into robust technical solutions.",
                skills: ["Google Cloud Platform (GCP)", "Terraform", "React", "Node.js", "Python", "AI Integrations", "Data Modeling", "SaaS"],
            },
            {
                title: "Fullstack Developer",
                type: "Part-time",
                period: "Jul 2025 - Oct 2025",
                duration: "4 mos",
                location: "Stockholm, Sweden · Remote",
                description: "Designed and deployed a high-performance product landing page using the Next.js framework, React (TypeScript), and Tailwind CSS, focusing on responsiveness and user experience. Developed and integrated a robust Content Management System (CMS) via FireCMS and Firestore DB, enabling dynamic page creation and content updates by non-technical users. Managed the full application lifecycle, from front-end development to back-end services, leveraging Firebase and Google Cloud Platform (GCP) infrastructure.",
                skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "FireCMS", "Firestore", "Firebase", "GCP"],
            },
        ],
    },
    {
        company: "ICA Brunna",
        location: "Stockholm, Brunna",
        roles: [
            {
                title: "Delivery Driver",
                type: "",
                period: "May 2024 - Nov 2025",
                duration: "",
                location: "",
                description: "Responsible for efficient delivery operations, ensuring timely and accurate deliveries while maintaining excellent customer service.",
                skills: ["Time Management", "Communication", "Problem Solving", "Swedish", "English"],
            }
        ]
    },
    {
        company: "Self-Employed",
        location: "Remote",
        roles: [
            {
                title: "Web Development Consultant",
                type: "",
                period: "Sep 2023 - Apr 2025",
                duration: "",
                location: "",
                description: "Delivered custom web solutions for clients, specializing in responsive and interactive websites. Managed full project lifecycle.",
                skills: ["HTML", "CSS", "JS", "React.js", "Tailwind", "Git", "GCP", "Yandex Cloud"],
            }
        ]
    },
    {
        company: "Nordic IT School",
        location: "Moscow, Russia",
        roles: [
            {
                title: "Web Development Intern",
                type: "",
                period: "Oct 2022 - Mar 2023",
                duration: "",
                location: "",
                description: "Gained hands-on experience in full-stack web development, working with frontend and backend technologies.",
                skills: ["HTML", "CSS", "JS", "PHP", "MySQL", "Docker", "GO"],
            }
        ]
    },
]

const education = [
    {
        title: "Fullstack Developer, open source",
        school: "Nackademin, Stockholm",
        period: "Aug 2024 - Present",
        description: "Comprehensive fullstack development program focused on modern web technologies, including React, Node.js, databases, and open-source contributions. Learning industry best practices and agile development methodologies.",
        skills: ["React", "Node.js", "Fullstack", "Open Source", "Agile"],
    },
    {
        title: "Municipal Adult Education",
        school: "Solna KomVux, Stockholm",
        period: "Oct 2022 - April 2024",
        description: "Intensive language studies to achieve proficiency in Swedish and English, enabling better integration into Swedish society and professional communication in international environments.",
        skills: ["Swedish", "English"],
    },
    {
        title: "The Complete JavaScript Course 2025: From Zero to Expert!",
        school: "Udemy, Inc",
        period: "Sep 2024 - Jan 2025",
        description: "Comprehensive JavaScript course covering fundamentals to advanced concepts including ES6+, DOM manipulation, Object-Oriented Programming, asynchronous programming, working with APIs, and modern development tools.",
        skills: ["JavaScript", "ES6+", "DOM", "OOP", "AJAX", "APIs", "NPM", "Parcel"],
    },
    {
        title: "Bachelor's degree in Athletics",
        school: "Lesgaft National State University, Russia",
        period: "Sep 2014 - May 2018",
        description: "Four-year degree program focusing on sports science, athletic training methodologies, biomechanics, physiology, and coaching techniques. Developed strong analytical and problem-solving skills through scientific approach to athletics.",
        skills: ["Sports Science", "Athletic Training", "Analytical Skills"],
    },
]

export function Experience() {
    return (
        <section id="experience" className="py-24 px-4 bg-background">
            <div className="max-w-4xl mx-auto space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center md:text-left"
                >
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Journey</h2>
                    <div className="h-1 w-20 bg-primary mb-8" />
                    <p className="text-muted-foreground text-lg">My professional and academic progress.</p>
                </motion.div>

                <Tabs defaultValue="work" className="w-full">
                    <div className="flex justify-center md:justify-start mb-12">
                        <TabsList className="bg-muted/50 p-1 h-12 rounded-full border border-muted-foreground/10">
                            <TabsTrigger value="work" className="rounded-full px-8 h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all uppercase text-xs font-bold tracking-widest">
                                Work Experience
                            </TabsTrigger>
                            <TabsTrigger value="education" className="rounded-full px-8 h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all uppercase text-xs font-bold tracking-widest">
                                Education
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="work" className="space-y-8 outline-none">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="border border-muted-foreground/10 bg-card/30 backdrop-blur-sm hover:border-primary/30 transition-all group">
                                    <CardContent className="p-8">
                                        <div className="flex flex-col space-y-8">
                                            {/* Company Header */}
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                                                    <Briefcase className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold">{exp.company}</h3>
                                                    <p className="text-muted-foreground text-sm flex items-center gap-1 mt-1">
                                                        <MapPin className="h-3 w-3" /> {exp.location}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Roles */}
                                            <div className="relative space-y-10 pl-4 md:pl-8">
                                                {/* Vertical line for multiple roles */}
                                                {exp.roles.length > 1 && (
                                                    <div className="absolute left-[1.1rem] md:left-4 top-2 bottom-2 w-0.5 bg-muted-foreground/20" />
                                                )}

                                                {exp.roles.map((role, rIndex) => (
                                                    <div key={rIndex} className="relative">
                                                        {/* Dot */}
                                                        {exp.roles.length > 1 && (
                                                            <div className="absolute -left-[1.35rem] md:-left-5.5 top-2 w-3 h-3 rounded-full bg-background border-2 border-primary" />
                                                        )}

                                                        <div className="space-y-4">
                                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                                                <h4 className="text-xl font-bold text-foreground/90">{role.title}</h4>
                                                                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-muted/30 px-3 py-1 rounded-full w-fit">
                                                                    <Calendar className="h-3 w-3" />
                                                                    <span>{role.period} {role.duration && `· ${role.duration}`}</span>
                                                                </div>
                                                            </div>

                                                            {role.type && (
                                                                <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-semibold">
                                                                    {role.type}
                                                                </Badge>
                                                            )}

                                                            {role.location && (
                                                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                                                    <MapPin className="h-3 w-3" /> {role.location}
                                                                </p>
                                                            )}

                                                            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl whitespace-pre-line">
                                                                {role.description}
                                                            </p>

                                                            <div className="flex flex-wrap gap-2 pt-2">
                                                                {role.skills.map(skill => (
                                                                    <Badge key={skill} variant="secondary" className="text-[10px] uppercase font-bold tracking-widest bg-primary/5 text-primary border border-primary/10">
                                                                        {skill}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </TabsContent>

                    <TabsContent value="education" className="space-y-8 outline-none">
                        {education.map((edu, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="border border-muted-foreground/10 bg-card/30 backdrop-blur-sm hover:border-primary/30 transition-all group">
                                    <CardContent className="p-8">
                                        <div className="grid md:grid-cols-4 gap-6">
                                            <div className="md:col-span-1 space-y-2">
                                                <div className="flex items-center gap-2 text-primary font-bold">
                                                    <GraduationCap className="h-4 w-4" />
                                                    <span>{edu.school}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <Calendar className="h-3 w-3" />
                                                    <span>{edu.period}</span>
                                                </div>
                                            </div>

                                            <div className="md:col-span-3 space-y-4">
                                                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{edu.title}</h3>
                                                <p className="text-sm text-muted-foreground leading-relaxed">{edu.description}</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {edu.skills.map(skill => (
                                                        <Badge key={skill} variant="secondary" className="text-[10px] uppercase font-bold tracking-widest bg-primary/5 text-primary border border-primary/10">
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    )
}
