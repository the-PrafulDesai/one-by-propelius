"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Point = readonly [number, number];

const CENTER: Point = [600, 360];

const DEPARTMENTS: ReadonlyArray<{
  label: string;
  x: number;
  y: number;
  path: ReadonlyArray<Point>;
}> = [
  { label: "Sales CRM", x: 140, y: 150, path: [CENTER, [600, 210], [140, 210], [140, 150]] },
  { label: "Clients", x: 350, y: 90, path: [CENTER, [600, 180], [350, 180], [350, 90]] },
  { label: "Projects", x: 600, y: 64, path: [CENTER, [600, 64]] },
  { label: "Resource Utilization", x: 850, y: 90, path: [CENTER, [600, 180], [850, 180], [850, 90]] },
  { label: "HR", x: 1060, y: 150, path: [CENTER, [600, 210], [1060, 210], [1060, 150]] },
  { label: "Recruitment", x: 120, y: 310, path: [CENTER, [360, 360], [360, 310], [120, 310]] },
  { label: "Employee Hub", x: 190, y: 455, path: [CENTER, [400, 360], [400, 455], [190, 455]] },
  { label: "Meetings", x: 355, y: 570, path: [CENTER, [500, 360], [500, 570], [355, 570]] },
  { label: "Invoices", x: 210, y: 665, path: [CENTER, [540, 360], [540, 620], [210, 620], [210, 665]] },
  { label: "My Space", x: 455, y: 680, path: [CENTER, [600, 520], [455, 520], [455, 680]] },
  { label: "User Management", x: 700, y: 680, path: [CENTER, [600, 540], [700, 540], [700, 680]] },
  { label: "Bug Reports", x: 1030, y: 665, path: [CENTER, [660, 360], [660, 620], [1030, 620], [1030, 665]] },
  { label: "Deploys", x: 870, y: 575, path: [CENTER, [700, 360], [700, 575], [870, 575]] },
  { label: "Code Reviews", x: 1010, y: 455, path: [CENTER, [800, 360], [800, 455], [1010, 455]] },
  { label: "Analytics", x: 1080, y: 310, path: [CENTER, [840, 360], [840, 310], [1080, 310]] },
];

const SIGNAL_STREAMS = [
  [0, 7, 14],
  [1, 8, 12],
  [2, 6, 11],
  [3, 5, 10],
  [4, 9, 13],
] as const;

function pathLength(points: ReadonlyArray<Point>) {
  return points.slice(1).reduce((total, point, index) => {
    const previous = points[index];
    return total + Math.abs(point[0] - previous[0]) + Math.abs(point[1] - previous[1]);
  }, 0);
}

export function WorkflowSignalGraph() {
  const graphRef = useRef<HTMLDivElement>(null);
  const signalRefs = useRef<Array<SVGCircleElement | null>>([]);
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const mobileNodeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const mobileSignalRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const media = gsap.matchMedia();

      media.add("(min-width: 640px)", () => {
        SIGNAL_STREAMS.forEach((stream, streamIndex) => {
          const speed = [1, 1.16, 0.9, 1.08, 0.96][streamIndex];
          const timeline = gsap.timeline({
            repeat: -1,
            repeatDelay: [1.2, 1.7, 2.1, 1.45, 2.35][streamIndex],
            delay: [0, 0.45, 0.9, 1.35, 1.8][streamIndex],
            scrollTrigger: {
              trigger: graphRef.current,
              start: "top 82%",
              end: "bottom 18%",
              toggleActions: "play pause resume pause",
            },
          });

          stream.forEach((nodeIndex, sequenceIndex) => {
            const department = DEPARTMENTS[nodeIndex];
            const signal = signalRefs.current[nodeIndex];
            const node = nodeRefs.current[nodeIndex];
            const totalLength = pathLength(department.path);

            timeline.set(
              signal,
              { attr: { cx: CENTER[0], cy: CENTER[1] }, opacity: 0 },
              sequenceIndex === 0 ? 0 : ">+0.35"
            );
            timeline.to(signal, { opacity: 1, duration: 0.14 }, ">");

            department.path.slice(1).forEach((point, pointIndex) => {
              const previous = department.path[pointIndex];
              const distance =
                Math.abs(point[0] - previous[0]) + Math.abs(point[1] - previous[1]);

              timeline.to(signal, {
                attr: { cx: point[0], cy: point[1] },
                duration: Math.max(0.18, (distance / totalLength) * 1.45 * speed),
                ease: "none",
              });
            });

            timeline
              .to(signal, { opacity: 0, duration: 0.18 }, "<+0.04")
              .to(
                node,
                {
                  scale: 1.025,
                  borderColor: "#6866d8",
                  backgroundColor: "#161824",
                  boxShadow: "0 0 0 1px rgba(118,108,255,0.12), 0 14px 34px rgba(0,0,0,0.28)",
                  duration: 0.32,
                  repeat: 1,
                  yoyo: true,
                  ease: "power1.inOut",
                },
                "<"
              );
          });
        });
      });

      media.add("(max-width: 639px)", () => {
        const nodes = mobileNodeRefs.current.filter(Boolean);
        const timeline = gsap.timeline({
          repeat: -1,
          repeatDelay: 1.4,
          scrollTrigger: {
            trigger: graphRef.current,
            start: "top 86%",
            end: "bottom 8%",
            toggleActions: "play pause resume pause",
          },
        });

        timeline.fromTo(
          mobileSignalRef.current,
          { top: 78, opacity: 0 },
          { top: "calc(100% - 26px)", opacity: 1, duration: 8.5, ease: "none" }
        );

        nodes.forEach((node, index) => {
          timeline.to(
            node,
            {
              borderColor: "#6563ce",
              backgroundColor: "#151722",
              duration: 0.28,
              repeat: 1,
              yoyo: true,
            },
            0.55 + index * 0.5
          );
        });
      });

      return () => media.revert();
    },
    { scope: graphRef }
  );

  return (
    <div ref={graphRef} className="relative mx-auto w-full max-w-[1200px]">
      <div
        className="relative hidden aspect-[5/3] w-full sm:block"
        role="list"
        aria-label="Departments powered by ONE"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 720"
          className="absolute inset-0 h-full w-full overflow-visible"
        >
          <defs>
            <filter id="signal-glow" x="-300%" y="-300%" width="700%" height="700%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {DEPARTMENTS.map((department) => (
            <polyline
              key={department.label}
              points={department.path.map(([x, y]) => `${x},${y}`).join(" ")}
              fill="none"
              stroke="#30333d"
              strokeWidth="1.25"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              style={{ filter: "drop-shadow(0 0 2px rgba(139, 135, 185, 0.12))" }}
            />
          ))}

          {DEPARTMENTS.map((department, index) => (
            <circle
              key={`signal-${department.label}`}
              ref={(node) => {
                signalRefs.current[index] = node;
              }}
              cx={CENTER[0]}
              cy={CENTER[1]}
              r="4.5"
              fill="#a9a3ff"
              filter="url(#signal-glow)"
              opacity="0"
            />
          ))}
        </svg>

        <div className="absolute left-1/2 top-1/2 z-20 flex size-[clamp(88px,9vw,112px)] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[26px] border border-white/15 bg-[#0d0f16] shadow-[0_24px_70px_rgba(0,0,0,0.5),0_0_36px_rgba(99,91,255,0.12)]">
          <Image
            src="/images/logos/onelogo_withbg.png"
            alt="ONE"
            width={64}
            height={64}
            loading="eager"
            className="size-[56%]"
          />
        </div>

        {DEPARTMENTS.map((department, index) => (
          <div
            key={department.label}
            ref={(node) => {
              nodeRefs.current[index] = node;
            }}
            role="listitem"
            className="absolute z-10 flex min-h-10 w-[clamp(96px,12.5vw,164px)] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-white/[0.11] bg-[#0d0f16]/95 px-2.5 py-2 text-center text-[clamp(0.62rem,1.1vw,0.86rem)] font-medium leading-[1.25] tracking-[-0.015em] text-[#e8e9ee] shadow-[0_16px_36px_rgba(0,0,0,0.24)] will-change-[transform,background-color,border-color] lg:min-h-12 lg:rounded-2xl lg:px-4"
            style={{ left: `${(department.x / 1200) * 100}%`, top: `${(department.y / 720) * 100}%` }}
          >
            {department.label}
          </div>
        ))}
      </div>

      <div className="relative sm:hidden">
        <div className="relative z-10 mx-auto flex size-20 items-center justify-center rounded-[22px] border border-white/15 bg-[#0d0f16] shadow-[0_18px_48px_rgba(0,0,0,0.4),0_0_28px_rgba(99,91,255,0.1)]">
          <Image
            src="/images/logos/onelogo_withbg.png"
            alt="ONE"
            width={48}
            height={48}
            loading="eager"
            className="size-11"
          />
        </div>

        <span aria-hidden="true" className="absolute left-1/2 top-20 h-9 w-px -translate-x-1/2 bg-[#30333d]" />
        <span
          ref={mobileSignalRef}
          aria-hidden="true"
          className="absolute left-1/2 z-20 size-2 -translate-x-1/2 rounded-full bg-[#aaa4ff] shadow-[0_0_10px_3px_rgba(125,116,255,0.38)]"
        />

        <div className="relative mt-9 grid grid-cols-2 gap-x-3 gap-y-2.5 px-1" role="list" aria-label="Departments powered by ONE">
          <span aria-hidden="true" className="absolute bottom-6 left-1/2 top-0 w-px -translate-x-1/2 bg-[#30333d]" />
          {DEPARTMENTS.map((department, index) => (
            <div
              key={department.label}
              className={`relative ${index === DEPARTMENTS.length - 1 ? "col-span-2 mx-auto w-[calc(50%_-_0.375rem)]" : ""}`}
            >
              {index !== DEPARTMENTS.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`absolute top-1/2 h-px w-1.5 -translate-y-1/2 bg-[#30333d] ${index % 2 === 0 ? "-right-1.5" : "-left-1.5"}`}
                />
              )}
              <div
                ref={(node) => {
                  mobileNodeRefs.current[index] = node;
                }}
                role="listitem"
                className="relative z-10 flex min-h-11 items-center justify-center rounded-xl border border-white/[0.11] bg-[#0d0f16]/95 px-2.5 py-2 text-center text-[11.5px] font-medium leading-[1.25] tracking-[-0.01em] text-[#e8e9ee] shadow-[0_12px_28px_rgba(0,0,0,0.22)]"
              >
                {department.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
