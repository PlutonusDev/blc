"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { clubs } from "@/lib/clubs";
import { QueenslandMap } from "./queensland-map";
import { Arrow } from "./ui";

/**
 * The map holds position while the club list scrolls past it, and the pin for
 * whichever club is currently in view lights up. Hovering a club does the same
 * thing without waiting for the scroll.
 */
export function StickyMap() {
  const [active, setActive] = useState<string>(clubs[0].slug);
  const [hovered, setHovered] = useState<string | null>(null);
  const itemRefs = useRef(new Map<string, HTMLLIElement>());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        const slug = visible?.target.getAttribute("data-slug");
        if (slug) setActive(slug);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    const nodes = Array.from(itemRefs.current.values());
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const current = hovered ?? active;

  return (
    <div className="grid gap-16 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-20">
      <ol className="order-2 lg:order-1">
        {clubs.map((club, index) => {
          const on = current === club.slug;
          return (
            <li
              key={club.slug}
              data-slug={club.slug}
              ref={(node) => {
                if (node) itemRefs.current.set(club.slug, node);
                else itemRefs.current.delete(club.slug);
              }}
              onMouseEnter={() => setHovered(club.slug)}
              onMouseLeave={() => setHovered(null)}
              className="border-t border-white/10 last:border-b"
            >
              <Link href={`/clubs/${club.slug}`} className="group block py-10 sm:py-12">
                <div className="flex items-baseline gap-5">
                  <span
                    className="font-display text-sm font-semibold transition-colors duration-500"
                    style={{ color: on ? club.accent : "rgba(248,245,238,0.3)" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="font-display text-[2.25rem] leading-none font-semibold tracking-[-0.03em] transition-all duration-500 sm:text-[3rem]"
                    style={{
                      color: on ? "#f8f5ee" : "rgba(248,245,238,0.42)",
                      transform: on ? "translateX(10px)" : "none",
                    }}
                  >
                    {club.city}
                  </h3>
                  <Arrow className="ml-auto shrink-0 text-gold" />
                </div>

                <div
                  className="grid transition-[grid-template-rows,opacity] duration-500 ease-out-soft"
                  style={{
                    gridTemplateRows: on ? "1fr" : "0fr",
                    opacity: on ? 1 : 0,
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="pt-5 pl-11">
                      <p className="max-w-md text-[0.9375rem] leading-[1.6] text-paper/60">
                        {club.blurb}
                      </p>
                      <p className="mt-4 text-[0.8125rem] text-gold/80">
                        {club.street}, {club.suburb} · {club.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>

      <div className="order-1 lg:order-2 lg:sticky lg:top-28">
        <QueenslandMap activeSlug={current} />
      </div>
    </div>
  );
}
