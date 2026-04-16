# Amadeus Restaurant - Premium Website

A premium, cinematic, reservation-driven website for Amadeus, Belgium's iconic all-you-can-eat spareribs restaurant.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Animation**: Framer Motion
- **i18n**: next-intl (Dutch, English, French)
- **Validation**: Zod

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
  app/[locale]/          # All pages (localized routes)
  components/
    layout/              # Header, Footer, Mobile Nav, Language Switcher
    home/                # Homepage sections (7 sections)
    locations/           # Location-specific components
    menu/                # Menu display components
    reservations/        # Reservation form
    groups/              # Group booking components
    faq/                 # FAQ accordion
    shared/              # Reusable components
  data/                  # Static data (locations, menu, FAQ)
  i18n/                  # Internationalization config
  lib/                   # Utilities (metadata, structured data, motion)
  types/                 # TypeScript type definitions
messages/                # Translation files (nl.json, en.json, fr.json)
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, concept, ribs showcase, locations, testimonials |
| `/over-ons` | Brand story, values, timeline |
| `/locaties` | All locations overview |
| `/locaties/[slug]` | Individual location with hours, map, gallery |
| `/menu` | Full menu with category tabs |
| `/reserveren` | Reservation form |
| `/groepen` | Group dining & events |
| `/jobs` | Career opportunities |
| `/contact` | Contact form + all location details |
| `/faq` | Frequently asked questions |

## Languages

- **Dutch (nl)**: Default, no URL prefix
- **English (en)**: `/en/...`
- **French (fr)**: `/fr/...`

Routes are localized (e.g., `/over-ons` in Dutch, `/en/about` in English, `/fr/a-propos` in French).

## SEO Features

- Per-page metadata with hreflang alternates
- JSON-LD structured data (Organization, Restaurant, FAQPage, WebSite)
- Dynamic sitemap with all locales and location pages
- Localized canonical URLs
- OpenGraph and Twitter Card metadata

## Images

Place your restaurant photography in `public/images/`. See `public/images/README.md` for full asset requirements and art direction notes.

## Deployment

Optimized for Vercel:

```bash
npm run build
```

All pages are statically generated at build time (SSG).

## Design System

- **Colors**: Dark warm palette (burgundy primary, amber accent, warm neutrals)
- **Typography**: Playfair Display (headings) + Inter (body)
- **Animations**: Premium easing `[0.22, 1, 0.36, 1]`, scroll-triggered reveals
- **Layout**: 7xl max-width container, consistent section padding
