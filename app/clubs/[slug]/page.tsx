import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Marquee } from "@/components/marquee";
import { BreadcrumbSchema, ClubSchema } from "@/components/structured-data";
import {
  Arrow,
  Button,
  Chapter,
  Container,
  Eyebrow,
  SectionHeading,
  TextLink,
} from "@/components/ui";
import { clubBySlug, clubs, fullAddress, mapsDirections, mapsEmbed } from "@/lib/clubs";
import { pageMetadata } from "@/lib/metadata";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return clubs.map((club) => ({ slug: club.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const club = clubBySlug(slug);

  if (!club) {
    return { title: "Club not found" };
  }

  const open = club.hours
    .map((slot) => `${slot.days.toLowerCase()}, ${slot.time}`)
    .join(" and ");

  return pageMetadata({
    title: `Brothers ${club.city}`,
    description: `${club.tagline}. Dining, bars, gaming and function rooms at ${club.street}, ${club.suburb}. Open ${open}.`,
    path: `/clubs/${club.slug}`,
    image: {
      url: `/og/${club.slug}.png`,
      alt: `Brothers Leagues Club ${club.city} in ${club.region}. ${club.tagline}.`,
    },
  });
}

export default async function ClubPage({ params }: Params) {
  const { slug } = await params;
  const club = clubBySlug(slug);

  if (!club) {
    notFound();
  }

  const position = clubs.findIndex((item) => item.slug === club.slug);
  const others = clubs.filter((item) => item.slug !== club.slug);

  return (
    <>
      <ClubSchema club={club} />
      <BreadcrumbSchema
        trail={[
          { name: "Home", path: "/" },
          { name: "Our clubs", path: "/clubs" },
          { name: `Brothers ${club.city}`, path: `/clubs/${club.slug}` },
        ]}
      />

      {/* ------------------------------------------------------------ hero */}
      <section className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden bg-navy-ink pt-36">
        <div className="absolute inset-0">
          <Image
            src={club.image.src}
            alt={club.image.alt}
            fill
            priority
            sizes="100vw"
            className="scale-105 object-cover opacity-50"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-t from-navy-ink via-navy-ink/80 to-navy-ink/40"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08] grain-overlay mix-blend-overlay"
          aria-hidden="true"
        />
        <p
          className="hollow pointer-events-none absolute bottom-40 left-0 w-full text-center font-display text-[21vw] leading-none font-semibold whitespace-nowrap select-none"
          style={{ color: club.accent }}
          aria-hidden="true"
        >
          {club.city}
        </p>

        <Container className="relative pb-16">
          <Link
            href="/clubs"
            className="group inline-flex items-center gap-3 text-paper/55 transition-colors hover:text-paper"
          >
            <Arrow className="rotate-180" />
            <span className="eyebrow text-[0.6rem]">All four clubs</span>
          </Link>

          <div className="mt-10 flex items-end gap-6 sm:gap-10">
            <p
              className="hollow-thick hidden shrink-0 font-display text-[6rem] leading-[0.7] font-semibold sm:block"
              style={{ color: club.accent }}
              aria-hidden="true"
            >
              {String(position + 1).padStart(2, "0")}
            </p>

            <div className="min-w-0">
              <p
                className="eyebrow flex items-center gap-3.5 text-[0.62rem]"
                style={{ color: club.accent }}
              >
                <span className="inline-block h-px w-10 bg-current opacity-60" aria-hidden="true" />
                {club.region}
              </p>
              <h1 className="reveal-wipe mt-6 font-display text-[3.25rem] leading-[0.86] font-semibold tracking-[-0.045em] text-paper sm:text-[6rem]">
                Brothers
                <br />
                {club.city}
              </h1>
              <p className="mt-6 font-display text-2xl italic sm:text-[2rem]">
                <span className="foil">{club.tagline}</span>
              </p>
            </div>
          </div>
        </Container>

        <div className="relative border-t border-white/10 bg-navy-ink">
          <Container>
            <dl className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Address", value: [club.street, `${club.suburb} ${club.postcode}`] },
                { label: "Phone", value: [club.phone], href: `tel:${club.phoneHref}` },
                {
                  label: "Trading hours",
                  value: club.hours.map((slot) => `${slot.days}, ${slot.time}`),
                },
                {
                  label: "Official site",
                  value: [club.websiteLabel],
                  href: club.website,
                  external: true,
                },
              ].map((item) => (
                <div key={item.label} className="bg-navy-ink p-7 sm:p-8">
                  <dt className="eyebrow text-[0.55rem] text-gold/70">{item.label}</dt>
                  <dd className="mt-3 text-[0.875rem] leading-[1.6] text-paper/70">
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noreferrer noopener" : undefined}
                        className="transition-colors hover:text-gold"
                      >
                        {item.value.join(" ")}
                      </a>
                    ) : (
                      item.value.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </div>
      </section>

      {/* ----------------------------------------------------------- story */}
      <section className="bg-paper py-28 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[9rem_1fr] lg:gap-16">
            <Chapter number="01" label="The club" />

            <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
              <div>
                <p className="display-balance reveal font-display text-[1.9rem] leading-[1.22] font-semibold tracking-[-0.02em] text-navy sm:text-[2.35rem]">
                  {club.blurb}
                </p>
                <p className="reveal mt-9 text-[1.0625rem] leading-[1.7] text-ink-soft">
                  {club.story}
                </p>
                {club.hoursNote ? (
                  <p
                    className="mt-9 border-l-2 py-2 pl-6 text-[0.9375rem] leading-[1.65] text-ink-soft"
                    style={{ borderColor: club.accent }}
                  >
                    {club.hoursNote}
                  </p>
                ) : null}
              </div>

              <div>
                <Eyebrow>Good to know</Eyebrow>
                <ul className="mt-8">
                  {club.highlights.map((item, index) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-5 border-t border-paper-line py-5 last:border-b"
                    >
                      <span
                        className="eyebrow shrink-0 text-[0.55rem]"
                        style={{ color: club.accent }}
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[0.9375rem] leading-[1.6] text-ink-soft">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <Button href={club.website} external>
                    Menus and bookings
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Marquee items={club.venues.map((venue) => venue.name)} />

      {/* ---------------------------------------------------------- venues */}
      <section className="bg-paper-warm py-28 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[9rem_1fr] lg:gap-16">
            <Chapter number="02" label="Eat and drink" />
            <SectionHeading
              eyebrow="Rooms and menus"
              title={
                <>
                  What is open at <span className="italic">{club.city}</span>
                </>
              }
              intro="Rooms and menus change with the seasons, so the official site always has the current version."
            />
          </div>

          <div className="mt-20 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {club.venues.map((venue, index) => (
              <div key={venue.name} className="reveal border-t border-paper-line pt-8">
                <div className="flex items-baseline gap-4">
                  <span className="eyebrow text-[0.55rem]" style={{ color: club.accent }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[1.75rem] leading-none font-semibold text-navy">
                    {venue.name}
                  </h3>
                </div>
                <p className="mt-4 text-[0.9375rem] leading-[1.65] text-ink-soft">
                  {venue.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {club.gallery.map((photo, index) => (
              <div
                key={photo.src}
                className={`reveal-wipe group relative overflow-hidden bg-navy-ink ${
                  index === 0 ? "aspect-[4/5] sm:col-span-2 sm:aspect-[16/10]" : "aspect-[4/5]"
                }`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1.6s] ease-out-soft group-hover:scale-[1.06]"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ----------------------------------------------------- getting here */}
      <section className="bg-paper py-28 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[9rem_1fr] lg:gap-16">
            <Chapter number="03" label="Getting here" />

            <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
              <div>
                <SectionHeading eyebrow="Find us" title={`Brothers ${club.city}`} />
                <address className="mt-8 font-display text-[1.5rem] leading-[1.35] text-navy not-italic">
                  {club.street}
                  <br />
                  {club.suburb} {club.postcode}
                </address>
                <div className="mt-10 flex flex-wrap items-center gap-8">
                  <Button href={mapsDirections(club)} external>
                    Get directions
                  </Button>
                  <TextLink href={`tel:${club.phoneHref}`} className="text-navy">
                    {club.phone}
                  </TextLink>
                </div>
              </div>

              <div className="relative">
                <div
                  className="absolute -top-4 -left-4 h-20 w-20 border-t-2 border-l-2"
                  style={{ borderColor: club.accent }}
                  aria-hidden="true"
                />
                <iframe
                  src={mapsEmbed(club)}
                  title={`Map showing Brothers Leagues Club ${club.city} at ${fullAddress(club)}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="relative aspect-[16/10] w-full border-0"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------ other clubs */}
      <section className="relative overflow-hidden bg-navy-ink py-28 sm:py-32">
        <Container className="relative">
          <SectionHeading
            eyebrow="The other three"
            tone="light"
            title={
              <>
                Travelling? Your welcome <span className="italic">comes with you</span>
              </>
            }
            intro="Members are always welcome at the other clubs in the family. Worth knowing next time you are up or down the highway."
          />

          <ul className="mt-16">
            {others.map((other) => (
              <li key={other.slug} className="border-t border-white/10 last:border-b">
                <Link
                  href={`/clubs/${other.slug}`}
                  className="group flex flex-wrap items-baseline gap-x-8 gap-y-2 py-8"
                >
                  <span
                    className="h-2.5 w-2.5 shrink-0 self-center"
                    style={{ backgroundColor: other.accent }}
                    aria-hidden="true"
                  />
                  <span className="font-display text-[2rem] leading-none font-semibold tracking-[-0.03em] text-paper transition-transform duration-500 ease-out-soft group-hover:translate-x-2 sm:text-[2.75rem]">
                    {other.city}
                  </span>
                  <span className="text-[0.875rem] text-paper/45">{other.tagline}</span>
                  <Arrow className="ml-auto self-center text-gold" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
