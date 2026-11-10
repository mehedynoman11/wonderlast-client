import React from "react";
import { IDestinationPage } from "../page";
import { notFound } from "next/navigation";
import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  PencilIcon,
  TagIcon,
  TorusIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import UpdateDestinationPage from "@/components/UpdateDestination";
import DeleteDialog from "@/components/DeleteDialog";
import BookingCard from "@/components/Bookings/BookingCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC", // avoids the date shifting by a day
  });
}

// One small info tile (icon, label, value)
function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof ClockIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-card p-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
        <Icon className="size-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

const DestinationDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const token = await getTokenFromServer();
  
  // console.log(jwtToken.token)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      }
    }
  );
  if (!res.ok) {
    notFound();
  }

  const destination: IDestinationPage = await res.json();

  if (!destination) notFound();
  return (
    <section className="container mx-auto max-w-6xl px-4 py-10">
      {/* Back link */}
      <div className="flex justify-between">
        <Link
          href="/destination"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-brand"
        >
          <ArrowLeftIcon className="size-4" />
          All destinations
        </Link>

        <div className="flex gap-3 items-center">
          <div className="inline-flex items-center gap-1 text-sm transition-colors cursor-pointer">
            <UpdateDestinationPage destination={destination} />
          </div>
          <div className="inline-flex items-center gap-1 text-sm transition-colors cursor-pointer">
            <DeleteDialog id={id} />
          </div>
        </div>
      </div>

      {/* Hero image */}
      <div className="relative mt-4 h-72 overflow-hidden rounded-2xl md:h-[420px]">
        <Image
          src={destination.imageUrl}
          alt={destination.name}
          fill
          priority
          sizes="(max-width: 1152px) 100vw, 1152px"
          className="object-cover"
        />
        <span className="absolute top-4 left-4 rounded-full bg-background px-3 py-1 text-xs font-medium">
          {destination.category}
        </span>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Left: details */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-medium md:text-4xl">
            {destination.name}
          </h1>
          <p className="mt-2 flex items-center gap-1.5 text-muted-foreground">
            <MapPinIcon className="size-4" />
            {destination.country}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <InfoItem
              icon={ClockIcon}
              label="Duration"
              value={destination.duration}
            />
            <InfoItem
              icon={CalendarDaysIcon}
              label="Departure"
              value={formatDate(destination.date)}
            />
            <InfoItem
              icon={TagIcon}
              label="Category"
              value={destination.category}
            />
          </div>

          <h2 className="mt-10 text-xl font-medium">About this trip</h2>
          <p className="mt-3 max-w-prose leading-relaxed text-muted-foreground">
            {destination.description}
          </p>
        </div>

        {/* Right: booking card (stays visible while scrolling on desktop) */}
        <BookingCard destination={destination} />
      </div>
    </section>
  );
};

export default DestinationDetailsPage;
