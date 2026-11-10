import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CalendarDaysIcon,
  MapPinIcon,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselNext,
  CarouselPrevious,
  CarouselStatus,
  CarouselTrack,
} from "@/components/ui/carousel";
import { IDestinationPage } from "@/app/destination/page";
import FeatureDestinationCard from "./FeatureDestinationCard";

export default async function FeaturedDestinations() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination`);
  const destinations: IDestinationPage[] = await res.json();
  return (
    <section className="py-14">
      {/* Section header */}
      <div className="flex flex-wrap items-end justify-between gap-4 px-4 md:px-9">
        <div>
          <h2 className="text-3xl font-medium md:text-4xl">
            Featured Destinations
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Handpicked travel experiences for the adventure seekers
          </p>
        </div>
        <Link href={"/destination"}>
          <Button variant="outline" className="rounded-md uppercase">
            All Destinations
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
        </Link>
      </div>

      <Carousel pageCount={destinations.length}>
        {/* Carousel controls */}
        <div className="mt-5 flex items-center justify-between px-4 md:px-9">
          <CarouselStatus />
          <div className="flex gap-2">
            <CarouselPrevious aria-label="Previous destinations" />
            <CarouselNext aria-label="Next destinations" />
          </div>
        </div>
        {/* Card carousel (full-bleed, aligned with the container padding) */}
        <CarouselTrack className="mt-7 px-4 md:px-9">
          {destinations.map((destination) => (
            <FeatureDestinationCard
              key={destination._id}
              destination={destination}
            />
          ))}
        </CarouselTrack>
      </Carousel>
    </section>
  );
}
