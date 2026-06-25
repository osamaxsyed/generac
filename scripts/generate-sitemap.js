import { writeFileSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import data
const locations = JSON.parse(readFileSync(join(__dirname, '../src/data/locations.json'), 'utf8'));
const services = JSON.parse(readFileSync(join(__dirname, '../src/data/services.json'), 'utf8'));

const baseUrl = 'https://monmouthcountygenerac.com';
const currentDate = new Date().toISOString().split('T')[0];

// Static pages
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/services', priority: '0.9', changefreq: 'monthly' },
  { url: '/whole-house-generator-cost', priority: '0.8', changefreq: 'monthly' },
  { url: '/get-estimate', priority: '0.8', changefreq: 'monthly' },
  { url: '/about', priority: '0.6', changefreq: 'monthly' },
  { url: '/faq', priority: '0.6', changefreq: 'monthly' },
  { url: '/service-areas', priority: '0.9', changefreq: 'monthly' },
  { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { url: '/terms', priority: '0.3', changefreq: 'yearly' },
  { url: '/sitemap', priority: '0.3', changefreq: 'yearly' },
];

// Generate service detail pages (/services/<slug>)
const serviceDetailPages = services.map(service => ({
  url: `/services/${service.slug}`,
  priority: service.priority.toString(),
  changefreq: 'monthly'
}));

// Generate location pages
const locationPages = locations.map(location => ({
  url: `/service-areas/${location.slug}`,
  priority: location.priority.toString(),
  changefreq: 'monthly'
}));

// Generate service-location pages
const serviceLocationPages = [];
services.forEach(service => {
  locations.forEach(location => {
    serviceLocationPages.push({
      url: `/${service.slug}/${location.slug}`,
      priority: ((service.priority + location.priority) / 2).toFixed(1),
      changefreq: 'monthly'
    });
  });
});

// Combine all pages
const allPages = [...staticPages, ...serviceDetailPages, ...locationPages, ...serviceLocationPages];

// Generate sitemap XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

// Write sitemap to public folder
const outputPath = join(__dirname, '../public/sitemap.xml');
writeFileSync(outputPath, sitemap, 'utf8');

console.log(`✅ Sitemap generated successfully!`);
console.log(`📊 Total URLs: ${allPages.length}`);
console.log(`   - Static pages: ${staticPages.length}`);
console.log(`   - Service detail pages: ${serviceDetailPages.length}`);
console.log(`   - Location pages: ${locationPages.length}`);
console.log(`   - Service-location pages: ${serviceLocationPages.length}`);
console.log(`📝 Sitemap saved to: ${outputPath}`);
