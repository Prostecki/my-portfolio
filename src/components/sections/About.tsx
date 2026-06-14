import { Card, CardContent } from "@/components/ui/card"
import { MotionReveal } from "@/components/ui/motion-reveal"

const ABOUT_FACTS = [
    { label: "Location", value: "Stockholm, Sweden" },
    { label: "Current Role", value: "Fullstack Software Engineer" },
    { label: "Employer", value: "Jeskin" },
    { label: "Certification", value: "GCP ACE" },
] as const

export function About() {
    return (
        <section id="about" aria-label="About" className="py-24 px-4 bg-muted/30">
            <div className="max-w-4xl mx-auto space-y-12">
                <MotionReveal className="text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">About Me</h2>
                    <div className="h-1 w-20 bg-primary mb-8 mx-auto md:mx-0" aria-hidden="true" />
                </MotionReveal>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <MotionReveal variant="fadeLeft" delay={0.2} className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                        <p>
                            Fullstack engineer building engaging web experiences — React/TypeScript frontends,
                            Python/FastAPI backends, and scalable web applications. AI tools are a natural part of my
                            daily workflow.
                        </p>
                        <p>
                            I&apos;m highly motivated by a growth mindset, always looking for opportunities to learn,
                            improve, and contribute. My journey started with curiosity — fixing my first PC at age 10
                            without the internet — and grew through consistent practice.
                        </p>
                        <p role="note" className="border-l-4 border-primary pl-6 py-2 italic font-medium text-foreground">
                            &quot;Patience and diligent effort are the keys to personal development and progress.&quot;
                        </p>
                    </MotionReveal>

                    <MotionReveal variant="fadeRight" delay={0.4}>
                        <Card className="border-none shadow-2xl bg-background/80">
                            <CardContent className="p-8 space-y-4">
                                <div className="space-y-2">
                                    <h3 className="font-bold text-xl">My Story</h3>
                                    <div className="h-px w-full bg-muted-foreground/20" aria-hidden="true" />
                                </div>
                                <ul className="space-y-4" aria-label="Quick facts">
                                    {ABOUT_FACTS.map((fact) => (
                                        <li key={fact.label} className="flex justify-between items-center group/item">
                                            <span className="text-sm font-medium text-muted-foreground">{fact.label}</span>
                                            <span className="text-sm font-bold group-hover/item:text-primary transition-colors">{fact.value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </MotionReveal>
                </div>
            </div>
        </section>
    )
}
