// ─────────────────────────────────────────────────────────────────────────────
// CENTRAL BUSINESS CONFIG — edit this file to update the site. Templates read
// from here so you never touch component code for business details.
//
// PLACEHOLDERS: phone, email, address, hours, owner, rating, review count, and
// all stats are placeholders. Replace the values marked TODO before launch.
// Do NOT invent reviews, ratings, years-in-business, or counts — leave blank.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE_URL = "https://monmouthcountygenerac.com";

export const business = {
  name: "Monmouth County Generac",            // TODO confirm legal/display name
  shortName: "Monmouth County Generac",
  legalEntity: "",                            // TODO LLC / legal entity name
  tagline: "Standby Generator Installation & Service in Monmouth County, NJ",
  description:
    "Standby and whole-house generator installation, maintenance, and repair across Monmouth County, NJ. Keep your home powered through JCP&L outages.",

  // Contact — PLACEHOLDERS
  phone: "",                                  // TODO e.g. "(732) 555-0100"
  phoneHref: "",                              // TODO e.g. "tel:7325550100"
  email: "info@monmouthcountygenerac.com",

  // Address — PLACEHOLDER (LocalBusiness schema needs a real service-area address)
  address: {
    streetAddress: "",                        // TODO
    addressLocality: "",                      // TODO e.g. "Holmdel"
    addressRegion: "NJ",
    postalCode: "",                           // TODO
    addressCountry: "US",
  },
  // Geo — PLACEHOLDER (approx Monmouth County center; replace with real location)
  geo: { latitude: 0, longitude: 0 },         // TODO real coordinates

  // Hours — PLACEHOLDER
  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:00" },
    { days: ["Saturday"], opens: "09:00", closes: "14:00" },
  ],

  priceRange: "$$-$$$",

  // Social — PLACEHOLDERS (leave empty until profiles exist)
  sameAs: [] as string[],                     // TODO social/GBP URLs

  // Reviews/ratings — DO NOT FABRICATE. Leave null until real reviews exist.
  aggregateRating: null as null | { ratingValue: string; reviewCount: string },

  // Stats — sample/marketing values from the design. Confirm or adjust before
  // relying on them; shown in hero trust pills and the reviews section.
  // All values were fabricated placeholders; leave empty until real,
  // verifiable numbers exist. Empty strings hide the UI elements.
  stats: {
    yearsInBusiness: "",
    generatorsServiced: "",
    responseTime: "",
    googleRating: "",
    reviewCount: "",
  },

  county: "Monmouth County",
  state: "New Jersey",
  utility: "JCP&L",

  // Trademark disclaimer — include VERBATIM in the footer.
  disclaimer:
    "Independently owned and operated. Not an authorized Generac dealer. Generac® is a registered trademark of Generac Power Systems, Inc.",
};

export const phoneDisplay = business.phone || "Call for a quote";
export const phoneHref = business.phoneHref || "#contact";
