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
import {
  type ExperienceEntry,
  type EducationEntry,
} from "./experience-data";

export function ExperienceTabs({
  experiences,
  education,
}: {
  experiences: ExperienceEntry[];
  education: EducationEntry[];
}) {
  return (
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

                  <div className="relative space-y-10 pl-6 md:pl-8">
                    {exp.roles.length > 1 && (
                      <div
                        className="absolute left-[11px] md:left-[15px] top-2 bottom-2 w-0.5 bg-muted-foreground/20"
                        aria-hidden="true"
                      />
                    )}

                    {exp.roles.map((role) => (
                      <div key={role.title} className="relative">
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
                              {role.bullets.map((bullet, bIndex) => (
                                <li key={bIndex}>{bullet}</li>
                              ))}
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
  );
}
