import Image from "next/image";
import { MockFrame } from "react-mockframe";

import { cn } from "@/lib/utils";

interface LaptopMockupProps {
  screenshot?: string;
  images?: string[];
  activeIndex?: number;
  jumpingSrc?: string | null;
  className?: string;
}

function DashboardPlaceholder() {
  return (
    <div className="flex h-full flex-col bg-[#f7f8fc] text-[#16161d]">
      <div className="flex h-[11%] items-center justify-between border-b border-black/5 bg-white px-[3%]">
        <div className="flex items-center gap-2">
          <span className="size-5 rounded-md bg-gradient-to-br from-[#635bff] to-[#4f9cff]" />
          <span className="text-[clamp(7px,1vw,13px)] font-semibold">
            ONE
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2.5 w-14 rounded-full bg-[#ececf3]" />
          <span className="size-6 rounded-full bg-gradient-to-br from-[#d8d3ff] to-[#9ba9ff]" />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-[17%] border-r border-black/5 bg-white p-[2%]">
          <div className="mb-[18%] h-5 w-full rounded-md bg-[#eeecff]" />

          <div className="space-y-[10%]">
            {[82, 68, 76, 58, 72, 62].map((width, index) => (
              <div
                key={index}
                className="flex items-center gap-2"
              >
                <span
                  className={cn(
                    "size-2.5 rounded-sm",
                    index === 0 ? "bg-[#635bff]" : "bg-[#d9d9e3]"
                  )}
                />
                <span
                  className="h-1.5 rounded-full bg-[#dedee7]"
                  style={{ width: `${width}%` }}
                />
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 p-[3%]">
          <div className="mb-[3%] flex items-end justify-between">
            <div>
              <div className="mb-2 h-3 w-24 rounded-full bg-[#1d1d25]" />
              <div className="h-1.5 w-36 rounded-full bg-[#d9d9e3]" />
            </div>

            <div className="h-7 w-20 rounded-lg bg-[#635bff]" />
          </div>

          <div className="grid grid-cols-3 gap-[2%]">
            {[
              ["Active projects", "24"],
              ["Team utilization", "82%"],
              ["Project margin", "36%"],
            ].map(([label, value], index) => (
              <div
                key={label}
                className="rounded-[clamp(6px,1vw,14px)] border border-black/5 bg-white p-[8%] shadow-sm"
              >
                <div className="mb-[10%] h-1.5 w-2/3 rounded-full bg-[#dcdce5]" />
                <div className="flex items-end justify-between">
                  <span className="text-[clamp(10px,1.7vw,24px)] font-semibold">
                    {value}
                  </span>
                  <span
                    className={cn(
                      "size-4 rounded-full",
                      index === 0
                        ? "bg-[#dcd8ff]"
                        : index === 1
                          ? "bg-[#d9eeff]"
                          : "bg-[#e5ddff]"
                    )}
                  />
                </div>
                <span className="sr-only">{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-[3%] grid h-[57%] grid-cols-[1.35fr_0.65fr] gap-[2%]">
            <div className="rounded-[clamp(8px,1.2vw,16px)] border border-black/5 bg-white p-[4%] shadow-sm">
              <div className="mb-[8%] h-2 w-24 rounded-full bg-[#cfcfd9]" />

              <div className="flex h-[68%] items-end gap-[5%] border-b border-[#ececf2]">
                {[38, 56, 42, 72, 62, 88, 76].map((height, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t-sm bg-gradient-to-t from-[#635bff] to-[#9aa8ff]"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-[clamp(8px,1.2vw,16px)] border border-black/5 bg-white p-[7%] shadow-sm">
              <div className="mb-[12%] h-2 w-20 rounded-full bg-[#cfcfd9]" />

              <div className="space-y-[11%]">
                {[76, 58, 84, 66].map((width, index) => (
                  <div key={index}>
                    <div className="mb-1.5 flex justify-between">
                      <div className="h-1.5 w-10 rounded-full bg-[#dedee6]" />
                      <div className="h-1.5 w-4 rounded-full bg-[#b8b8c4]" />
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-[#eeeeF4]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#635bff] to-[#5ba8ff]"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export function LaptopMockup({
  screenshot,
  images,
  activeIndex = 0,
  jumpingSrc,
  className,
}: LaptopMockupProps) {
  const hasStack = Boolean(images && images.length > 0);

  return (
    <div
      className={cn("laptop-mockup-stage", className)}
      role="img"
      aria-label="ONE ERP dashboard displayed on a laptop"
    >
      <MockFrame device="MacBook Pro" color="silver">
        <div className="relative h-full w-full overflow-hidden bg-[#07080b]">
          {hasStack ? (
            images!.map((src, index) => {
              const delta =
                ((index - activeIndex + 2 + images!.length) % images!.length) -
                2;

              return (
                <Image
                  key={src}
                  src={src}
                  alt={
                    index === activeIndex ? "ONE ERP product dashboard" : ""
                  }
                  aria-hidden={index === activeIndex ? undefined : true}
                  fill
                  sizes="(max-width: 639px) 283px, (max-width: 767px) 461px, (max-width: 1023px) 576px, (max-width: 1279px) 749px, 883px"
                  className="object-contain object-center will-change-transform"
                  style={{
                    transform: `translate3d(${delta * 100}%, 0, 0)`,
                    transition:
                      src === jumpingSrc
                        ? "none"
                        : "transform 1400ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                />
              );
            })
          ) : screenshot ? (
            <Image
              src={screenshot}
              alt="ONE ERP product dashboard"
              fill
              priority
              sizes="(max-width: 639px) 284px, (max-width: 767px) 461px, (max-width: 1023px) 576px, (max-width: 1279px) 749px, 883px"
              className="object-contain object-top"
            />
          ) : (
            <DashboardPlaceholder />
          )}
        </div>
      </MockFrame>
    </div>
  );
}
