# Crocheting is my Therapy

A one-page website for **Jamie Cannady** — a handmade-crochet maker. Showcases the
goods, tells the story, and takes custom orders. Built with **Next.js (App Router) +
TypeScript**.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts: `npm run build` (production build), `npm run start` (serve the build),
`npm run typecheck` (`tsc --noEmit`).

## Layout

```
app/
  layout.tsx        # fonts (next/font), metadata, react-hot-toast <Toaster>
  page.tsx          # composes the sections
  globals.css       # design tokens + all component styles (the portable system)
  icon.svg          # favicon (yarn ball)
components/
  Nav.tsx           # client — sticky nav + mobile disclosure
  Hero.tsx          # hand-built yarn-ball SVG hero
  Makes.tsx         # category chips
  Shop.tsx          # product card grid (sample inventory lives here)
  About.tsx         # the maker's story
  Steps.tsx         # how ordering works
  OrderForm.tsx     # client — validated form + react-hot-toast feedback
  Social.tsx        # Instagram band
  Footer.tsx        # marquee footer
  Wordmark.tsx      # shared logo (nav + footer)
  Scallop.tsx       # crochet shell-edge divider
.hallmark/          # Hallmark design-system memory (log + preflight)
```

## Real content — wired in

- **Logo** — `public/logo.png` is used as the hero centrepiece and the nav mark
  (via `next/image`; `mix-blend-mode: multiply` melts its cream background into the paper).
- **Contact** — Jamie Cannady · jamiecannady4102@gmail.com · (252) 571-0542, in the order
  section and footer.
- **Payment** — cash or CashApp `$PrayWifeJamieCannady`, shown in the order section and footer.
- **Products & prices** — the items in `components/Shop.tsx`: Crochet Ruffle Hat $70 ·
  Hat & Scarf Set $65 · Leg Warmers $80 · Throw Blanket $160 · Comfort for Beds $290 ·
  Chair Blankets $150 · Baby Blankets $75.
- **Order form** — `components/OrderForm.tsx` validates client-side, then POSTs to
  `app/api/order/route.ts`, which emails the order to Jamie via **Resend**. She gets each
  request in her inbox; replies go straight to the customer (`replyTo`).
  - Requires `RESEND_API_KEY` (set in `.env.local` locally and in Vercel).
  - The `from` domain (`orders@crochetingismytherapy.com`) **must be verified in Resend**
    (Resend → Domains) or sends fail with 502. Override sender/recipient via
    `ORDER_FROM_EMAIL` / `ORDER_TO_EMAIL` env vars.

## Still to swap before launch (optional)

- **Product photos** — 5 of 7 cards show a real photo from `public/products/`
  (`ruffle-hat.jpg`, `hat-scarf-set.jpg`, `leg-warmers-web.jpg`, `throw-blanket.jpg`,
  `chair-blanket.jpg`), served responsively via `next/image`. **Comfort for Beds** and
  **Baby Blankets** render a "Photo coming soon" placeholder (`image: null` in
  `components/Shop.tsx`) — set their `image` to a `/products/…jpg` path when photos are ready.
  The original full-res uploads + unused extras (bags, other hats/sets) remain in
  `public/products/` — safe to delete to slim the deploy.

## SEO

- **Canonical domain** is set once in `lib/site.ts` (`site.url`) and feeds metadata,
  sitemap, robots, and structured data. Change it there if the primary domain changes.
- **Metadata** (`app/layout.tsx`) — title/description, keywords, canonical, Open Graph
  (`/og.png`, 1200×630), Twitter `summary_large_image`, and robots directives.
- **Structured data** (`components/JsonLd.tsx`) — JSON-LD `LocalBusiness`/`Store` (founder,
  location, phone, payment, price range) + an `OfferCatalog` of every product with price and
  `MadeToOrder` availability, plus `WebSite`. This is what makes her eligible for Google rich
  results and local search. Product data is shared from `lib/products.ts`.
- **Crawl files** — `app/robots.ts` → `/robots.txt`, `app/sitemap.ts` → `/sitemap.xml`,
  `app/manifest.ts` → `/manifest.webmanifest`. Icons: `app/icon.svg` (favicon),
  `app/apple-icon.png` (touch icon).
- **After the domain is live**, submit the site in **Google Search Console** and add the
  sitemap (`https://crochetingismytherapy.com/sitemap.xml`) so Google indexes it. Also create
  a **Google Business Profile** for local "crochet near me" visibility.

## Analytics

Order-form usage is tracked with **Google Analytics 4** via `@next/third-parties/google`:

- `<GoogleAnalytics gaId="G-1ZPL3FCM3F" />` is mounted in `app/layout.tsx` (gtag.js loads
  site-wide; GA4 records page views automatically).
- `components/OrderForm.tsx` sends two custom events with `sendGAEvent`:
  - **`order_submit_click`** — every time the submit button is pressed
  - **`order_request`** — a valid, completed request, tagged with the chosen `item`
- **To see the numbers:** in Google Analytics → **Reports → Realtime** (live) or
  **Reports → Engagement → Events** (custom events appear within ~24h). GA4 custom events are
  free, with no plan requirement.
- The GA measurement ID lives in `app/layout.tsx`; change it there if the property changes.
- **About photo** — the story in `components/About.tsx` is Jamie's own words; just swap the
  placeholder portrait icon for a photo of her.

## Design system

Built with the **Hallmark** skill — a custom purple-anchored theme.

- **Palette** — warm lavender-white paper, deep-aubergine ink, grape-purple accent
  (`oklch(52% 0.16 312)`), sparing marigold second accent. All tokens live at the top of
  `app/globals.css`.
- **Type** — Fraunces (display, italic) + Geist (body) + Dancing Script (script accent),
  all served via `next/font`.
- **Logo** — `public/logo-transparent.png` (background removed) in the hero + nav; a
  light-disc framed copy in the footer. Icons throughout use **Heroicons**.
- **Craft details** — scalloped crochet-edge dividers, soft rounded cards, marquee footer.
- **Accessibility** — skip link, visible focus rings, `prefers-reduced-motion` support,
  44px minimum hit targets, labelled form fields.

## Deploy

Push to a Git repo and import into **Vercel** (framework preset auto-detects Next.js —
no config needed). Or `npm run build && npm run start` on any Node host.
