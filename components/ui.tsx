import Link from "next/link";
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-[84rem] px-6 sm:px-10 ${className}`}>{children}</div>;
}

export function Eyebrow({
  children,
  className = "text-gold-deep",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`eyebrow flex items-center gap-3.5 ${className}`}>
      <span className="inline-block h-px w-10 bg-current opacity-50" aria-hidden="true" />
      {children}
    </p>
  );
}

/**
 * The chapter marker. An oversized hollow numeral with a rotated label beside
 * it, sitting in the left rail of each major section.
 */
export function Chapter({
  number,
  label,
  tone = "dark",
}: {
  number: string;
  label: string;
  tone?: "dark" | "light";
}) {
  const numeral = tone === "light" ? "text-gold" : "text-navy";
  const text = tone === "light" ? "text-paper/45" : "text-ink-soft";

  return (
    <div className="flex items-center gap-5 lg:flex-col lg:items-start lg:gap-8">
      <p
        className={`hollow-thick font-display text-[4.5rem] leading-[0.75] font-semibold lg:text-[7rem] ${numeral}`}
      >
        {number}
      </p>
      <p className={`eyebrow text-[0.6rem] lg:[writing-mode:vertical-rl] ${text}`}>{label}</p>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "dark",
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  const titleTone = tone === "light" ? "text-paper" : "text-navy";
  const introTone = tone === "light" ? "text-paper/65" : "text-ink-soft";
  const eyebrowTone = tone === "light" ? "text-gold" : "text-gold-deep";

  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow ? (
        <div className={align === "center" ? "flex justify-center" : ""}>
          <Eyebrow className={eyebrowTone}>{eyebrow}</Eyebrow>
        </div>
      ) : null}
      <h2
        className={`display-balance reveal mt-6 font-display text-[2.25rem] leading-[1.06] font-semibold tracking-[-0.03em] sm:text-[3.25rem] ${titleTone}`}
      >
        {title}
      </h2>
      {intro ? (
        <p className={`reveal mt-6 text-[1.0625rem] leading-[1.65] ${introTone}`}>{intro}</p>
      ) : null}
    </div>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  external?: boolean;
  className?: string;
};

/**
 * Squared off, uppercase and letterspaced, with a panel that slides across on
 * hover. Deliberately not a rounded pill.
 */
export function Button({
  href,
  children,
  variant = "solid",
  external = false,
  className = "",
}: ButtonProps) {
  const solid = variant === "solid";
  const classes = [
    "group relative inline-flex items-center gap-4 overflow-hidden border px-8 py-4",
    solid ? "border-gold bg-gold text-navy-ink" : "border-current/35 text-current",
    "transition-colors duration-500 ease-out-soft",
    solid ? "hover:text-gold" : "hover:border-gold hover:text-navy-ink",
    className,
  ].join(" ");

  const inner = (
    <>
      <span
        className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-out-soft group-hover:scale-x-100 ${
          solid ? "bg-navy-ink" : "bg-gold"
        }`}
        aria-hidden="true"
      />
      <span className="eyebrow relative text-[0.7rem]">{children}</span>
      <Arrow className="relative" />
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`h-3.5 w-3.5 shrink-0 transition-transform duration-500 ease-out-soft group-hover:translate-x-1.5 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

/** A text link with a rule that draws itself in on hover. */
export function TextLink({
  href,
  children,
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const classes = `group relative inline-flex items-center gap-2.5 pb-1 text-[0.9375rem] font-medium ${className}`;
  const inner = (
    <>
      {children}
      <Arrow />
      <span
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-current transition-transform duration-500 ease-out-soft group-hover:scale-x-100"
        aria-hidden="true"
      />
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}

export function GoldRule({ className = "" }: { className?: string }) {
  return (
    <div
      className={`reveal-rule h-px w-full bg-gradient-to-r from-gold via-gold/40 to-transparent ${className}`}
      aria-hidden="true"
    />
  );
}

export function Stat({
  value,
  label,
  tone = "light",
}: {
  value: string;
  label: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className="reveal">
      <p
        className={`font-display text-[3rem] leading-[0.85] font-semibold tracking-[-0.035em] sm:text-[3.75rem] ${
          tone === "light" ? "foil" : "text-navy"
        }`}
      >
        {value}
      </p>
      <p
        className={`mt-5 max-w-[15rem] text-[0.8125rem] leading-[1.6] ${
          tone === "light" ? "text-paper/50" : "text-ink-soft"
        }`}
      >
        {label}
      </p>
    </div>
  );
}

/**
 * The standard interior page opener: gold bloom, an optional hollow watermark
 * word set behind the content, and a headline that wipes in.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  watermark,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  watermark?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-ink pt-40 pb-24 sm:pt-48 sm:pb-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] grain-overlay mix-blend-overlay"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-52 -right-40 h-[42rem] w-[42rem] rounded-full bg-gold/10 blur-[120px]"
        aria-hidden="true"
      />

      {watermark ? (
        <p
          className="hollow pointer-events-none absolute -bottom-8 left-0 w-full text-center font-display text-[19vw] leading-none font-semibold whitespace-nowrap text-gold select-none sm:-bottom-14"
          aria-hidden="true"
        >
          {watermark}
        </p>
      ) : null}

      <Container className="relative">
        <div className="max-w-3xl">
          <Eyebrow className="text-gold">{eyebrow}</Eyebrow>
          <h1 className="display-balance reveal-wipe mt-8 font-display text-[2.75rem] leading-[0.98] font-semibold tracking-[-0.035em] text-paper sm:text-[4.5rem]">
            {title}
          </h1>
          {intro ? (
            <p className="reveal mt-8 max-w-2xl text-lg leading-[1.65] text-paper/65">{intro}</p>
          ) : null}
          {children}
        </div>
      </Container>
    </section>
  );
}
