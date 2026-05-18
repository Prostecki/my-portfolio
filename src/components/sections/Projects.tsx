"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { projects } from "./projects/data";
import { useCarousel, CARD_ROUNDED } from "./projects/hooks";
import { ProjectCard } from "./projects/ProjectCard";

export function Projects() {
  const shouldReduceMotion = useReducedMotion();
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  const {
    visibleCards,
    canScrollLeft,
    canScrollRight,
    scroll,
    scrollRef,
    viewportRef,
    updateScrollState,
  } = useCarousel(cardRefs, shouldReduceMotion);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative overflow-hidden py-24 md:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl px-4"
      >
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-4 text-center sm:text-left">
            <h2
              id="projects-heading"
              className="text-3xl font-bold tracking-tighter md:text-5xl"
            >
              Selected Works
            </h2>
            <div className="mx-auto h-1 w-20 bg-primary sm:mx-0" aria-hidden />
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              Hover a project to see details. Cards outside the frame stay soft
              and clip as you scroll.
            </p>
          </div>

          <div
            className="flex items-center justify-center gap-3 sm:pb-1"
            aria-label="Carousel navigation"
          >
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll projects left"
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-background/80 text-foreground backdrop-blur-sm transition-all",
                "hover:border-primary/40 hover:bg-primary hover:text-primary-foreground",
                "disabled:pointer-events-none disabled:opacity-30",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll projects right"
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-background/80 text-foreground backdrop-blur-sm transition-all",
                "hover:border-primary/40 hover:bg-primary hover:text-primary-foreground",
                "disabled:pointer-events-none disabled:opacity-30",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
            >
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mx-auto mt-12 max-w-4xl px-4 md:mt-14"
      >
        <div
          ref={viewportRef}
          className={cn("relative overflow-hidden", CARD_ROUNDED)}
        >
          <div
            ref={scrollRef}
            onScroll={updateScrollState}
            className={cn(
              "flex gap-4 overflow-x-auto py-1 md:gap-5",
              "snap-x snap-mandatory scroll-smooth",
              "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
            )}
            role="region"
            aria-label="Project carousel"
            tabIndex={0}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                priority={index < 2}
                inView={visibleCards.has(index)}
                reduceMotion={!!shouldReduceMotion}
                cardRef={(node) => {
                  cardRefs.current[index] = node;
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
