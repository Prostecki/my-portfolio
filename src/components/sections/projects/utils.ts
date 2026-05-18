import { type MutableRefObject } from "react";
import { type Transition } from "framer-motion";

export const CARD_EASE = [0.22, 1, 0.36, 1] as const;
export const VIEWPORT_THRESHOLD = 0.55;
export const CARD_ROUNDED = "rounded-[1.75rem] md:rounded-[2rem]";

export function getCarouselCards(
  cardRefs: MutableRefObject<(HTMLElement | null)[]>,
): HTMLElement[] {
  return cardRefs.current.filter((card): card is HTMLElement => card !== null);
}

export function getCardScrollLeft(container: HTMLElement, card: HTMLElement) {
  const containerRect = container.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  return cardRect.left - containerRect.left + container.scrollLeft;
}

/** Index of the card currently snapped to the leading edge of the track. */
export function getActiveCardIndex(container: HTMLElement, cards: HTMLElement[]) {
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

export function scrollCardIntoView(
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

export const cardTransition = (reduced: boolean): Transition => ({
  duration: reduced ? 0.01 : 0.4,
  ease: CARD_EASE,
});
