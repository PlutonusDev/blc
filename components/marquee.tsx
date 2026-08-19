import { Fragment } from "react";

/**
 * Stadium signage. A slow gold ticker used to break the page between chapters.
 * The list is rendered twice so the loop is seamless at -50%.
 */
export function Marquee({
  items,
  tone = "gold",
}: {
  items: string[];
  tone?: "gold" | "line";
}) {
  const surface =
    tone === "gold"
      ? "bg-gold text-navy-ink"
      : "border-y border-white/10 bg-navy-ink text-gold";

  return (
    <div className={`relative overflow-hidden py-3.5 ${surface}`} aria-hidden="true">
      <div className="marquee-track flex w-max items-center">
        {[0, 1].map((pass) => (
          <div key={pass} className="flex shrink-0 items-center">
            {items.map((item) => (
              <Fragment key={`${pass}-${item}`}>
                <span className="eyebrow px-7 text-[0.7rem] whitespace-nowrap">{item}</span>
                <Diamond />
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Diamond() {
  return (
    <svg viewBox="0 0 8 8" className="h-1.5 w-1.5 shrink-0 opacity-60" aria-hidden="true">
      <path d="M4 0 8 4 4 8 0 4Z" fill="currentColor" />
    </svg>
  );
}
