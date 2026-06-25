import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const locations = JSON.parse(readFileSync(join(__dirname, '../src/data/locations.json'), 'utf8'));
const services = JSON.parse(readFileSync(join(__dirname, '../src/data/services.json'), 'utf8'));

const distDir = join(__dirname, '../dist');
const indexHtmlPath = join(distDir, 'index.html');
const SITE = 'https://monmouthcountygenerac.com';

if (!existsSync(distDir)) {
  console.log('⚠️  dist directory not found. Run vite build first.');
  process.exit(1);
}

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

// Generate per-page HTML by overwriting the head tags of dist/index.html.
// The body stays as the SPA root div; React hydrates client-side.
// This is the same pattern East Brunswick uses. It's not as strong as full
// SSR (Cause #3 not solved) but it ships unique <head> tags per URL, which
// is what fixes Causes #1 and #2.
const generateHtml = (title, description, url, extraSchemaBlocks = []) => {
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

  if (extraSchemaBlocks.length > 0) {
    const blocks = extraSchemaBlocks.map(renderJsonLd).join('\n    ');
    html = html.replace('</head>', `    ${blocks}\n  </head>`);
  }

  return html;
};

let generatedCount = 0;

// Service x location pages
services.forEach((service) => {
  locations.forEach((location) => {
    const url = `/${service.slug}/${location.slug}`;
    const title = `${service.name} in ${location.name}, ${location.state} | Monmouth County Generac`;
    const description = `Professional ${service.name.toLowerCase()} in ${location.name}, NJ. ${service.description} Licensed & insured. Free estimate.`;

    const breadcrumb = buildBreadcrumbList([
      { name: 'Home', item: SITE },
      { name: 'Service Areas', item: `${SITE}/service-areas` },
      { name: location.name, item: `${SITE}/service-areas/${location.slug}` },
      { name: service.name, item: `${SITE}${url}` },
    ]);
    const blocks = [breadcrumb, buildServiceSchema(service, location)];
    if (Array.isArray(service.faqs) && service.faqs.length > 0) {
      blocks.push(buildFaqSchema(service.faqs));
    }

    const html = generateHtml(title, description, url, blocks);
    const pageDir = join(distDir, service.slug, location.slug);
    ensureDir(pageDir);
    writeFileSync(join(pageDir, 'index.html'), html, 'utf8');
    generatedCount++;
  });
});

// Location pages
locations.forEach((location) => {
  const url = `/service-areas/${location.slug}`;
  const title = `Generator Services in ${location.name}, NJ | Monmouth County Generac`;
  const description = `Standby and whole-house generator installation, maintenance, and repair in ${location.name}, NJ. Licensed & insured local generator service. Free estimate.`;

  const breadcrumb = buildBreadcrumbList([
    { name: 'Home', item: SITE },
    { name: 'Service Areas', item: `${SITE}/service-areas` },
    { name: location.name, item: `${SITE}${url}` },
  ]);

  const html = generateHtml(title, description, url, [breadcrumb]);
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
  'Generator Service Areas in Monmouth County, NJ | Monmouth County Generac',
  'We install, maintain, and repair standby generators across Monmouth County, NJ — Middletown, Holmdel, Colts Neck, Rumson, Marlboro, Manalapan, Wall, Howell, Freehold, Red Bank, and Tinton Falls.',
  '/service-areas',
  [serviceAreasBreadcrumb],
);
const serviceAreasDir = join(distDir, 'service-areas');
ensureDir(serviceAreasDir);
writeFileSync(join(serviceAreasDir, 'index.html'), serviceAreasHtml, 'utf8');
generatedCount++;

// All non-dynamic routes from src/App.tsx. Each gets unique <head> tags and
// a self-referencing canonical, ensuring no route falls through to the SPA
// shell with the homepage canonical.
const standalonePages = [
  {
    slug: 'services',
    title: 'Generator Services in Monmouth County, NJ | Monmouth County Generac',
    description: 'Full range of generator services in Monmouth County, NJ: standby generator installation, maintenance, repair, load testing, battery replacement, and inspections. Licensed & insured.',
  },
  {
    slug: 'whole-house-generator-cost',
    title: 'Whole House Generator Cost in NJ — What to Expect | Monmouth County Generac',
    description: 'What does a whole-house standby generator cost in New Jersey? A clear breakdown of equipment, fuel, electrical, and permit costs so you can budget your Monmouth County install.',
  },
  {
    slug: 'get-estimate',
    title: 'Get a Free Generator Estimate | Monmouth County Generac',
    description: 'Request a free, no-obligation estimate for standby generator installation, maintenance, or repair anywhere in Monmouth County, NJ. Licensed & insured local generator service.',
  },
  {
    slug: 'about',
    title: 'About | Monmouth County Generac',
    description: 'Monmouth County Generac provides licensed, insured standby generator installation, maintenance, and repair across Monmouth County, NJ. Local, accountable, and storm-ready service.',
  },
  {
    slug: 'faq',
    title: 'Generator FAQ | Monmouth County Generac',
    description: 'Answers to common questions about standby generators in Monmouth County, NJ — sizing, permits, fuel options, maintenance, costs, and what to expect during installation.',
  },
  {
    slug: 'privacy',
    title: 'Privacy Policy | Monmouth County Generac',
    description: 'Read the privacy policy for Monmouth County Generac. Learn how we collect, use, and protect the personal information you share when requesting generator service.',
  },
  {
    slug: 'terms',
    title: 'Terms of Service | Monmouth County Generac',
    description: 'Terms of service for Monmouth County Generac. Review the terms and conditions that apply to our generator installation, maintenance, and repair services in Monmouth County, NJ.',
  },
  {
    slug: 'sitemap',
    title: 'Sitemap | Monmouth County Generac',
    description: 'Browse all pages on the Monmouth County Generac website — generator services, Monmouth County service areas, estimates, and more.',
  },
];

standalonePages.forEach((page) => {
  const url = `/${page.slug}`;
  const breadcrumb = buildBreadcrumbList([
    { name: 'Home', item: SITE },
    { name: page.title.split(' | ')[0], item: `${SITE}${url}` },
  ]);
  const html = generateHtml(page.title, page.description, url, [breadcrumb]);
  const pageDir = join(distDir, page.slug);
  ensureDir(pageDir);
  writeFileSync(join(pageDir, 'index.html'), html, 'utf8');
  generatedCount++;
});

// Truncate a title to a target length, preserving the brand suffix.
const truncateTitle = (title, max = 60) => {
  if (title.length <= max) return title;
  const suffix = ' | Monmouth County Generac';
  if (title.endsWith(suffix)) {
    const head = title.slice(0, title.length - suffix.length);
    const room = max - suffix.length;
    if (room > 0) return `${head.slice(0, room).trim()}${suffix}`;
  }
  return title.slice(0, max).trim();
};

// Service detail pages at /services/<slug>. These write to
// dist/services/<slug>/index.html and don't collide with the standalone
// `services` index page at dist/services/index.html.
let serviceDetailCount = 0;
services.forEach((service) => {
  const url = `/services/${service.slug}`;
  // Brand already contains "Monmouth County," so the locale isn't repeated
  // in the prefix — keeps every service name fully visible, no truncation.
  const title = truncateTitle(
    `${service.name}, NJ | Monmouth County Generac`,
    65,
  );
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

  const html = generateHtml(title, description, url, blocks);
  const pageDir = join(distDir, 'services', service.slug);
  ensureDir(pageDir);
  writeFileSync(join(pageDir, 'index.html'), html, 'utf8');
  generatedCount++;
  serviceDetailCount++;
});

console.log(`✅ Prerendering completed!`);
console.log(`📄 Generated ${generatedCount} HTML files`);
console.log(`   - Service-location pages: ${services.length * locations.length}`);
console.log(`   - Location pages: ${locations.length}`);
console.log(`   - Service Areas hub: 1`);
console.log(`   - Standalone pages: ${standalonePages.length}`);
console.log(`   - Service detail pages: ${serviceDetailCount}`);
