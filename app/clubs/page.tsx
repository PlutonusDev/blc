import { ClubRow } from "@/components/club-row";
import { Marquee } from "@/components/marquee";
import { StickyMap } from "@/components/sticky-map";
import { Chapter, Container, PageHero, SectionHeading } from "@/components/ui";
import { clubs } from "@/lib/clubs";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Our clubs",
  description:
    "Four Brothers Leagues Clubs across Queensland, at Cairns, Innisfail, Townsville and Ipswich. Addresses, trading hours, phone numbers and what is on at each one.",
  path: "/clubs",
});

export default function ClubsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our clubs"
        watermark="Queensland"
        title="Four clubs, from the Cassowary Coast to Ipswich"
        intro="Each one is run by its own board and its own team, so the menus, the entertainment and the character are all a bit different. Find the one nearest you and see what is on."
      />

      <Marquee items={clubs.map((club) => club.city)} />

      <section className="bg-paper py-24 sm:py-28">
        <Container>
          {clubs.map((club, index) => (
            <ClubRow key={club.slug} club={club} index={index} priority={index === 0} />
          ))}
          <div className="border-t border-paper-line" />
        </Container>
      </section>

      <section className="relative overflow-hidden bg-navy-ink py-28 sm:py-36">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06] grain-overlay mix-blend-overlay"
          aria-hidden="true"
        />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[9rem_1fr] lg:gap-16">
            <Chapter number="05" label="On the map" tone="light" />
            <SectionHeading
              eyebrow="Getting there"
              tone="light"
              title={
                <>
                  Two hours apart, or a good <span className="italic">day&rsquo;s drive</span>
                </>
              }
              intro="Cairns, Innisfail and Townsville sit within a few hours of each other along the tropical coast. Ipswich is south east, a short run west of Brisbane."
            />
          </div>

          <div className="mt-20">
            <StickyMap />
          </div>
        </Container>
      </section>
    </>
  );
}
