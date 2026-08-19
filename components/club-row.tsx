import Image from "next/image";
import Link from "next/link";
import type { Club } from "@/lib/clubs";
import { fullAddress } from "@/lib/clubs";
import { Arrow } from "./ui";

/**
 * A club presented as a full width editorial row rather than a card: hollow
 * numeral in the rail, oversized city name, a bracket that opens on hover, and
 * the practical detail set as a small table underneath.
 */
export function ClubRow({
  club,
  index,
  tone = "light",
  priority = false,
}: {
  club: Club;
  index: number;
  tone?: "light" | "dark";
  priority?: boolean;
}) {
  const flip = index % 2 === 1;
  const numeral = String(index + 1).padStart(2, "0");

  const border = tone === "dark" ? "border-white/10" : "border-paper-line";
  const cityTone = tone === "dark" ? "text-paper" : "text-navy";
  const bodyTone = tone === "dark" ? "text-paper/60" : "text-ink-soft";
  const metaLabel = tone === "dark" ? "text-paper/35" : "text-ink-soft/70";
  const hover = tone === "dark" ? "group-hover:bg-white/[0.02]" : "group-hover:bg-white/50";

  return (
    <article className={`group relative border-t ${border}`}>
      <span
        className={`pointer-events-none absolute inset-0 transition-colors duration-700 ${hover}`}
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute top-0 left-0 h-px w-0 transition-[width] duration-[900ms] ease-out-soft group-hover:w-full"
        style={{ backgroundColor: club.accent }}
        aria-hidden="true"
      />

      <Link
        href={`/clubs/${club.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`More about ${club.name}`}
      />

      <div className="relative grid items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">
        <div className={flip ? "lg:order-2" : ""}>
          <div className="flex items-start gap-6 sm:gap-10">
            <p
              className="hollow-thick shrink-0 font-display text-[3.5rem] leading-[0.7] font-semibold sm:text-[5rem]"
              style={{ color: club.accent }}
              aria-hidden="true"
            >
              {numeral}
            </p>

            <div className="min-w-0">
              <p className="eyebrow text-[0.62rem]" style={{ color: club.accent }}>
                {club.region}
              </p>
              <h3
                className={`mt-4 font-display text-[3rem] leading-[0.86] font-semibold tracking-[-0.04em] sm:text-[4.25rem] ${cityTone}`}
              >
                {club.city}
              </h3>
              <p className="mt-4 font-display text-xl italic sm:text-2xl">
                <span className={tone === "dark" ? "foil" : "foil-deep"}>{club.tagline}</span>
              </p>
            </div>
          </div>

          <p className={`mt-8 max-w-xl text-[1.0625rem] leading-[1.65] ${bodyTone}`}>{club.blurb}</p>

          <dl className={`mt-10 grid max-w-xl gap-y-4 border-t ${border} pt-8 sm:grid-cols-3`}>
            {[
              { label: "Where", value: fullAddress(club) },
              {
                label: "Open",
                value: club.hours.map((slot) => `${slot.days}, ${slot.time}`).join(" · "),
              },
              { label: "Phone", value: club.phone },
            ].map((item) => (
              <div key={item.label}>
                <dt className={`eyebrow text-[0.55rem] ${metaLabel}`}>{item.label}</dt>
                <dd className={`mt-2.5 text-[0.8125rem] leading-[1.55] ${bodyTone}`}>
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="relative z-20 mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link
              href={`/clubs/${club.slug}`}
              className={`group/l inline-flex items-center gap-3 ${cityTone}`}
            >
              <span className="eyebrow text-[0.68rem]">Explore the club</span>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-current/25 transition-colors duration-500 group-hover/l:border-current/70">
                <Arrow />
              </span>
            </Link>
            <a
              href={club.website}
              target="_blank"
              rel="noreferrer noopener"
              className={`text-[0.8125rem] transition-colors hover:text-gold ${metaLabel}`}
            >
              {club.websiteLabel}
            </a>
          </div>
        </div>

        <div className={`relative ${flip ? "lg:order-1" : ""}`}>
          <div
            className="absolute -top-4 -left-4 h-20 w-20 border-t-2 border-l-2 transition-all duration-700 group-hover:-top-6 group-hover:-left-6"
            style={{ borderColor: club.accent }}
            aria-hidden="true"
          />
          <div className="reveal-wipe relative aspect-[5/4] overflow-hidden bg-navy-ink">
            <Image
              src={club.image.src}
              alt={club.image.alt}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover transition-transform duration-[1.6s] ease-out-soft group-hover:scale-[1.06]"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
