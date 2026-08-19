"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { clubs } from "@/lib/clubs";
import { Wordmark } from "./brand";
import { Arrow, Container } from "./ui";

const nav = [
  { href: "/clubs", label: "Our clubs" },
  { href: "/membership", label: "Membership" },
  { href: "/community", label: "Community" },
  { href: "/about", label: "Our story" },
  { href: "/careers", label: "Careers" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 20);
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-out-soft ${
        scrolled || open ? "bg-navy-ink/95 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      {/* Utility strip, retracts once you start reading */}
      <div
        className={`overflow-hidden border-b border-white/5 transition-all duration-500 ease-out-soft ${
          scrolled || open ? "h-0 opacity-0" : "h-9 opacity-100"
        }`}
      >
        <Container className="flex h-9 items-center justify-between">
          <p className="eyebrow text-[0.55rem] text-gold/70">
            Est. 1926 · Cairns · Innisfail · Townsville · Ipswich
          </p>
          <p className="eyebrow hidden text-[0.55rem] text-paper/35 sm:block">
            Open seven days
          </p>
        </Container>
      </div>

      <Container className="flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" aria-label="Brothers Leagues Clubs, home" className="shrink-0">
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <div key={item.href} className="group relative py-6">
                <Link
                  href={item.href}
                  className={`eyebrow relative text-[0.62rem] transition-colors duration-300 ${
                    active ? "text-gold" : "text-paper/70 hover:text-paper"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-2 left-0 h-px w-full origin-left bg-gold transition-transform duration-500 ease-out-soft ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                    aria-hidden="true"
                  />
                </Link>

                {item.href === "/clubs" ? (
                  <div className="invisible absolute top-full left-1/2 w-80 -translate-x-1/2 pt-2 opacity-0 transition-all duration-300 ease-out-soft group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <div className="border border-white/10 bg-navy-ink/98 p-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl">
                      {clubs.map((club) => (
                        <Link
                          key={club.slug}
                          href={`/clubs/${club.slug}`}
                          className="group/i flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-white/5"
                        >
                          <span
                            className="h-6 w-0.5 shrink-0"
                            style={{ backgroundColor: club.accent }}
                            aria-hidden="true"
                          />
                          <span className="flex-1">
                            <span className="block font-display text-[1.05rem] text-paper">
                              {club.city}
                            </span>
                            <span className="block text-[0.7rem] text-paper/40">{club.region}</span>
                          </span>
                          <Arrow className="text-gold opacity-0 transition-opacity group-hover/i:opacity-100" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="group relative hidden items-center gap-3 overflow-hidden border border-gold/40 px-6 py-3 text-gold sm:inline-flex"
          >
            <span
              className="absolute inset-0 origin-left scale-x-0 bg-gold transition-transform duration-500 ease-out-soft group-hover:scale-x-100"
              aria-hidden="true"
            />
            <span className="eyebrow relative text-[0.6rem] transition-colors duration-500 group-hover:text-navy-ink">
              Get in touch
            </span>
            <Arrow className="relative transition-colors duration-500 group-hover:text-navy-ink" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center border border-white/15 text-paper lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 block h-px w-5 bg-current transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-5 bg-current transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </Container>

      {/* Reading progress */}
      <div
        className="h-px origin-left bg-gold transition-transform duration-150 ease-linear"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />

      <div
        id="mobile-nav"
        hidden={!open}
        className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-white/10 bg-navy-ink lg:hidden"
      >
        <Container className="py-10">
          <p className="eyebrow text-gold/70">Our clubs</p>
          <div className="mt-5 grid gap-px bg-white/10 sm:grid-cols-2">
            {clubs.map((club) => (
              <Link
                key={club.slug}
                href={`/clubs/${club.slug}`}
                className="flex items-center justify-between gap-4 bg-navy-ink p-5"
              >
                <span className="flex items-center gap-4">
                  <span
                    className="h-8 w-0.5"
                    style={{ backgroundColor: club.accent }}
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block font-display text-lg text-paper">{club.city}</span>
                    <span className="block text-[0.7rem] text-paper/40">{club.region}</span>
                  </span>
                </span>
                <Arrow className="text-gold" />
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-col">
            {[...nav.filter((item) => item.href !== "/clubs"), { href: "/contact", label: "Contact" }].map(
              (item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between border-b border-white/10 py-5 font-display text-2xl text-paper"
                >
                  {item.label}
                  <Arrow className="text-gold" />
                </Link>
              )
            )}
          </div>
        </Container>
      </div>
    </header>
  );
}
