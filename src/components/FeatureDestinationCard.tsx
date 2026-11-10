import { IDestinationPage } from "@/app/destination/page";
import { ArrowUpRightIcon, CalendarDaysIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FeatureDestinationCard = ({
  destination,
}: {
  destination: IDestinationPage;
}) => {
  return (
    <div>
      <article
        key={destination._id}
        className="overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md"
      >
        {/* Image with category badge */}
        <Link href={`destination/${destination._id}`}>
          <div className="relative h-56">
            <Image
              src={destination.imageUrl}
              alt={destination.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
              className="object-cover"
            />
            <span className="absolute top-3 right-3 rounded-md bg-background px-2 py-0.5 text-xs font-medium">
              {destination.category}
            </span>
          </div>
        </Link>

        {/* Card body */}
        <div className="p-4">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPinIcon className="size-3.5" />
            {destination.country}
          </span>

          <div className="mt-1.5 flex items-baseline justify-between gap-2">
            <h3 className="text-lg font-semibold">{destination.name}</h3>
            <span className="flex shrink-0 items-baseline">
              <span className="text-lg font-semibold">
                ${destination.price}
              </span>
              <span className="text-xs text-muted-foreground">/Person</span>
            </span>
          </div>

          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {destination.description}
          </p>

          <span className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDaysIcon className="size-3.5" />
            {destination.duration}
          </span>

          <Link
            href="#"
            className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium tracking-wider text-foreground/70 uppercase transition-colors hover:text-brand"
          >
            Book Now
            <ArrowUpRightIcon className="size-3.5" />
          </Link>
        </div>
      </article>
    </div>
  );
};

export default FeatureDestinationCard;
