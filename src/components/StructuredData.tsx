import { Helmet } from "react-helmet";
import { business, SITE_URL } from "@/config/business";
import services from "@/data/services.json";
import locations from "@/data/locations.json";

const StructuredData = () => {
  // Address — omit empty fields.
  const address: Record<string, string> = { "@type": "PostalAddress" };
  if (business.address.streetAddress) address.streetAddress = business.address.streetAddress;
  if (business.address.addressLocality) address.addressLocality = business.address.addressLocality;
  if (business.address.addressRegion) address.addressRegion = business.address.addressRegion;
  if (business.address.postalCode) address.postalCode = business.address.postalCode;
  if (business.address.addressCountry) address.addressCountry = business.address.addressCountry;

  // areaServed — each location as a City contained in Monmouth County, plus the county itself.
  const county = {
    "@type": "AdministrativeArea",
    "name": business.county,
    "containedInPlace": { "@type": "State", "name": business.state },
  };
  const areaServed = [
    ...(locations as Array<{ name: string }>).map((loc) => ({
      "@type": "City",
      "name": loc.name,
      "containedInPlace": county,
    })),
    county,
  ];

  const businessSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    "name": business.name,
    "url": SITE_URL,
    "priceRange": business.priceRange,
    "address": address,
    "areaServed": areaServed,
    "openingHoursSpecification": business.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": h.days,
      "opens": h.opens,
      "closes": h.closes,
    })),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Generator Services",
      "itemListElement": (services as Array<{ name: string }>).map((s) => ({
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": s.name },
      })),
    },
  };

  if (business.phone) businessSchema.telephone = business.phone;
  if (business.email) businessSchema.email = business.email;
  if (business.geo.latitude !== 0 || business.geo.longitude !== 0) {
    businessSchema.geo = {
      "@type": "GeoCoordinates",
      "latitude": business.geo.latitude,
      "longitude": business.geo.longitude,
    };
  }
  if (business.sameAs.length > 0) businessSchema.sameAs = business.sameAs;
  if (business.aggregateRating) {
    businessSchema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": business.aggregateRating.ratingValue,
      "reviewCount": business.aggregateRating.reviewCount,
      "bestRating": "5",
      "worstRating": "1",
    };
  }

  const organizationSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": business.name,
    "url": SITE_URL,
  };
  if (business.sameAs.length > 0) organizationSchema.sameAs = business.sameAs;
  if (business.phone || business.email) {
    organizationSchema.contactPoint = {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "areaServed": "US",
      "availableLanguage": "English",
      ...(business.phone ? { telephone: business.phone } : {}),
      ...(business.email ? { email: business.email } : {}),
    };
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": business.name,
    "url": SITE_URL,
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(businessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
