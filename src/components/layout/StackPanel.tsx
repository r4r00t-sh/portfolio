import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "bg" | "secondary" | "card";

const toneMap: Record<Tone, string> = {
  bg: "var(--bg)",
  secondary: "var(--bg-secondary)",
  card: "var(--card)",
};

type Props = {
  id?: string;
  z: number;
  tone?: Tone;
  className?: string;
  surfaceClassName?: string;
  children: ReactNode;
};

/** Sticky full-viewport stack panel with an inner surface for parallax transforms. */
export function StackPanel({
  id,
  z,
  tone = "bg",
  className,
  surfaceClassName,
  children,
}: Props) {
  return (
    <section
      id={id}
      className={cn("section-stack-panel", className)}
      style={
        {
          ["--stack-z"]: z,
          ["--stack-bg"]: toneMap[tone],
        } as React.CSSProperties
      }
    >
      <div className={cn("section-stack-surface", surfaceClassName)}>{children}</div>
    </section>
  );
}
