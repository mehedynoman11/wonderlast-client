import { HeadsetIcon, MapIcon, ShieldCheckIcon } from "lucide-react";

const REASONS = [
  {
    icon: ShieldCheckIcon,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: MapIcon,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: HeadsetIcon,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function WhyChoose() {
  return (
    <section className="bg-brand/10 py-16">
      <div className="mx-auto max-w-5xl px-4 text-center md:px-9">
        <h2 className="text-3xl font-medium md:text-4xl">
          Why Choose Wanderlust
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Your trusted partner for exceptional travel experiences
        </p>
        <div className="mt-10 grid gap-4 text-left md:grid-cols-3">
          {REASONS.map((reason) => (
            <div key={reason.title} className="bg-card p-6 shadow-sm">
              <reason.icon className="size-7 text-brand" strokeWidth={1.5} />
              <h3 className="mt-3 text-lg font-medium">{reason.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
