"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { GeometricPattern } from "@/components/patterns/GeometricPattern";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ExternalLink } from "@/components/ui/ExternalLink";
import {
  sectionPinHost,
  sectionStack,
  sectionSurface,
  sectionSurfaceInner,
} from "@/lib/sectionStack";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

export function Projects() {
  const root = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const stack = sectionStack(4, "bg");

  useEffect(() => {
    if (!activeProject) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveProject(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;

      gsap.from(".project-slide", {
        x: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: root.current, start: "top 55%" },
      });
    },
    { scope: root },
  );

  return (
    <div className={sectionPinHost()} data-h-pin-host>
      <section ref={root} id="projects" {...stack}>
        <div className={sectionSurface()} data-scroll-mode="horizontal">
          <div className={sectionSurfaceInner("flex min-w-0 flex-col")}>
            <div className="with-nav-offset flex h-full min-h-0 w-full min-w-0 flex-1 flex-col justify-center overflow-hidden py-16">
              <SectionHeader
                index="04 / 08"
                eyebrow="GITHUB / PINNED"
                title="Projects"
                description="Pinned repositories from github.com/r4r00t-sh — keep scrolling to move through the strip; swipe on phones."
                className="mb-6 shrink-0 md:mb-8"
              />

              <div className="mb-4 h-px overflow-hidden bg-[var(--border)]">
                <div
                  data-h-progress
                  className="h-full origin-left scale-x-0 bg-[var(--highlight)]"
                  aria-hidden
                />
              </div>

              <div
                data-h-scroll
                className="min-h-0 w-full min-w-0 flex-none pb-4"
              >
                <div className="flex w-max items-stretch gap-4 pr-4">
                  {projects.map((project) => (
                    <article
                      key={project.id}
                      className="project-slide relative w-[min(85vw,420px)] shrink-0 overflow-hidden border border-[var(--border)] bg-[var(--card)]"
                    >
                      <GeometricPattern kind={project.pattern} opacity={0.07} />
                      <div className="relative z-10 flex h-full min-h-[420px] flex-col justify-between p-6 md:p-7">
                      <div className="flex items-start justify-between gap-3">
                        <span className="font-display text-5xl text-[var(--text-muted)]">
                          {project.number}
                        </span>
                        <div className="flex flex-wrap justify-end gap-2">
                          {project.language && (
                            <span className="tech-chip">{project.language}</span>
                          )}
                          <span className="tech-chip">{project.status}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="mb-3 font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-[0.95] tracking-[-0.03em]">
                          {project.title}
                        </h3>
                        <p className="mb-5 text-sm text-[var(--text-secondary)]">
                          {project.summary}
                        </p>
                        <div className="mb-5 flex flex-wrap gap-2">
                          {project.tech.slice(0, 4).map((t) => (
                            <span key={t} className="tech-chip">
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            className="btn-ghost"
                            onClick={() => setActiveProject(project)}
                          >
                            [ Expand ]
                          </button>
                          {project.href && (
                            <ExternalLink href={project.href} className="btn-solid">
                              Repo
                            </ExternalLink>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

            {activeProject && (
              <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-[color-mix(in_srgb,var(--text)_55%,transparent)] p-4 backdrop-blur-sm md:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`project-${project.id}-title`}
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto border border-[var(--border)] bg-[var(--card)] p-6 md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute right-4 top-4 border border-[var(--border)] p-2"
          onClick={onClose}
          aria-label="Close project details"
        >
          <X className="h-4 w-4" />
        </button>

        <p className="text-label mb-3">
          {project.number} — {project.status}
          {project.period ? ` / ${project.period}` : ""}
        </p>
        <h3
          id={`project-${project.id}-title`}
          className="mb-4 font-display text-[clamp(2rem,4vw,3.5rem)] tracking-[-0.03em]"
        >
          {project.title}
        </h3>
        <p className="mb-8 text-[var(--text-secondary)]">{project.summary}</p>

        <p className="text-label mb-3">DETAILS</p>
        <ul className="mb-8 space-y-2">
          {project.highlights.map((item) => (
            <li
              key={item}
              className="border-b border-[var(--border)] py-2 font-mono text-xs tracking-[0.05em] text-[var(--text)]"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="mb-8 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="tech-chip">
              {t}
            </span>
          ))}
        </div>

        {project.href && (
          <a href={project.href} target="_blank" rel="noopener noreferrer" className="btn-solid">
            Open repository <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
