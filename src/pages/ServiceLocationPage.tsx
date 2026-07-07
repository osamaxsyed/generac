import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NotFound from "@/pages/NotFound";
import { Phone, MapPin, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import locations from "@/data/locations.json";
import services from "@/data/services.json";
import uniqueContent from "@/data/unique-city-content.json";
import { business, SITE_URL, phoneDisplay, phoneHref } from "@/config/business";

const ServiceLocationPage = () => {
  const { service, location } = useParams();
  const navigate = useNavigate();

  const locationData = locations.find((loc) => loc.slug === location);
  const serviceData = services.find((svc) => svc.slug === service);

  const contentKey = `${service}-${location}` as keyof typeof uniqueContent;
  const uniqueDescription = uniqueContent[contentKey] || serviceData?.description;

  if (!locationData || !serviceData) return <NotFound />;

  const pageTitle = `${serviceData.name} in ${locationData.name}, ${locationData.state} | ${business.name}`;
  const pageDescription =
    serviceData.metaDescription?.replace(/\{location\}/g, locationData.name) || uniqueDescription;

  const canonicalUrl = `${SITE_URL}/${service}/${location}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: `${SITE_URL}/service-areas` },
      { "@type": "ListItem", position: 3, name: locationData.name, item: `${SITE_URL}/service-areas/${locationData.slug}` },
      { "@type": "ListItem", position: 4, name: serviceData.name, item: canonicalUrl },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: serviceData.name,
    provider: {
      "@type": "LocalBusiness",
      name: business.name,
      telephone: business.phone,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "City",
      name: locationData.name,
      containedInPlace: { "@type": "State", name: business.state },
    },
    description: serviceData.description,
    priceRange: serviceData.priceRange,
  };

  const faqSchema =
    serviceData.faqs && serviceData.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: serviceData.faqs.map((faq: { question: string; answer: string }) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      </Helmet>

      <Header />

      <main>
        {/* Breadcrumb */}
        <div className="bg-background border-b-2 border-border">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-10 py-3">
            <nav className="flex items-center gap-2 font-headline font-bold uppercase tracking-wider text-xs text-muted-foreground flex-wrap">
              <Link to="/" className="hover:text-foreground">Home</Link>
              <span>/</span>
              <Link to="/service-areas" className="hover:text-foreground">Service Areas</Link>
              <span>/</span>
              <Link to={`/service-areas/${locationData.slug}`} className="hover:text-foreground">{locationData.name}</Link>
              <span>/</span>
              <span className="text-foreground">{serviceData.shortName}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-foreground text-background heavy-border-b py-20 md:py-28">
          <div className="w-full max-w-6xl mx-auto px-6 md:px-10">
            <div className="brutalist-section-eyebrow text-background/70 flex items-center gap-2">
              <MapPin className="h-3 w-3" />
              {locationData.name}, {locationData.state}
            </div>
            <h1 className="brutalist-headline text-4xl md:text-7xl text-background mb-6 leading-[0.95]">
              {serviceData.name}.
              <br />
              <span className="text-background/70">{locationData.name}, NJ.</span>
            </h1>
            <p className="font-body text-lg md:text-xl text-background/85 max-w-2xl mb-10 border-l-4 border-background pl-5">
              {uniqueDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => navigate("/get-estimate")} className="brutalist-cta bg-background text-foreground border-background/30">
                Get Free Estimate <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href={phoneHref}
                className="inline-flex items-center justify-center gap-2 font-headline font-black uppercase tracking-wider text-sm px-8 py-4 bg-transparent text-background border-2 border-background hover:bg-background hover:text-foreground transition-all rounded-none"
              >
                <Phone className="h-4 w-4" />
                {phoneDisplay}
              </a>
            </div>
          </div>
        </section>

        {/* What we offer + sidebar */}
        <section className="py-20 bg-background heavy-border-b">
          <div className="w-full max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="brutalist-section-eyebrow">What We Offer</div>
              <h2 className="brutalist-headline text-2xl md:text-3xl text-foreground mb-6">
                {serviceData.name} in {locationData.name}
              </h2>
              <ul className="space-y-3">
                {serviceData.features.map((feature: string) => (
                  <li key={feature} className="flex items-start gap-3 font-body text-base text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-foreground flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <div className="bento-card bg-foreground text-background p-6">
                <MapPin className="h-6 w-6 mb-3" />
                <h3 className="brutalist-headline text-lg mb-2">Service Area</h3>
                <p className="font-body text-sm text-background/80 mb-3">
                  Serving {locationData.name} and surrounding neighborhoods.
                </p>
                <ul className="font-body text-xs text-background/70 space-y-1 mb-3">
                  {locationData.neighborhoods.slice(0, 5).map((n: string) => (
                    <li key={n}>• {n}</li>
                  ))}
                </ul>
                <p className="font-headline font-bold uppercase tracking-wider text-[10px] text-background/70">
                  ZIP: {locationData.zipCodes.join(", ")}
                </p>
              </div>

              <div className="bento-card p-6">
                <Clock className="h-6 w-6 text-foreground mb-3" />
                <h3 className="brutalist-headline text-lg text-foreground mb-2">Project Timeline</h3>
                <p className="brutalist-headline text-2xl text-foreground mb-2">{serviceData.averageTimeline}</p>
                <p className="font-body text-xs text-muted-foreground">
                  Actual timeline depends on project scope. Detailed schedules during estimates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="py-20 bg-muted heavy-border-b">
          <div className="w-full max-w-5xl mx-auto px-6 md:px-10">
            <div className="brutalist-section-eyebrow">Why Choose Us</div>
            <h2 className="brutalist-headline text-3xl md:text-5xl text-foreground mb-12">
              Why {locationData.name} Homeowners Choose Us
            </h2>
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {[
                ["Licensed & Insured", "Licensed and insured electrical and generator work, performed to NJ code."],
                ["Local to Monmouth County", `Serving ${locationData.name} and ${business.county}, NJ.`],
                ["Free Estimates", "Transparent, no-obligation on-site estimates."],
              ].map(([title, body]) => (
                <div key={title} className="bento-card bg-background p-6">
                  <h3 className="brutalist-headline text-lg text-foreground mb-3">{title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Other services */}
        <section className="py-20 bg-background heavy-border-b">
          <div className="w-full max-w-5xl mx-auto px-6 md:px-10">
            <div className="brutalist-section-eyebrow">Other Services</div>
            <h2 className="brutalist-headline text-2xl md:text-4xl text-foreground mb-8">
              Other Services in {locationData.name}
            </h2>
            <div className="grid md:grid-cols-3 gap-3">
              {services
                .filter((svc) => svc.slug !== service)
                .slice(0, 6)
                .map((rs) => (
                  <Link
                    key={rs.slug}
                    to={`/${rs.slug}/${location}`}
                    className="bento-card p-4 group block hover:bg-foreground hover:text-background transition-colors"
                  >
                    <h3 className="brutalist-headline text-sm md:text-base mb-1">{rs.shortName}</h3>
                    <span className="font-body text-xs inline-flex items-center gap-1">
                      Learn more <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* Local context */}
        {locationData.localContext && (
          <section className="py-20 bg-background heavy-border-b">
            <div className="w-full max-w-4xl mx-auto px-6 md:px-10">
              <div className="brutalist-section-eyebrow">Local Knowledge</div>
              <h2 className="brutalist-headline text-2xl md:text-4xl text-foreground mb-6">
                Serving {locationData.name} Homeowners
              </h2>
              <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                {locationData.localContext}
              </p>
              <div className="flex flex-wrap gap-2">
                {locationData.neighborhoods.map((n: string) => (
                  <span key={n} className="font-headline font-bold uppercase tracking-wider text-[10px] text-foreground border-2 border-foreground px-3 py-1">
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {serviceData.faqs && serviceData.faqs.length > 0 && (
          <section className="py-20 bg-muted heavy-border-b">
            <div className="w-full max-w-3xl mx-auto px-6 md:px-10">
              <div className="brutalist-section-eyebrow">FAQ</div>
              <h2 className="brutalist-headline text-2xl md:text-4xl text-foreground mb-8">
                {serviceData.name} in {locationData.name}: FAQ
              </h2>
              <div className="space-y-3">
                {serviceData.faqs.map((faq: { question: string; answer: string }, i: number) => (
                  <details key={i} className="heavy-border bg-background group">
                    <summary className="cursor-pointer p-5 font-headline font-bold uppercase tracking-wider text-sm text-foreground flex justify-between items-center gap-4">
                      <span>{faq.question}</span>
                      <span className="font-headline font-black text-2xl text-foreground/40 group-open:rotate-45 transition-transform flex-shrink-0">+</span>
                    </summary>
                    <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed px-5 pb-5 border-t border-border pt-4">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-20 bg-foreground text-background">
          <div className="w-full max-w-4xl mx-auto px-6 md:px-10 text-center">
            <h2 className="brutalist-headline text-3xl md:text-5xl text-background mb-4">Ready to Get Started?</h2>
            <p className="font-body text-lg text-background/80 mb-10">
              Free estimate on your {serviceData.name.toLowerCase()} project in {locationData.name}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate("/get-estimate")} className="brutalist-cta bg-background text-foreground border-background/30">
                Request Free Estimate <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href={phoneHref}
                className="inline-flex items-center justify-center gap-2 font-headline font-black uppercase tracking-wider text-sm px-8 py-4 bg-transparent text-background border-2 border-background hover:bg-background hover:text-foreground transition-all rounded-none"
              >
                <Phone className="h-4 w-4" />
                {phoneDisplay}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceLocationPage;
