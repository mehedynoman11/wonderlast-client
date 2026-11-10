import Image from "next/image";
import {
  Carousel,
  CarouselNext,
  CarouselPrevious,
  CarouselTrack,
} from "@/components/ui/carousel";
import { MapPinIcon, QuoteIcon } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Michael Chen",
    location: "Singapore",
    quote:
      '"The Bali Trip Was Absolutely Magical. Everything Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    image: "/travelers/michael.jpg",
  },
  {
    name: "Sarah Johnson",
    location: "New York, USA",
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    image: "/travelers/sarah.jpg",
  },
  {
    name: "Priya Sharma",
    location: "Mumbai, India",
    quote:
      '"Our Maldives Getaway Was Pure Bliss. Overwater Villas, Crystal Clear Lagoons And Flawless Transfers. Every Moment Felt Like A Dream Come True."',
    image: "/travelers/priya.jpg",
  },
  {
    name: "James Rodriguez",
    location: "Sydney, Australia",
    quote:
      '"The Japanese Tour Was Flawlessly Organized. Our Guide Brought Every Temple And Street To Life. We Fell In Love With The Culture And The Food."',
    image: "/travelers/james.jpg",
  },
];

export function Testimonials() {
  return (
    <section className="py-16">
      {/* Carousel parts share state, so the provider must wrap the arrows too */}
      <Carousel pageCount={TESTIMONIALS.length}>
        {/* Section header with carousel arrows */}
        <div className="flex items-end justify-between gap-4 px-4 md:px-9">
          <div>
            <h2 className="text-3xl font-medium md:text-4xl">
              What Travelers Say
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Real experiences from our happy travelers
            </p>
          </div>
          <div className="flex gap-2">
            <CarouselPrevious aria-label="Previous testimonials" />
            <CarouselNext aria-label="Next testimonials" />
          </div>
        </div>

        {/* Quote cards (full-bleed scroll, aligned with the container padding) */}
        <CarouselTrack className="mt-8 px-4 md:px-9">
          {TESTIMONIALS.map((testimonial) => (
            <article
              key={testimonial.name}
              data-card
              className="flex w-[88%] shrink-0 snap-start flex-col justify-between rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-shadow hover:shadow-md sm:w-[420px]"
            >
              {/* Quote */}
              <div>
                <QuoteIcon className="size-8 fill-brand/15 text-brand/40" />
                <p className="mt-4 text-base leading-relaxed text-foreground/90">
                  {testimonial.quote}
                </p>
              </div>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3 border-t border-border/60 pt-4">
                <div className="relative size-11 shrink-0 overflow-hidden rounded-full ring-2 ring-brand/20">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {testimonial.name}
                  </p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPinIcon className="size-3" />
                    <span className="truncate">{testimonial.location}</span>
                  </p>
                </div>
              </div>
            </article>
          ))}
        </CarouselTrack>
      </Carousel>
    </section>
  );
}
