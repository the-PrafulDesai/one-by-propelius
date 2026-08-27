import { Container } from "@/components/ui/Container";
import { WorkflowSignalGraph } from "@/components/visuals/WorkflowSignalGraph";

export function Workflow() {
  return (
    <section
      id="workflow"
      aria-labelledby="workflow-heading"
      className="relative overflow-hidden border-y border-white/[0.06] bg-[#05060a] py-14 sm:py-20 lg:py-24"
    >
      <Container className="max-w-[1320px]">
        <div className="mx-auto max-w-[850px] text-center">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#8d85ff]">
            <span className="size-1.5 rounded-full bg-[#8d85ff]" />
            Connected Workflow
          </p>

          <h2
            id="workflow-heading"
            className="mt-5 text-balance text-[clamp(2.25rem,4.25vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-white"
          >
            How <span className="one-gradient-text">ONE</span> connects your entire software business
          </h2>

          <p className="mx-auto mt-6 max-w-[760px] text-balance text-[clamp(1rem,1.35vw,1.16rem)] leading-[1.65] text-[#9a9ca7]">
            From sales and hiring to delivery, code review, billing, and client
            visibility, <span className="one-gradient-text font-medium">ONE</span> brings every operating workflow into one connected
            ERP.
          </p>
        </div>

        <div className="mt-10 sm:mt-16 lg:mt-20">
          <WorkflowSignalGraph />
        </div>
      </Container>
    </section>
  );
}
