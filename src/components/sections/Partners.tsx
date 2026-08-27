"use client";

import { useRef } from "react";
import {
  Hexagon,
  Layers,
  Waves,
  Zap,
  Compass,
  Boxes,
  Orbit,
  Infinity as InfinityIcon,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { Container } from "@/components/ui/Container";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PARTNERS = [
  { name: "Xign", Icon: Hexagon, color: "#635BFF" },
  { name: "Dexign", Icon: Layers, color: "#FF6B4A" },
  { name: "Emblem", Icon: Waves, color: "#12B76A" },
  { name: "Wayline", Icon: Zap, color: "#F59E0B" },
  { name: "Norvex", Icon: Compass, color: "#4F9CFF" },
  { name: "Kaidra", Icon: Boxes, color: "#EC4899" },
  { name: "Fluxbase", Icon: Orbit, color: "#8B5CF6" },
  { name: "Orbiq", Icon: InfinityIcon, color: "#0EA5E9" },
];

// Duplicated once so the track can loop by translating exactly -50%.
const MARQUEE_LOGOS = [...PARTNERS, ...PARTNERS];

export function Partners() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      gsap.set([headingRef.current, marqueeRef.current], {
        opacity: 0,
        y: 24,
      });

      gsap.to([headingRef.current, marqueeRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative bg-white py-16 sm:py-12 lg:py-14">
      <Container>
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-14">
          <div
            ref={headingRef}
            className="max-w-[300px] shrink-0 text-left will-change-[transform,opacity]"
          >
            <p className="text-[clamp(1.15rem,1.7vw,1.4rem)] font-semibold leading-[1.3] tracking-[-0.03em] text-[#111118]">
              Over 30+ Partner Companies Globally Trust Us
            </p>
          </div>

          <div
            aria-hidden="true"
            className="hidden h-16 w-px shrink-0 self-center bg-gradient-to-b from-transparent via-[#111118]/15 to-transparent lg:block"
          />

          <div
            ref={marqueeRef}
            className="partners-marquee relative w-full overflow-hidden will-change-[transform,opacity] lg:flex-1"
            style={{ "--marquee-duration": "30s" } as React.CSSProperties}
          >
            <div className="partners-marquee-track flex w-max items-center gap-12 sm:gap-16">
              {MARQUEE_LOGOS.map(({ name, Icon, color }, index) => (
                <div
                  key={`${name}-${index}`}
                  aria-hidden={index >= PARTNERS.length}
                  className="flex shrink-0 cursor-default items-center gap-2.5 grayscale opacity-45 transition-all duration-500 ease-out hover:scale-105 hover:opacity-100 hover:grayscale-0"
                  style={{ color }}
                >
                  <Icon className="size-6" strokeWidth={1.75} />
                  <span className="text-[17px] font-semibold tracking-[-0.02em]">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
