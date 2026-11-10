"use client";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { authClient } from "@/lib/auth-client";
import { IDestinationPage } from "@/app/destination/page";

const BookingCard = ({ destination }: { destination: IDestinationPage }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleBooking = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();
    const departureDate = e.target.departureDate.value;
    // console.log(departureDate);
    const data = {
      username: user?.name,
      email: user?.email,
      image: user?.email,
      ...destination,
      departureDate: departureDate,
      bookingDate: new Date(),
    };
    // console.log(data);
    const res = await fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const bookingRes = await res.json();
    console.log(bookingRes);
  };
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">Price</p>
        <p className="mt-1 flex items-baseline gap-1">
          <span className="text-3xl font-semibold">
            ${Number(destination.price).toLocaleString("en-US")}
          </span>
          <span className="text-sm text-muted-foreground">/ person</span>
        </p>

        <ul className="mt-5 space-y-2 border-t pt-5 text-sm text-muted-foreground">
          <li className="flex justify-between">
            <span>Duration</span>
            <span className="text-foreground">{destination.duration}</span>
          </li>
          <li className="flex justify-between">
            <span>Departure</span>
            <span className="text-foreground">{destination.date}</span>
          </li>
        </ul>

        <form onSubmit={handleBooking}>
          <div className="mt-3">
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Travel Date
            </label>
            <Input
              type="date"
              name="departureDate"
              aria-label="Departure date"
              className="w-full rounded-md border border-border/60 bg-input/40 px-3 py-2 text-sm placeholder-muted-foreground focus:ring-2 focus:ring-brand/20 focus:border-brand"
              defaultValue={destination.date}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="mt-6 w-full bg-brand text-white hover:bg-brand/90"
          >
            Book now
          </Button>
        </form>
      </div>
    </aside>
  );
};

export default BookingCard;
