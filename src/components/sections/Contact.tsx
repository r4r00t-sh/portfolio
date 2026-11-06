"use client";

import Image from "next/image";
import { useRef } from "react";
import { site } from "@/data/site";
import { GeometricPattern } from "@/components/patterns/GeometricPattern";
import { ExternalLink } from "@/components/ui/ExternalLink";
import HalftoneWordmarkFooter from "@/components/ui/halftone-wordmark-footer";
import { sectionStack, sectionSurface, sectionSurfaceInner } from "@/lib/sectionStack";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

const socials = [
  { label: "GitHub", href: site.links.github },
  { label: "LinkedIn", href: site.links.linkedin },
  { label: "TryHackMe", href: site.links.tryhackme },
  { label: "Research Blog", href: site.links.blog },
] as const;

const footerColumns = [
  {
    title: "Navigate",
    links: [
      { label: "About", href: "#about" },
      { label: "Expertise", href: "#expertise" },
      { label: "Projects", href: "#projects" },
    ],
  },
  {
    title: "Research",
    links: [
      { label: "Blog", href: site.links.blog },
      { label: "Journal", href: "#research" },
      { label: "Credentials", href: "#credentials" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: site.email, href: `mailto:${site.email}` },
      { label: "Resume", href: site.links.resume },
      { label: "GitHub", href: site.links.github },
      { label: "LinkedIn", href: site.links.linkedin },
    ],
  },
];

export function Contact() {
  const root = useRef<HTMLElement>(null);
  const stack = sectionStack(8, "bg", "section-stack-end");

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;

      gsap.from(".contact-line", {
        yPercent: 100,
        stagger: 0.08,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="contact" {...stack}>
      <div className={sectionSurface()}>
        <div className={sectionSurfaceInner()}>
          <GeometricPattern kind="grid" opacity={0.07} />
          <div className="section-shell relative z-10 !py-8 min-[900px]:!py-9">
            <p className="text-label mb-4">08 / 08 — CONTACT</p>

            <div className="grid items-end gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:gap-6 lg:gap-8">
              <div className="min-w-0">
                <h2 className="text-section mb-4 overflow-hidden">
                  <span className="contact-line block">LET&apos;S BUILD</span>
                  <span className="contact-line block">SOMETHING</span>
                  <span className="contact-line block font-serif font-normal italic">
                    INTERESTING.
                  </span>
                </h2>

                <p className="mb-2 max-w-lg font-serif text-[clamp(1.05rem,1.7vw,1.3rem)] leading-relaxed text-[var(--text)]">
                  Interested in cybersecurity research, systems engineering, technical
                  collaboration, or building something meaningful?
                </p>
                <p className="mb-5 max-w-lg text-[var(--text-secondary)]">Let&apos;s connect.</p>

                <a
                  href={`mailto:${site.email}`}
                  className="inline-block w-fit border-b border-[var(--highlight)] pb-1 font-display text-[clamp(1.2rem,2.4vw,1.85rem)] tracking-[-0.02em] text-[var(--highlight)]"
                >
                  {site.email}
                </a>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={site.links.resume}
                    download="Keerthanan-PS-Resume.pdf"
                    className="btn-solid"
                  >
                    [ Download Resume ]
                  </a>
                </div>
              </div>

              <div className="mx-auto w-[min(100%,420px)] shrink-0 justify-self-end md:mx-0 md:-mr-[var(--section-pad-x)] md:w-[min(48vw,560px)]">
                <Image
                  src="/images/portrait-footer.png"
                  alt={`Portrait of ${site.name}`}
                  width={635}
                  height={941}
                  sizes="(max-width: 768px) 420px, 560px"
                  className="h-auto w-full object-contain object-right"
                />
              </div>
            </div>

            <ul className="mt-7 grid gap-px bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-4">
              {socials.map((item) => (
                <li key={item.label} className="bg-[var(--bg)]">
                  <ExternalLink
                    href={item.href}
                    className="flex h-full items-center justify-between gap-3 px-4 py-3.5 font-mono text-xs tracking-[0.14em] text-[var(--text-secondary)] hover:bg-[var(--card)] hover:text-[var(--highlight)]"
                  >
                    {item.label}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full">
            <HalftoneWordmarkFooter
              wordmark="keerthanan"
              label={site.brand}
              meta={`©2026 · ${site.location}`}
              columns={footerColumns}
              preset="paper"
              palette={{ background: "#ffffff", ink: "#080808", warm: "#656565" }}
              fontFamily='"Space Grotesk", "Helvetica Neue", Arial, system-ui, sans-serif'
              monoFamily='"IBM Plex Mono", ui-monospace, Menlo, monospace'
              height="580px"
              crop={0.06}
              dotGap={5}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
