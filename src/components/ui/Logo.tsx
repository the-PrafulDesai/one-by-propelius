import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="ONE by Propelius home"
      className="flex items-center gap-2"
    >
      <span className="flex size-10 items-center justify-center ">
        <Image src="/images/logos/onelogo_withbg.png" width={32} height={32} alt="" />
      </span>

      <span className="flex items-baseline gap-1.5">
        <span className="text-[21px] font-semibold tracking-[-0.04em] text-[#111118]">
          ONE
        </span>

        <span className="hidden text-[11px] font-medium text-[#7b7b89] sm:inline">
          by Propelius
        </span>
      </span>
    </Link>
  );
}