import Link from "next/link";
import { clubs, fullAddress } from "@/lib/clubs";
import { Wordmark } from "./brand";
import { Arrow, Container } from "./ui";

const columns = [
  {
    title: "Visit",
    links: [
      { href: "/clubs", label: "All four clubs" },
      { href: "/membership", label: "Become a member" },
      { href: "/contact", label: "Contact us" },
    ],
  },
  {
    title: "About",
    links: [
      { href: "/about", label: "Our story" },
      { href: "/community", label: "In the community" },
      { href: "/careers", label: "Work with us" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-navy-ink text-paper">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] grain-overlay mix-blend-overlay"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-56 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-gold/8 blur-[130px]"
        aria-hidden="true"
      />

      <Container className="relative pt-24 pb-14 sm:pt-28">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <Wordmark size="lg" />
            <p className="mt-9 max-w-lg font-display text-[2rem] leading-[1.15] font-semibold tracking-[-0.03em] text-paper sm:text-[2.5rem]">
              Four clubs, one family,
              <br />
              <span className="foil italic">always glad to see you.</span>
            </p>
            <p className="mt-7 max-w-md text-[0.9375rem] leading-[1.65] text-paper/50">
              Brothers Leagues Clubs are community clubs across Queensland, built by rugby league
              families and kept going by the people who walk through the door.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:pt-4">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="eyebrow text-[0.58rem] text-gold/70">{column.title}</p>
                <ul className="mt-6">
                  {column.links.map((link) => (
                    <li key={link.href} className="border-t border-white/10 last:border-b">
                      <Link
                        href={link.href}
                        className="group flex items-center justify-between gap-4 py-3.5 text-[0.9375rem] text-paper/65 transition-colors hover:text-paper"
                      >
                        {link.label}
                        <Arrow className="text-gold opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-px border-t border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {clubs.map((club) => (
            <div key={club.slug} className="bg-navy-ink p-7">
              <div className="flex items-center gap-3.5">
                <span
                  className="h-6 w-0.5"
                  style={{ backgroundColor: club.accent }}
                  aria-hidden="true"
                />
                <p className="font-display text-[1.35rem] leading-none text-paper">{club.city}</p>
              </div>
              <address className="mt-4 space-y-1.5 text-[0.8125rem] leading-[1.6] text-paper/45 not-italic">
                <p>{fullAddress(club)}</p>
                <p>
                  <a href={`tel:${club.phoneHref}`} className="transition-colors hover:text-gold">
                    {club.phone}
                  </a>
                </p>
              </address>
              <a
                href={club.website}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-4 inline-flex items-center gap-1.5 text-[0.8125rem] text-gold/75 transition-colors hover:text-gold"
              >
                {club.websiteLabel}
                <ExternalIcon />
              </a>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-white/10 pt-8 text-[0.75rem] text-paper/35 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Brothers Leagues Clubs. Each club is independently
            owned and operated by its members.
          </p>
          <p>Please gamble responsibly. Support is available on 1800 858 858, 24 hours a day.</p>
        </div>
      </Container>
    </footer>
  );
}

function ExternalIcon() {
  return (
    <svg
      viewBox="0 0 12 12"
      className="h-3 w-3"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 2h6v6M10 2 2.5 9.5" />
    </svg>
  );
}
