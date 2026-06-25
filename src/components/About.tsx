import { CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { business } from "@/config/business";
import locationsData from "@/data/locations.json";
import servicesData from "@/data/services.json";

const About = () => {
  const credentials = [
    "Licensed and insured generator and electrical work",
    `Installations wired and inspected to New Jersey code`,
    `Whole-house and standby systems sized to your home`,
    `Protection against ${business.utility} outages, year round`,
    "Service for units we install and units we didn't",
  ];

  const serviceAreaTowns = [...locationsData]
    .sort((a, b) => b.priority - a.priority)
    .map((t) => t.name);

  const featuredServices = [...servicesData]
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="bg-foreground text-background heavy-border-b py-20 md:py-28">
        <div className="w-full max-w-6xl mx-auto px-6 md:px-10">
          <div className="brutalist-section-eyebrow text-background/70">About</div>
          <h1 className="brutalist-headline text-4xl md:text-7xl text-background mb-6 leading-[0.95]">
            {business.name}
          </h1>
          <p className="font-body text-lg md:text-xl text-background/85 max-w-2xl border-l-4 border-background pl-5">
            Standby generator installation and service for {business.county}, NJ.
            Licensed, insured, and local — focused on keeping your home powered when
            the grid goes down.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 md:py-28 bg-background">
        <div className="w-full max-w-4xl mx-auto px-6 md:px-10 space-y-14">
          <div>
            <div className="brutalist-section-eyebrow">What We Do</div>
            <h2 className="brutalist-headline text-2xl md:text-4xl text-foreground mb-4">
              Backup Power, Done Right
            </h2>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
              {business.name} installs, maintains, and repairs whole-house and standby
              generators across {business.county}, New Jersey. When a storm takes out
              {" "}{business.utility} power, a properly sized and maintained standby
              generator keeps your heat, refrigeration, well pump, sump pump, and key
              circuits running — automatically, within seconds.
            </p>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
              We start every job with an on-site load assessment rather than a guess, so
              the system is sized to your actual home. All electrical work is performed to
              New Jersey code, with permits and municipal inspections handled as part of
              the installation.
            </p>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              We also service existing generators — including units we didn't install —
              with scheduled maintenance, oil and filter changes, battery replacement,
              load testing, and repair, so your generator actually starts when you need it.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {featuredServices.map((service) => (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="flex items-center justify-between p-4 border-2 border-foreground bg-muted hover:bg-foreground hover:text-background transition-colors"
                >
                  <span className="font-headline font-bold uppercase tracking-wider text-xs">
                    {service.name}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="brutalist-section-eyebrow">Service Area</div>
            <h2 className="brutalist-headline text-2xl md:text-4xl text-foreground mb-4">
              Where We Work
            </h2>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-2">
              We serve {serviceAreaTowns.slice(0, -1).join(", ")}, and{" "}
              {serviceAreaTowns[serviceAreaTowns.length - 1]} throughout {business.county}.
            </p>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">
              If you're nearby and don't see your town listed, get in touch — we may still
              be able to help.
            </p>
          </div>

          <div>
            <div className="brutalist-section-eyebrow">Why Homeowners Choose Us</div>
            <h2 className="brutalist-headline text-2xl md:text-4xl text-foreground mb-6">
              Licensed and Accountable
            </h2>
            <ul className="space-y-3">
              {credentials.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-foreground flex-shrink-0 mt-0.5" />
                  <span className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-foreground text-background heavy-border p-8 md:p-10 text-center">
            <h3 className="brutalist-headline text-2xl md:text-3xl text-background mb-3">
              Ready to Get Started?
            </h3>
            <p className="font-body text-base text-background/80 mb-6 max-w-md mx-auto">
              Tell us about your home and we'll provide a free, no-obligation estimate.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/get-estimate" className="brutalist-cta">
                Get a Free Estimate
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
