"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#top");
  const railRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ids = ["top", ...site.nav.map((n) => n.href.replace("#", ""))];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActive(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.1, 0.35, 0.6] },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Keep the rail bottom flush with the footer divider — they rise together.
  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const rail = railRef.current;
      if (!rail) return;

      const footer =
        document.getElementById("site-footer") ||
        document.querySelector<HTMLElement>(".hwf-root");

      const vh = window.innerHeight;

      if (!footer) {
        rail.style.top = "0px";
        rail.style.height = "100svh";
        return;
      }

      // Align rail bottom to the footer's top border (the shared horizontal divider).
      const footerTop = footer.getBoundingClientRect().top;
      if (footerTop >= vh) {
        rail.style.top = "0px";
        rail.style.height = "100svh";
      } else {
        rail.style.height = "100svh";
        rail.style.top = `${Math.round(footerTop) - vh}px`;
      }
    };

    const onScrollOrResize = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    const mo = new MutationObserver(onScrollOrResize);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      mo.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Desktop — vertical left rail */}
      <aside
        ref={railRef}
        className="fixed left-0 top-0 z-[80] hidden h-[100svh] w-[var(--nav-rail)] flex-col border-r border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-md min-[900px]:flex"
        aria-label="Primary"
      >
        <a
          href="#top"
          className="flex shrink-0 items-center justify-center border-b border-[var(--border)] px-2 py-5"
        >
          <span
            className="font-display text-[11px] tracking-[0.22em] text-[var(--highlight)]"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            {site.brand}
          </span>
        </a>

        <nav className="flex min-h-0 flex-1 flex-col items-center justify-center gap-6 overflow-hidden py-6">
          {site.nav.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "font-mono text-[10px] tracking-[0.18em] transition-opacity",
                  isActive
                    ? "text-[var(--highlight)] opacity-100"
                    : "text-[var(--text)] opacity-55 hover:opacity-100",
                )}
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="shrink-0 border-t border-[var(--border)] px-2 py-4 text-center">
          <span
            className="font-mono text-[9px] tracking-[0.16em] text-[var(--text-muted)]"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            01—08
          </span>
        </div>
      </aside>

      {/* Mobile — top bar + drawer */}
      <header className="fixed inset-x-0 top-0 z-[80] border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-md min-[900px]:hidden">
        <div className="flex items-center justify-between px-[var(--section-pad-x)] py-3.5">
          <a href="#top" className="font-display text-sm tracking-[0.18em] text-[var(--highlight)]">
            {site.brand}
          </a>
          <button
            type="button"
            className="inline-flex items-center justify-center border border-[var(--border)] bg-[var(--bg)] p-2 text-[var(--text)]"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" aria-hidden /> : <Menu className="h-4 w-4" aria-hidden />}
          </button>
        </div>

        <div
          id="mobile-nav"
          className={cn("border-t border-[var(--border)] bg-[var(--bg)]", open ? "block" : "hidden")}
        >
          <nav className="flex flex-col px-[var(--section-pad-x)] py-4" aria-label="Mobile">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="border-b border-[var(--border)] py-4 font-mono text-xs tracking-[0.18em] text-[var(--text)]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
