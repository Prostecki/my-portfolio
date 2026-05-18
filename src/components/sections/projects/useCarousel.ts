"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import {
  VIEWPORT_THRESHOLD,
  getCarouselCards,
  getActiveCardIndex,
  scrollCardIntoView,
} from "./utils";

export function useCarousel(
  cardRefs: MutableRefObject<(HTMLElement | null)[]>,
  shouldReduceMotion: boolean | null,
) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
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
    [cardRefs, shouldReduceMotion],
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
  }, [cardRefs]);

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
  }, [cardRefs, updateScrollState]);

  return { visibleCards, canScrollLeft, canScrollRight, scroll, scrollRef, viewportRef, updateScrollState };
}
