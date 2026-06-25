import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Phone, MapPin, ArrowRight, Zap, Power, Wrench, Settings, Plug, Droplet, Battery, ClipboardCheck, Activity, CalendarCheck } from "lucide-react";
import locations from "@/data/locations.json";
import services from "@/data/services.json";
import { business, SITE_URL, phoneDisplay, phoneHref } from "@/config/business";

const iconMap: { [key: string]: any } = { Zap, Power, Wrench, Settings, Plug, Droplet, Battery, ClipboardCheck, Activity, CalendarCheck };

const LocationPage = () => {
  const { location } = useParams();
  const navigate = useNavigate();
  const locationData = locations.find((loc) => loc.slug === location);

  if (!locationData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-20">
          <h1 className="brutalist-headline text-3xl text-foreground mb-4">Location Not Found</h1>
          <Link to="/service-areas" className="font-headline font-bold uppercase tracking-wider text-sm text-foreground hover:underline">
            View all service areas →
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const pageTitle = `Generator Services in ${locationData.name}, NJ | ${business.name}`;
  const pageDescription = `Standby and whole-house generator installation, maintenance, and repair in ${locationData.name}, NJ. Keep your home powered through ${business.utility} outages. Licensed & insured. Free estimates.`;

  const canonicalUrl = `${SITE_URL}/service-areas/${locationData.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: `${SITE_URL}/service-areas` },
      { "@type": "ListItem", position: 3, name: locationData.name, item: canonicalUrl },
    ],
  };

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
      </Helmet>

      <Header />

      <main>
        {/* Breadcrumb */}
        <div className="bg-background border-b-2 border-border">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-10 py-3">
            <nav className="flex items-center gap-2 font-headline font-bold uppercase tracking-wider text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground">Home</Link>
              <span>/</span>
              <Link to="/service-areas" className="hover:text-foreground">Service Areas</Link>
              <span>/</span>
              <span className="text-foreground">{locationData.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-foreground text-background heavy-border-b py-20 md:py-28">
          <div className="w-full max-w-6xl mx-auto px-6 md:px-10">
            <div className="brutalist-section-eyebrow text-background/70 flex items-center gap-2">
              <MapPin className="h-3 w-3" />
              {locationData.name}, {locationData.state} • {business.county}
            </div>
            <h1 className="brutalist-headline text-4xl md:text-7xl text-background mb-6 leading-[0.95]">
              Generator Services.
              <br />
              <span className="text-background/70">{locationData.name}, NJ.</span>
            </h1>
            <p className="font-body text-lg md:text-xl text-background/85 max-w-2xl mb-10 border-l-4 border-background pl-5">
              {locationData.description}
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

        {/* Neighborhoods */}
        <section className="py-20 bg-background heavy-border-b">
          <div className="w-full max-w-5xl mx-auto px-6 md:px-10">
            <div className="brutalist-section-eyebrow">Neighborhoods Served</div>
            <h2 className="brutalist-headline text-2xl md:text-4xl text-foreground mb-8">
              We work throughout {locationData.name}
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {locationData.neighborhoods.map((n: string) => (
                <div key={n} className="font-body text-sm md:text-base text-muted-foreground border-l-4 border-foreground pl-3 py-1">
                  {n}
                </div>
              ))}
            </div>
            <p className="font-headline font-bold uppercase tracking-wider text-xs text-muted-foreground">
              ZIP Codes: {locationData.zipCodes.join(", ")}
            </p>
          </div>
        </section>

        {/* Services bento */}
        <section className="py-20 bg-muted heavy-border-b">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-10">
            <div className="mb-12 pb-6 heavy-border-b">
              <div className="brutalist-section-eyebrow">Services</div>
              <h2 className="brutalist-headline text-3xl md:text-5xl text-foreground">Our Services in {locationData.name}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {services.slice(0, 9).map((service) => {
                const Icon = iconMap[service.icon] || Power;
                return (
                  <Link
                    key={service.slug}
                    to={`/${service.slug}/${locationData.slug}`}
                    className="bento-card bg-background p-6 group block hover:bg-foreground hover:text-background transition-colors"
                  >
                    <Icon className="h-7 w-7 mb-4" />
                    <h3 className="brutalist-headline text-lg mb-2">{service.shortName}</h3>
                    <p className="font-body text-sm text-muted-foreground group-hover:text-background/80 leading-relaxed line-clamp-2 mb-4">
                      {service.description}
                    </p>
                    <span className="font-headline font-bold uppercase tracking-wider text-xs inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Learn More <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                );
              })}
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
              <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
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

        {/* Why us */}
        <section className="py-20 bg-muted heavy-border-b">
          <div className="w-full max-w-5xl mx-auto px-6 md:px-10">
            <div className="brutalist-section-eyebrow">Why {locationData.name} Picks Us</div>
            <h2 className="brutalist-headline text-3xl md:text-5xl text-foreground mb-12">Three Reasons</h2>
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {[
                ["Licensed & Insured", "Licensed and insured electrical and generator work, performed to NJ code."],
                ["Local to Monmouth County", `Serving ${locationData.name} and ${business.county}, NJ. We know local permitting and ${business.utility} outage patterns.`],
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

        {/* CTA */}
        <section className="py-20 bg-foreground text-background">
          <div className="w-full max-w-4xl mx-auto px-6 md:px-10 text-center">
            <h2 className="brutalist-headline text-3xl md:text-5xl text-background mb-4">
              Ready to Start in {locationData.name}?
            </h2>
            <p className="font-body text-lg text-background/80 mb-10">
              Free, no-obligation estimate. Transparent pricing.
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

export default LocationPage;
