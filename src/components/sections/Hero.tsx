"use client";

import Image from "next/image";
import { useRef } from "react";
import { site } from "@/data/site";
import { GeometricPattern } from "@/components/patterns/GeometricPattern";
import { sectionStack, sectionSurface, sectionSurfaceInner } from "@/lib/sectionStack";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const stack = sectionStack(1, "bg");

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-meta", { y: 24, opacity: 0, duration: 0.7, stagger: 0.08 })
        .from(".hero-title-word", { yPercent: 110, duration: 1, stagger: 0.08 }, "-=0.35")
        .from(".hero-copy", { y: 28, opacity: 0, duration: 0.8, stagger: 0.1 }, "-=0.55")
        .from(".hero-visual", { opacity: 0, scale: 1.04, duration: 1.1 }, "-=0.9")
        .from(".hero-scroll", { opacity: 0, y: 12, duration: 0.6 }, "-=0.4");

      gsap.to(".hero-orbit", {
        rotate: 360,
        duration: 80,
        repeat: -1,
        ease: "none",
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" {...stack}>
      <div className={sectionSurface("relative isolate")} data-scroll-mode="page">
        <div className={sectionSurfaceInner()}>
      <GeometricPattern kind="grid" opacity={0.08} className="z-0" />

      <div className="relative z-10 grid h-[100svh] grid-cols-1 lg:grid-cols-12">
        <div className="relative z-20 flex flex-col justify-end overflow-visible with-nav-offset pb-12 pt-20 lg:col-span-7 lg:pb-16 lg:pt-24 lg:pr-0">
          <div className="mb-8 space-y-2">
            <p className="hero-meta text-label">{site.meta.lineA}</p>
            <p className="hero-meta text-label text-[var(--text-secondary)]">{site.meta.lineB}</p>
          </div>

          <h1 className="hero-title mb-8 text-[var(--highlight)]">
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="hero-title-word block whitespace-nowrap pr-[0.14em] font-display text-[clamp(3rem,8.2vw,9rem)] font-bold leading-[0.9] tracking-[-0.03em]">
                KEERTHANAN
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="hero-title-word block whitespace-nowrap pr-[0.14em] font-serif text-[clamp(3rem,8.2vw,9rem)] font-normal italic leading-[0.9] tracking-[-0.03em]">
                PS.
              </span>
            </span>
          </h1>

          <div className="hero-copy mb-8 max-w-md space-y-1 font-serif text-[clamp(1.25rem,2.4vw,1.85rem)] leading-snug text-[var(--text)]">
            {site.tagline.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <p className="hero-copy mb-10 max-w-lg text-[var(--text-secondary)]">{site.summary}</p>

          <div className="hero-copy flex flex-wrap gap-3">
            <a href="#projects" className="btn-solid">
              [ Explore Work ]
            </a>
            <a
              href={site.links.resume}
              download="Keerthanan-PS-Resume.pdf"
              className="btn-ghost"
            >
              [ Download Resume ]
            </a>
            <a href="#contact" className="btn-ghost">
              [ Get In Touch ]
            </a>
          </div>

          <div className="hero-scroll mt-16 flex items-center gap-4 text-label">
            <span className="inline-block h-10 w-px bg-[var(--border)]" />
            <span>SCROLL / 00 — 08</span>
          </div>
        </div>

        <div className="hero-visual relative z-10 hidden items-stretch lg:col-span-5 lg:flex lg:min-h-full lg:pr-0">
          <div className="relative w-full overflow-hidden bg-[var(--bg-secondary)]">
            <GeometricPattern kind="blueprint" opacity={0.35} className="z-0" />
            <Image
              src="/images/1.png"
              alt="Portrait of Keerthanan PS"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 42vw"
              className="mono-portrait relative z-[1] object-cover object-left"
            />

            <div className="absolute left-4 top-4 z-[2] space-y-1 bg-[var(--bg)]/80 px-2 py-1.5 font-mono text-[10px] tracking-[0.14em] text-[var(--text-muted)] backdrop-blur-[2px]">
              <p>X: 08.0808</p>
              <p>Y: 11.1111</p>
              <p>REF: KP-001</p>
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-[2] flex items-end justify-between gap-4">
              <p className="bg-[var(--bg)]/85 px-2 py-1.5 font-mono text-[10px] leading-relaxed tracking-[0.12em] text-[var(--text)] backdrop-blur-[2px]">
                SYSTEMS &amp; SECURITY STUDY
              </p>
              <span className="font-display text-4xl text-[var(--highlight)] opacity-50">01</span>
            </div>

            <svg
              className="hero-orbit pointer-events-none absolute -right-16 -top-16 z-[2] h-56 w-56 text-[var(--border)]"
              viewBox="0 0 200 200"
              aria-hidden
            >
              <circle cx="100" cy="100" r="78" fill="none" stroke="currentColor" strokeWidth="0.8" />
              <circle cx="100" cy="100" r="58" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
              <circle cx="178" cy="100" r="3" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
        </div>
      </div>
    </section>
  );
}
