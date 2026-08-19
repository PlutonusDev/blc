import Link from "next/link";
import { Arrow, Button, Container, PageHero, SectionHeading } from "@/components/ui";
import { clubs, fullAddress, mapsDirections, mapsEmbed } from "@/lib/clubs";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact us",
  description:
    "Phone numbers, addresses, trading hours and maps for Brothers Leagues Clubs at Cairns, Innisfail, Townsville and Ipswich.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Ring the club, they will sort you out"
        intro="Bookings, functions, memberships, lost property and everything else are handled by each club directly. Here is how to reach all four."
      />

      <section className="bg-paper py-24 sm:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            {clubs.map((club) => (
              <article
                key={club.slug}
                className="overflow-hidden border border-paper-line bg-white"
              >
                <div className="p-8 sm:p-10">
                  <p className="eyebrow flex items-center gap-2.5 text-ink-soft">
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: club.accent }}
                      aria-hidden="true"
                    />
                    {club.region}
                  </p>
                  <h2 className="mt-4 font-display text-[2rem] leading-none font-semibold text-navy">
                    Brothers {club.city}
                  </h2>

                  <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                    <div>
                      <dt className="eyebrow text-[0.6rem] text-gold-deep">Address</dt>
                      <dd className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                        {club.street}
                        <br />
                        {club.suburb} {club.postcode}
                      </dd>
                    </div>
                    <div>
                      <dt className="eyebrow text-[0.6rem] text-gold-deep">Phone</dt>
                      <dd className="mt-2.5 text-[0.9375rem] text-ink-soft">
                        <a
                          href={`tel:${club.phoneHref}`}
                          className="transition-colors hover:text-navy"
                        >
                          {club.phone}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="eyebrow text-[0.6rem] text-gold-deep">Trading hours</dt>
                      <dd className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                        {club.hours.map((slot) => (
                          <span key={slot.days} className="block">
                            {slot.days}, {slot.time}
                          </span>
                        ))}
                      </dd>
                    </div>
                    <div>
                      <dt className="eyebrow text-[0.6rem] text-gold-deep">Online</dt>
                      <dd className="mt-2.5 text-[0.9375rem] text-ink-soft">
                        <a
                          href={club.website}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="block transition-colors hover:text-navy"
                        >
                          {club.websiteLabel}
                        </a>
                        {club.email ? (
                          <a
                            href={`mailto:${club.email}`}
                            className="mt-1 block break-all text-[0.8125rem] transition-colors hover:text-navy"
                          >
                            {club.email}
                          </a>
                        ) : null}
                      </dd>
                    </div>
                  </dl>

                  {club.hoursNote ? (
                    <p className="mt-7 border-t border-paper-line pt-5 text-[0.8125rem] leading-relaxed text-ink-soft">
                      {club.hoursNote}
                    </p>
                  ) : null}

                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <Link
                      href={`/clubs/${club.slug}`}
                      className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-navy"
                    >
                      About this club
                      <Arrow />
                    </Link>
                    <a
                      href={mapsDirections(club)}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-[0.875rem] text-ink-soft transition-colors hover:text-gold-deep"
                    >
                      Get directions
                    </a>
                  </div>
                </div>

                <iframe
                  src={mapsEmbed(club)}
                  title={`Map showing Brothers Leagues Club ${club.city} at ${fullAddress(club)}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="aspect-[16/9] w-full border-0 border-t border-paper-line"
                />
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy py-24 sm:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <SectionHeading
              eyebrow="Anything else"
              tone="light"
              title="Not sure which club to call?"
              intro="If your question is about the group rather than one venue, such as media, partnerships or something that spans more than one club, start with the club closest to the subject and they will point you the right way."
            />

            <div className="lg:pt-6">
              <div className="border border-white/10 bg-white/5 p-8">
                <p className="eyebrow text-gold/70">Support</p>
                <p className="mt-5 text-[0.9375rem] leading-relaxed text-paper/70">
                  If gambling is causing you or someone you know harm, free and confidential help is
                  available 24 hours a day on 1800 858 858, or at gamblinghelponline.org.au.
                </p>
                <div className="mt-8">
                  <Button href="/clubs" variant="outline" className="text-paper">
                    See all four clubs
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
