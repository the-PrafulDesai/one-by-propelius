"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { Button } from "@/components/ui/Button";
import { ErpCarousel } from "@/components/visuals/ErpCarousel";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const media = gsap.matchMedia();

      media.add("(min-width: 768px)", () => {
        gsap.set(laptopRef.current, {
          y: 60,
          scale: 0.92,
          opacity: 0.7,
          transformOrigin: "center top",
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${window.innerHeight * 0.8}`,
            scrub: 0.45,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(
            contentRef.current,
            {
              y: -52,
              scale: 0.85,
              opacity: 0,
              filter: "blur(8px)",
              ease: "none",
            },
            0
          )
          .to(
            laptopRef.current,
            {
              y: -205,
              scale: 1.03,
              opacity: 1,
              ease: "none",
            },
            0
          )
          .to(
            glowRef.current,
            {
              scale: 1.25,
              opacity: 0.95,
              ease: "none",
            },
            0
          );
      });

      media.add("(max-width: 767px)", () => {
        gsap.set(laptopRef.current, {
          y: 42,
          scale: 0.94,
          opacity: 0.76,
          transformOrigin: "center top",
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${window.innerHeight * 0.65}`,
            scrub: 0.35,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(
            contentRef.current,
            {
              y: -38,
              scale: 0.88,
              opacity: 0,
              filter: "blur(7px)",
              ease: "none",
            },
            0
          )
          .to(
            laptopRef.current,
            {
              y: -138,
              scale: 1.02,
              opacity: 1,
              ease: "none",
            },
            0
          );
      });

      return () => media.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="one-hero-background relative min-h-[100svh] overflow-hidden"
    >
      <div
        ref={glowRef}
        aria-hidden="true"
        className="absolute left-1/2 top-[68%] hidden -translate-x-1/2 -translate-y-1/2 text-[clamp(34rem,72vw,66rem)] font-semibold leading-none tracking-[-0.09em] text-[#7064ff]/[0.035] will-change-transform md:block"
      >
        O
      </div>

      <div className="relative mx-auto flex h-[100svh] max-w-[1440px] flex-col items-center overflow-hidden px-5 pt-[122px] sm:px-8 sm:pt-[132px] md:pt-[142px] lg:pt-[146px]">
        <div
          ref={contentRef}
          className="relative z-10 flex w-full min-w-0 max-w-[1120px] flex-col items-center text-center will-change-[transform,filter,opacity] mt-auto sm:mb-0"
        >
          <h1 className="max-w-[1100px] text-balance text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.05em] text-[#0f0f15]">
            <span className="one-gradient-text">ONE</span> Operating System for Your Entire Software Company
          </h1>

          <p className="mt-6 max-w-[840px] text-balance text-[clamp(1rem,1.35vw,1.25rem)] leading-[1.55] tracking-[-0.015em] text-[#4e4e5b] sm:mt-7">
            Manage sales, clients, projects, people, finance and
            engineering from the first lead to the final deployment in one
            connected ERP.
          </p>

          <Button href="#contact" className="mt-8">
            Book a demo
          </Button>
        </div>

        <div
          ref={laptopRef}
          className="relative z-20 mt-auto flex w-full min-w-0 justify-center will-change-[transform,opacity] md:mt-5"
        >
          <ErpCarousel />
        </div>
      </div>

    </section>
  );
}
