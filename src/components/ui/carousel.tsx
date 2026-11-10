"use client";

import { cn } from "cn";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import {
  type ButtonHTMLAttributes,
  createContext,
  type HTMLAttributes,
  type ReactNode,
  type RefObject,
  type UIEvent,
  useContext,
  useRef,
  useState,
} from "react";

const GAP = 16; // matches the gap-4 track below

type CarouselState = {
  trackRef: RefObject<HTMLDivElement | null>;
  pageCount: number;
  page: number;
  handleScroll: (event: UIEvent<HTMLDivElement>) => void;
  scrollToCard: (direction: 1 | -1) => void;
};

const CarouselContext = createContext<CarouselState | null>(null);

function useCarousel() {
  const carousel = useContext(CarouselContext);
  if (!carousel) {
    throw new Error("Carousel parts must be used within <Carousel>");
  }
  return carousel;
}

function cardStep(track: HTMLDivElement) {
  // Cards must carry data-card; step = card width + track gap.
  const card = track.querySelector<HTMLElement>("[data-card]");
  if (!card) return 520 + GAP;
  return card.getBoundingClientRect().width + GAP;
}

type CarouselProps = {
  /** Total number of scrollable cards — children with `data-card`. */
  pageCount: number;
  children?: ReactNode;
};

export function Carousel({ pageCount, children }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);

  const state: CarouselState = {
    pageCount,
    page,
    trackRef,
    scrollToCard(direction) {
      const track = trackRef.current;
      if (!track) return;
      track.scrollBy({ left: direction * cardStep(track), behavior: "smooth" });
    },
    handleScroll(event) {
      const track = event.currentTarget;
      const index = Math.round(track.scrollLeft / cardStep(track));
      setPage(Math.max(0, Math.min(index, pageCount - 1)));
    },
  };

  // Renders nothing itself — consumers arrange track, arrows and status freely.
  return <CarouselContext value={state}>{children}</CarouselContext>;
}

function CarouselTrack({
  className,
  children,
}: HTMLAttributes<HTMLDivElement>) {
  const { trackRef, handleScroll } = useCarousel();
  return (
    <div
      ref={trackRef}
      onScroll={handleScroll}
      className={cn(
        "flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}

const arrowClasses = cn(
  "flex size-9 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-muted",
  "disabled:pointer-events-none disabled:opacity-40",
);

type CarouselArrowProps = ButtonHTMLAttributes<HTMLButtonElement>;

function CarouselPrevious({
  className,
  children,
  ...props
}: CarouselArrowProps) {
  const { page, scrollToCard } = useCarousel();
  return (
    <button
      type="button"
      data-slot="carousel-previous"
      aria-label="Previous"
      disabled={page === 0}
      onClick={() => scrollToCard(-1)}
      className={cn(arrowClasses, className)}
      {...props}
    >
      {children ?? <ArrowLeftIcon className="size-4" />}
    </button>
  );
}

function CarouselNext({ className, children, ...props }: CarouselArrowProps) {
  const { page, pageCount, scrollToCard } = useCarousel();
  return (
    <button
      type="button"
      data-slot="carousel-next"
      aria-label="Next"
      disabled={page >= pageCount - 1}
      onClick={() => scrollToCard(1)}
      className={cn(arrowClasses, className)}
      {...props}
    >
      {children ?? <ArrowRightIcon className="size-4" />}
    </button>
  );
}

function CarouselStatus({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  const { page, pageCount } = useCarousel();
  return (
    <span
      data-slot="carousel-status"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    >
      {page + 1}/{pageCount}
    </span>
  );
}

export {
  CarouselNext,
  CarouselPrevious,
  CarouselStatus,
  CarouselTrack,
  useCarousel,
};
