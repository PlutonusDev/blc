import Image from "next/image";

const WORDMARK = {
  light: "/img/brand/brothers-reversed.png",
  dark: "/img/brand/brothers-navy.png",
} as const;

/**
 * The official Brothers wordmark, paired with a "Leagues Clubs" descriptor so
 * the group reads as the parent of the four individual club brands.
 */
export function Wordmark({
  tone = "light",
  className = "",
  size = "md",
}: {
  tone?: "light" | "dark";
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const heights = { sm: "h-5", md: "h-6 sm:h-7", lg: "h-9 sm:h-11" };
  const descriptor = tone === "light" ? "text-gold" : "text-gold-deep";
  const divider = tone === "light" ? "bg-gold/40" : "bg-gold-deep/40";

  return (
    <span className={`flex items-center gap-3 sm:gap-4 ${className}`}>
      <Image
        src={WORDMARK[tone]}
        alt="Brothers Leagues Clubs"
        width={1477}
        height={341}
        priority
        className={`${heights[size]} w-auto`}
      />
    </span>
  );
}

/** The star device on its own, for marks, bullets and watermarks. */
export function Star({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/img/brand/star.png"
      alt=""
      width={268}
      height={341}
      aria-hidden="true"
      className={className}
    />
  );
}
