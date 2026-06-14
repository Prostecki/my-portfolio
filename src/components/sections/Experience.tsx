import { MotionReveal } from "@/components/ui/motion-reveal";
import { experiences, education } from "./experience-data";
import { ExperienceTabs } from "./ExperienceTabs";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="py-24 px-4 bg-background"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <MotionReveal className="text-center md:text-left">
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
        </MotionReveal>

        <ExperienceTabs experiences={experiences} education={education} />
      </div>
    </section>
  );
}
