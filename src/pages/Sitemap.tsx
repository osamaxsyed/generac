import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { business } from "@/config/business";
import servicesData from "@/data/services.json";
import locationsData from "@/data/locations.json";

const Sitemap = () => {
  const services = [...servicesData].sort((a, b) => b.priority - a.priority);
  const locations = [...locationsData].sort((a, b) => b.priority - a.priority);

  const siteLinks = [
    {
      category: "Main Pages",
      links: [
        { name: "Home", path: "/" },
        { name: "All Services", path: "/services" },
        { name: "Service Areas", path: "/service-areas" },
        { name: "Whole-House Generator Cost", path: "/whole-house-generator-cost" },
        { name: "About Us", path: "/about" },
        { name: "FAQ", path: "/faq" },
        { name: "Get a Free Estimate", path: "/get-estimate" },
      ],
    },
    {
      category: "Services",
      links: services.map((s) => ({
        name: s.name,
        path: `/services/${s.slug}`,
      })),
    },
    {
      category: "Service Areas",
      links: [
        { name: "All Service Areas", path: "/service-areas" },
        ...locations.map((l) => ({
          name: `${l.name}, ${l.state}`,
          path: `/service-areas/${l.slug}`,
        })),
      ],
    },
    {
      category: "Legal & Info",
      links: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
        { name: "Sitemap", path: "/sitemap" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`Sitemap | ${business.name}`}
        description={`Browse all pages on the ${business.name} website — generator services, service areas across ${business.county}, and more.`}
        canonical="/sitemap"
      />
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-foreground text-background heavy-border-b py-16 md:py-20">
          <div className="w-full max-w-5xl mx-auto px-6 md:px-10">
            <div className="brutalist-section-eyebrow text-background/70">Site Index</div>
            <h1 className="brutalist-headline text-4xl md:text-6xl text-background mb-4 leading-[0.95]">
              Sitemap.
            </h1>
            <p className="font-body text-base md:text-lg text-background/85 max-w-2xl border-l-4 border-background pl-5">
              Every page on the {business.name} website. Navigate quickly to any content
              you're looking for.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 md:py-20 bg-background heavy-border-b">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {siteLinks.map((section) => (
                <div key={section.category} className="bento-card bg-background p-6 md:p-8">
                  <h2 className="brutalist-headline text-lg md:text-xl text-foreground mb-4 pb-3 border-b-2 border-foreground">
                    {section.category}
                  </h2>
                  <ul className="space-y-1">
                    {section.links.map((link) => (
                      <li key={link.path}>
                        <Link
                          to={link.path}
                          className="font-body text-sm md:text-base text-muted-foreground hover:text-foreground hover:underline underline-offset-4 decoration-2 transition-colors py-1 inline-block"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Help CTA */}
        <section className="py-20 bg-foreground text-background">
          <div className="w-full max-w-3xl mx-auto px-6 md:px-10 text-center">
            <h2 className="brutalist-headline text-3xl md:text-5xl text-background mb-4">Can't Find Something?</h2>
            <p className="font-body text-lg text-background/80 mb-10">
              Request a free estimate and we'll point you in the right direction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/get-estimate"
                className="inline-flex items-center justify-center gap-2 font-headline font-black uppercase tracking-wider text-sm px-8 py-4 bg-background text-foreground border-b-4 border-background/40 hover:bg-background/90 active:translate-y-0.5 active:border-b-0 transition-all rounded-none"
              >
                Get a Free Estimate
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Sitemap;
