"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SELECTOR = ".reveal, .reveal-wipe, .reveal-rule, .coastline";

/** How far up the viewport an element must reach before it arrives. */
const TRIGGER = 0.92;

/**
 * Adds `is-in` to reveal elements as they come up the page. The `js-reveal`
 * class that arms the CSS is set by an inline script in the layout, so nothing
 * flashes on first paint and the page stays fully readable without JavaScript.
 *
 * This deliberately measures geometry rather than using IntersectionObserver.
 * The starting state of `.reveal-wipe` is `clip-path: inset(… 100% …)`, which
 * collapses the element to zero visible area, so its intersection ratio never
 * climbs above zero and any non-zero threshold deadlocks: the element stays
 * hidden because it is hidden. `getBoundingClientRect` ignores clipping, so it
 * always reports where the element actually is.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("js-reveal")) return;

    // Tells the layout's fallback timer that the sweep is running.
    root.setAttribute("data-reveal-ready", "");

    let pending = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    let frame = 0;

    const sweep = () => {
      frame = 0;
      const limit = window.innerHeight * TRIGGER;
      const waiting: HTMLElement[] = [];

      for (const element of pending) {
        // Covers both directions: anything whose top has risen past the trigger
        // line, and anything already scrolled off the top, arrives immediately.
        if (element.getBoundingClientRect().top < limit) {
          element.classList.add("is-in");
        } else {
          waiting.push(element);
        }
      }

      pending = waiting;
      if (pending.length === 0) detach();
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(sweep);
    };

    const detach = () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("load", schedule);
    };

    sweep();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Images and fonts settling can move everything, so measure again after.
    window.addEventListener("load", schedule);

    return () => {
      detach();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
