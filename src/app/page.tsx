import FeaturedDestinations from "@/components/featured-destinations";
import { HeroBanner } from "@/components/hero-banner";
import { Testimonials } from "@/components/testimonials";
import { WhyChoose } from "@/components/why-choose";

export default function Home() {
  return (
    <>
      <main className="max-w-6xl mx-auto container">
        <HeroBanner />
        <FeaturedDestinations />
        <WhyChoose />
        <Testimonials />
      </main>
    </>
  );
}
