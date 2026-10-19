# Muhammed Shihas K — Portfolio

Personal developer portfolio: React 19 + TypeScript + Vite + Tailwind CSS v4, deployed as a static SPA on Vercel.

## Run locally

```bash
npm install
npm run dev          # http://localhost:5173
```

## Checks

```bash
npm run typecheck    # TypeScript (tsc -b)
npm run lint         # ESLint
npm run build        # type-check + production build → dist/
npm run check:site   # Playwright: every route at 360/768/1280px — overflow, images,
                     # links, console errors, mobile menu, keyboard focus, reduced motion
                     # (optional: npm run check:site -- ./screenshots)
```

`check:site` uses Playwright's Chromium if installed, otherwise falls back to the system Edge/Chrome.

## Editing content

All content lives in `src/data/` — no UI changes needed:

| File | What it holds |
| --- | --- |
| `site.ts` | Name, headline, email, LinkedIn, location, education, resume URL, GitHub URL, SEO text |
| `experience.ts` | Employment timeline |
| `projects.ts` | Products and case studies (features, diagrams, decisions, limitations, links) |
| `skills.ts` | Grouped skills with Core / Working knowledge / Product work tiers |

- **Anonymise an employer project:** set `anonymize: true` on it in `projects.ts` — `anonymizedTitle` is shown everywhere instead.
- **Add a resume:** put a PDF in `public/` (without DOB/home address) and set `resumeUrl: '/your-file.pdf'` in `site.ts`.
- **Add GitHub:** set `github` in `site.ts` (currently empty and hidden).
- **Recall live link:** add `{ label, url }` to Recall's `links` in `projects.ts` once there is a public deployment.
- **Refresh MoneyPlant screenshots:** `node scripts/prepare-assets.mjs` (reads the seeded-demo captures from `../moneyplant/marketing/instagram/out/`).

## Environment variables (optional)

See `.env.example`. Set them in `.env.local` locally or in Vercel → Settings → Environment Variables.

| Variable | Effect |
| --- | --- |
| `VITE_SHOW_PHONE` + `VITE_CONTACT_PHONE` | Phone is shown (and bundled) **only** when `VITE_SHOW_PHONE=true` and a number is set |
| `VITE_SITE_URL` | Your domain, e.g. `https://example.com` — adds a canonical tag and absolute `og:image`/`og:url` |

## Deploy to Vercel

Option A — Git: push this folder to a GitHub/GitLab repo, then in Vercel choose **Add New → Project**, import it. Vercel detects Vite (build `npm run build`, output `dist`). `vercel.json` already handles SPA routing for `/projects/:slug`.

Option B — CLI:

```bash
npm i -g vercel
vercel          # first run links/creates the project (preview deploy)
vercel --prod   # production deploy
```

### Custom domain: shihas.online

The build already targets `https://shihas.online` (canonical, `og:url`, absolute `og:image`, JSON-LD, `sitemap.xml`, `robots.txt`). To connect it:

1. Vercel → Project → Settings → Domains → add `shihas.online` and `www.shihas.online` (choose to redirect `www` → apex).
2. At your domain registrar, add the DNS records Vercel shows — typically:
   - `A` record, host `@` → `76.76.21.21`
   - `CNAME` record, host `www` → `cname.vercel-dns.com`

   (Or switch the domain's nameservers to Vercel's, if you prefer Vercel to manage DNS.)
3. Wait for DNS to propagate; Vercel issues the HTTPS certificate automatically.

To build for a different domain (e.g. staging), set `VITE_SITE_URL`.
