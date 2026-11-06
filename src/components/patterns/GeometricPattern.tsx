"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

export type PatternKind =
  | "grid"
  | "halftone"
  | "diagonal"
  | "crosshatch"
  | "radial"
  | "circuit"
  | "blueprint"
  | "concentric"
  | "noise";

type Props = {
  kind: PatternKind;
  className?: string;
  opacity?: number;
};

export function GeometricPattern({ kind, className, opacity = 0.18 }: Props) {
  const uid = useId().replace(/:/g, "");

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden text-[var(--pattern-ink)]",
        className,
      )}
      style={{ opacity }}
    >
      {kind === "grid" && <GridPattern id={uid} />}
      {kind === "halftone" && <HalftonePattern id={uid} />}
      {kind === "diagonal" && <DiagonalPattern id={uid} />}
      {kind === "crosshatch" && <CrosshatchPattern id={uid} />}
      {kind === "radial" && <RadialPattern />}
      {kind === "circuit" && <CircuitPattern id={uid} />}
      {kind === "blueprint" && <BlueprintPattern id={uid} />}
      {kind === "concentric" && <ConcentricPattern />}
      {kind === "noise" && <NoisePattern />}
    </div>
  );
}

function GridPattern({ id }: { id: string }) {
  const pid = `fine-grid-${id}`;
  return (
    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={pid} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${pid})`} />
    </svg>
  );
}

function HalftonePattern({ id }: { id: string }) {
  const pid = `halftone-${id}`;
  return (
    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={pid} width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.1" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${pid})`} />
    </svg>
  );
}

function DiagonalPattern({ id }: { id: string }) {
  const pid = `diag-${id}`;
  return (
    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={pid} width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="12" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${pid})`} />
    </svg>
  );
}

function CrosshatchPattern({ id }: { id: string }) {
  const pid = `cross-${id}`;
  return (
    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={pid} width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M0 0 L14 14 M14 0 L0 14" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${pid})`} />
    </svg>
  );
}

function RadialPattern() {
  return (
    <svg className="h-full w-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        const x = 100 + Math.cos(angle) * 120;
        const y = 100 + Math.sin(angle) * 120;
        return <line key={i} x1="100" y1="100" x2={x} y2={y} stroke="currentColor" strokeWidth="0.5" />;
      })}
    </svg>
  );
}

function CircuitPattern({ id }: { id: string }) {
  const pid = `circuit-${id}`;
  return (
    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={pid} width="48" height="48" patternUnits="userSpaceOnUse">
          <path
            d="M0 24 H18 M30 24 H48 M24 0 V18 M24 30 V48"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.7"
          />
          <rect x="18" y="18" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="24" cy="24" r="2" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${pid})`} />
    </svg>
  );
}

function BlueprintPattern({ id }: { id: string }) {
  const pid = `blueprint-${id}`;
  return (
    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={pid} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.35" />
          <path
            d="M 8 0 L 8 40 M 16 0 L 16 40 M 24 0 L 24 40 M 32 0 L 32 40 M 0 8 L 40 8 M 0 16 L 40 16 M 0 24 L 40 24 M 0 32 L 40 32"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.15"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${pid})`} />
    </svg>
  );
}

function ConcentricPattern() {
  return (
    <svg className="h-full w-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: 10 }).map((_, i) => (
        <circle key={i} cx="100" cy="100" r={12 + i * 14} fill="none" stroke="currentColor" strokeWidth="0.6" />
      ))}
    </svg>
  );
}

function NoisePattern() {
  return (
    <div
      className="h-full w-full"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}
