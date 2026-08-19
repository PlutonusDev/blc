import { Fragment } from "react";

/**
 * The track is two identical halves and the animation shifts it by exactly one
 * half, so the seam always lands back where it started. For that to read as
 * continuous, one half has to be at least as wide as the viewport: if it is
 * narrower, the end of the second half scrolls into view and the band empties
 * out. Short item lists are therefore repeated until a half is wide enough.
 */
const MIN_HALF_PX = 3600; // comfortably past an ultrawide display
const SPEED_PX_PER_SECOND = 72;

// Rough advance for uppercase Inter at 0.7rem with 0.24em tracking, plus the
// horizontal padding on each item and the diamond that follows it.
const CHAR_PX = 9.6;
const ITEM_CHROME_PX = 62;

function estimateWidth(items: string[]): number {
  return items.reduce((total, item) => total + item.length * CHAR_PX + ITEM_CHROME_PX, 0);
}

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

  const unit = Math.max(1, estimateWidth(items));
  const repeats = Math.max(1, Math.ceil(MIN_HALF_PX / unit));
  const half = Array.from({ length: repeats }, () => items).flat();

  // Duration follows the width so every band moves at the same speed, whatever
  // it is carrying.
  const duration = Math.round((unit * repeats) / SPEED_PX_PER_SECOND);

  return (
    <div className={`relative overflow-hidden py-3.5 ${surface}`} aria-hidden="true">
      <div
        className="marquee-track flex w-max items-center"
        style={{ animationDuration: `${duration}s` }}
      >
        {[0, 1].map((pass) => (
          <div key={pass} className="flex shrink-0 items-center">
            {half.map((item, index) => (
              <Fragment key={`${pass}-${index}-${item}`}>
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
