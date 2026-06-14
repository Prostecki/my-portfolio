"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";

type Variant = "fadeUp" | "fadeLeft" | "fadeRight" | "fadeIn";

const VARIANTS: Record<
  Variant,
  { initial: { opacity: number; x?: number; y?: number }; animate: { opacity: number; x?: number; y?: number } }
> = {
  fadeUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
  },
  fadeRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
};

type MotionRevealProps = HTMLMotionProps<"div"> & {
  variant?: Variant;
  delay?: number;
};

export function MotionReveal({
  variant = "fadeUp",
  delay = 0,
  children,
  ...props
}: MotionRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const { initial, animate } = VARIANTS[variant];

  return (
    <motion.div
      initial={shouldReduceMotion ? animate : initial}
      whileInView={animate}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
