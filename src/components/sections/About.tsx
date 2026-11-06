"use client";

import { useRef } from "react";
import { aboutCards } from "@/data/site";
import { GeometricPattern, type PatternKind } from "@/components/patterns/GeometricPattern";
import { sectionStack, sectionSurface, sectionSurfaceInner } from "@/lib/sectionStack";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

const patternMap: Record<(typeof aboutCards)[number]["treatment"], PatternKind> = {
  grid: "grid",
  halftone: "halftone",
  diagonal: "diagonal",
  circuit: "circuit",
};

export function About() {
  const root = useRef<HTMLElement>(null);
  const stack = sectionStack(2, "bg");

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;

      gsap.from(".about-card", {
        y: 24,
        opacity: 0,
        stagger: 0.08,
        duration: 0.55,
        ease: "power2.out",
        scrollTrigger: { trigger: root.current, start: "top 55%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="about" {...stack}>
      <div className={sectionSurface()}>
        <div className={sectionSurfaceInner()}>
          <div className="with-nav-offset py-10 md:py-14">
            <header className="mb-8 md:mb-10">
              <div className="mb-3 flex items-center gap-4">
                <span className="text-label">02 / 08</span>
                <span className="text-label text-[var(--text-secondary)]">ABOUT</span>
              </div>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[0.95] tracking-[-0.035em]">
                Identity as layered systems
              </h2>
              <p className="mt-3 max-w-xl font-serif text-[clamp(0.95rem,1.4vw,1.15rem)] text-[var(--text-secondary)]">
                Four surfaces. One practice spanning systems, security, and engineering. Scroll
                inside this panel to read all four.
              </p>
            </header>

            <div className="grid grid-cols-1 gap-4 pb-10 sm:grid-cols-2 md:gap-5">
              {aboutCards.map((card) => (
                <article
                  key={card.id}
                  className="about-card relative overflow-hidden border border-[var(--border)] bg-[var(--card)] p-5 md:min-h-[220px] md:p-6"
                >
                  <GeometricPattern kind={patternMap[card.treatment]} opacity={0.06} />
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <span className="font-display text-4xl text-[var(--text-muted)] md:text-5xl">
                        {card.id}
                      </span>
                      <span className="text-label">{card.title}</span>
                    </div>
                    <h3 className="mb-2 font-display text-[clamp(1.25rem,2.2vw,1.75rem)] tracking-[-0.03em]">
                      {card.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                      {card.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
