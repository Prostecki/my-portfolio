"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  ExternalLink,
} from "lucide-react";

export interface Link {
  href: string;
  label: string;
}

export interface Role {
  title: string;
  type: string;
  period: string;
  duration: string;
  location: string;
  description?: string;
  bullets?: string[];
  link?: Link;
  skills: string[];
}

export interface Experience {
  company: string;
  location: string;
  roles: Role[];
}

export interface EducationEntry {
  title: string;
  school: string;
  period: string;
  description: string;
  skills: string[];
  link?: Link;
}

const calculateDuration = (startDate: string, endDate?: string) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffMonths = Math.round(diffTime / (1000 * 60 * 60 * 24 * 30.44));

  if (diffMonths >= 12) {
    const years = Math.floor(diffMonths / 12);
    const months = diffMonths % 12;
    const monthsStr = months === 1 ? "1 mo" : `${months} mos`;
    return months > 0 ? `${years} yr ${monthsStr}` : `${years} yr`;
  }
  return diffMonths === 1 ? "1 mo" : `${diffMonths} mos`;
};

const experiences: Experience[] = [
  {
    company: "Jeskin",
    location: "London, UK",
    roles: [
      {
        title: "Founding Engineer",
        type: "Full-time",
        period: "Jul 2025 - Present",
        duration: calculateDuration("2025-07-01T00:00:00"),
        location: "London, UK · Remote",
        bullets: [
          "Building fullstack web applications with Next.js, TypeScript, and Python — B2B landing pages, internal tooling, and client management systems backed by Firestore.",
          "Developing internal automation applications to streamline corporate client onboarding workflows.",
          "Provisioning and managing GCP infrastructure via Terraform; architecting backend services for a MedTech product — iPhone-attachable lens with 3D body mapping and dermatological tracking capabilities.",
          "Collaborating in a small cross-functional team, owning features from concept to deployment.",
        ],
        skills: [
          "Next.js",
          "TypeScript",
          "Python",
          "Firestore",
          "Terraform",
          "GCP",
        ],
      },
    ],
  },
  {
    company: "Aclarity AB",
    location: "Stockholm, Sweden",
    roles: [
      {
        title: "Software Developer",
        type: "Full-time",
        period: "Jul 2025 - May 2026",
        duration: calculateDuration("2025-07-01T00:00:00", "2026-05-31T00:00:00"),
        location: "Stockholm, Sweden",
        bullets: [
          "Built and maintained Python/FastAPI backend services and REST APIs interfacing with BigQuery — enabling real-time product search and retrieval across 270,000+ records.",
          "Developed and optimised React/Next.js frontend components integrated with cloud-based backends and FireCMS/Firestore, empowering non-technical teams to manage content independently.",
          "Provisioned and managed GCP infrastructure via Terraform (Cloud Run, BigQuery, Firestore, IAM) — reducing environment setup time by 70% and eliminating configuration drift.",
          "Designed and orchestrated a multi-agent AI system using Vertex AI and Google ADK — specialised agents handling e-commerce, computer vision, document translation, and data analysis workflows.",
          "Developed ShelfSense — a B2B SaaS product with live AI demo for out-of-stock shelf detection, integrated with FireCMS/Firestore backend.",
        ],
        link: { href: "https://www.aclarity.se/", label: "aclarity.se" },
        skills: [
          "Python",
          "FastAPI",
          "BigQuery",
          "Vertex AI",
          "Google ADK",
          "React/Next.js",
          "Terraform",
        ],
      },
    ],
  },
];

const education: EducationEntry[] = [
  {
    title: "Webbutvecklare Fullstack Open Source (YH)",
    school: "Nackademin",
    period: "2024 - 2026 · Stockholm",
    description:
      "Two-year higher vocational education (YH) in Solna, Stockholm — fullstack web development with open source at the core. Covers frontend (HTML, CSS, JavaScript, responsive design), backend (Node.js, TypeScript), databases (MySQL, MongoDB), CMS, and application lifecycle management. Includes at least one quarter of LIA workplace learning and an industry-aligned exam project.",
    link: {
      href: "https://nackademin.se/utbildningar/webbutvecklare-fullstack-open-source/",
      label: "Program at nackademin.se",
    },
    skills: [
      "TypeScript",
      "Node.js",
      "JavaScript",
      "Fullstack",
      "Open Source",
      "LIA",
    ],
  },
  {
    title: "Google Cloud Certified - Associate Cloud Engineer",
    school: "Google",
    period: "Feb 2026 - Feb 2029",
    description:
      "Professional certification validating the ability to deploy applications, monitor operations, and manage enterprise solutions on Google Cloud Platform. Demonstrates proficiency in using Google Cloud Console and the command-line interface to perform common platform-based tasks to maintain one or more deployed solutions that leverage Google-managed or self-managed services on Google Cloud.",
    link: {
      href: "https://www.credly.com/badges/e4ef998b-5f33-4e61-a7d3-dbcbd0a8a33a/linked_in_profile",
      label: "Verify on Credly",
    },
    skills: [
      "GCP",
      "Cloud Infrastructure",
      "Kubernetes",
      "IAM",
      "Cloud Monitoring",
    ],
  },
  {
    title: "Bachelor's Degree Sports Science",
    school:
      "Lesgaft National State University of Physical Education, Sport and Health",
    period: "Sep 2014 - May 2018",
    description:
      "Four-year degree program focusing on sports science, athletic training methodologies, biomechanics, physiology, and coaching techniques. Developed strong analytical and problem-solving skills through scientific approach to athletics.",
    skills: ["Sports Science", "Athletic Training", "Analytical Skills"],
  },
];

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="py-24 px-4 bg-background"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <h2
            id="experience-heading"
            className="text-3xl md:text-5xl font-bold tracking-tighter mb-4"
          >
            Journey
          </h2>
          <div className="h-1 w-20 bg-primary mb-8" />
          <p className="text-muted-foreground text-lg">
            My professional and academic progress.
          </p>
        </motion.div>

        <Tabs defaultValue="work" className="w-full">
          <div className="flex justify-center md:justify-start mb-12">
            <TabsList className="bg-muted/50 p-1 h-12 rounded-full border border-muted-foreground/10">
              <TabsTrigger
                value="work"
                className="rounded-full px-8 h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors uppercase text-xs font-bold tracking-widest"
              >
                Work Experience
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="rounded-full px-8 h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors uppercase text-xs font-bold tracking-widest"
              >
                Education
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="work" className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border border-muted-foreground/10 bg-card/30 hover:border-primary/30 transition-colors group">
                  <CardContent className="p-8">
                    <div className="flex flex-col space-y-8">
                      {/* Company Header */}
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-primary/10 text-primary">
                          <Briefcase className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">{exp.company}</h3>
                          <p className="text-muted-foreground text-sm flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" aria-hidden="true" />{" "}
                            {exp.location}
                          </p>
                        </div>
                      </div>

                      {/* Roles */}
                      <div className="relative space-y-10 pl-6 md:pl-8">
                        {/* Vertical line for multiple roles */}
                        {exp.roles.length > 1 && (
                          <div
                            className="absolute left-[11px] md:left-[15px] top-2 bottom-2 w-0.5 bg-muted-foreground/20"
                            aria-hidden="true"
                          />
                        )}

                        {exp.roles.map((role) => (
                          <div key={role.title} className="relative">
                            {/* Dot */}
                            {exp.roles.length > 1 && (
                              <div
                                className="absolute -left-[19px] md:-left-[23px] top-2 w-3 h-3 rounded-full bg-background border-2 border-primary z-10"
                                aria-hidden="true"
                              />
                            )}

                            <div className="space-y-4">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex flex-wrap items-center gap-3">
                                  <h4 className="text-xl font-bold text-foreground/90">
                                    {role.title}
                                  </h4>
                                  {role.type && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs uppercase tracking-wider font-semibold"
                                    >
                                      {role.type}
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-muted/30 px-3 py-1 rounded-full w-fit shrink-0">
                                  <Calendar
                                    className="h-3 w-3"
                                    aria-hidden="true"
                                  />
                                  <span>
                                    {role.period} · {role.duration}
                                  </span>
                                </div>
                              </div>

                              {role.location && (
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                  <MapPin
                                    className="h-3 w-3"
                                    aria-hidden="true"
                                  />{" "}
                                  {role.location}
                                </p>
                              )}

                              {role.description && (
                                <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                                  {role.description}
                                </p>
                              )}

                              {role.bullets && (
                                <ul className="text-sm text-muted-foreground leading-relaxed max-w-2xl list-disc list-outside ml-4 space-y-2 marker:text-primary/50">
                                  {role.bullets.map(
                                    (bullet: string, bIndex: number) => (
                                      <li key={bIndex}>{bullet}</li>
                                    ),
                                  )}
                                </ul>
                              )}

                              {role.link && (
                                <a
                                  href={role.link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
                                >
                                  <ExternalLink
                                    className="h-3.5 w-3.5"
                                    aria-hidden="true"
                                  />
                                  {role.link.label}
                                </a>
                              )}

                              <div className="flex flex-wrap gap-2 pt-2">
                                {role.skills.map((skill) => (
                                  <Badge
                                    key={skill}
                                    variant="secondary"
                                    className="text-xs uppercase font-bold tracking-widest bg-primary/5 text-primary border border-primary/10"
                                  >
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

          <TabsContent value="education" className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={edu.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border border-muted-foreground/10 bg-card/30 hover:border-primary/30 transition-colors group">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-4 gap-6">
                      <div className="md:col-span-1 space-y-2">
                        <div className="flex items-start gap-2 text-primary font-bold">
                          <GraduationCap
                            className="h-4 w-4 shrink-0 mt-1"
                            aria-hidden="true"
                          />
                          <span className="break-words">{edu.school}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" aria-hidden="true" />
                          <span>{edu.period}</span>
                        </div>
                      </div>

                      <div className="md:col-span-3 space-y-4">
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                          {edu.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {edu.description}
                        </p>
                        {edu.link && (
                          <a
                            href={edu.link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
                          >
                            <ExternalLink
                              className="h-3.5 w-3.5"
                              aria-hidden="true"
                            />
                            {edu.link.label}
                          </a>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {edu.skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              className="text-xs uppercase font-bold tracking-widest bg-primary/5 text-primary border border-primary/10"
                            >
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
  );
}
