import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "dark";
  icon?: boolean;
}

export function Button({
  href,
  children,
  className,
  variant = "primary",
  icon = true,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex h-13 items-center justify-center overflow-hidden rounded-full px-7 text-[15px] font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#635bff] focus-visible:ring-offset-2",
        variant === "primary" &&
          "bg-gradient-to-r from-[#635bff] via-[#765eff] to-[#4f9cff] text-white shadow-[0_12px_35px_rgba(99,91,255,0.28)] hover:-translate-y-0.5 hover:shadow-[0_16px_42px_rgba(99,91,255,0.38)]",
        variant === "dark" &&
          "bg-[#111118] text-white hover:-translate-y-0.5 hover:bg-[#24242d]",
        className
      )}
    >
      <span
        className={cn(
          "whitespace-nowrap transition-transform duration-300 ease-out",
          icon && "group-hover:-translate-x-1"
        )}
      >
        {children}
      </span>

      {icon && (
        <ArrowUpRight
          aria-hidden="true"
          className="ml-0 size-4 max-w-0 -translate-x-3 scale-75 opacity-0 transition-all duration-300 ease-out group-hover:ml-2 group-hover:max-w-[20px] group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100"
        />
      )}
    </Link>
  );
}
