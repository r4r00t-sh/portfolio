"use client";

import { useRef } from "react";
import { researchArticles } from "@/data/research";
import { site } from "@/data/site";
import { GeometricPattern } from "@/components/patterns/GeometricPattern";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { sectionStack, sectionSurface, sectionSurfaceInner } from "@/lib/sectionStack";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

const DATE_LABELS: Record<string, string> = {
  "2026-03-28": "28 Mar 2026",
  "2026-03-24": "24 Mar 2026",
  "2026-03-22": "22 Mar 2026",
  "2026-03-21": "21 Mar 2026",
};

function formatDate(iso: string) {
  return DATE_LABELS[iso] ?? iso;
}

export function Research() {
  const root = useRef<HTMLElement>(null);
  const stack = sectionStack(5, "bg");

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;

      gsap.utils.toArray<HTMLElement>(".research-item").forEach((el, i) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: (i % 2) * 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="research" {...stack}>
      <div className={sectionSurface()}>
        <div className={sectionSurfaceInner()}>
      <div className="section-shell">
        <SectionHeader
          index="05 / 08"
          eyebrow="RESEARCH / ANALYSIS / INVESTIGATION"
          title="Research / Analysis / Investigation"
          className="mb-8 md:mb-10"
          description="Malware analysis, reverse engineering, binary exploitation, and security investigations — published as an independent research journal."
        />

        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border border-[var(--border)] bg-[var(--bg-secondary)] px-5 py-4">
          <p className="font-mono text-xs tracking-[0.1em] text-[var(--text-secondary)]">
            PERSONAL RESEARCH BLOG
          </p>
          <ExternalLink href={site.links.blog} className="font-mono text-xs tracking-[0.12em]">
            r4r00t-blog.vercel.app
          </ExternalLink>
        </div>

        <div className="grid gap-px bg-[var(--border)] md:grid-cols-2">
          {researchArticles.map((article, index) => (
            <a
              key={article.id}
              href={article.href}
              target="_blank"
              rel="noopener noreferrer"
              className="research-item group relative block overflow-hidden bg-[var(--bg)] p-6 transition-colors hover:bg-[var(--card)] md:p-8"
            >
              <div className="relative mb-8 aspect-[16/10] overflow-hidden border border-[var(--border)] bg-[var(--bg-secondary)]">
                <GeometricPattern kind={article.pattern} opacity={0.22} />
                <div className="absolute inset-0 flex items-end justify-between p-4">
                  <span className="font-display text-4xl text-[var(--highlight)] opacity-30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="tech-chip">{article.category}</span>
                </div>
              </div>

              <div className="mb-4 flex flex-wrap gap-x-4 gap-y-2 text-label">
                <span>{formatDate(article.date)}</span>
                <span>{article.readingTime}</span>
              </div>

              <h3 className="mb-3 max-w-[22ch] font-display text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.05] tracking-[-0.025em] transition-colors group-hover:text-[var(--highlight)]">
                {article.title}
              </h3>
              <p className="max-w-prose text-sm leading-relaxed text-[var(--text-secondary)]">
                {article.excerpt}
              </p>
            </a>
          ))}
        </div>
      </div>
            </div>
      </div>
    </section>
  );
}
