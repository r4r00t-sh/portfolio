# Keerthanan PS — Portfolio

Monochrome experimental portfolio for Keerthanan PS: cybersecurity researcher, systems developer, and security engineer.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- GSAP + ScrollTrigger (`@gsap/react`)
- Lucide React

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `src/data` — site copy, skills (full resume), projects, research articles
- `src/components/sections` — Hero, About stack, Arsenal horizontal scroll, Projects, Research, Profile, Certifications, Contact
- `src/components/patterns` — reusable monochrome geometric patterns
- `public/images` — portrait assets

## Notes

- Skills are searchable in **The Technical Arsenal**; all resume categories are preserved.
- Research links point to live posts on [r4r00t-blog.vercel.app](https://r4r00t-blog.vercel.app).
- Scroll animations respect `prefers-reduced-motion`.
