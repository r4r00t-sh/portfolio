import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

type Tone = "bg" | "secondary" | "card";

const toneMap: Record<Tone, string> = {
  bg: "var(--bg)",
  secondary: "var(--bg-secondary)",
  card: "var(--card)",
};

/** Shared sticky stack panel classes + CSS vars for z-index / surface. */
export function sectionStack(z: number, tone: Tone = "bg", className?: string) {
  return {
    className: cn("section-stack-panel", className),
    style: {
      ["--stack-z"]: z,
      ["--stack-bg"]: toneMap[tone],
    } as CSSProperties,
  };
}

/**
 * Tall host for horizontal strips. Keeps the React-owned node under <main>
 * so ScrollTrigger never wraps a React child in a pin-spacer (removeChild crash).
 */
export function sectionPinHost(className?: string) {
  return cn("section-stack-pin-host", className);
}

/** Sticky viewport surface — scrolls its content before the stack advances. */
export function sectionSurface(className?: string) {
  return cn("section-stack-surface", className);
}

/** Inner layer for parallax scale (never put transforms on the sticky surface). */
export function sectionSurfaceInner(className?: string) {
  return cn("section-stack-surface-inner min-h-full w-full", className);
}
