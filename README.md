# ONE by Propelius

Marketing landing page for **ONE** — a connected ERP that brings projects, people, clients, finance, hiring, and engineering operations into a single platform for software companies.

Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- **UI:** React 19, TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** [GSAP](https://gsap.com) + `@gsap/react` (scroll-driven effects), CSS transitions/keyframes for everything else
- **Icons:** lucide-react
- **Device mockups:** react-mockframe (laptop frame in the Hero/Product sections)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it. The page auto-updates as you edit files under `src/`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
  app/
    layout.tsx        # Root layout, font loading
    page.tsx           # Section order for the landing page
    globals.css         # Theme tokens, section-specific CSS (masks, keyframes, custom scrollbars)
  components/
    layout/
      Header.tsx        # Sticky nav, mobile full-screen menu
      Footer.tsx         # Link columns + giant watermark
    sections/
      Hero.tsx            # Scroll-pinned hero with rotating ERP carousel
      Partners.tsx         # Auto-scrolling client logo marquee
      Workflow.tsx          # Dark "connected workflow" section
      ProductDemo.tsx        # 14 ERP modules, tablet mockup preview  (#product)
      Features.tsx             # 5 feature highlights, bento grid / mobile carousel  (#features)
      Testimonials.tsx          # Staggered photo wall + CTA  (#customers)
      FAQ.tsx                    # Accordion  (#faq)
      Contact.tsx                 # Full-width dark CTA card with email capture  (#contact)
    ui/
      Button.tsx, Container.tsx, Logo.tsx, SectionHeading.tsx
    visuals/
      LaptopMockup.tsx, TabletMockup.tsx, ErpCarousel.tsx, WorkflowSignalGraph.tsx
public/
  images/
    logos/              # ONE logo marks
    erp/
      hero/               # Rotating hero carousel screenshots
      product-modules/     # ProductDemo module screenshots
      features/             # Features section screenshots
```

## Notes

- Section order in [`page.tsx`](src/app/page.tsx) determines the page: Hero → Partners → Workflow → ProductDemo → Features → Testimonials → FAQ → Contact, with Header/Footer outside `<main>`.
- Section anchors (`#product`, `#workflow`, `#features`, `#customers`, `#faq`, `#contact`) are linked from the header nav and CTA buttons throughout the page.
- `prefers-reduced-motion` is respected globally (see `globals.css`) and individually in components that run their own JS-driven animation loops (Hero carousel, Features carousel).

## Deploy

Deploy on [Vercel](https://vercel.com/new) or any Node host that supports Next.js. See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).
