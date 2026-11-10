import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import {
  CalendarDays,
  Clock,
  MapPin,
  Plane,
  ArrowRight,
  Ticket,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface IBookings {
  _id: string;
  username: string;
  email: string;
  image: string;
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  date: string;
  imageUrl: string;
  description: string;
  departureDate: string;
  bookingDate: string;
}

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
        <Ticket className="size-12 text-muted-foreground" />
        <h2 className="text-2xl font-bold">Please Login First</h2>
        <p className="text-muted-foreground">
          Login to view your travel bookings.
        </p>
        <Link
          href="/signin"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Login Now
        </Link>
      </div>
    );
  }

  let bookings: IBookings[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${user.email}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch bookings");
    }

    bookings = await res.json();
  } catch (error) {
    console.error("Booking fetch error:", error);
  }

  return (
    <main className="container mx-auto min-h-screen px-4 py-10 md:py-16">
      {/* Header */}
      <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <Badge variant="secondary" className="mb-3 gap-2 px-3 py-1">
            <Plane className="size-3" />
            My Travel Dashboard
          </Badge>

          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            My Bookings
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage and view your upcoming travel plans.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-xl border bg-card p-4">
          <div className="rounded-lg bg-primary/10 p-3">
            <Ticket className="size-6 text-primary" />
          </div>

          <div>
            <p className="text-2xl font-bold">{bookings.length}</p>
            <p className="text-xs text-muted-foreground">Total Bookings</p>
          </div>
        </div>
      </div>

      {/* Booking Cards */}
      {bookings.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {bookings.map((booking) => (
            <Card
              key={booking._id}
              className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={booking.imageUrl}
                  alt={booking.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <Badge className="absolute left-4 top-4 bg-background/90 text-foreground backdrop-blur">
                  {booking.category}
                </Badge>

                <div className="absolute bottom-4 right-4 rounded-lg bg-black/70 px-3 py-2 text-white backdrop-blur">
                  <p className="text-xs text-white/70">Package Price</p>
                  <p className="font-bold">{booking.price}</p>
                </div>
              </div>

              <CardContent className="space-y-5 p-5">
                {/* Title */}
                <div>
                  <div className="mb-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="size-4 text-primary" />
                    {booking.country}
                  </div>

                  <h2 className="line-clamp-1 text-xl font-bold">
                    {booking.name}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {booking.description}
                  </p>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-2 rounded-lg bg-muted/60 p-3">
                  <Clock className="size-4 text-primary" />
                  <span className="text-sm font-medium">
                    {booking.duration}
                  </span>
                </div>

                {/* Dates */}
                <div className="space-y-3 border-t pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Plane className="size-4" />
                      Departure
                    </span>
                    <span className="font-medium">{booking.departureDate}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <CalendarDays className="size-4" />
                      Booked On
                    </span>
                    <span className="font-medium">{booking.bookingDate}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t pt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Booked by</p>
                    <p className="text-sm font-semibold">{booking.username}</p>
                  </div>

                  <Badge variant="outline" className="rounded-full">
                    <Ticket className="mr-1 size-3" />
                    Booking
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Empty State */
        <Card className="rounded-2xl border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-5 rounded-full bg-primary/10 p-5">
              <Plane className="size-10 text-primary" />
            </div>

            <h2 className="text-2xl font-bold">No Bookings Yet!</h2>

            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              You haven't booked any travel packages yet. Explore destinations
              and start planning your next adventure.
            </p>

            <Link
              href="/destination"
              className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Explore Destinations
              <ArrowRight className="size-4" />
            </Link>
          </CardContent>
        </Card>
      )}
    </main>
  );
};

export default MyBookingsPage;
