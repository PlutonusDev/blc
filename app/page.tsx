import Image from "next/image";
import Link from "next/link";
import { ClubRow } from "@/components/club-row";
import { Marquee } from "@/components/marquee";
import { StickyMap } from "@/components/sticky-map";
import { OrganisationSchema } from "@/components/structured-data";
import {
  Arrow,
  Button,
  Chapter,
  Container,
  Eyebrow,
  GoldRule,
  SectionHeading,
  Stat,
  TextLink,
} from "@/components/ui";
import { clubs } from "@/lib/clubs";

const features = [
  {
    title: "Eat",
    copy: "Restaurants, bistros and cafes with menus built for the whole table, from a quick coffee to a proper night out.",
    image: { src: "/img/ipswich/platter.webp", alt: "A share plate of ribs, chicken, chips and slaw." },
    ratio: "aspect-[4/3]",
  },
  {
    title: "Drink",
    copy: "Main bars, sports bars and lounges. Cold beer, a decent wine list and someone behind the taps who knows your name.",
    image: { src: "/img/cairns/bar.jpg", alt: "A bartender pulling a beer for two members." },
    ratio: "aspect-[3/4]",
  },
  {
    title: "Play",
    copy: "Gaming lounges, TAB and Keno, live music, trivia nights, raffles and members draws right through the week.",
    image: {
      src: "/img/townsville/gaming.jpg",
      alt: "A gaming floor lit purple beneath a circular jackpot display.",
    },
    ratio: "aspect-[1/1]",
  },
  {
    title: "Celebrate",
    copy: "Function rooms for weddings, corporate days, birthdays and wakes, with catering and audio visual sorted.",
    image: {
      src: "/img/ipswich/functions.webp",
      alt: "A function room set with round tables and white linen.",
    },
    ratio: "aspect-[16/11]",
  },
  {
    title: "Bring the kids",
    copy: "Playzones, kids rooms and menus made for small people, so the family can eat together without the fuss.",
    image: {
      src: "/img/townsville/kids.jpg",
      alt: "An indoor playzone with soft play and a climbing frame.",
    },
    ratio: "aspect-[16/11]",
  },
  {
    title: "Back the footy",
    copy: "Every club still does what it was built to do. Juniors, seniors, and the fields and gear that keep them going.",
    image: {
      src: "/img/cairns/football.jpg",
      alt: "A junior player in a Brothers jersey meeting a first grade star.",
    },
    ratio: "aspect-[4/5]",
  },
];

const tickerItems = [
  "Cairns",
  "Est. 1926",
  "Innisfail",
  "The place to be",
  "Townsville",
  "Home of the Blackhawks",
  "Ipswich",
  "Fifty years and counting",
];

export default function Home() {
  return (
    <>
      <OrganisationSchema />
      <Hero />
      <Marquee items={tickerItems} />
      <TheIdea />
      <TheClubs />
      <TheMap />
      <Marquee items={["Eat", "Drink", "Play", "Celebrate", "Bring the kids", "Back the footy"]} tone="line" />
      <Inside />
      <CommunityBand />
      <MembershipLadder />
    </>
  );
}

/* ------------------------------------------------------------------ hero */

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-navy-ink pt-32">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/img/ipswich/exterior.webp"
          alt="The lit entrance canopy of a Brothers Leagues Club at dusk, with palms alongside."
          fill
          priority
          sizes="100vw"
          className="scale-105 object-cover object-center opacity-55"
        />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-t from-navy-ink via-navy-ink/75 to-navy-ink/40"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.09] grain-overlay mix-blend-overlay"
        aria-hidden="true"
      />

      <Container className="relative pb-10">
        <div className="max-w-4xl">
          <Eyebrow className="text-gold">Four community clubs, one Queensland family</Eyebrow>

          <h1 className="mt-9 font-display text-[3.4rem] leading-[0.9] font-semibold tracking-[-0.045em] text-paper sm:text-[6.5rem] lg:text-[7.5rem]">
            <span className="reveal-wipe block">Four clubs.</span>
            <span className="reveal-wipe foil block italic">
              One family.
            </span>
          </h1>

          <div className="mt-10 max-w-xl">
            <GoldRule />
            <p className="reveal mt-7 text-lg leading-[1.65] text-paper/70">
              Brothers Leagues Clubs have been part of Queensland life for close to a century. Good
              food, cold drinks, live entertainment and a genuine welcome, whichever door you walk
              through.
            </p>
          </div>

          <div className="mt-11 flex flex-wrap items-center gap-4">
            <Button href="/clubs">Find your club</Button>
            <Button href="/membership" variant="outline" className="text-paper">
              Become a member
            </Button>
          </div>
        </div>
      </Container>

      <div className="relative mt-14 border-t border-white/10">
        <Container className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {clubs.map((club, index) => (
            <Link
              key={club.slug}
              href={`/clubs/${club.slug}`}
              className="group relative flex items-center justify-between gap-5 bg-navy-ink p-7 transition-colors duration-500 hover:bg-navy sm:p-8"
            >
              <span
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 ease-out-soft group-hover:scale-x-100"
                style={{ backgroundColor: club.accent }}
                aria-hidden="true"
              />
              <span>
                <span className="eyebrow block text-[0.55rem] text-paper/35">
                  {String(index + 1).padStart(2, "0")} · {club.region}
                </span>
                <span className="mt-2 block font-display text-xl text-paper">{club.city}</span>
                <span className="mt-1 block text-[0.75rem] text-gold/70">{club.hours[0].time}</span>
              </span>
              <Arrow className="text-gold" />
            </Link>
          ))}
        </Container>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- chapter 1 */

function TheIdea() {
  return (
    <section className="bg-paper py-28 sm:py-36">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[9rem_1fr] lg:gap-16">
          <Chapter number="01" label="The idea" />

          <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
            <div>
              <p className="display-balance reveal font-display text-[2.25rem] leading-[1.1] font-semibold tracking-[-0.03em] text-navy sm:text-[3rem]">
                Started by footballers.
                <br />
                <span className="italic">Kept going by</span> everybody else.
              </p>
            </div>

            <div className="space-y-6 text-[1.0625rem] leading-[1.7] text-ink-soft lg:pt-3">
              <p className="reveal">
                The first Brothers clubs were formed by old boys of the Christian and Marist Brothers
                colleges, who wanted somewhere to play rugby league and somewhere to sit down
                afterwards. Cairns came first, in 1926. Ipswich, Townsville and Innisfail followed,
                and the idea never really changed.
              </p>
              <p className="reveal">
                Today each club runs its own kitchens, its own bars and its own week of
                entertainment, and each one still puts its money back where it came from. Junior
                football, senior football, local charities and the groups that hold a town together.
              </p>
              <p className="reveal font-display text-xl text-navy italic">
                You do not need a reason to come in. That is rather the point.
              </p>
              <div className="pt-3">
                <TextLink href="/about" className="text-navy">
                  Read our story
                </TextLink>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 grid gap-12 border-t border-paper-line pt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {[
            { value: "1926", label: "The year the first Brothers club opened its doors in Cairns" },
            { value: "Four", label: "Clubs across Queensland, from the Cassowary Coast to Ipswich" },
            { value: "7 days", label: "Open every day of the week, most of them until very late" },
            { value: "$150k+", label: "Committed to community grants each year across the group" },
          ].map((item, index) => (
            <div key={item.value} className={index > 0 ? "lg:border-l lg:border-paper-line lg:pl-10" : ""}>
              <Stat value={item.value} label={item.label} tone="dark" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------------- chapter 2 */

function TheClubs() {
  return (
    <section id="clubs" className="bg-paper-warm py-28 sm:py-36">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[9rem_1fr] lg:gap-16">
          <Chapter number="02" label="The clubs" />
          <SectionHeading
            eyebrow="Four front doors"
            title={
              <>
                Pick the one <span className="italic">closest to home</span>
              </>
            }
            intro="Each club has its own character, its own kitchen and its own crowd. What they share is the welcome at the front door."
          />
        </div>

        <div className="mt-20">
          {clubs.map((club, index) => (
            <ClubRow key={club.slug} club={club} index={index} priority={index === 0} />
          ))}
          <div className="border-t border-paper-line" />
        </div>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------------- chapter 3 */

function TheMap() {
  return (
    <section className="relative overflow-hidden bg-navy-ink py-28 sm:py-36">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] grain-overlay mix-blend-overlay"
        aria-hidden="true"
      />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[9rem_1fr] lg:gap-16">
          <Chapter number="03" label="Where we are" tone="light" />
          <SectionHeading
            eyebrow="On the map"
            tone="light"
            title={
              <>
                Up the coast, and down in the <span className="italic">south east</span>
              </>
            }
            intro="Three clubs sit along the tropical coast between Cairns and Townsville. The fourth is in Ipswich, a short run west of Brisbane. Scroll the list and the map keeps up."
          />
        </div>

        <div className="mt-20">
          <StickyMap />
        </div>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------------- chapter 4 */

function Inside() {
  const left = features.filter((_, index) => index % 2 === 0);
  const right = features.filter((_, index) => index % 2 === 1);

  return (
    <section className="bg-paper py-28 sm:py-36">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[9rem_1fr] lg:gap-16">
          <Chapter number="04" label="Inside" />
          <SectionHeading
            eyebrow="Inside a Brothers club"
            title={
              <>
                Everything a good local should have, <span className="italic">under one roof</span>
              </>
            }
            intro="The details differ from club to club, so check your local for what is on today. The idea is the same everywhere."
          />
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-8 lg:space-y-12">
            {left.map((feature, index) => (
              <FeatureTile key={feature.title} feature={feature} number={index * 2 + 1} />
            ))}
          </div>
          <div className="space-y-8 lg:mt-36 lg:space-y-12">
            {right.map((feature, index) => (
              <FeatureTile key={feature.title} feature={feature} number={index * 2 + 2} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function FeatureTile({
  feature,
  number,
}: {
  feature: (typeof features)[number];
  number: number;
}) {
  return (
    <article className="group reveal">
      <div className={`relative overflow-hidden bg-navy-ink ${feature.ratio}`}>
        <Image
          src={feature.image.src}
          alt={feature.image.alt}
          fill
          sizes="(min-width: 1024px) 44vw, 100vw"
          className="object-cover transition-transform duration-[1.6s] ease-out-soft group-hover:scale-[1.05]"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-ink/85 to-transparent"
          aria-hidden="true"
        />
        <p className="absolute bottom-6 left-7 font-display text-[2.5rem] leading-none font-semibold text-paper sm:text-[3rem]">
          {feature.title}
        </p>
        <p className="eyebrow absolute top-6 right-7 text-[0.6rem] text-gold">
          {String(number).padStart(2, "0")}
        </p>
      </div>
      <p className="mt-5 max-w-md text-[0.9375rem] leading-[1.65] text-ink-soft">{feature.copy}</p>
    </article>
  );
}

/* --------------------------------------------------------------- chapter 5 */

function CommunityBand() {
  return (
    <section className="relative overflow-hidden bg-navy-ink">
      <div className="absolute inset-0">
        <Image
          src="/img/cairns/football.jpg"
          alt="A junior player in a Brothers Cairns jersey meeting a first grade star at the club."
          fill
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy-ink via-navy-ink/90 to-navy-ink/50"
        aria-hidden="true"
      />

      <Container className="relative py-28 sm:py-36">
        <div className="grid gap-12 lg:grid-cols-[9rem_1fr] lg:gap-16">
          <Chapter number="05" label="Community" tone="light" />

          <div>
            <Eyebrow className="text-gold">In the community</Eyebrow>
            <p className="display-balance reveal mt-8 max-w-3xl font-display text-[2.25rem] leading-[1.1] font-semibold tracking-[-0.03em] text-paper sm:text-[3.5rem]">
              The money stays <span className="foil italic">where it was made.</span>
            </p>
            <p className="reveal mt-8 max-w-xl text-lg leading-[1.65] text-paper/65">
              Brothers clubs are community clubs. Profits are not paid out to owners somewhere else.
              They go back into the club, the football and the town.
            </p>

            <div className="mt-16 grid gap-10 border-t border-white/15 pt-12 sm:grid-cols-3">
              {[
                { value: "$100k", label: "Brothers Helping Others, the Ipswich community grant program" },
                { value: "$50k", label: "Townsville's grants fund, open to not for profit groups" },
                { value: "120", label: "Good Boxes sponsored every month for people doing it tough" },
              ].map((item) => (
                <Stat key={item.value} value={item.value} label={item.label} />
              ))}
            </div>

            <div className="mt-14">
              <Button href="/community" variant="outline" className="text-paper">
                How we give back
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------------- chapter 6 */

function MembershipLadder() {
  return (
    <section className="bg-paper-warm py-28 sm:py-36">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[9rem_1fr] lg:gap-16">
          <Chapter number="06" label="Membership" />
          <SectionHeading
            eyebrow="Membership"
            title={
              <>
                A few dollars, and the club <span className="italic">is yours</span>
              </>
            }
            intro="Membership costs next to nothing and pays for itself quickly. Cheaper food and drinks, points on what you spend, birthday rewards, members draws and a say in how your club is run."
          />
        </div>

        <ul className="mt-20">
          {clubs.map((club) => (
            <li key={club.slug} className="border-t border-paper-line last:border-b">
              <a
                href={club.website}
                target="_blank"
                rel="noreferrer noopener"
                className="group grid items-baseline gap-4 py-10 sm:grid-cols-[1fr_auto_auto] sm:gap-10"
              >
                <div className="flex items-baseline gap-5">
                  <span
                    className="h-2.5 w-2.5 shrink-0 self-center"
                    style={{ backgroundColor: club.accent }}
                    aria-hidden="true"
                  />
                  <span className="font-display text-[2rem] leading-none font-semibold tracking-[-0.03em] text-navy transition-transform duration-500 ease-out-soft group-hover:translate-x-2 sm:text-[2.75rem]">
                    {club.city}
                  </span>
                </div>
                <p className="max-w-sm text-[0.875rem] leading-[1.6] text-ink-soft">
                  {club.membership.note}
                </p>
                <p className="flex items-baseline gap-3 font-display text-[1.75rem] leading-none font-semibold text-navy sm:justify-end">
                  {club.membership.price}
                  {club.membership.term ? (
                    <span className="text-[0.8125rem] font-normal text-ink-soft">
                      {club.membership.term}
                    </span>
                  ) : null}
                  <Arrow className="text-gold-deep" />
                </p>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex flex-wrap gap-4">
          <Button href="/membership">Compare membership</Button>
          <Button href="/contact" variant="outline" className="text-navy">
            Talk to us
          </Button>
        </div>
      </Container>
    </section>
  );
}
