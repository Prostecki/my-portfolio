"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type MutableRefObject,
  type Ref,
} from "react";
import { motion, useReducedMotion, type Transition } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { cn } from "@/lib/utils";

const CARD_EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT_THRESHOLD = 0.55;
const CARD_ROUNDED = "rounded-[1.75rem] md:rounded-[2rem]";

function getCarouselCards(
  cardRefs: MutableRefObject<(HTMLElement | null)[]>,
): HTMLElement[] {
  return cardRefs.current.filter((card): card is HTMLElement => card !== null);
}

function getCardScrollLeft(container: HTMLElement, card: HTMLElement) {
  const containerRect = container.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  return cardRect.left - containerRect.left + container.scrollLeft;
}

/** Index of the card currently snapped to the leading edge of the track. */
function getActiveCardIndex(container: HTMLElement, cards: HTMLElement[]) {
  if (cards.length === 0) return 0;

  const scrollLeft = container.scrollLeft;
  let activeIndex = 0;
  let minDistance = Infinity;

  for (let i = 0; i < cards.length; i++) {
    const cardLeft = getCardScrollLeft(container, cards[i]);
    const distance = Math.abs(cardLeft - scrollLeft);
    if (distance < minDistance) {
      minDistance = distance;
      activeIndex = i;
    }
  }

  return activeIndex;
}

function scrollCardIntoView(
  container: HTMLElement,
  card: HTMLElement,
  behavior: ScrollBehavior,
) {
  const targetLeft = getCardScrollLeft(container, card);
  const maxScroll = Math.max(0, container.scrollWidth - container.clientWidth);

  container.scrollTo({
    left: Math.max(0, Math.min(targetLeft, maxScroll)),
    behavior,
  });
}

const cardTransition = (reduced: boolean): Transition => ({
  duration: reduced ? 0.01 : 0.4,
  ease: CARD_EASE,
});

type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  github: string;
  imageFit?: "cover" | "contain";
  imagePosition?: string;
  imageContainerClassName?: string;
};

const projects: Project[] = [
  {
    title: "Athlete AI",
    description:
      "Nutrition and training AI coaches that stay in sync. Next.js landing with live agent demo, waitlist, and a multi-agent GCP backend (A2A).",
    image: "/athlete-ai-preview.png",
    imageFit: "cover",
    imagePosition: "-5% center",
    imageContainerClassName: "bg-[#07090f]",
    tags: [
      "Next.js",
      "React 19",
      "Tailwind CSS",
      "Framer Motion",
      "Google ADK",
      "A2A",
      "GCP",
    ],
    link: "https://athlete-ai.tech/",
    github: "#",
  },
  {
    title: "Kyra — MCP Design System Server",
    description:
      "MCP server linking coding agents to Figma and enforcing design tokens at generation time. Architecture, MVP, and compliance scorecard — Cline Hackathon, Team Husqvarna (2026).",
    image: "/kyra-project-card.png",
    imageFit: "contain",
    imageContainerClassName: "bg-black",
    tags: ["Python", "FastMCP", "MCP Protocol", "Figma API"],
    link: "#",
    github: "#",
  },
  {
    title: "Med Voice",
    description:
      "Voice-first clinical automation with Gemini Live (ADK). Serverless on Cloud Run with Cloud Tasks, Firestore, and Twilio voice/WebSocket.",
    image: "/med_voice.png",
    tags: [
      "Gemini Live",
      "Google ADK",
      "GCP",
      "Cloud Run",
      "Terraform",
      "Twilio",
      "Firestore",
    ],
    link: "https://github.com/Prostecki/med-voice",
    github: "https://github.com/Prostecki/med-voice",
  },
  {
    title: "BNB Application",
    description:
      "Airbnb-style rentals — browse, book, and manage listings. Next.js frontend with a Hono API backend.",
    image: "/bnb_app.png",
    tags: ["Next.js", "Hono", "Supabase", "Docker", "TypeScript"],
    link: "",
    github: "https://github.com/Prostecki/bnb-application",
  },
  {
    title: "AI Bookstore Agent",
    description:
      "RAG bookstore agent over 270k+ titles in BigQuery with Vertex vector search. One chat for discovery, cart, checkout, and orders.",
    image: "/ai_bookstore_agent.png",
    tags: [
      "Python",
      "Google ADK",
      "Vertex AI",
      "Gemini Embeddings",
      "BigQuery",
      "Vector Search",
      "Next.js",
      "Terraform",
    ],
    link: "#",
    github: "#",
  },
  {
    title: "GCP Event-Driven Image Processing Pipeline",
    description:
      "Event-driven image pipeline on GCP (Terraform): Storage, Pub/Sub, Cloud Functions, and Vision API metadata extraction.",
    image: "/gcp_pipeline.png",
    tags: [
      "GCP",
      "Terraform",
      "Node.js",
      "Eventarc",
      "Vision API",
      "Cloud Functions",
    ],
    link: "https://github.com/Prostecki/gcp-event-driven-image-pipeline",
    github: "https://github.com/Prostecki/gcp-event-driven-image-pipeline",
  },
];

function isValidHref(href: string) {
  return Boolean(href && href !== "#");
}

function getProjectHref(project: Project) {
  if (isValidHref(project.link)) return project.link;
  if (isValidHref(project.github)) return project.github;
  return null;
}

function ProjectCardImage({
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

function ProjectCard({
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
  const isTouch = useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia("(hover: none) and (pointer: coarse)");
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    () => window.matchMedia("(hover: none) and (pointer: coarse)").matches,
    () => false,
  );

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

export function Projects() {
  const shouldReduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const focusedIndexRef = useRef(0);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(
    () => new Set([0]),
  );
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 8);
  }, []);

  const scroll = useCallback(
    (direction: "left" | "right") => {
      const container = scrollRef.current;
      if (!container) return;

      const cards = getCarouselCards(cardRefs);
      if (cards.length === 0) return;

      const syncedIndex = getActiveCardIndex(container, cards);
      const currentIndex = focusedIndexRef.current;

      if (Math.abs(syncedIndex - currentIndex) <= 1) {
        focusedIndexRef.current = syncedIndex;
      }

      const nextIndex =
        direction === "left"
          ? Math.max(0, focusedIndexRef.current - 1)
          : Math.min(cards.length - 1, focusedIndexRef.current + 1);

      if (nextIndex === focusedIndexRef.current) return;

      focusedIndexRef.current = nextIndex;

      scrollCardIntoView(
        container,
        cards[nextIndex],
        shouldReduceMotion ? "auto" : "smooth",
      );
    },
    [shouldReduceMotion],
  );

  useLayoutEffect(() => {
    const root = viewportRef.current;
    if (!root) return;

    const observers: IntersectionObserver[] = [];

    const connect = () => {
      observers.forEach((observer) => observer.disconnect());
      observers.length = 0;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const observer = new IntersectionObserver(
          ([entry]) => {
            setVisibleCards((prev) => {
              const next = new Set(prev);
              const mostlyVisible =
                entry.isIntersecting &&
                entry.intersectionRatio >= VIEWPORT_THRESHOLD;

              if (mostlyVisible) next.add(index);
              else next.delete(index);

              return next;
            });
          },
          {
            root,
            threshold: [0, VIEWPORT_THRESHOLD, 0.85, 1],
          },
        );

        observer.observe(card);
        observers.push(observer);
      });
    };

    connect();
    const frame = requestAnimationFrame(connect);

    return () => {
      cancelAnimationFrame(frame);
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    updateScrollState();
    const onResize = () => updateScrollState();
    const onScroll = () => {
      updateScrollState();
      const cards = getCarouselCards(cardRefs);
      if (cards.length > 0) {
        focusedIndexRef.current = getActiveCardIndex(container, cards);
      }
    };

    window.addEventListener("resize", onResize);
    container.addEventListener("scroll", onScroll, { passive: true });
    container.addEventListener("scrollend", onScroll);

    return () => {
      window.removeEventListener("resize", onResize);
      container.removeEventListener("scroll", onScroll);
      container.removeEventListener("scrollend", onScroll);
    };
  }, [updateScrollState]);

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
          className="relative overflow-hidden rounded-[1.75rem] md:rounded-[2rem]"
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
