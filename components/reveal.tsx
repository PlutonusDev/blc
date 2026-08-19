"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SELECTOR = ".reveal, .reveal-wipe, .reveal-rule, .coastline";

/**
 * Adds `is-in` to reveal elements as they enter the viewport. The `js-reveal`
 * class that arms the CSS is set by an inline script in the layout, so nothing
 * flashes on first paint and the page stays fully readable without JavaScript.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (!document.documentElement.classList.contains("js-reveal")) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.06 }
    );

    const elements = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));

    for (const element of elements) {
      // Anything already above the fold arrives without waiting.
      if (element.getBoundingClientRect().top < window.innerHeight * 0.9) {
        element.classList.add("is-in");
        continue;
      }
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
