import { useCallback, useEffect, useState } from "react";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type ProductCard = {
  title: string;
  subtitle: string;
  imageSrc: string;
  tone: "furniture" | "confectionery" | "bulk" | "seasonal";
};

const products: ProductCard[] = [
  {
    title: "Furniture",
    subtitle: "Tables • Seating • Storage",
    imageSrc: "/category-furniture.png",
    tone: "furniture",
  },
  {
    title: "Confectionery",
    subtitle: "Chocolate • Candy • Snacks",
    imageSrc: "/category-confectionery.png",
    tone: "confectionery",
  },
  {
    title: "Bulk-ready",
    subtitle: "Packed for wholesale handling",
    imageSrc: "/category-bulk-ready.png",
    tone: "bulk",
  },
  {
    title: "Seasonal",
    subtitle: "Fast-moving assortments",
    imageSrc: "/category-seasonal.png",
    tone: "seasonal",
  },
];

const toneRing: Record<ProductCard["tone"], string> = {
  furniture: "ring-amber-200/10",
  confectionery: "ring-yellow-300/18",
  bulk: "ring-cyan-300/18",
  seasonal: "ring-yellow-300/16",
};

const toneGlow: Record<ProductCard["tone"], string> = {
  furniture: "from-amber-200/12 via-transparent to-transparent",
  confectionery: "from-yellow-300/16 via-transparent to-transparent",
  bulk: "from-cyan-300/16 via-transparent to-transparent",
  seasonal: "from-yellow-300/14 via-transparent to-transparent",
};

const AUTOPLAY_MS = 2500;

export default function ProductCarouselSection() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [isPaused, setIsPaused] = useState(false);

  const handleApiSet = useCallback((api: CarouselApi) => {
    setCarouselApi(api);
  }, []);

  useEffect(() => {
    if (!carouselApi || isPaused) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const id = window.setInterval(() => {
      carouselApi.scrollNext();
    }, AUTOPLAY_MS);

    return () => window.clearInterval(id);
  }, [carouselApi, isPaused]);

  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-transparent to-muted/30" />
        <div className="absolute -top-24 right-[-120px] h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute -bottom-24 left-[-120px] h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="section-container relative">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
              Product categories
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              Swipe through what we source for wholesale.
            </p>
          </div>
        </div>

        <div
          className="mt-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
              setIsPaused(false);
            }
          }}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={handleApiSet}
            className="relative"
          >
            <CarouselContent className="-ml-4">
              {products.map((p) => (
                <CarouselItem key={p.title} className="pl-4 basis-[88%] sm:basis-1/2 lg:basis-1/3">
                  <div
                    className={cn(
                      "group relative overflow-hidden rounded-3xl border border-border bg-card text-card-foreground shadow-md ring-1 ring-black/[0.04] transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-lg",
                      toneRing[p.tone],
                    )}
                  >
                    <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br", toneGlow[p.tone])} />

                    <div className="aspect-[16/10] overflow-hidden bg-white/5">
                      <img
                        src={p.imageSrc}
                        alt={p.title}
                        className="h-full w-full object-cover opacity-90 transition duration-500 ease-out group-hover:scale-[1.03] group-hover:opacity-100"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <div className="p-6">
                      <div className="flex items-baseline justify-between gap-4">
                        <p className="text-lg font-semibold text-foreground">{p.title}</p>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{p.subtitle}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="border-border bg-background text-foreground shadow-sm hover:bg-muted hover:text-foreground" />
            <CarouselNext className="border-border bg-background text-foreground shadow-sm hover:bg-muted hover:text-foreground" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}

