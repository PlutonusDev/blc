import Image from "next/image";
import { Arrow, Container, PageHero, SectionHeading } from "@/components/ui";
import { clubs } from "@/lib/clubs";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Work with us",
  description:
    "Hospitality, kitchen, gaming, functions and administration roles at Brothers Leagues Clubs in Cairns, Innisfail, Townsville and Ipswich.",
  path: "/careers",
});

const areas = [
  {
    title: "Kitchen and bistro",
    copy: "Chefs, cooks and kitchen hands. One of our clubs produced the Queensland Club Chef of the Year, so the standard is real.",
  },
  {
    title: "Bar and floor",
    copy: "Bartenders, baristas and food and beverage attendants. The job is half hospitality, half knowing everybody's name.",
  },
  {
    title: "Gaming and services",
    copy: "Gaming attendants, cashiers and customer service, with training and the tickets you need to do it properly.",
  },
  {
    title: "Functions and events",
    copy: "Coordinators and event staff for weddings, corporate days and everything in between.",
  },
  {
    title: "Kitchen to management",
    copy: "Supervisors, duty managers and department heads. Plenty of our leaders started on the floor.",
  },
  {
    title: "Behind the scenes",
    copy: "Marketing, finance, maintenance and administration. Every club needs the quiet half of the operation.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Work with us"
        title="Good hours, real training, and a team that turns up for each other"
        intro="Between the four clubs there are kitchens, bars, gaming floors, function rooms and offices, and they all need people. Roles are advertised by each club."
      />

      <section className="bg-paper py-24 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Where you might fit"
            title="More kinds of work than people expect"
            intro="A club is a restaurant, a bar, a venue and a small business all at once. That means a lot of different jobs and a lot of ways to move around."
          />

          <div className="mt-16 grid gap-px overflow-hidden border border-paper-line bg-paper-line sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((area) => (
              <div key={area.title} className="bg-white p-8">
                <h3 className="font-display text-xl font-semibold text-navy">{area.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{area.copy}</p>
              </div>
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
          <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="How to apply"
                tone="light"
                title="Apply at the club you want to work in"
                intro="Hiring is done club by club, so head to the careers page of the one nearest you. If nothing is listed, send them your résumé anyway. Things move quickly in hospitality."
              />

              <div className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
                {clubs.map((club) => (
                  <a
                    key={club.slug}
                    href={club.website}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group bg-navy p-7 transition-colors duration-300 hover:bg-navy-soft/40"
                  >
                    <p className="font-display text-xl text-paper">{club.city}</p>
                    <p className="mt-2 text-[0.8125rem] text-paper/45">{club.region}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-[0.8125rem] text-gold">
                      {club.websiteLabel}
                      <Arrow />
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden bg-navy-deep">
              <Image
                src="/img/cairns/bar.jpg"
                alt="A bartender pulling a beer for two members at the club bar."
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
