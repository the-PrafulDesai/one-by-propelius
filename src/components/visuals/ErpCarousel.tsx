"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";

import { cn } from "@/lib/utils";
import { LaptopMockup } from "@/components/visuals/LaptopMockup";

const SLIDES = [
  "/images/erp/hero/erp-snippet-1.png",
  "/images/erp/hero/erp-snippet-2.png",
  "/images/erp/hero/erp-snippet-3.png",
  "/images/erp/hero/erp-snippet-4.png",
  "/images/erp/hero/erp-snippet-5.png",
];

const TOTAL = SLIDES.length;
const FRAME_DURATION = 4000;
const SLIDE_DURATION = 1400;

// Ring position of a slide relative to the active (centered-in-laptop) one,
// mapped to a signed offset in [-2, -1, 0, 1, 2]. Entrants flow in from the
// right and exit to the left, shifting one step every tick.
function ringDelta(slideIndex: number, activeIndex: number) {
  return ((slideIndex - activeIndex + 2 + TOTAL) % TOTAL) - 2;
}

function cardStyle(delta: number): CSSProperties {
  const abs = Math.abs(delta);
  const direction = delta < 0 ? "-" : "+";
  const offset =
    abs === 2
      ? "var(--carousel-far-offset)"
      : "var(--carousel-near-offset)";

  return {
    transform:
      delta === 0
        ? "translate(-50%, -50%)"
        : `translate(calc(-50% ${direction} ${offset}), -50%) scale(${abs === 1 ? 0.82 : 0.68})`,
    zIndex: Math.abs(delta) <= 1 ? 15 : 10,
  };
}

interface ErpCarouselProps {
  className?: string;
}

export function ErpCarousel({ className }: ErpCarouselProps) {
  const [state, setState] = useState<{
    activeIndex: number;
    jumpingSrc: string | null;
  }>({ activeIndex: 0, jumpingSrc: null });
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const id = window.setInterval(() => {
      setState((prev) => {
        const nextIndex = (prev.activeIndex + 1) % TOTAL;
        // The slide currently parked at the far left (-2) is about to wrap
        // to the far right (+2) next snap it there instantly instead of
        // sliding it back across the whole stack.
        const jumpingSrc = SLIDES[(prev.activeIndex + 3) % TOTAL];
        return { activeIndex: nextIndex, jumpingSrc };
      });
    }, FRAME_DURATION);

    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className={cn(
        "hero-carousel relative flex w-full items-center justify-center",
        className
      )}
    >
      {SLIDES.map((src, index) => {
        const delta = ringDelta(index, state.activeIndex);
        const { transform, zIndex } = cardStyle(delta);
        const isJumping = src === state.jumpingSrc;

        return (
          <div
            key={src}
            aria-hidden="true"
            className="hero-carousel-card"
            style={{
              transform,
              zIndex,
              transition: isJumping
                ? "none"
                : `transform ${SLIDE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`,
            }}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 639px) 283px, (max-width: 767px) 461px, (max-width: 1023px) 576px, (max-width: 1279px) 749px, 883px"
              className="object-contain object-center"
            />
          </div>
        );
      })}

      <LaptopMockup
        images={SLIDES}
        activeIndex={state.activeIndex}
        jumpingSrc={state.jumpingSrc}
        className="relative z-30"
      />
    </div>
  );
}
