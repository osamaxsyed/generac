import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { MapPin, Phone, ArrowRight } from "lucide-react";
import locations from "@/data/locations.json";
import services from "@/data/services.json";
import { useNavigate } from "react-router-dom";
import { business, SITE_URL, phoneDisplay, phoneHref } from "@/config/business";

const ServiceAreasPage = () => {
  const navigate = useNavigate();
  const sortedLocations = [...locations].sort((a, b) => b.priority - a.priority);
  const featuredServices = services.slice(0, 8);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: `${SITE_URL}/service-areas` },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`Generator Service Areas in Monmouth County, NJ | ${business.name}`}
        description={`We install, maintain, and repair standby generators across ${business.county}, NJ — keeping homes powered through ${business.utility} outages. Find your town.`}
        canonical="/service-areas"
        keywords="generator installation Monmouth County, standby generator NJ, whole house generator, JCP&L outage backup power, generator repair near me"
      />
      <Helmet>
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
              <span className="text-foreground">Service Areas</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-foreground text-background heavy-border-b py-20 md:py-28">
          <div className="w-full max-w-6xl mx-auto px-6 md:px-10">
            <div className="brutalist-section-eyebrow text-background/70">Coverage Area</div>
            <h1 className="brutalist-headline text-4xl md:text-7xl text-background mb-6 leading-[0.95]">
              Where We Power Up.
              <br />
              <span className="text-background/70">Monmouth County, NJ.</span>
            </h1>
            <p className="font-body text-lg md:text-xl text-background/85 max-w-2xl mb-10 border-l-4 border-background pl-5">
              We serve homeowners across {business.county}, New Jersey with standby and whole-house
              generator installation, maintenance, and repair — keeping your home running through
              {" "}{business.utility} outages, coastal storms, and winter weather. Licensed and insured.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => navigate("/get-estimate")} className="brutalist-cta bg-background text-foreground border-background/30">
                Get Free Estimate <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href={phoneHref}
                className="inline-flex items-center justify-center gap-2 font-headline font-black uppercase tracking-wider text-sm px-8 py-4 bg-background text-foreground border-b-4 border-background/40 hover:bg-background/90 active:translate-y-0.5 active:border-b-0 transition-all rounded-none"
              >
                <Phone className="h-4 w-4" />
                {phoneDisplay}
              </a>
            </div>
          </div>
        </section>

        {/* Cities grid */}
        <section className="py-20 bg-background heavy-border-b">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-10">
            <div className="mb-12 pb-6 heavy-border-b">
              <div className="brutalist-section-eyebrow">Towns We Serve</div>
              <h2 className="brutalist-headline text-3xl md:text-5xl text-foreground">Monmouth County Towns</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {sortedLocations.map((loc) => (
                <Link
                  key={loc.slug}
                  to={`/service-areas/${loc.slug}`}
                  className="bento-card p-6 group block hover:bg-foreground hover:text-background transition-colors"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-5 w-5" />
                    <h3 className="brutalist-headline text-xl">{loc.name}</h3>
                  </div>
                  <p className="font-body text-sm text-muted-foreground group-hover:text-background/80 mb-4 leading-relaxed line-clamp-3">
                    {loc.description}
                  </p>
                  <p className="font-headline font-bold uppercase tracking-wider text-[10px] text-muted-foreground group-hover:text-background/70 mb-3">
                    ZIP: {loc.zipCodes.join(", ")}
                  </p>
                  <span className="font-headline font-bold uppercase tracking-wider text-xs inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Services <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Services by Location */}
        <section className="py-20 bg-muted heavy-border-b">
          <div className="w-full max-w-6xl mx-auto px-6 md:px-10">
            <div className="mb-12 pb-6 heavy-border-b">
              <div className="brutalist-section-eyebrow">Service x Location Matrix</div>
              <h2 className="brutalist-headline text-3xl md:text-5xl text-foreground">Find Your Service</h2>
            </div>
            <div className="space-y-4">
              {featuredServices.map((s) => (
                <div key={s.slug} className="bento-card bg-background p-6">
                  <h3 className="brutalist-headline text-lg md:text-xl text-foreground mb-2">{s.name}</h3>
                  <p className="font-body text-sm text-muted-foreground mb-4 leading-relaxed">{s.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {sortedLocations.slice(0, 6).map((loc) => (
                      <Link
                        key={`${s.slug}-${loc.slug}`}
                        to={`/${s.slug}/${loc.slug}`}
                        className="font-headline font-bold uppercase tracking-wider text-[10px] text-foreground border-2 border-foreground px-3 py-1 hover:bg-foreground hover:text-background transition-colors"
                      >
                        {loc.name}
                      </Link>
                    ))}
                    {sortedLocations.length > 6 && (
                      <span className="font-headline font-bold uppercase tracking-wider text-[10px] text-muted-foreground px-3 py-1">
                        + {sortedLocations.length - 6} more
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-foreground text-background">
          <div className="w-full max-w-4xl mx-auto px-6 md:px-10 text-center">
            <h2 className="brutalist-headline text-3xl md:text-5xl text-background mb-4">Don't See Your Town?</h2>
            <p className="font-body text-lg text-background/80 mb-10">
              Give us a call. We may be able to help even if your town isn't listed.
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

export default ServiceAreasPage;
