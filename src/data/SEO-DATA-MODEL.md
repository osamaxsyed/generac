# SEO data model (scaffolding — pages NOT yet regenerated)

This documents the new central data fields that drive the deep, SEO-optimized
service-page template (prompt items #1–#10). Edit these JSON files; templates read
from them. Nothing here is hardcoded in components.

Status: **schema defined + `generator-maintenance` fully populated as the worked
example.** The other 9 services still need their new fields filled in before the
deep template ships. No pages have been regenerated yet.

---

## 1. `services.json` — NEW fields per service

Existing fields kept: `slug, name, shortName, metaTitle, metaDescription,
description, icon, features, averageTimeline, priceRange, priority,
relatedServices, faqs`.

New fields added for the deep template:

| Field | Type | Purpose (maps to prompt item) |
|-------|------|-------------------------------|
| `h1` | string | #3 — single geo H1, e.g. "Reliable Generator Maintenance in Monmouth County, NJ". Template appends nothing. |
| `metaTitleGeo` | string | #1 — final title ~55-60 chars, geo front-loaded. Overrides the generic template. |
| `metaDescription` | string | #2 — already exists; standardize ~150-160 chars + soft CTA "Free quotes." |
| `intro` | string[] | #5 — 2-3 short overview paragraphs (keyword + geo). |
| `whyItMatters` | {head, body}[] | #5 — 3-4 value props with subheads (become H3s). |
| `whatsIncluded` | {group, items[]}[] | #5 — grouped scope bullet lists (engine service, electrical/battery, readiness, quoted-separately). |
| `howItWorks` | {step, head, body}[] | #5 — 4 numbered steps. |
| `h2.included` / `h2.why` / `h2.faq` | (derived) | #4 — H2s woven with service+county; template builds from `name`, but can override. |
| `inlineLinks` | {anchor, to}[] | #7 — contextual in-copy links (e.g. "preventive maintenance plans" → /services/preventive-maintenance). |
| `image` | {alt, caption} | #8 — geo-tagged alt text for the (placeholder) hero image. |

`faqs` stays as-is (already 3-4 Q&As; prompt wants 5 — extend per service).
`relatedServices` stays (already drives #7 related links with descriptive anchors).

---

## 2. NEW file: `local-content.json` — Monmouth/NJ local-relevance blocks (#6)

Shared, reusable NJ-specific content so every page can cite real local detail
WITHOUT each page repeating identical boilerplate (the thin-content / near-dup
risk). Keyed blocks the templates pull from and vary by service/town:

```
{
  "utility": { "name": "JCP&L", "full": "Jersey Central Power & Light",
               "outageUrl": "https://www.firstenergycorp.com/outages_help/...",
               "note": "Monmouth County's electric utility ... outage patterns ..." },
  "county":  { "name": "Monmouth County", "gov": "https://www.monmouthcountynj.gov/" },
  "stormContext": [ "nor'easters ...", "Bayshore/coastal outages ...", "Sandy legacy ..." ],
  "externalAuthority": [
     { "label": "Monmouth County, NJ official site", "url": "https://www.monmouthcountynj.gov/" },
     { "label": "JCP&L outage center", "url": "https://www.firstenergycorp.com/..." }
  ]
}
```

Town-level local detail already lives in `locations.json.localContext` +
`unique-city-content.json` (per service×town). Those stay the per-town
differentiator (#6: neighborhoods, gas-vs-propane, JCP&L specifics).

**Anti-duplication rule:** templates weave `stormContext`/`utility` notes but
must combine them with the service- and town-specific fields so no two pages read
identically. Never render the same 900 words across pages.

---

## 3. What the template will render (section order, #5) — NOT built yet

Breadcrumbs(+JSON-LD) → Intro → Why it matters → What's included → How it works →
Service-area (anchor links to estimate) → Reviews (empty placeholders) →
FAQ(+FAQPage JSON-LD) → Related services. Plus #9 Service+Breadcrumb+FAQ schema,
#10 canonical + full OG/Twitter, robots index,follow.

Hard rules respected: no fabricated reviews/ratings/stats; footer disclaimer
verbatim; all values centralized here.
