import Image from "next/image";
import { Arrow, Button, Container, PageHero, SectionHeading } from "@/components/ui";
import { clubs } from "@/lib/clubs";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Membership",
  description:
    "Membership at Brothers Leagues Clubs costs a few dollars and pays for itself quickly. Member pricing, rewards points, draws and birthday perks across all four clubs.",
  path: "/membership",
});

const benefits = [
  {
    title: "Member pricing",
    copy: "Discounted meals and drinks every time you visit, at every club in the family.",
  },
  {
    title: "Points on what you spend",
    copy: "Rewards points that turn into food, drinks and prizes. Clover Rewards in Townsville, member cards elsewhere.",
  },
  {
    title: "Draws and promotions",
    copy: "Members draws, cash ladders, raffles and giveaways running through the week.",
  },
  {
    title: "A gift on your birthday",
    copy: "Because someone should mark it, and the club is happy to be that someone.",
  },
  {
    title: "Partner discounts",
    copy: "Deals with local businesses that stack up quickly if you use them.",
  },
  {
    title: "A say in your club",
    copy: "Members are the club. Come to the meetings, vote, and hold the board to account.",
  },
];

export default function MembershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Membership"
        title="The cheapest good decision you will make this year"
        intro="Join at the front desk in about two minutes, or online through your club. Bring photo identification and you are done."
      >
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/clubs">Join at your club</Button>
        </div>
      </PageHero>

      <section className="bg-paper py-24 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="What it costs"
            title="Different at every club, cheap at all of them"
            intro="Each club sets its own fee and its own term, so check the current rate with your local before you sign up."
          />

          <div className="mt-14 grid gap-px overflow-hidden border border-paper-line bg-paper-line sm:grid-cols-2 lg:grid-cols-4">
            {clubs.map((club) => (
              <div key={club.slug} className="flex flex-col bg-white p-8">
                <p className="eyebrow flex items-center gap-2.5 text-ink-soft">
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: club.accent }}
                    aria-hidden="true"
                  />
                  {club.city}
                </p>
                <p className="mt-6 font-display text-[2.25rem] leading-none font-semibold text-navy">
                  {club.membership.price}
                </p>
                {club.membership.term ? (
                  <p className="mt-2 text-[0.875rem] text-ink-soft">{club.membership.term}</p>
                ) : null}
                <p className="mt-5 flex-1 text-[0.875rem] leading-relaxed text-ink-soft">
                  {club.membership.note}
                </p>
                <a
                  href={club.website}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group mt-7 inline-flex items-center gap-2 text-[0.875rem] font-medium text-navy"
                >
                  Join at {club.city}
                  <Arrow />
                </a>
              </div>
            ))}
          </div>

          <p className="mt-6 text-[0.8125rem] text-ink-soft">
            Prices shown are the rates published by each club and can change. The club's own site is
            always the final word.
          </p>
        </Container>
      </section>

      <section className="bg-paper-warm py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="What you get"
            title="It pays for itself before you finish lunch"
          />

          <div className="mt-16 grid gap-px overflow-hidden border border-paper-line bg-paper-line sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div key={benefit.title} className="bg-white p-8">
                <p className="font-display text-lg text-gold-deep">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-display text-xl font-semibold text-navy">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{benefit.copy}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-navy-deep py-24 sm:py-32">
        <Image
          src="/img/ipswich/night.webp"
          alt="The entrance to a Brothers Leagues Club at night, lit up under the canopy."
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/90 to-navy-deep/55" />
        <Container className="relative">
          <div className="max-w-2xl">
            <SectionHeading
              eyebrow="One more thing"
              tone="light"
              title="Visitors are welcome too"
              intro="You do not have to be a member to walk in and have a meal. Members simply pay less, and get first look at what is on. Bring photo identification if you live nearby, and sign in at the desk."
            />
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/clubs">Find your club</Button>
              <Button href="/contact" variant="outline" className="text-paper">
                Ask a question
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
