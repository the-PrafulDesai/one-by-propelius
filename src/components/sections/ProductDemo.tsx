"use client";

import { useState, type KeyboardEvent } from "react";
import {
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  Bug,
  CalendarDays,
  CircleDollarSign,
  CloudUpload,
  Code2,
  ContactRound,
  FolderKanban,
  Gauge,
  IdCard,
  UserCog,
  UserSearch,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { TabletMockup } from "@/components/visuals/TabletMockup";

interface ProductModule {
  name: string;
  description: string;
  image: string;
  icon: LucideIcon;
}

const PRODUCT_MODULES: ProductModule[] = [
  {
    name: "Analytics Dashboard",
    description:
      "Track delivery health, utilization, revenue, and operational KPIs.",
    image: "/images/erp/product-modules/analytics-dashboard.png",
    icon: BarChart3,
  },
  {
    name: "Clients",
    description:
      "Manage client accounts, contacts, portal access, and project visibility.",
    image: "/images/erp/product-modules/clients.png",
    icon: ContactRound,
  },
  {
    name: "Projects",
    description:
      "Plan projects, milestones, tasks, team allocation, and delivery progress.",
    image: "/images/erp/product-modules/projects.png",
    icon: FolderKanban,
  },
  {
    name: "Resource Utilization",
    description:
      "See team capacity, workload, billable hours, and availability.",
    image: "/images/erp/product-modules/resource-utilization.png",
    icon: Gauge,
  },
  {
    name: "HR & Employee Hub",
    description:
      "Manage people, leave, attendance, documents, and employee workflows.",
    image: "/images/erp/product-modules/hr-employee-hub.png",
    icon: UsersRound,
  },
  {
    name: "Recruitment",
    description:
      "Track candidates, interviews, hiring stages, and role pipelines.",
    image: "/images/erp/product-modules/recruitment.png",
    icon: UserSearch,
  },
  {
    name: "Invoice Management",
    description:
      "Connect delivery work with billing, invoices, and profitability.",
    image: "/images/erp/product-modules/invoice-management.png",
    icon: CircleDollarSign,
  },
  {
    name: "Meetings",
    description:
      "Keep project discussions, follow-ups, and internal syncs connected.",
    image: "/images/erp/product-modules/meetings.png",
    icon: CalendarDays,
  },
  {
    name: "Sales CRM",
    description: "Move leads from first contact to won projects.",
    image: "/images/erp/product-modules/sales-crm.png",
    icon: BriefcaseBusiness,
  },
  {
    name: "Code Reviews",
    description: "Connect engineering quality checks with project delivery.",
    image: "/images/erp/product-modules/code-review.png",
    icon: Code2,
  },
  {
    name: "Deploys",
    description: "Track releases, branches, and deployment activity.",
    image: "/images/erp/product-modules/deploy.png",
    icon: CloudUpload,
  },
  {
    name: "Bug Reports",
    description: "Capture, prioritize, and resolve product issues.",
    image: "/images/erp/product-modules/bug-report.png",
    icon: Bug,
  },
  {
    name: "My Space",
    description:
      "Give every team member one place for tasks, timesheets, and updates.",
    image: "/images/erp/product-modules/my-space.png",
    icon: IdCard,
  },
  {
    name: "User Management",
    description: "Manage roles, access, permissions, and team structure.",
    image: "/images/erp/product-modules/user-management.png",
    icon: UserCog,
  },
];

export function ProductDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeModule = PRODUCT_MODULES[activeIndex];

  const handleTabKeys = (
    event: KeyboardEvent<HTMLDivElement>,
    orientation: "horizontal" | "vertical",
  ) => {
    const previousKey = orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
    const nextKey = orientation === "vertical" ? "ArrowDown" : "ArrowRight";
    let nextIndex = activeIndex;

    if (event.key === previousKey) {
      nextIndex =
        (activeIndex - 1 + PRODUCT_MODULES.length) % PRODUCT_MODULES.length;
    } else if (event.key === nextKey) {
      nextIndex = (activeIndex + 1) % PRODUCT_MODULES.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = PRODUCT_MODULES.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActiveIndex(nextIndex);
    event.currentTarget
      .querySelectorAll<HTMLButtonElement>('[role="tab"]')
      [nextIndex]?.focus();
  };

  return (
    <section
      id="product"
      aria-labelledby="product-demo-heading"
      className="overflow-hidden bg-[#fafafe] py-16 sm:py-20 lg:py-24"
    >
      <Container className="max-w-[1320px]">
        <div className="mx-auto max-w-[850px] text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#d9d6ff] bg-white px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#635bff] shadow-[0_8px_24px_rgba(56,48,120,0.06)]">
            <span className="size-1.5 rounded-full bg-gradient-to-r from-[#635bff] to-[#4f9cff]" />
            Product Modules
          </p>

          <h2
            id="product-demo-heading"
            className="mt-5 text-balance text-[clamp(2.35rem,4.5vw,4rem)] font-semibold leading-[1.06] tracking-[-0.05em] text-[#111118]"
          >
            Everything your software company runs on
          </h2>

          <p className="mx-auto mt-6 max-w-[740px] text-balance text-[clamp(1rem,1.25vw,1.16rem)] leading-[1.65] text-[#626270]">
            <span className="one-gradient-text font-bold">ONE</span> brings
            projects, people, clients, finance, hiring, and engineering
            operations into{" "}
            <span className="one-gradient-text font-bold">ONE</span> connected
            ERP.
          </p>
        </div>

        <div className="mt-12 lg:mt-18">
          <div
            role="tablist"
            aria-label="Product modules"
            aria-orientation="horizontal"
            onKeyDown={(event) => handleTabKeys(event, "horizontal")}
            className="product-module-tabs -mx-5 flex gap-2 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:px-8 lg:hidden"
          >
            {PRODUCT_MODULES.map((module, index) => (
              <button
                key={module.name}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                aria-controls="module-preview"
                tabIndex={activeIndex === index ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#635bff] focus-visible:ring-offset-2 ${
                  activeIndex === index
                    ? "border-[#766cff] bg-[#635bff] text-white"
                    : "border-[#dedee8] bg-white text-[#555563] hover:border-[#b9b4ff] hover:text-[#24242d]"
                }`}
              >
                {module.name}
              </button>
            ))}
          </div>

          <div className="mt-5 grid items-center gap-8 lg:mt-0 lg:grid-cols-[minmax(310px,0.82fr)_minmax(0,1.55fr)] lg:gap-12 xl:gap-16">
            <div
              role="tablist"
              aria-label="Product modules"
              aria-orientation="vertical"
              onKeyDown={(event) => handleTabKeys(event, "vertical")}
              className="product-module-scrollbar hidden h-[570px] overflow-y-auto overscroll-contain pr-3 lg:block"
            >
              <div className="space-y-2.5 py-[5px]">
                {PRODUCT_MODULES.map((module, index) => {
                  const Icon = module.icon;
                  const isActive = activeIndex === index;

                  return (
                    <button
                      key={module.name}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="module-preview"
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => setActiveIndex(index)}
                      className={`group relative w-full rounded-2xl border px-4 py-4 text-left transition-[border-color,background-color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#635bff] focus-visible:ring-offset-2 ${
                        isActive
                          ? "border-[#a9a2ff] bg-white shadow-[0_14px_34px_rgba(51,43,116,0.09)]"
                          : "border-[#e4e4eb] bg-white/70 hover:-translate-y-px hover:border-[#c9c6e5] hover:bg-white"
                      }`}
                    >
                      <span className="flex items-start gap-3.5">
                        <span
                          className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                            isActive
                              ? "bg-[#eeecff] text-[#635bff]"
                              : "bg-[#f1f1f5] text-[#777784] group-hover:text-[#555563]"
                          }`}
                        >
                          <Icon className="size-4.5" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center justify-between gap-3 text-[15px] font-semibold tracking-[-0.015em] text-[#1b1b22]">
                            {module.name}
                            <ArrowUpRight
                              aria-hidden="true"
                              className={`size-4 shrink-0 transition-transform ${
                                isActive
                                  ? "translate-x-0 text-[#635bff]"
                                  : "-translate-x-1 text-[#a0a0aa] group-hover:translate-x-0"
                              }`}
                            />
                          </span>
                          <span className="mt-1.5 block text-[12.5px] leading-[1.45] text-[#747480]">
                            {module.description}
                          </span>
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="min-w-0">
              <div className="mb-5 lg:hidden">
                <p className="text-lg font-semibold tracking-[-0.02em] text-[#18181f]">
                  {activeModule.name}
                </p>
                <p className="mt-1.5 text-sm leading-6 text-[#6e6e7a]">
                  {activeModule.description}
                </p>
              </div>

              <TabletMockup
                key={activeModule.name}
                id="module-preview"
                title={activeModule.name}
                image={activeModule.image}
                icon={activeModule.icon}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
