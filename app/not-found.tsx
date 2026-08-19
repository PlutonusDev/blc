import Link from "next/link";
import { Star } from "@/components/brand";
import { Arrow, Button, Container } from "@/components/ui";
import { clubs } from "@/lib/clubs";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-navy pt-32 pb-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] grain-overlay mix-blend-overlay"
        aria-hidden="true"
      />
      <Container className="relative">
        <div className="max-w-2xl">
          <Star className="h-16 w-auto" />
          <p className="eyebrow mt-8 text-gold">Page not found</p>
          <h1 className="display-balance mt-6 font-display text-[2.75rem] leading-[1.05] font-semibold tracking-[-0.025em] text-paper sm:text-[3.75rem]">
            That one is not on the menu
          </h1>
          <p className="mt-7 text-lg leading-relaxed text-paper/70">
            The page you were after has either moved or never existed. Try one of the clubs instead,
            or head back to the front door.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/">Back to the home page</Button>
            <Button href="/clubs" variant="outline" className="text-paper">
              See the four clubs
            </Button>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
            {clubs.map((club) => (
              <Link
                key={club.slug}
                href={`/clubs/${club.slug}`}
                className="group flex items-center justify-between gap-4 bg-navy px-6 py-5 transition-colors hover:bg-navy-soft/40"
              >
                <span className="font-display text-lg text-paper">{club.city}</span>
                <Arrow className="text-gold" />
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
