import Image from "next/image";
import { Button, Container, Eyebrow, PageHero, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Our story",
  description:
    "Brothers Leagues Clubs began in 1926 with old boys who wanted somewhere to play rugby league and somewhere to sit down afterwards. A hundred years of Queensland community clubs.",
  path: "/about",
});

const timeline = [
  {
    year: "1919",
    title: "The first Brothers clubs",
    copy: "Brothers clubs start forming across Queensland, set up by former students of the Christian and Marist Brothers colleges who wanted to keep playing together.",
  },
  {
    year: "1926",
    title: "Cairns Past Brothers",
    copy: "Cairns Past Brothers Rugby Leagues Club is formed. It is the beginning of what is now the oldest club in the family.",
  },
  {
    year: "1954",
    title: "The White House",
    copy: "Cairns becomes the first of the local football clubs to build its own clubhouse, known to everyone as The White House.",
  },
  {
    year: "1974",
    title: "Ipswich opens",
    copy: "Brothers Ipswich begins its run of looking after the city, a stretch that has now passed fifty years.",
  },
  {
    year: "1975",
    title: "The Confraternity",
    copy: "The Brothers Confraternity forms, linking member clubs across Queensland and thousands of registered rugby league players.",
  },
  {
    year: "1983",
    title: "Stan Williams Park",
    copy: "Cairns completes Stan Williams Park, with two full rugby league fields, a gym and a canteen, built at a cost of more than $600,000.",
  },
  {
    year: "Today",
    title: "Four clubs, one family",
    copy: "Cairns, Innisfail, Townsville and Ipswich each run their own kitchens, bars and entertainment, and each still funds the football that started it all.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="It started with a footy team and a place to sit down"
        intro="Brothers clubs were built by players, for players, and then quietly became something bigger. This is the short version of a hundred year run."
      />

      <section className="bg-paper py-24 sm:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
            <div>
              <Eyebrow>The idea</Eyebrow>
              <p className="display-balance mt-7 font-display text-[2rem] leading-[1.2] font-semibold tracking-[-0.02em] text-navy sm:text-[2.5rem]">
                Close friendships, a football team, and somewhere to put the proceeds.
              </p>
            </div>
            <div className="space-y-6 text-[1.0625rem] leading-relaxed text-ink-soft lg:pt-3">
              <p>
                From around 1919, Brothers clubs began forming right across Queensland. They were
                started by old boys of the Christian and Marist Brothers colleges, and the
                friendships made at those schools became the foundation of the clubs.
              </p>
              <p>
                The football came first. The licensed club came later, and for a practical reason.
                Fields, gear, coaching and junior competitions all cost money, and a social club was
                a way to fund them without asking families to keep digging.
              </p>
              <p>
                That arrangement still holds. Every meal served and every drink poured helps pay for
                a set of jerseys, a set of goalposts or a grant to a group that needs one.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-navy py-24 sm:py-32">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06] grain-overlay mix-blend-overlay"
          aria-hidden="true"
        />
        <Container className="relative">
          <SectionHeading eyebrow="Milestones" tone="light" title="A hundred years, in brief" />

          <ol className="mt-16 space-y-px overflow-hidden border border-white/10 bg-white/10">
            {timeline.map((item) => (
              <li key={item.year} className="grid gap-4 bg-navy p-7 sm:grid-cols-[8rem_1fr] sm:p-8">
                <p className="font-display text-2xl font-semibold text-gold">{item.year}</p>
                <div>
                  <p className="font-display text-xl text-paper">{item.title}</p>
                  <p className="mt-2.5 max-w-2xl text-[0.9375rem] leading-relaxed text-paper/55">
                    {item.copy}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-8 text-[0.8125rem] text-paper/40">
            Dates for the Cairns club are drawn from its own published history. Each club keeps its
            own records, so check with your local for the full account.
          </p>
        </Container>
      </section>

      <section className="bg-paper-warm py-24 sm:py-32">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="relative aspect-[4/3] overflow-hidden bg-navy">
              <Image
                src="/img/cairns/park.jpg"
                alt="Stan Williams Park from the air, with a new grandstand going up beside the main field."
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover"
              />
            </div>

            <div>
              <SectionHeading
                eyebrow="Still building"
                title="Nothing here is finished"
                intro="Innisfail is midway through a renovation. Cairns is adding to Stan Williams Park. Ipswich has just marked fifty years and Townsville keeps collecting awards. The clubs change because the towns do."
              />
              <div className="mt-10 flex flex-wrap gap-4">
                <Button href="/clubs">See the four clubs</Button>
                <Button href="/community" variant="outline" className="text-navy">
                  In the community
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
