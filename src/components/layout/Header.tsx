"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

gsap.registerPlugin(useGSAP);

const navigation = [
  { label: "Product", href: "#product" },
  { label: "Workflow", href: "#workflow" },
  { label: "Features", href: "#features" },
  { label: "Customers", href: "#customers" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useGSAP(
    () => {
      const panel = panelRef.current;
      const links = linkRefs.current.filter(
        (link): link is HTMLAnchorElement => Boolean(link)
      );

      if (!panel) return;

      gsap.killTweensOf(panel);
      gsap.killTweensOf(links);

      if (isOpen) {
        gsap.set(panel, { display: "flex" });
        gsap.fromTo(
          panel,
          { scaleY: 0 },
          { scaleY: 1, duration: 0.55, ease: "power3.inOut" }
        );
        gsap.fromTo(
          links,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
            stagger: 0.06,
            delay: 0.2,
          }
        );
      } else {
        gsap.set(links, { opacity: 0, y: 22 });
        gsap.to(panel, {
          scaleY: 0,
          duration: 0.4,
          ease: "power3.inOut",
          onComplete: () => gsap.set(panel, { display: "none" }),
        });
      }
    },
    { dependencies: [isOpen], scope: headerRef }
  );

  return (
    <header ref={headerRef} className="absolute inset-x-0 top-0 z-50">
      <Container>
        <div className="flex h-24 items-center justify-between">
          <Logo />

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-8 lg:flex"
          >
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[15px] font-medium text-[#33333d] transition-colors hover:text-[#635bff]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <Button
              href="#contact"
              variant="dark"
              className="h-11 px-5 text-sm sm:h-12 sm:px-6 sm:text-[15px]"
            >
              Book a demo
            </Button>

            <button
              type="button"
              aria-label={isOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsOpen((current) => !current)}
              className="flex size-11 shrink-0 items-center justify-center rounded-full text-[#111118] transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#635bff] lg:hidden"
            >
              {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </Container>

      <div
        ref={panelRef}
        id="mobile-navigation"
        style={{ display: "none" }}
        className="fixed inset-x-0 top-24 z-40 hidden h-[calc(100dvh-6rem)] origin-top flex-col items-center justify-center gap-7 bg-[#0b0b10] lg:hidden"
      >
        {navigation.map((item, index) => (
          <Link
            key={item.label}
            ref={(node) => {
              linkRefs.current[index] = node;
            }}
            href={item.href}
            onClick={() => setIsOpen(false)}
            className="text-2xl font-semibold text-white/85 transition-colors hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
