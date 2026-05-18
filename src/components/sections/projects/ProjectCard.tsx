"use client";

import Image from "next/image";
import { useCallback, useState, type Ref } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Project, isValidHref, getProjectHref } from "./data";
import { CARD_ROUNDED, cardTransition, useTouchDevice } from "./hooks";

export function ProjectCardImage({
  project,
  priority,
  className,
}: {
  project: Project;
  priority: boolean;
  className?: string;
}) {
  const imageClass = cn(
    "absolute inset-0 h-full w-full transition-transform duration-700 ease-out",
    className,
  );
  const imageStyle = project.imagePosition
    ? { objectPosition: project.imagePosition }
    : undefined;

  if (/\.svg$/i.test(project.image)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- Next/Image does not render public SVGs reliably
      <img
        src={project.image}
        alt=""
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        loading={priority ? "eager" : "lazy"}
        className={imageClass}
        style={imageStyle}
      />
    );
  }

  return (
    <Image
      src={project.image}
      alt=""
      fill
      priority={priority}
      sizes="(max-width: 640px) 78vw, 328px"
      className={imageClass}
      style={imageStyle}
    />
  );
}

export function ProjectCard({
  project,
  priority,
  inView,
  cardRef,
  reduceMotion,
}: {
  project: Project;
  priority: boolean;
  inView: boolean;
  cardRef: Ref<HTMLElement>;
  reduceMotion: boolean;
}) {
  const href = getProjectHref(project);
  const showGithub =
    isValidHref(project.github) &&
    project.github !== project.link &&
    project.github !== href;

  const [hovered, setHovered] = useState(false);
  const isTouch = useTouchDevice();

  const expanded = isTouch ? inView : hovered;
  const transition = cardTransition(reduceMotion);

  const setActive = useCallback(
    (active: boolean) => {
      if (!isTouch) setHovered(active);
    },
    [isTouch],
  );

  return (
    <article
      ref={cardRef}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setActive(false);
      }}
      className={cn(
        "group/card relative isolate shrink-0 snap-start",
        "w-[min(72vw,16.5rem)] sm:w-[18rem] md:w-[19.5rem]",
        "aspect-[3/4]",
        CARD_ROUNDED,
        "overflow-hidden border border-border/50 bg-muted/30",
        "shadow-sm transition-[transform,box-shadow,border-color] duration-500 ease-out",
        expanded &&
          inView &&
          "z-10 -translate-y-1 border-primary/35 shadow-xl shadow-primary/15",
      )}
    >
      {/* Image layer */}
      <motion.div
        className={cn(
          "absolute inset-0 overflow-hidden",
          CARD_ROUNDED,
          project.imageContainerClassName,
        )}
        animate={{
          filter: isTouch
            ? "blur(0px) brightness(1)"
            : inView
              ? expanded
                ? "blur(6px) brightness(0.45)"
                : "blur(0px) brightness(1)"
              : "blur(8px) brightness(1)",
          opacity: isTouch ? 1 : inView ? 1 : 0.55,
          scale: isTouch ? 1 : inView ? (expanded ? 1.05 : 1) : 1.03,
        }}
        transition={transition}
      >
        <ProjectCardImage
          project={project}
          priority={priority}
          className={cn(
            "absolute inset-0 h-full w-full",
            project.imageFit === "contain"
              ? "object-contain object-center p-3 sm:p-4"
              : "object-cover object-center",
          )}
        />
      </motion.div>

      {/* Desktop hover overlay */}
      {!isTouch && (
        <motion.div
          className={cn(
            "absolute inset-0 z-10 flex flex-col justify-between overflow-hidden p-5 sm:p-6",
            CARD_ROUNDED,
          )}
          initial={false}
          animate={{ opacity: expanded ? 1 : 0 }}
          transition={transition}
          style={{ pointerEvents: expanded ? "auto" : "none" }}
        >
          <motion.div
            className={cn(
              "absolute inset-0 bg-black/75 backdrop-blur-md",
              CARD_ROUNDED,
            )}
            initial={false}
            animate={{ opacity: expanded ? 1 : 0 }}
            transition={transition}
            aria-hidden
          />

          <motion.div
            className="relative space-y-2.5"
            initial={false}
            animate={{ opacity: expanded ? 1 : 0, y: expanded ? 0 : 14 }}
            transition={{ ...transition, delay: expanded ? 0.05 : 0 }}
          >
            <h3 className="text-lg font-bold tracking-tight text-white sm:text-xl">
              {project.title}
            </h3>
            <p className="text-xs leading-relaxed text-white/80 sm:text-sm">
              {project.description}
            </p>
          </motion.div>

          <motion.div
            className="relative flex items-end justify-between gap-3 pt-3"
            initial={false}
            animate={{ opacity: expanded ? 1 : 0, y: expanded ? 0 : 18 }}
            transition={{ ...transition, delay: expanded ? 0.1 : 0 }}
          >
            <div className="flex min-w-0 flex-1 flex-wrap gap-1.5">
              {project.tags.slice(0, 4).map((tag, tagIndex) => (
                <motion.span
                  key={tag}
                  initial={false}
                  animate={{ opacity: expanded ? 1 : 0, y: expanded ? 0 : 8 }}
                  transition={{
                    ...transition,
                    delay: expanded ? 0.12 + tagIndex * 0.04 : 0,
                  }}
                  className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {showGithub && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-30 flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-background/80 text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label={`${project.title} source code on GitHub`}
                  onClick={(e) => e.stopPropagation()}
                  tabIndex={expanded ? 0 : -1}
                >
                  <Github className="h-4 w-4" aria-hidden />
                </a>
              )}
              {href && (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={expanded ? 0 : -1}
                  className={cn(
                    "relative z-30 flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-background/80 text-foreground transition-colors hover:bg-primary hover:text-primary-foreground",
                    expanded && "bg-primary text-primary-foreground",
                  )}
                  aria-label={`Open ${project.title}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Mobile animated bottom panel */}
      {isTouch && (
        <motion.div
          className="absolute bottom-0 inset-x-0 z-10 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-10 pb-4 px-4"
          initial={false}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 16 }}
          transition={transition}
        >
          <motion.h3
            className="text-base font-bold text-white leading-tight"
            initial={false}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 10 }}
            transition={{ ...transition, delay: inView ? 0.05 : 0 }}
          >
            {project.title}
          </motion.h3>
          <motion.p
            className="text-[11px] text-white/75 mt-1 line-clamp-2 leading-relaxed"
            initial={false}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 8 }}
            transition={{ ...transition, delay: inView ? 0.1 : 0 }}
          >
            {project.description}
          </motion.p>
          <motion.div
            className="flex items-end justify-between gap-2 mt-2"
            initial={false}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 6 }}
            transition={{ ...transition, delay: inView ? 0.15 : 0 }}
          >
            <div className="flex flex-wrap gap-1">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wide text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
            {href && (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
                aria-label={`Open ${project.title}`}
              >
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            )}
          </motion.div>
        </motion.div>
      )}

      {href && !expanded && !isTouch && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-20 rounded-[inherit] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={`Open ${project.title}`}
        >
          <span className="sr-only">Open {project.title}</span>
        </a>
      )}
    </article>
  );
}
