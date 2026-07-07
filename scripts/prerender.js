import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const locations = JSON.parse(readFileSync(join(__dirname, '../src/data/locations.json'), 'utf8'));
const services = JSON.parse(readFileSync(join(__dirname, '../src/data/services.json'), 'utf8'));

const distDir = join(__dirname, '../dist');
const indexHtmlPath = join(distDir, 'index.html');
const serverEntryPath = join(__dirname, '../dist-server/entry-server.js');
const SITE = 'https://monmouthcountygenerac.com';
const BRAND = 'Monmouth County Generac';

if (!existsSync(distDir)) {
  console.log('⚠️  dist directory not found. Run vite build first.');
  process.exit(1);
}
if (!existsSync(serverEntryPath)) {
  console.log('⚠️  dist-server/entry-server.js not found. Run "npm run build:ssr" first.');
  process.exit(1);
}

const { render } = await import(serverEntryPath);

const baseHtml = readFileSync(indexHtmlPath, 'utf8');

const ensureDir = (dir) => {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
};

// Schema.org priceRange must be a single tier; strip ranges to lower bound.
const normalizePriceRange = (raw) => {
  if (!raw) return '$$';
  const m = String(raw).match(/^(\$+)/);
  return m ? m[1] : '$$';
};

const renderJsonLd = (obj) =>
  `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;

const buildBreadcrumbList = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: it.item,
  })),
});

const buildServiceSchema = (service, location) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: service.name,
  name: `${service.name} in ${location.name}, ${location.state}`,
  description: service.description,
  provider: { '@id': `${SITE}/#business` },
  areaServed: {
    '@type': 'City',
    name: location.name,
    containedInPlace: { '@type': 'State', name: 'New Jersey' },
  },
  priceRange: normalizePriceRange(service.priceRange),
  url: `${SITE}/${service.slug}/${location.slug}`,
});

const buildFaqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
});

// Site-wide business schema, injected statically so it exists in raw HTML
// before any JavaScript runs. Values mirror src/config/business.ts; no
// ratings, review counts, or other stats are emitted until real ones exist.
const county = {
  '@type': 'AdministrativeArea',
  name: 'Monmouth County',
  containedInPlace: { '@type': 'State', name: 'New Jersey' },
};
const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE}/#business`,
  name: BRAND,
  url: SITE,
  email: 'info@monmouthcountygenerac.com',
  priceRange: '$$',
  areaServed: [
    ...locations.map((loc) => ({
      '@type': 'City',
      name: loc.name,
      containedInPlace: county,
    })),
    county,
  ],
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '17:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '14:00' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Generator Services',
    itemListElement: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.name },
    })),
  },
};
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: BRAND,
  url: SITE,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    areaServed: 'US',
    availableLanguage: 'English',
    email: 'info@monmouthcountygenerac.com',
  },
};
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: BRAND,
  url: SITE,
};
const siteWideSchema = [businessSchema, organizationSchema, websiteSchema];

const generateHtml = (title, description, url, extraSchemaBlocks = [], bodyHtml = '') => {
  const canonical = `${SITE}${url || ''}`;
  let html = baseHtml
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content=".*?"/, `<meta name="description" content="${description}"`)
    .replace(/<link rel="canonical" href=".*?"/, `<link rel="canonical" href="${canonical}"`)
    .replace(/<meta property="og:url" content=".*?"/, `<meta property="og:url" content="${canonical}"`)
    .replace(/<meta property="og:title" content=".*?"/, `<meta property="og:title" content="${title}"`)
    .replace(/<meta property="og:description" content=".*?"/, `<meta property="og:description" content="${description}"`)
    .replace(/<meta name="twitter:url" content=".*?"/, `<meta name="twitter:url" content="${canonical}"`)
    .replace(/<meta name="twitter:title" content=".*?"/, `<meta name="twitter:title" content="${title}"`)
    .replace(/<meta name="twitter:description" content=".*?"/, `<meta name="twitter:description" content="${description}"`);

  const blocks = [...siteWideSchema, ...extraSchemaBlocks].map(renderJsonLd).join('\n    ');
  html = html.replace('</head>', `    ${blocks}\n  </head>`);

  if (bodyHtml) {
    html = html.replace('<div id="root"></div>', () => `<div id="root">${bodyHtml}</div>`);
  }

  return html;
};

// Rotate title/description phrasing so the 110 service+location pages do not
// share one stamped formula. Indexed by (service, location) so each page gets
// a stable variant across builds.
const serviceLocationTitle = (service, location, variant) => {
  const templates = [
    `${service.name} in ${location.name}, NJ | ${BRAND}`,
    `${service.name} ${location.name} NJ | Licensed & Insured`,
    `${location.name} ${service.name} | ${BRAND}`,
  ];
  return templates[variant % templates.length];
};
const serviceLocationDescription = (service, location, variant) => {
  const svc = service.name.toLowerCase();
  const city = location.name;
  const templates = [
    `${service.name} for ${city} homes. Licensed and insured local generator specialists. Free estimates.`,
    `Need ${svc} in ${city}, NJ? Local crew, JCP&L outage experience, free estimates.`,
    `Licensed ${svc} serving ${city} and nearby Monmouth County towns. Request a free estimate.`,
    `${city} ${svc} by a local, insured generator company. Straight quotes, free estimates.`,
  ];
  return templates[variant % templates.length];
};

const renderRoute = (url) => {
  try {
    return render(url);
  } catch (err) {
    console.error(`✗ SSR failed for ${url}: ${err.message}`);
    throw err;
  }
};

let generatedCount = 0;

// Service x location pages. FAQPage schema is deliberately NOT emitted here:
// the same FAQ set repeated across 11 city URLs reads as duplicate FAQPage
// markup in GSC. It lives on the /services/<slug> detail page only.
services.forEach((service, si) => {
  locations.forEach((location, li) => {
    const url = `/${service.slug}/${location.slug}`;
    const title = serviceLocationTitle(service, location, si + li);
    const description = serviceLocationDescription(service, location, si * 3 + li);

    const breadcrumb = buildBreadcrumbList([
      { name: 'Home', item: SITE },
      { name: 'Service Areas', item: `${SITE}/service-areas` },
      { name: location.name, item: `${SITE}/service-areas/${location.slug}` },
      { name: service.name, item: `${SITE}${url}` },
    ]);
    const blocks = [breadcrumb, buildServiceSchema(service, location)];

    const html = generateHtml(title, description, url, blocks, renderRoute(url));
    const pageDir = join(distDir, service.slug, location.slug);
    ensureDir(pageDir);
    writeFileSync(join(pageDir, 'index.html'), html, 'utf8');
    generatedCount++;
  });
});

// Location pages
locations.forEach((location, li) => {
  const url = `/service-areas/${location.slug}`;
  const titles = [
    `Generator Installation & Service in ${location.name}, NJ | ${BRAND}`,
    `${location.name} NJ Standby Generator Services | ${BRAND}`,
    `Generac Generator Service ${location.name} NJ | Licensed & Insured`,
  ];
  const descriptions = [
    `Standby generator installation, maintenance, and repair in ${location.name}, NJ. Local, licensed, and insured. Free estimates.`,
    `Whole-house generator services for ${location.name} homeowners: installs, service plans, and storm-season readiness. Free estimates.`,
    `${location.name} generator specialists. Installation, repair, load testing, and maintenance from a local Monmouth County crew.`,
  ];
  const title = titles[li % titles.length];
  const description = descriptions[li % descriptions.length];

  const breadcrumb = buildBreadcrumbList([
    { name: 'Home', item: SITE },
    { name: 'Service Areas', item: `${SITE}/service-areas` },
    { name: location.name, item: `${SITE}${url}` },
  ]);

  const html = generateHtml(title, description, url, [breadcrumb], renderRoute(url));
  const pageDir = join(distDir, 'service-areas', location.slug);
  ensureDir(pageDir);
  writeFileSync(join(pageDir, 'index.html'), html, 'utf8');
  generatedCount++;
});

// Service Areas hub
const serviceAreasBreadcrumb = buildBreadcrumbList([
  { name: 'Home', item: SITE },
  { name: 'Service Areas', item: `${SITE}/service-areas` },
]);
const serviceAreasHtml = generateHtml(
  `Generator Service Areas in Monmouth County, NJ | ${BRAND}`,
  'We install, maintain, and repair standby generators across Monmouth County: Middletown, Holmdel, Colts Neck, Rumson, Marlboro, Manalapan, Wall, Howell, Freehold, Red Bank, and Tinton Falls.',
  '/service-areas',
  [serviceAreasBreadcrumb],
  renderRoute('/service-areas'),
);
const serviceAreasDir = join(distDir, 'service-areas');
ensureDir(serviceAreasDir);
writeFileSync(join(serviceAreasDir, 'index.html'), serviceAreasHtml, 'utf8');
generatedCount++;

// All non-dynamic routes from src/App.tsx. Each gets unique <head> tags, a
// self-referencing canonical, and real server-rendered body content.
const standalonePages = [
  {
    slug: 'services',
    title: `Generator Services in Monmouth County, NJ | ${BRAND}`,
    description: 'Standby generator installation, maintenance, repair, load testing, battery replacement, and inspections across Monmouth County, NJ. Licensed and insured.',
  },
  {
    slug: 'whole-house-generator-cost',
    title: `Whole House Generator Cost in NJ | ${BRAND}`,
    description: 'What a whole-house standby generator costs in New Jersey: a clear breakdown of equipment, fuel, electrical, and permit costs for your Monmouth County install.',
  },
  {
    slug: 'get-estimate',
    title: `Get a Free Generator Estimate | ${BRAND}`,
    description: 'Request a free, no-obligation estimate for standby generator installation, maintenance, or repair anywhere in Monmouth County, NJ.',
  },
  {
    slug: 'about',
    title: `About | ${BRAND}`,
    description: 'Monmouth County Generac provides licensed, insured standby generator installation, maintenance, and repair across Monmouth County, NJ.',
  },
  {
    slug: 'faq',
    title: `Generator FAQ | ${BRAND}`,
    description: 'Answers to common questions about standby generators in Monmouth County, NJ: sizing, permits, fuel options, maintenance, costs, and what to expect during installation.',
  },
  {
    slug: 'privacy',
    title: `Privacy Policy | ${BRAND}`,
    description: 'Read the privacy policy for Monmouth County Generac. Learn how we collect, use, and protect the personal information you share when requesting generator service.',
  },
  {
    slug: 'terms',
    title: `Terms of Service | ${BRAND}`,
    description: 'Terms of service for Monmouth County Generac. Review the terms and conditions that apply to our generator installation, maintenance, and repair services.',
  },
  {
    slug: 'sitemap',
    title: `Sitemap | ${BRAND}`,
    description: 'Browse all pages on the Monmouth County Generac website: generator services, Monmouth County service areas, estimates, and more.',
  },
];

standalonePages.forEach((page) => {
  const url = `/${page.slug}`;
  const breadcrumb = buildBreadcrumbList([
    { name: 'Home', item: SITE },
    { name: page.title.split(' | ')[0], item: `${SITE}${url}` },
  ]);
  const html = generateHtml(page.title, page.description, url, [breadcrumb], renderRoute(url));
  const pageDir = join(distDir, page.slug);
  ensureDir(pageDir);
  writeFileSync(join(pageDir, 'index.html'), html, 'utf8');
  generatedCount++;
});

// Truncate a title to a target length, preserving the brand suffix.
const truncateTitle = (title, max = 60) => {
  if (title.length <= max) return title;
  const suffix = ` | ${BRAND}`;
  if (title.endsWith(suffix)) {
    const head = title.slice(0, title.length - suffix.length);
    const room = max - suffix.length;
    if (room > 0) return `${head.slice(0, room).trim()}${suffix}`;
  }
  return title.slice(0, max).trim();
};

// Service detail pages at /services/<slug>. FAQPage schema lives HERE (one
// canonical URL per FAQ set), not on the city variants.
let serviceDetailCount = 0;
services.forEach((service) => {
  const url = `/services/${service.slug}`;
  const title = truncateTitle(`${service.name}, NJ | ${BRAND}`, 65);
  const description = service.metaDescription
    ? service.metaDescription.replace(/\{location\}/g, 'Monmouth County')
    : service.description;

  const breadcrumb = buildBreadcrumbList([
    { name: 'Home', item: SITE },
    { name: 'Services', item: `${SITE}/services` },
    { name: service.name, item: `${SITE}${url}` },
  ]);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name,
    name: `${service.name} in Monmouth County, NJ`,
    description: service.description,
    provider: { '@id': `${SITE}/#business` },
    areaServed: { '@type': 'AdministrativeArea', name: 'Monmouth County, New Jersey' },
    priceRange: normalizePriceRange(service.priceRange),
    url: `${SITE}${url}`,
  };

  const blocks = [breadcrumb, serviceSchema];
  if (Array.isArray(service.faqs) && service.faqs.length > 0) {
    blocks.push(buildFaqSchema(service.faqs));
  }

  const html = generateHtml(title, description, url, blocks, renderRoute(url));
  const pageDir = join(distDir, 'services', service.slug);
  ensureDir(pageDir);
  writeFileSync(join(pageDir, 'index.html'), html, 'utf8');
  generatedCount++;
  serviceDetailCount++;
});

// Homepage: keep its head, add site-wide schema and the server-rendered body.
let homeHtml = baseHtml.replace(
  '</head>',
  `    ${siteWideSchema.map(renderJsonLd).join('\n    ')}\n  </head>`,
);
homeHtml = homeHtml.replace('<div id="root"></div>', () => `<div id="root">${renderRoute('/')}</div>`);
writeFileSync(indexHtmlPath, homeHtml, 'utf8');
generatedCount++;

// 404 page: real NotFound content, no canonical, noindex. Vercel serves
// 404.html with HTTP 404 for unknown paths now that the SPA rewrite is gone.
let notFoundHtml = generateHtml(
  `Page Not Found | ${BRAND}`,
  'That page does not exist. Browse our generator services or request a free estimate.',
  '/404',
  [],
  renderRoute('/__page_not_found__'),
);
notFoundHtml = notFoundHtml
  .replace(/\s*<link rel="canonical"[^>]*>/, '')
  .replace('</title>', '</title>\n    <meta name="robots" content="noindex" />');
writeFileSync(join(distDir, '404.html'), notFoundHtml, 'utf8');
generatedCount++;

console.log(`✅ Prerendering completed!`);
console.log(`📄 Generated ${generatedCount} HTML files (with server-rendered bodies)`);
console.log(`   - Service-location pages: ${services.length * locations.length}`);
console.log(`   - Location pages: ${locations.length}`);
console.log(`   - Service Areas hub: 1`);
console.log(`   - Standalone pages: ${standalonePages.length}`);
console.log(`   - Service detail pages: ${serviceDetailCount}`);
console.log(`   - Homepage + 404: 2`);
