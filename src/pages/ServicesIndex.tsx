import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

const ServicesIndex = () => {
  const navigate = useNavigate();
  const hasPhone = Boolean(business.phone);

  const sortedServices = [...services].sort((a, b) => b.priority - a.priority);

  const pageTitle = `Generator Services in Monmouth County, NJ | ${business.name}`;
  const pageDescription =
    "Standby generator installation, maintenance, repair, and electrical services across Monmouth County, NJ. Browse our full range of generator services and request a free quote.";
  const canonical = `${SITE_URL}/services`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: canonical },
    ],
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
      </Helmet>

      <Header />

      <main>
        {/* Breadcrumb */}
        <div className="bg-background border-b-2 border-border">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-10 py-3">
            <nav className="flex items-center gap-2 font-headline font-bold uppercase tracking-wider text-xs text-muted-foreground flex-wrap">
              <Link to="/" className="hover:text-foreground">Home</Link>
              <span>/</span>
              <span className="text-foreground">Services</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-foreground text-background heavy-border-b py-20 md:py-28">
          <div className="w-full max-w-6xl mx-auto px-6 md:px-10">
            <div className="brutalist-section-eyebrow text-background/70">Our Services</div>
            <h1 className="brutalist-headline text-4xl md:text-7xl text-background mb-6 leading-[0.95]">
              Generator Services.
              <br />
              <span className="text-background/70">Monmouth County, NJ.</span>
            </h1>
            <p className="font-body text-lg md:text-xl text-background/85 max-w-2xl mb-10 border-l-4 border-background pl-5">
              From whole-house standby installation to seasonal maintenance and emergency repair, we keep Monmouth County homes powered through every {business.utility} outage.
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

        {/* Services grid */}
        <section className="py-20 bg-background heavy-border-b">
          <div className="w-full max-w-6xl mx-auto px-6 md:px-10">
            <div className="brutalist-section-eyebrow">What We Do</div>
            <h2 className="brutalist-headline text-3xl md:text-5xl text-foreground mb-12">
              Full-Service Generator Care
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {sortedServices.map((service) => {
                const Icon = iconMap[service.icon] ?? Zap;
                return (
                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    className="bento-card p-6 group block hover:bg-foreground hover:text-background transition-colors"
                  >
                    <Icon className="h-7 w-7 mb-4 text-foreground group-hover:text-background transition-colors" />
                    <div className="brutalist-section-eyebrow text-muted-foreground group-hover:text-background/70 mb-1">
                      {service.shortName}
                    </div>
                    <h3 className="brutalist-headline text-xl md:text-2xl mb-3">{service.name}</h3>
                    <p className="font-body text-sm leading-relaxed text-muted-foreground group-hover:text-background/80 mb-4">
                      {service.description}
                    </p>
                    <span className="font-body text-xs font-bold inline-flex items-center gap-1">
                      Learn more <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Service areas strip */}
        <section className="py-16 bg-muted heavy-border-b">
          <div className="w-full max-w-5xl mx-auto px-6 md:px-10 text-center">
            <div className="brutalist-section-eyebrow">Coverage</div>
            <h2 className="brutalist-headline text-2xl md:text-4xl text-foreground mb-6">
              Serving All of Monmouth County
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
              Request a free, no-obligation quote for any generator service.
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

export default ServicesIndex;
