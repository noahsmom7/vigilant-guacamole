# Cave Proposal Generator — Exquisite (Next.js + Tailwind)

A polished, dynamic proposal generator tailored for Cave Fire: live editing, task breakdowns, phase schedules, totals, JSON import/export, and print‑to‑PDF — with a refined, modern UI.

## Quick start (free & fast)
1. **Install** Node.js 18+.
2. In a terminal:
   ```bash
   npm install
   npm run dev
   ```
3. Open http://localhost:3000
4. Deploy free to **Vercel**: push this folder to GitHub → import repo in Vercel (auto-detect Next.js).
   - Or **Cloudflare Pages**: build `npm run build` and let Pages detect Next.js functions.

## Features
- Dynamic tasks (qty, unit price) with totals & contingency/retainage.
- Payment schedules (40/40/20, 50/40/10, 30/60/10, Monthly, Custom placeholder).
- Sidebar with meta and content editing; localStorage persistence.
- JSON export/import and Print to PDF.
- Responsive, elegant Next.js + Tailwind design.

## Customize
- Colors: `tailwind.config.ts` under `theme.extend.colors.brand`.
- Initial values: `app/page.tsx` (`initial` object).
- Typography/spacing via Tailwind utility classes.

MIT License.
