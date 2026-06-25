import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NotFound from "@/pages/NotFound";
import {
  Zap,
  Power,
  Wrench,
  Settings,
  Plug,
  Droplet,
  Battery,
  ClipboardCheck,
  Activity,
  CalendarCheck,
  Phone,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import services from "@/data/services.json";
import { business, SITE_URL, phoneDisplay, phoneHref } from "@/config/business";

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Power,
  Wrench,
  Settings,
  Plug,
  Droplet,
  Battery,
  ClipboardCheck,
  Activity,
  CalendarCheck,
};

const ServicePage = () => {
  const { service } = useParams();
  const navigate = useNavigate();

  const serviceData = services.find((svc) => svc.slug === service);

  if (!serviceData) return <NotFound />;

  const hasPhone = Boolean(business.phone);
  const Icon = iconMap[serviceData.icon] ?? Zap;
  const canonical = `${SITE_URL}/services/${serviceData.slug}`;

  // Keep title ~55-60 chars; full template can run long, so fall back to a
  // shorter name-only title when the brand version would be excessive.
  const fullTitle = `${serviceData.name} in Monmouth County, NJ | ${business.name}`;
  const pageTitle = fullTitle.length <= 65 ? fullTitle : `${serviceData.name} in Monmouth County, NJ`;
  const pageDescription = serviceData.description;

  const relatedServices = serviceData.relatedServices
    .map((slug) => services.find((svc) => svc.slug === slug))
    .filter((svc): svc is (typeof services)[number] => Boolean(svc));

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
      { "@type": "ListItem", position: 3, name: serviceData.name, item: canonical },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: serviceData.name,
    provider: {
      "@type": "LocalBusiness",
      name: business.name,
      ...(business.phone ? { telephone: business.phone } : {}),
      url: SITE_URL,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Monmouth County",
      containedInPlace: { "@type": "State", name: "New Jersey" },
    },
    description: serviceData.description,
    priceRange: serviceData.priceRange,
    url: canonical,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: serviceData.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonical} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Header />

      <main>
        {/* Breadcrumb */}
        <div className="bg-background border-b-2 border-border">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-10 py-3">
            <nav className="flex items-center gap-2 font-headline font-bold uppercase tracking-wider text-xs text-muted-foreground flex-wrap">
              <Link to="/" className="hover:text-foreground">Home</Link>
              <span>/</span>
              <Link to="/services" className="hover:text-foreground">Services</Link>
              <span>/</span>
              <span className="text-foreground">{serviceData.shortName}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-foreground text-background heavy-border-b py-20 md:py-28">
          <div className="w-full max-w-6xl mx-auto px-6 md:px-10">
            <div className="brutalist-section-eyebrow text-background/70 flex items-center gap-2">
              <Icon className="h-3.5 w-3.5" />
              Generator Service
            </div>
            <h1 className="brutalist-headline text-4xl md:text-7xl text-background mb-6 leading-[0.95]">
              {serviceData.name}.
              <br />
              <span className="text-background/70">Monmouth County, NJ.</span>
            </h1>
            <p className="font-body text-lg md:text-xl text-background/85 max-w-2xl mb-10 border-l-4 border-background pl-5">
              {serviceData.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/get-estimate")}
                className="brutalist-cta bg-background text-foreground border-background/30"
              >
                Get a Free Quote <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href={hasPhone ? phoneHref : "/get-estimate"}
                className="inline-flex items-center justify-center gap-2 font-headline font-black uppercase tracking-wider text-sm px-8 py-4 bg-transparent text-background border-2 border-background hover:bg-background hover:text-foreground transition-all rounded-none"
              >
                <Phone className="h-4 w-4" />
                {hasPhone ? phoneDisplay : "Get a Quote"}
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
                {serviceData.name}
              </h2>
              <ul className="space-y-3">
                {serviceData.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 font-body text-base text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-foreground flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <div className="bento-card p-6">
                <Clock className="h-6 w-6 text-foreground mb-3" />
                <h3 className="brutalist-headline text-lg text-foreground mb-2">Typical Timeline</h3>
                <p className="brutalist-headline text-2xl text-foreground mb-2">{serviceData.averageTimeline}</p>
                <p className="font-body text-xs text-muted-foreground">
                  Actual timeline depends on scope. We confirm a schedule during your on-site assessment.
                </p>
              </div>
              <div className="bento-card bg-foreground text-background p-6">
                <MapPin className="h-6 w-6 mb-3" />
                <h3 className="brutalist-headline text-lg mb-2">Service Area</h3>
                <p className="font-body text-sm text-background/80 mb-3">
                  Serving homes across {business.county}, {business.state}.
                </p>
                <Link
                  to="/service-areas"
                  className="font-headline font-bold uppercase tracking-wider text-[11px] inline-flex items-center gap-1 text-background hover:text-background/70"
                >
                  View service areas <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related services */}
        {relatedServices.length > 0 && (
          <section className="py-20 bg-muted heavy-border-b">
            <div className="w-full max-w-5xl mx-auto px-6 md:px-10">
              <div className="brutalist-section-eyebrow">Related Services</div>
              <h2 className="brutalist-headline text-2xl md:text-4xl text-foreground mb-8">
                Pairs Well With
              </h2>
              <div className="grid md:grid-cols-3 gap-3">
                {relatedServices.map((rs) => {
                  const RsIcon = iconMap[rs.icon] ?? Zap;
                  return (
                    <Link
                      key={rs.slug}
                      to={`/services/${rs.slug}`}
                      className="bento-card bg-background p-5 group block hover:bg-foreground hover:text-background transition-colors"
                    >
                      <RsIcon className="h-6 w-6 mb-3 text-foreground group-hover:text-background transition-colors" />
                      <h3 className="brutalist-headline text-base md:text-lg mb-1">{rs.name}</h3>
                      <span className="font-body text-xs inline-flex items-center gap-1">
                        Learn more <ArrowRight className="h-3 w-3" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {serviceData.faqs && serviceData.faqs.length > 0 && (
          <section className="py-20 bg-background heavy-border-b">
            <div className="w-full max-w-3xl mx-auto px-6 md:px-10">
              <div className="brutalist-section-eyebrow">FAQ</div>
              <h2 className="brutalist-headline text-2xl md:text-4xl text-foreground mb-8">
                {serviceData.name} — FAQ
              </h2>
              <div className="space-y-3">
                {serviceData.faqs.map((faq, i) => (
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

        {/* Service areas strip */}
        <section className="py-16 bg-muted heavy-border-b">
          <div className="w-full max-w-5xl mx-auto px-6 md:px-10 text-center">
            <div className="brutalist-section-eyebrow">Coverage</div>
            <h2 className="brutalist-headline text-2xl md:text-4xl text-foreground mb-6">
              Serving All of {business.county}
            </h2>
            <Link to="/service-areas" className="brutalist-cta inline-flex">
              View Service Areas <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-foreground text-background">
          <div className="w-full max-w-4xl mx-auto px-6 md:px-10 text-center">
            <h2 className="brutalist-headline text-3xl md:text-5xl text-background mb-4">Ready to Get Started?</h2>
            <p className="font-body text-lg text-background/80 mb-10">
              Free, no-obligation quote on {serviceData.name.toLowerCase()} for your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/get-estimate")}
                className="brutalist-cta bg-background text-foreground border-background/30"
              >
                Request Free Quote <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href={hasPhone ? phoneHref : "/get-estimate"}
                className="inline-flex items-center justify-center gap-2 font-headline font-black uppercase tracking-wider text-sm px-8 py-4 bg-transparent text-background border-2 border-background hover:bg-background hover:text-foreground transition-all rounded-none"
              >
                <Phone className="h-4 w-4" />
                {hasPhone ? phoneDisplay : "Get a Quote"}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicePage;
