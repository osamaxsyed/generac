import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { business, phoneDisplay, phoneHref } from "@/config/business";

const Footer = () => {
  const services = [
    { name: "Generator Installation", slug: "generator-installation" },
    { name: "Standby Generators", slug: "standby-generators" },
    { name: "Generator Maintenance", slug: "generator-maintenance" },
    { name: "Generator Repair", slug: "generator-repair" },
  ];

  const serviceAreas = [
    { name: "Middletown", slug: "middletown" },
    { name: "Holmdel", slug: "holmdel" },
    { name: "Colts Neck", slug: "colts-neck" },
    { name: "Rumson", slug: "rumson" },
    { name: "Marlboro", slug: "marlboro" },
    { name: "Freehold", slug: "freehold" },
  ];

  return (
    <footer className="bg-foreground text-background heavy-border-t" role="contentinfo">
      <div className="w-full px-6 md:px-10 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
          {/* Brand */}
          <div>
            <div className="font-headline font-black italic tracking-tighter text-xl uppercase mb-6">
              {business.name}
            </div>
            <p className="text-sm opacity-80 leading-relaxed mb-6">
              {business.description}
            </p>
            <div className="space-y-3 text-sm opacity-90">
              {business.phone && (
                <a href={phoneHref} className="flex items-center gap-3 hover:opacity-100 transition-opacity">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span className="font-headline font-bold tracking-wider">{phoneDisplay}</span>
                </a>
              )}
              {business.email && (
                <a
                  href={`mailto:${business.email}`}
                  className="flex items-center gap-3 hover:opacity-100 transition-opacity"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span className="text-xs">{business.email}</span>
                </a>
              )}
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>{business.county}, {business.address.addressRegion}</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <div>
                  <p>Mon–Fri 8AM–5PM</p>
                  <p className="opacity-75 text-xs">Sat 9AM–2PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-headline font-black uppercase tracking-wider text-sm mb-5 pb-3 border-b-2 border-background/20">
              Services
            </h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="text-sm opacity-80 hover:opacity-100 hover:underline underline-offset-4 decoration-2 transition-opacity"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/services"
                  className="text-sm font-headline font-bold uppercase tracking-wider hover:underline underline-offset-4 decoration-2"
                >
                  All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Service areas */}
          <div>
            <h4 className="font-headline font-black uppercase tracking-wider text-sm mb-5 pb-3 border-b-2 border-background/20">
              Service Areas
            </h4>
            <ul className="space-y-2">
              {serviceAreas.map((a) => (
                <li key={a.slug}>
                  <Link
                    to={`/service-areas/${a.slug}`}
                    className="text-sm opacity-80 hover:opacity-100 hover:underline underline-offset-4 decoration-2 transition-opacity"
                  >
                    {a.name}, {business.address.addressRegion}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/service-areas"
                  className="text-sm font-headline font-bold uppercase tracking-wider hover:underline underline-offset-4 decoration-2"
                >
                  All Areas →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-headline font-black uppercase tracking-wider text-sm mb-5 pb-3 border-b-2 border-background/20">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm opacity-80 hover:opacity-100 hover:underline underline-offset-4 decoration-2 transition-opacity">
                  About
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm opacity-80 hover:opacity-100 hover:underline underline-offset-4 decoration-2 transition-opacity">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/get-estimate" className="text-sm opacity-80 hover:opacity-100 hover:underline underline-offset-4 decoration-2 transition-opacity">
                  Get Estimate
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm opacity-80 hover:opacity-100 hover:underline underline-offset-4 decoration-2 transition-opacity">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm opacity-80 hover:opacity-100 hover:underline underline-offset-4 decoration-2 transition-opacity">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t-2 border-background/20">
        <div className="w-full px-6 md:px-10 py-6 max-w-7xl mx-auto flex flex-col gap-3">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-headline font-bold uppercase tracking-wider text-xs opacity-70">
              © {new Date().getFullYear()} {business.name}.
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-xs">
              <Link to="/privacy" className="font-headline font-bold uppercase tracking-wider opacity-70 hover:opacity-100 hover:underline underline-offset-4">
                Privacy
              </Link>
              <Link to="/terms" className="font-headline font-bold uppercase tracking-wider opacity-70 hover:opacity-100 hover:underline underline-offset-4">
                Terms
              </Link>
              <Link to="/sitemap" className="font-headline font-bold uppercase tracking-wider opacity-70 hover:opacity-100 hover:underline underline-offset-4">
                Sitemap
              </Link>
            </div>
          </div>
          <p className="text-[11px] opacity-50 leading-relaxed">
            {business.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
