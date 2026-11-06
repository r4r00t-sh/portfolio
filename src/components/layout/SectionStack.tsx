"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, registerGsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
};

function wheelDeltaY(e: WheelEvent) {
  let y = e.deltaY;
  if (e.deltaMode === 1) y *= 16;
  if (e.deltaMode === 2) y *= window.innerHeight;
  return y;
}

function isPanelPinned(panel: HTMLElement) {
  return panel.getBoundingClientRect().top <= 1;
}

function canScrollY(el: HTMLElement, deltaY: number) {
  const max = el.scrollHeight - el.clientHeight;
  if (max <= 2) return false;
  if (deltaY > 0) return el.scrollTop < max - 1;
  if (deltaY < 0) return el.scrollTop > 0;
  return false;
}

/**
 * Scroll model (one gesture — no cursor targeting):
 *
 * Desktop (≥900px)
 * - Sticky section cards stack as you scroll the page.
 * - Horizontal sections (Arsenal / Projects): keep scrolling vertically;
 *   the strip pans sideways until finished, then the next card unlocks.
 * - Tall vertical sections: scroll their content first, then the stack advances.
 *
 * Mobile / tablet (<900px)
 * - Normal document flow (no sticky trap).
 * - Horizontal strips use native swipe; vertical scroll moves the page.
 */
export function SectionStack({ children }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const reduced = prefersReducedMotion();
      const panels = gsap.utils.toArray<HTMLElement>(".section-stack-panel");
      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px)", () => {
        const localCleanups: Array<() => void> = [];

        panels.forEach((panel) => {
          const surface = panel.querySelector<HTMLElement>(".section-stack-surface");
          const inner = panel.querySelector<HTMLElement>(".section-stack-surface-inner");
          if (!surface || !inner) return;

          const mode = surface.dataset.scrollMode ?? "vertical";
          const hScroller = panel.querySelector<HTMLElement>("[data-h-scroll]");
          const progressEl = panel.querySelector<HTMLElement>("[data-h-progress]");

          // Auto-height panels (certs / contact) scroll with the document — no trap.
          if (panel.classList.contains("section-stack-end")) return;

          if (mode === "horizontal" && hScroller) {
            const host = panel.parentElement;
            const syncProgress = (progress: number) => {
              if (progressEl) progressEl.style.transform = `scaleX(${progress})`;
            };

            const getDistance = () =>
              Math.max(hScroller.scrollWidth - hScroller.clientWidth, 0);

            const travel = () => Math.max(getDistance(), window.innerWidth * 0.75);

            // Size the React-owned host instead of pin-wrapping the <section>.
            const syncHost = () => {
              if (!host?.classList.contains("section-stack-pin-host")) return;
              host.style.height = `${window.innerHeight + travel()}px`;
            };

            syncHost();

            const st = ScrollTrigger.create({
              trigger: host?.classList.contains("section-stack-pin-host") ? host : panel,
              start: "top top",
              end: () => `+=${travel()}`,
              scrub: reduced ? false : 0.55,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const max = getDistance();
                hScroller.scrollLeft = self.progress * max;
                syncProgress(self.progress);
              },
              onRefresh: (self) => {
                syncHost();
                const max = getDistance();
                hScroller.scrollLeft = self.progress * max;
                syncProgress(self.progress);
              },
            });

            localCleanups.push(() => {
              st.kill();
              if (host?.classList.contains("section-stack-pin-host")) {
                host.style.height = "";
              }
            });
            return;
          }

          if (mode === "page") return;

          let edgeDebt = 0;
          const EDGE_UNLOCK = 80;

          const onWheel = (e: WheelEvent) => {
            if (e.ctrlKey) return;
            if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;

            const target = e.target as HTMLElement | null;
            if (target?.closest("input, textarea, select")) return;

            const delta = wheelDeltaY(e);
            if (delta === 0) return;

            // While the card is still rising into place, never let its inner
            // scroller steal the wheel — always advance the page stack first.
            if (!isPanelPinned(panel)) {
              edgeDebt = 0;
              if (inner.scrollTop !== 0) inner.scrollTop = 0;
              e.preventDefault();
              window.scrollBy(0, e.deltaY || delta);
              return;
            }

            if (canScrollY(inner, delta)) {
              edgeDebt = 0;
              return;
            }

            edgeDebt += Math.abs(delta);
            if (edgeDebt < EDGE_UNLOCK) {
              e.preventDefault();
              return;
            }

            edgeDebt = 0;
            e.preventDefault();
            window.scrollBy(0, delta);
          };

          panel.addEventListener("wheel", onWheel, { passive: false, capture: true });
          localCleanups.push(() => panel.removeEventListener("wheel", onWheel, true));
        });

        if (!reduced) {
          panels.forEach((panel, i) => {
            const next = panels[i + 1];
            if (!next) return;
            const nextMode = next.querySelector<HTMLElement>(".section-stack-surface")
              ?.dataset.scrollMode;
            const mode = panel.querySelector<HTMLElement>(".section-stack-surface")
              ?.dataset.scrollMode;
            if (mode === "horizontal" || nextMode === "horizontal") return;

            const target = panel.querySelector<HTMLElement>(".section-stack-surface-inner");
            if (!target) return;

            const tween = gsap.fromTo(
              target,
              { scale: 1, filter: "brightness(1)" },
              {
                scale: 0.985,
                filter: "brightness(0.97)",
                ease: "none",
                transformOrigin: "50% 50%",
                scrollTrigger: {
                  trigger: next,
                  start: "top bottom",
                  end: "top top",
                  scrub: 0.85,
                },
              },
            );
            localCleanups.push(() => tween.kill());
          });
        }

        requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => localCleanups.forEach((fn) => fn());
      });

      mm.add("(max-width: 899px)", () => {
        const localCleanups: Array<() => void> = [];

        panels.forEach((panel) => {
          const hScroller = panel.querySelector<HTMLElement>("[data-h-scroll]");
          const progressEl = panel.querySelector<HTMLElement>("[data-h-progress]");
          if (!hScroller) return;

          const onScroll = () => {
            if (!progressEl) return;
            const max = hScroller.scrollWidth - hScroller.clientWidth;
            progressEl.style.transform = `scaleX(${max > 0 ? hScroller.scrollLeft / max : 0})`;
          };
          hScroller.addEventListener("scroll", onScroll, { passive: true });
          onScroll();
          localCleanups.push(() => hScroller.removeEventListener("scroll", onScroll));
        });

        return () => localCleanups.forEach((fn) => fn());
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <main ref={root} className="section-stack-root relative">
      {children}
    </main>
  );
}
