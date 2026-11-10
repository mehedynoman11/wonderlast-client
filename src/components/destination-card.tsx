import { MapPinIcon, ArrowUpRightIcon, CalendarDaysIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface IDestinationCard {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  imageUrl: string;
  description: string;
}

export const DestinationCard = ({
  _id,
  name,
  country,
  category,
  price,
  duration,
  imageUrl,
  description,
}: IDestinationCard) => {
  return (
    <div>
      <article
        key={_id}
        className="overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md"
      >
        {/* Image with category badge */}
        <Link href={`destination/${_id}`}>
          <div className="relative h-56">
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
              className="object-cover"
            />
            <span className="absolute top-3 right-3 rounded-md bg-background px-2 py-0.5 text-xs font-medium">
              {category}
            </span>
          </div>
        </Link>

        {/* Card body */}
        <div className="p-4">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPinIcon className="size-3.5" />
            {country}
          </span>

          <div className="mt-1.5 flex items-baseline justify-between gap-2">
            <h3 className="text-lg font-semibold">{name}</h3>
            <span className="flex shrink-0 items-baseline">
              <span className="text-lg font-semibold">${price}</span>
              <span className="text-xs text-muted-foreground">/Person</span>
            </span>
          </div>

          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {description}
          </p>

          <span className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDaysIcon className="size-3.5" />
            {duration}
          </span>

          <Link
            href={`destination/${_id}`}
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
