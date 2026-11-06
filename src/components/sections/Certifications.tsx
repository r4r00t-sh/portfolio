"use client";

import { useRef } from "react";
import { achievements, certifications } from "@/data/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GeometricPattern } from "@/components/patterns/GeometricPattern";
import { sectionStack, sectionSurface, sectionSurfaceInner } from "@/lib/sectionStack";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

export function Certifications() {
  const root = useRef<HTMLElement>(null);
  /* Leave sticky stack — timeline + achievements are taller than one viewport. */
  const stack = sectionStack(7, "card", "section-stack-end");

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;

      gsap.from(".cert-item", {
        x: -24,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: ".cert-timeline", start: "top 80%" },
      });

      gsap.from(".achieve-card", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: ".achieve-grid", start: "top 85%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="credentials" {...stack}>
      <div className={sectionSurface()}>
        <div className={sectionSurfaceInner()}>
      <div className="section-shell">
        <SectionHeader
          index="07 / 08"
          eyebrow="CERTIFICATIONS & ACHIEVEMENTS"
          title="Credentials / milestones"
          description="An editorial timeline of certifications and competitive results."
          className="mb-8 md:mb-10"
        />

        <div className="cert-timeline mb-16 space-y-0 border-l border-[var(--border)] pl-6 md:pl-10">
          {certifications.map((cert) => (
            <article key={cert.id} className="cert-item relative pb-12 last:pb-0">
              <span className="absolute -left-[1.9rem] top-1 h-3 w-3 border border-[var(--highlight)] bg-[var(--bg)] md:-left-[2.9rem]" />
              <p className="text-label mb-2">
                {cert.id} / {cert.period}
              </p>
              <h3 className="mb-2 max-w-3xl font-display text-[clamp(1.5rem,3vw,2.4rem)] tracking-[-0.03em]">
                {cert.title}
              </h3>
              <p className="font-mono text-xs tracking-[0.1em] text-[var(--text-muted)]">{cert.org}</p>
            </article>
          ))}
        </div>

        <div className="achieve-grid grid gap-4 md:grid-cols-2">
          {achievements.map((item) => (
            <article
              key={item.label}
              className="achieve-card relative overflow-hidden border border-[var(--border)] bg-[var(--card)] p-8 md:p-10"
            >
              <GeometricPattern kind="radial" opacity={0.1} />
              <div className="relative z-10">
                <p className="font-display text-[clamp(4rem,10vw,8rem)] leading-none tracking-[-0.05em] text-[var(--highlight)]">
                  {item.number}
                </p>
                <p className="text-label mt-4 mb-3">{item.label}</p>
                <p className="max-w-md text-[var(--text-secondary)]">{item.detail}</p>
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
