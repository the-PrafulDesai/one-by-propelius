"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "How does ONE help software companies manage delivery?",
    answer:
      "ONE connects projects, tasks, resourcing, and client visibility in a single workspace, so you always know what's in progress, what's blocked, and what's shipping next without stitching together separate tools.",
  },
  {
    question: "Which teams and workflows does ONE support?",
    answer:
      "Sales, delivery, engineering, hiring, HR, and finance all run on the same connected data from the first lead, through project delivery and code review, to invoicing and payroll.",
  },
  {
    question: "How soon can we get started with ONE?",
    answer:
      "Most teams are up and running within a week. We help migrate your existing projects and clients, and our onboarding team sets up your workspace alongside you.",
  },
  {
    question: "Do I get access to real-time analytics and reporting?",
    answer:
      "Yes the Analytics Dashboard tracks delivery health, utilization, revenue, and operational KPIs in real time, so leadership always has an accurate view of the business.",
  },
  {
    question: "What makes ONE different from other project tools?",
    answer:
      "ONE isn't just project management it's a connected ERP. Instead of separate tools for projects, HR, sales, and billing, everything lives in one system with shared data and no manual hand-offs.",
  },
];

function FaqAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-white transition-colors duration-300",
        isOpen ? "border-[#c9c3ff]" : "border-[#e8e8f0]"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#635bff] focus-visible:ring-offset-2 sm:px-6 sm:py-6"
      >
        <span className="text-[15px] font-semibold leading-[1.4] tracking-[-0.01em] text-[#16161d] sm:text-[16.5px]">
          {item.question}
        </span>

        <span
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 sm:size-8",
            isOpen
              ? "border-[#635bff] text-[#635bff]"
              : "border-[#d5d5e0] text-[#6c6c78]"
          )}
        >
          {isOpen ? (
            <Minus className="size-3.5" aria-hidden="true" />
          ) : (
            <Plus className="size-3.5" aria-hidden="true" />
          )}
        </span>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-[13.5px] leading-[1.65] text-[#6c6c78] sm:px-6 sm:pb-6 sm:text-[14.5px]">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <Container className="max-w-[1180px]">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 xl:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <h2
              id="faq-heading"
              className="max-w-[380px] text-balance text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-[#111118]"
            >
              General questions asked by our customers.
            </h2>

            <p className="mt-8 max-w-[340px] text-[14px] leading-[1.65] text-[#6c6c78] sm:mt-10">
              Our friendly team is always here to help you with quick, clear,
              and reliable answers whenever needed.
            </p>

            <Button href="#contact" variant="dark" className="mt-6 h-11 px-6 text-sm">
              Contact Sales
            </Button>
          </div>

          <div className="space-y-3.5">
            {FAQS.map((item, index) => (
              <FaqAccordionItem
                key={item.question}
                item={item}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex((current) => (current === index ? -1 : index))
                }
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
