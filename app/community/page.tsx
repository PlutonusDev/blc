import Image from "next/image";
import { Button, Container, PageHero, SectionHeading, Stat } from "@/components/ui";
import { clubs } from "@/lib/clubs";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "In the community",
  description:
    "Community grants, junior football, sponsorships and charity work at Brothers Leagues Clubs in Cairns, Innisfail, Townsville and Ipswich.",
  path: "/community",
});

const programs = [
  {
    club: "Ipswich",
    title: "Brothers Helping Others",
    copy: "A $100,000 community grant program, open to local groups and causes across the Ipswich region. Applications run each year.",
    accent: "#2F6C7A",
  },
  {
    club: "Townsville",
    title: "Community grants fund",
    copy: "$50,000 set aside for not for profit community groups, who can apply for grants of up to $5,000 each.",
    accent: "#B4573C",
  },
  {
    club: "Townsville",
    title: "The Good Box",
    copy: "More than $32,000 committed to sponsoring 120 Good Boxes a month, supporting people experiencing homelessness in Townsville. The club calls it its single largest charitable commitment.",
    accent: "#B4573C",
  },
  {
    club: "Cairns",
    title: "Brothers Inspires",
    copy: "The club's community program, running alongside Brothers RLFC and the junior club that now fields around 300 players.",
    accent: "#C5A25C",
  },
  {
    club: "Innisfail",
    title: "Backing the district",
    copy: "Over 5,000 members and a long list of local sponsorships across the Cassowary Coast, from football to the smaller clubs that need a hand.",
    accent: "#3F7A57",
  },
];

const sport = [
  "North Queensland Foley Shield",
  "ARL Foundation Cup",
  "Laurie Spina Shield",
  "Townsville Secondary Schools Rugby League",
  "NASCA Challenge",
  "The Pogue Cup",
  "Touch football, soccer, rugby union and cricket",
  "Junior and senior Brothers clubs in four districts",
];

export default function CommunityPage() {
  return (
    <>
      <PageHero
        eyebrow="In the community"
        title="Profits with somewhere to be"
        intro="Community clubs are not owned by shareholders in another city. What the clubs make goes back into the club, the football and the town it sits in."
      />

      <section className="bg-paper py-24 sm:py-28">
        <Container>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <Stat value="$150k+" label="Committed to community grant programs each year across the group" tone="dark" />
            <Stat value="$32k" label="Townsville's annual commitment to The Good Box for people doing it tough" tone="dark" />
            <Stat value="300" label="Juniors registered at the Brothers club in Cairns alone" tone="dark" />
            <Stat value="4" label="Districts where Brothers still funds junior and senior football" tone="dark" />
          </div>
        </Container>
      </section>

      <section className="bg-paper-warm py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="Grants and programs"
            title="Where the money actually goes"
            intro="Each club runs its own programs, with its own board deciding what the district needs most. Here is a snapshot."
          />

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {programs.map((program) => (
              <article
                key={`${program.club}-${program.title}`}
                className="border border-paper-line bg-white p-8"
              >
                <p className="eyebrow flex items-center gap-2.5 text-ink-soft">
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: program.accent }}
                    aria-hidden="true"
                  />
                  {program.club}
                </p>
                <h3 className="mt-4 font-display text-2xl font-semibold text-navy">
                  {program.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{program.copy}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-navy py-24 sm:py-32">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06] grain-overlay mix-blend-overlay"
          aria-hidden="true"
        />
        <Container className="relative">
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="Sport"
                tone="light"
                title="The football never stopped being the point"
                intro="Between them, the clubs put money, fields and gear behind competitions at every level, from under sixes to open age."
              />

              <ul className="mt-12 grid gap-3 sm:grid-cols-2">
                {sport.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border border-white/10 px-4 py-3.5 text-[0.875rem] leading-snug text-paper/70"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden bg-navy-deep">
              <Image
                src="/img/cairns/football.jpg"
                alt="A junior player in a Brothers Cairns jersey meeting a first grade star at the club."
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-paper py-24 sm:py-32">
        <Container>
          <div className="border border-paper-line bg-white p-10 sm:p-14">
            <SectionHeading
              eyebrow="Applying"
              title="Got a group that needs a hand?"
              intro="Grants, sponsorships and donations are handled by each club rather than centrally, because each club knows its own district best. Start with the one nearest you."
            />

            <div className="mt-12 grid gap-px overflow-hidden border border-paper-line bg-paper-line sm:grid-cols-2 lg:grid-cols-4">
              {clubs.map((club) => (
                <a
                  key={club.slug}
                  href={club.website}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group bg-white p-7 transition-colors hover:bg-paper"
                >
                  <p className="font-display text-xl text-navy">{club.city}</p>
                  <p className="mt-2 text-[0.8125rem] text-ink-soft">{club.phone}</p>
                  <p className="mt-3 text-[0.8125rem] text-gold-deep">{club.websiteLabel}</p>
                </a>
              ))}
            </div>

            <div className="mt-10">
              <Button href="/contact">Contact the group</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
