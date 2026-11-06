"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { GeometricPattern } from "@/components/patterns/GeometricPattern";
import { skillCategories, searchSkills, type SkillCategory } from "@/data/skills";
import {
  sectionPinHost,
  sectionStack,
  sectionSurface,
  sectionSurfaceInner,
} from "@/lib/sectionStack";
import { ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/cn";

export function Arsenal() {
  const root = useRef<HTMLElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const stack = sectionStack(3, "secondary");

  const results = useMemo(() => searchSkills(query), [query]);
  const filtered = useMemo(() => {
    if (!query.trim()) return skillCategories;
    const ids = new Set(results.map((r) => r.category.id));
    return skillCategories.filter((c) => ids.has(c.id));
  }, [query, results]);

  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [filtered.length]);

  // Desktop only — pointer capture steals touch and breaks native swipe on phones.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    if (window.matchMedia("(max-width: 899px), (pointer: coarse)").matches) return;

    let dragging = false;
    let startX = 0;
    let startLeft = 0;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, button, a")) return;
      dragging = true;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      el.scrollLeft = startLeft - (e.clientX - startX);
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      el.style.cursor = "";
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
    };
  }, [filtered.length]);

  return (
    <div className={sectionPinHost()} data-h-pin-host>
      <section ref={root} id="expertise" {...stack}>
        <div className={sectionSurface()} data-scroll-mode="horizontal">
          <div className={sectionSurfaceInner("flex min-w-0 flex-col")}>
            <div className="flex h-full min-h-0 w-full min-w-0 flex-col pt-8 min-[900px]:pt-6">
              <div className="with-nav-offset w-full min-w-0 shrink-0 pb-3">
                <div className="mb-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div className="min-w-0">
                    <p className="text-label mb-2">03 / 08 — TECHNICAL ARSENAL</p>
                    <h2 className="font-display text-[clamp(2rem,4.5vw,4.2rem)] leading-[0.95] tracking-[-0.035em]">
                      The Technical Arsenal
                    </h2>
                    <p className="mt-2 max-w-xl font-serif text-[clamp(0.95rem,1.3vw,1.1rem)] text-[var(--text-secondary)]">
                      Eighteen categories. On desktop, keep scrolling to move sideways. On phones,
                      swipe the strip.
                    </p>
                  </div>

                  <label className="relative w-full max-w-md shrink-0">
                    <span className="sr-only">Search skills</span>
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search technologies…"
                      className="w-full border border-[var(--border)] bg-[var(--bg)] py-3 pl-10 pr-4 font-mono text-xs tracking-[0.08em] text-[var(--text)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--highlight)]"
                    />
                  </label>
                </div>

                <div className="mb-2 h-px overflow-hidden bg-[var(--border)]">
                  <div
                    data-h-progress
                    className="h-full origin-left scale-x-0 bg-[var(--highlight)]"
                    aria-hidden
                  />
                </div>
              </div>

              <div
                ref={scroller}
                data-h-scroll
                className="with-nav-offset min-h-0 w-full min-w-0 flex-1 pb-6 pt-2"
              >
                <div className="flex w-max items-stretch gap-4 pr-4">
                  {filtered.map((category) => (
                    <ArsenalPanel
                      key={category.id}
                      category={category}
                      highlight={query.trim().toLowerCase()}
                    />
                  ))}
                </div>
              </div>

              {query.trim() && results.length === 0 && (
                <p className="with-nav-offset pb-8 font-mono text-sm text-[var(--text-muted)]">
                  No skills matched “{query}”.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ArsenalPanel({
  category,
  highlight,
}: {
  category: SkillCategory;
  highlight: string;
}) {
  return (
    <article className="horizontal-panel relative shrink-0">
      <GeometricPattern kind={category.pattern} opacity={0.09} />
      <div className="horizontal-panel-body relative z-10 flex flex-col p-5 md:p-7">
        <div className="mb-4 flex shrink-0 items-start justify-between gap-4">
          <span className="font-display text-4xl text-[var(--text-muted)] md:text-5xl">
            {category.number}
          </span>
          <span className="text-label text-right">{category.annotation}</span>
        </div>

        <h3
          className={cn(
            "mb-4 shrink-0 font-display tracking-[-0.03em]",
            category.layout === "large"
              ? "text-[clamp(1.8rem,3vw,3rem)] leading-[0.95]"
              : "text-[clamp(1.4rem,2.4vw,2.1rem)] leading-[1]",
          )}
        >
          {category.title}
        </h3>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <SkillList category={category} highlight={highlight} />
        </div>
      </div>
    </article>
  );
}

function SkillList({
  category,
  highlight,
}: {
  category: SkillCategory;
  highlight: string;
}) {
  const hit = (item: string) => Boolean(highlight) && item.toLowerCase().includes(highlight);

  if (category.layout === "dense") {
    return (
      <ul className="flex flex-wrap gap-2">
        {category.items.map((item) => (
          <li key={item} className={cn("tech-chip", hit(item) && "skill-hit")}>
            {item}
          </li>
        ))}
      </ul>
    );
  }

  if (category.layout === "grid") {
    return (
      <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
        {category.items.map((item) => (
          <li
            key={item}
            className={cn(
              "border-b border-[var(--border)] py-1.5 font-mono text-[11px] tracking-[0.06em] text-[var(--text-secondary)]",
              hit(item) && "skill-hit px-1",
            )}
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }

  if (category.layout === "split") {
    const mid = Math.ceil(category.items.length / 2);
    const left = category.items.slice(0, mid);
    const right = category.items.slice(mid);
    return (
      <div className="grid grid-cols-2 gap-6">
        {[left, right].map((col, i) => (
          <ul key={i} className="space-y-1.5">
            {col.map((item) => (
              <li
                key={item}
                className={cn(
                  "font-mono text-[11px] tracking-[0.06em] text-[var(--text-secondary)]",
                  hit(item) && "skill-hit inline-block px-1",
                )}
              >
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    );
  }

  if (category.layout === "large") {
    return (
      <ul className="space-y-2">
        {category.items.map((item) => (
          <li
            key={item}
            className={cn(
              "font-display text-[clamp(1.05rem,1.7vw,1.35rem)] tracking-[-0.02em] text-[var(--text)]",
              hit(item) && "skill-hit inline-block px-1",
            )}
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }

  if (category.layout === "stacked") {
    return (
      <ul>
        {category.items.map((item) => (
          <li
            key={item}
            className={cn(
              "border-t border-[var(--border)] py-3 font-serif text-xl text-[var(--text)]",
              hit(item) && "skill-hit",
            )}
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="columns-2 gap-6 space-y-2">
      {category.items.map((item) => (
        <li
          key={item}
          className={cn(
            "break-inside-avoid font-mono text-[11px] tracking-[0.05em] text-[var(--text-secondary)]",
            hit(item) && "skill-hit inline-block px-1",
          )}
        >
          — {item}
        </li>
      ))}
    </ul>
  );
}
