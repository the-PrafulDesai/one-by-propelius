"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

const AVATARS = [
  "https://randomuser.me/api/portraits/women/65.jpg",
  "https://randomuser.me/api/portraits/women/12.jpg",
  "https://randomuser.me/api/portraits/women/68.jpg",
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/23.jpg",
];

function BlueprintPattern({ side }: { side: "left" | "right" }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute top-0 hidden h-full w-[40%] opacity-40 md:block",
        side === "left" ? "left-0" : "right-0 scale-x-[-1]"
      )}
    >
      <div className="absolute left-[8%] top-[10%] size-16 rounded-2xl border border-white/10" />
      <div className="absolute left-[26%] top-[6%] size-9 rounded-xl border border-white/10" />
      <div className="absolute left-[22%] top-[30%] size-11 rounded-xl border border-white/10" />
      <div className="absolute left-[4%] top-[46%] size-20 rounded-2xl border border-white/10" />
      <div className="absolute left-[30%] top-[58%] size-12 rounded-xl border border-white/10" />
      <div className="absolute left-[10%] top-[76%] size-9 rounded-lg border border-white/10" />
      <div className="absolute left-[28%] top-[86%] size-14 rounded-2xl border border-white/10" />
    </div>
  );
}

export function Contact() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-white py-10 sm:py-12 lg:py-14">
      <div className="relative mx-4 overflow-hidden rounded-[24px] border border-white/[0.06] bg-[#05060a] px-5 py-9 sm:mx-6 sm:rounded-[28px] sm:px-8 sm:py-10 lg:mx-8 lg:px-10 lg:py-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#635bff]/20 blur-[120px]"
        />

        <BlueprintPattern side="left" />
        <BlueprintPattern side="right" />

        <div className="relative mx-auto flex max-w-[560px] flex-col items-center text-center">
          <div className="flex items-center gap-2">
            <Image
              src="/images/logos/onelogo_withbg.png"
              alt=""
              width={24}
              height={24}
              className="rounded-md"
            />
            <span className="text-[14px] font-semibold text-white">ONE</span>
          </div>

          <h2 className="mt-5 text-balance text-[clamp(1.7rem,3.6vw,2.5rem)] font-semibold leading-[1.16] tracking-[-0.03em] text-white">
            Ready to Transform Your Software Business?
          </h2>

          <div
            className="mt-4 flex"
            role="img"
            aria-label="Avatars of teams using ONE"
          >
            {AVATARS.map((src, index) => (
              // eslint-disable-next-line @next/next/no-img-element -- external stock photo
              <img
                key={src}
                src={src}
                alt=""
                loading="lazy"
                className="size-8 shrink-0 rounded-full border-2 border-[#05060a] object-cover sm:size-9"
                style={{
                  marginLeft: index === 0 ? 0 : -12,
                  zIndex: AVATARS.length - index,
                }}
              />
            ))}
          </div>

          <p className="mt-4 max-w-[460px] text-balance text-[14px] leading-[1.65] text-[#9a9ca7]">
            Say goodbye to fragmented tools and hello to one connected ERP.
            From sales and hiring to delivery and billing, we&rsquo;ve got you
            covered all in one powerful platform.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 flex w-full max-w-[420px] flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-1.5 sm:rounded-full sm:bg-white sm:p-1.5 sm:shadow-[0_20px_50px_-16px_rgba(0,0,0,0.5)]"
          >
            <label htmlFor="contact-email" className="sr-only">
              Work email
            </label>
            <input
              id="contact-email"
              type="email"
              required
              placeholder="Enter your work email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full min-w-0 flex-1 rounded-full border border-transparent bg-white px-5 py-3 text-sm text-[#16161d] shadow-[0_16px_36px_-18px_rgba(0,0,0,0.55)] placeholder:text-[#9a9aac] focus:outline-none sm:bg-transparent sm:px-4 sm:py-2.5 sm:shadow-none"
            />
            <button
              type="submit"
              className="w-full shrink-0 rounded-full bg-gradient-to-r from-[#635bff] via-[#765eff] to-[#4f9cff] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(99,91,255,0.35)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(99,91,255,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#635bff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05060a] sm:w-auto sm:py-2.5"
            >
              Get Started
            </button>
          </form>

          <p
            role="status"
            className={cn(
              "mt-3 text-[12.5px] text-emerald-400 transition-opacity duration-300",
              submitted ? "opacity-100" : "opacity-0"
            )}
          >
            Thanks we&rsquo;ll be in touch shortly.
          </p>
        </div>
      </div>
    </section>
  );
}
