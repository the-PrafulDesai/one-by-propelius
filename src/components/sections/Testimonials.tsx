import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// Stock headshots (randomuser.me free, no key required) purely as visual
// placeholders for the customer photo wall.
const LEFT_COLUMNS: string[][] = [
  [
    "https://randomuser.me/api/portraits/women/68.jpg",
    "https://randomuser.me/api/portraits/men/45.jpg",
  ],
  [
    "https://randomuser.me/api/portraits/men/32.jpg",
    "https://randomuser.me/api/portraits/women/12.jpg",
  ],
  ["https://randomuser.me/api/portraits/women/65.jpg"],
  ["https://randomuser.me/api/portraits/men/78.jpg"],
];

const RIGHT_COLUMNS: string[][] = [
  ["https://randomuser.me/api/portraits/men/22.jpg"],
  [
    "https://randomuser.me/api/portraits/men/85.jpg",
    "https://randomuser.me/api/portraits/women/23.jpg",
  ],
  [
    "https://randomuser.me/api/portraits/women/90.jpg",
    "https://randomuser.me/api/portraits/men/60.jpg",
  ],
  ["https://randomuser.me/api/portraits/women/50.jpg"],
];

const MOBILE_STRIP: string[] = [
  "https://randomuser.me/api/portraits/men/45.jpg",
  "https://randomuser.me/api/portraits/women/68.jpg",
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/12.jpg",
  "https://randomuser.me/api/portraits/men/78.jpg",
];

function PhotoCard({ src, className }: { src: string; className?: string }) {
  return (
    <div
      className={cn(
        "group/photo relative aspect-[3/4] w-[78px] shrink-0 overflow-hidden rounded-2xl border border-white bg-[#eceef5] shadow-[0_10px_24px_-14px_rgba(20,16,50,0.4)] transition-transform duration-500 ease-out will-change-transform hover:z-20 hover:shadow-[0_30px_54px_-16px_rgba(20,16,50,0.5)] hover:[transform:perspective(800px)_rotateY(-10deg)_rotateX(6deg)_translateY(-10px)_scale(1.14)] sm:w-[92px] lg:w-[104px] xl:w-[118px]",
        className
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- external stock photo, next/image remote config not set up for this host */}
      <img
        src={src}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover/photo:scale-110"
      />
    </div>
  );
}

function PhotoColumn({
  photos,
  withTether,
}: {
  photos: string[];
  withTether?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-3 lg:gap-4">
      {photos.map((src) => (
        <PhotoCard key={src} src={src} />
      ))}
      {withTether && (
        <span
          aria-hidden="true"
          className="h-8 w-px border-l border-dashed border-[#d9d9e6]"
        />
      )}
    </div>
  );
}

function TestimonialsContent() {
  return (
    <>
      <p className="inline-flex items-center gap-2 rounded-full border border-[#e4e4ee] bg-white px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#635bff] shadow-[0_8px_24px_rgba(56,48,120,0.06)]">
        <span className="size-1.5 rounded-full bg-gradient-to-r from-[#635bff] to-[#4f9cff]" />
        Testimonials
      </p>

      <h2 className="mt-5 text-balance text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-[1.12] tracking-[-0.03em]">
        <span className="text-[#111118]">Trusted by leaders</span>
        <br />
        <span className="text-[#a3a4b3]">from various industries</span>
      </h2>

      <p className="mx-auto mt-5 max-w-[420px] text-balance text-[15px] leading-[1.65] text-[#6c6c78]">
        Learn why teams trust ONE to run their delivery, people, and client
        operations from one connected ERP.
      </p>

      <Button href="#contact" variant="dark" className="mt-7">
        Read Success Stories
      </Button>
    </>
  );
}

export function Testimonials() {
  return (
    <section
      id="customers"
      aria-label="Trusted by leaders from various industries"
      className="relative overflow-hidden bg-[#fafafe] py-16 sm:py-20 lg:py-24"
    >
      <Container className="max-w-[1180px]">
        {/* Mobile / tablet: a photo strip above the text, all in normal flow. */}
        <div className="lg:hidden">
          <div
            aria-hidden="true"
            className="flex items-end justify-center gap-2.5 sm:gap-3.5"
            style={{
              maskImage: "linear-gradient(to bottom, transparent, black 30%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black 30%)",
            }}
          >
            {MOBILE_STRIP.map((src, index) => (
              <PhotoCard
                key={src}
                src={src}
                className={index % 2 === 0 ? "mb-6" : undefined}
              />
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-[420px] text-center">
            <TestimonialsContent />
          </div>
        </div>

        {/* Desktop: photo columns flank a centered text block. */}
        <div className="relative hidden lg:block">
          <div
            aria-hidden="true"
            className="flex items-end justify-center gap-3.5 xl:gap-5"
            style={{
              maskImage: "linear-gradient(to bottom, transparent, black 22%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black 22%)",
            }}
          >
            <div className="flex items-end gap-3.5 xl:gap-5">
              <PhotoColumn photos={LEFT_COLUMNS[0]} />
              <PhotoColumn photos={LEFT_COLUMNS[1]} />
              <PhotoColumn photos={LEFT_COLUMNS[2]} withTether />
              <PhotoColumn photos={LEFT_COLUMNS[3]} />
            </div>

            {/* Reserved, invisible space for the text overlay below. */}
            <div className="w-[300px] shrink-0 xl:w-[380px]" />

            <div className="flex items-end gap-3.5 xl:gap-5">
              <PhotoColumn photos={RIGHT_COLUMNS[0]} />
              <PhotoColumn photos={RIGHT_COLUMNS[1]} />
              <PhotoColumn photos={RIGHT_COLUMNS[2]} />
              <PhotoColumn photos={RIGHT_COLUMNS[3]} withTether />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="pointer-events-auto max-w-[420px] text-center">
              <TestimonialsContent />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
