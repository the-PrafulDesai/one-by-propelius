import Image from "next/image";
import type { LucideIcon } from "lucide-react";

interface TabletMockupProps {
  id?: string;
  title: string;
  image: string;
  icon: LucideIcon;
}

export function TabletMockup({ id, title, image, icon: Icon }: TabletMockupProps) {
  return (
    <div
      id={id}
      role="tabpanel"
      aria-label={`${title} module preview`}
      aria-live="polite"
      className="module-preview-enter mx-auto w-full max-w-[790px]"
    >
      <div className="relative rounded-[26px] border border-[#24252c] bg-[#101116] p-[7px] shadow-[0_38px_90px_-28px_rgba(37,31,94,0.34),0_12px_30px_rgba(25,25,40,0.16)] sm:rounded-[34px] sm:p-[10px]">
        <span
          aria-hidden="true"
          className="absolute -left-[3px] top-[23%] h-12 w-[3px] rounded-l bg-[#3d3e45]"
        />
        <span
          aria-hidden="true"
          className="absolute -right-[3px] top-[29%] h-16 w-[3px] rounded-r bg-[#3d3e45]"
        />
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-[3px] z-20 size-1 -translate-x-1/2 rounded-full bg-[#30323a] ring-1 ring-black/70 sm:top-1 sm:size-1.5"
        />

        {/* Screen the real product screenshot, full width and centered
            (not stretched to fill the frame's height) so nothing gets
            cropped off its sides. */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-[#07080b] sm:rounded-[25px]">
          <Image
            src={image}
            alt={`${title} module preview`}
            width={1900}
            height={945}
            sizes="(max-width: 639px) 380px, (max-width: 1023px) 620px, 790px"
            className="absolute inset-0 m-auto h-auto w-full"
          />

          <span
            aria-hidden="true"
            className="absolute left-[4%] top-[4%] z-10 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-2.5 py-1.5 text-white shadow-[0_8px_20px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:gap-2"
          >
            <span className="flex size-4 items-center justify-center rounded-full bg-white/15 sm:size-5">
              <Icon className="size-2.5 sm:size-3" aria-hidden="true" />
            </span>
            <span className="text-[8px] font-semibold tracking-[-0.01em] sm:text-[10px]">
              {title}
            </span>
          </span>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="mx-auto h-2 w-[92%] rounded-b-[50%] bg-gradient-to-b from-[#d2d3d8] to-[#f4f4f5] shadow-[0_8px_16px_rgba(31,31,43,0.12)]"
      />
    </div>
  );
}
