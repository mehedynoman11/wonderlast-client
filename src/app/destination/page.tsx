import Image from "next/image";
import Link from "next/link";
import { DestinationCard } from "@/components/destination-card";

export interface IDestinationPage {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  date: string;
  imageUrl: string;
  description: string;
}

const DestinationPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination`);
  const destinations: IDestinationPage[] = await res.json();

  // Show success toast
  return (
    <section className="container mx-auto max-w-6xl px-4 py-14">
      {/* Section header */}
      <div>
        <h2 className="text-3xl font-medium md:text-4xl">All Destinations</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Handpicked travel experiences for the adventure seekers
        </p>
      </div>

      {/* Empty state */}
      {destinations.length === 0 && (
        <p className="mt-10 text-muted-foreground">
          No destinations yet. Add one to get started.
        </p>
      )}

      {/* Cards */}
      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((destination) => (
          <DestinationCard
            key={destination._id}
            _id={destination._id}
            name={destination.name}
            country={destination.country}
            category={destination.category}
            price={destination.price}
            duration={destination.duration}
            imageUrl={destination.imageUrl}
            description={destination.description}
          />
        ))}
      </div>
    </section>
  );
};
export default DestinationPage;
