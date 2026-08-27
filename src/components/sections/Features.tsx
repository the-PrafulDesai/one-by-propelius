"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface Feature {
  title: string;
  description: string;
  image: string;
  width: number;
  height: number;
}

// The 5 standout capabilities featured in this section a level above the
// full 14-module list in ProductDemo, closer to "why this matters" copy.
const FEATURES: Feature[] = [
  {
    title: "Project & Task Tracking",
    description:
      "See every project, task, and milestone in one structured workspace assign owners, set priorities, and track progress without switching tools.",
    image: "/images/erp/features/project-task-tracking.png",
    width: 1621,
    height: 738,
  },
  {
    title: "Team Collaboration",
    description:
      "Keep every update, comment, and hand-off connected see who did what across projects, clients, and hiring in one shared activity feed.",
    image: "/images/erp/features/team-analysis.png",
    width: 766,
    height: 745,
  },
  {
    title: "Client & Delivery Health",
    description:
      "Track client accounts and project health at a glance, so you always know exactly where every engagement stands.",
    image: "/images/erp/features/client-delivery-health.png",
    width: 1646,
    height: 555,
  },
  {
    title: "Performance Insights",
    description:
      "Monitor utilization, revenue, and delivery performance with real-time analytics that turn operational data into decisions.",
    image: "/images/erp/features/performance-insights.png",
    width: 777,
    height: 517,
  },
  {
    title: "Resource Scheduling",
    description:
      "Plan capacity and allocate the right people to the right work with a live view of team availability.",
    image: "/images/erp/features/resource-scheduling.png",
    width: 1652,
    height: 857,
  },
];

const AUTO_ADVANCE_MS = 5000;

const [primaryFeature, secondaryFeature, ...supportingFeatures] = FEATURES;

function FeatureVisual({
  image,
  width,
  height,
  title,
  className,
}: Pick<Feature, "image" | "width" | "height" | "title"> & {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-1 items-center justify-center overflow-hidden rounded-2xl border border-[#e8e8f0] bg-[#0a0a0f] p-2.5",
        className
      )}
    >
      <Image
        src={image}
        alt={`${title} preview`}
        width={width}
        height={height}
        sizes="(max-width: 1023px) 90vw, 560px"
        className="h-auto max-h-full w-full rounded-lg object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
    </div>
  );
}

function FeatureCard({
  title,
  description,
  image,
  width,
  height,
  minHeightClass,
}: Feature & { minHeightClass: string }) {
  return (
    <div className="group relative flex h-full flex-col rounded-3xl border border-[#e8e8f0] bg-white p-6 shadow-[0_18px_48px_-32px_rgba(32,28,70,0.25)] transition-transform duration-500 ease-out will-change-transform hover:-translate-y-2 sm:p-7">
      {/* Signature accent: a brand-gradient bar that sweeps in from the left. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-3 top-0 h-[3px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-[#635bff] via-[#8b7cff] to-[#4f9cff] transition-transform duration-500 ease-out group-hover:scale-x-100"
      />

      {/* Deeper shadow + soft glow faded in via opacity instead of animating
          box-shadow directly, which is what caused the jerky, stepped feel. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 shadow-[0_36px_76px_-28px_rgba(63,53,150,0.4)] transition-opacity duration-500 ease-out group-hover:opacity-100"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-[#635bff]/[0.05] via-transparent to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
      />

      <div className="relative">
        <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-[#16161d] transition-colors duration-500 ease-out group-hover:text-[#4c3fd9] sm:text-[19px]">
          {title}
        </h3>
        <p className="mt-2 text-[13.5px] leading-[1.6] text-[#6c6c78]">
          {description}
        </p>
      </div>

      <FeatureVisual
        image={image}
        width={width}
        height={height}
        title={title}
        className={cn("relative mt-6", minHeightClass)}
      />
    </div>
  );
}

// Below `lg` the 2+3 bento grid turns into a lot of vertical scrolling, so
// it becomes a draggable, snap-to-card carousel with dot navigation and a
// 5s auto-advance instead.
function FeaturesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const isPaused = useRef(false);
  const skipScrollSync = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const id = window.setInterval(() => {
      if (isPaused.current) return;
      setActiveIndex((current) => (current + 1) % FEATURES.length);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    // Skip when this index change came from the user's own scroll the
    // browser's scroll-snap has already settled it, re-driving scrollIntoView
    // here would fight the gesture.
    if (skipScrollSync.current) {
      skipScrollSync.current = false;
      return;
    }

    cardRefs.current[activeIndex]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeIndex]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;

    const handleScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const trackRect = track.getBoundingClientRect();
        const trackCenter = trackRect.left + trackRect.width / 2;

        let closestIndex = 0;
        let closestDistance = Infinity;

        cardRefs.current.forEach((card, index) => {
          if (!card) return;
          const cardRect = card.getBoundingClientRect();
          const cardCenter = cardRect.left + cardRect.width / 2;
          const distance = Math.abs(cardCenter - trackCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        skipScrollSync.current = true;
        setActiveIndex(closestIndex);
      });
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", handleScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="lg:hidden">
      <div
        ref={trackRef}
        onPointerDown={() => {
          isPaused.current = true;
        }}
        onPointerUp={() => {
          isPaused.current = false;
        }}
        onPointerLeave={() => {
          isPaused.current = false;
        }}
        className="features-carousel-track -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 sm:-mx-8 sm:px-8"
      >
        {FEATURES.map((feature, index) => (
          <div
            key={feature.title}
            ref={(node) => {
              cardRefs.current[index] = node;
            }}
            className="w-[82%] shrink-0 snap-center sm:w-[58%]"
          >
            <FeatureCard
              {...feature}
              minHeightClass="min-h-[220px] sm:min-h-[260px]"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {FEATURES.map((feature, index) => (
          <button
            key={feature.title}
            type="button"
            aria-label={`Show ${feature.title}`}
            aria-current={index === activeIndex}
            onClick={() => {
              isPaused.current = false;
              setActiveIndex(index);
            }}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#635bff] focus-visible:ring-offset-2",
              index === activeIndex
                ? "w-6 bg-[#635bff]"
                : "w-1.5 bg-[#dcdce8] hover:bg-[#b9b4ff]"
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="relative bg-white py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#111118]/10 to-transparent"
      />

      <Container className="max-w-[1180px]">
        <h2
          id="features-heading"
          className="mx-auto max-w-[640px] text-balance text-center text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-[#111118]"
        >
          Powerful Features of{" "}
          <span className="one-gradient-text font-bold">ONE</span> to Manage
          Projects Efficiently
        </h2>

        <div className="mt-12 sm:mt-14">
          <FeaturesCarousel />

          <div className="hidden space-y-5 lg:block">
            <div className="grid gap-5 lg:grid-cols-2">
              <FeatureCard
                {...primaryFeature}
                minHeightClass="min-h-[220px] sm:min-h-[260px]"
              />
              <FeatureCard
                {...secondaryFeature}
                minHeightClass="min-h-[220px] sm:min-h-[260px]"
              />
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {supportingFeatures.map((feature) => (
                <FeatureCard
                  key={feature.title}
                  {...feature}
                  minHeightClass="min-h-[180px] sm:min-h-[200px]"
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
