import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const SEARCH_FIELDS = [
  { label: "Location", value: "Address, City Or Zip" },
  { label: "Date/Duration", value: "Anytime/ 3 Days" },
  { label: "Budget", value: "$0-$3000" },
  { label: "People", value: "5-10" },
];

export function HeroBanner() {
  return (
    <section className="relative flex min-h-[560px] flex-col">
      <Image
        src="/hero.jpg"
        alt="Aerial view of a coastal destination"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Darkening overlay so text stays readable */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative flex flex-1 flex-col items-center justify-center px-4 py-16 text-center text-white">
        <h1 className="max-w-3xl text-5xl leading-tight font-light sm:text-6xl md:text-7xl">
          Discover Your Next Adventure
        </h1>
        <p className="mt-6 max-w-xl text-sm text-white/85 sm:text-base">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button className="h-11 gap-2 rounded-none bg-brand px-7 tracking-wider uppercase hover:bg-brand/85">
            Explore Now
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button className="h-11 rounded-none bg-white/80 px-7 tracking-wider text-ink uppercase hover:bg-white">
            View Destination
          </Button>
        </div>
      </div>

      {/* Search bar pinned to the bottom edge of the banner */}
      <div className="relative grid grid-cols-2 divide-x divide-white/15 bg-black/50 backdrop-blur-sm sm:grid-cols-[repeat(4,1fr)_auto]">
        {SEARCH_FIELDS.map((field) => (
          <button
            key={field.label}
            type="button"
            className="px-5 py-2 text-left transition-colors hover:bg-white/10"
          >
            <span className="block text-[13px] text-white">{field.label}</span>
            <span className="block text-xs text-white/60">{field.value}</span>
          </button>
        ))}
        <Button className="col-span-2 h-full rounded-none bg-brand px-10 text-base font-medium tracking-wide hover:bg-brand/85 sm:col-span-1">
          Search
        </Button>
      </div>
    </section>
  );
}
