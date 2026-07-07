import { Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { business, phoneDisplay, phoneHref } from "@/config/business";
import logo from "@/assets/logo.jpeg";

const services = [
  { name: "Generator Installation", slug: "generator-installation" },
  { name: "Standby Generators", slug: "standby-generators" },
  { name: "Generator Maintenance", slug: "generator-maintenance" },
  { name: "Generator Repair", slug: "generator-repair" },
  { name: "Electrical Services", slug: "electrical-services" },
];

const serviceAreas = [
  { name: "Middletown", slug: "middletown" },
  { name: "Holmdel", slug: "holmdel" },
  { name: "Colts Neck", slug: "colts-neck" },
  { name: "Rumson", slug: "rumson" },
  { name: "Marlboro", slug: "marlboro" },
  { name: "Freehold", slug: "freehold" },
];

const company = [
  { name: "About", href: "/about" },
  { name: "FAQ", href: "/faq" },
  { name: "Get Estimate", href: "/get-estimate" },
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
];

const linkClass =
  "font-body text-[14.5px] text-[#9fb0c7] hover:text-white transition-colors";
const headingClass =
  "font-body font-semibold text-xs uppercase tracking-[0.14em] text-[#6f829c] mb-[18px]";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-footer text-[#9fb0c7]" role="contentinfo">
      <div className="container-x pt-14 md:pt-[72px] pb-0">
        <div className="grid gap-10 md:gap-11 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div className="max-w-[340px]">
            <Link to="/" className="inline-flex" aria-label={`${business.name} home`}>
              <span className="grid place-items-center bg-white rounded-xl p-2">
                <img src={logo} alt={`${business.name} logo`} className="h-12 w-auto" width={1024} height={730} />
              </span>
            </Link>

            <p className="font-body text-sm leading-relaxed text-[#8295ad] mt-[18px]">
              Independent standby-generator specialists serving {business.county},
              NJ: maintenance, installation, and emergency repair.
            </p>

            <div className="inline-flex items-center gap-2 mt-[18px] rounded-full px-3.5 py-2 bg-blue-accent/10 border border-blue-accent/20">
              <ShieldCheck className="h-[15px] w-[15px] text-blue-accent" />
              <span className="font-body font-semibold text-[12.5px] text-[#d9dde3]">
                Licensed &amp; Insured in NJ
              </span>
            </div>

            <div className="flex flex-col gap-2.5 mt-[22px]">
              {business.phone && (
                <a
                  href={phoneHref}
                  className="flex items-center gap-2.5 font-body font-semibold text-[15px] text-white hover:text-blue-accent transition-colors"
                >
                  <Phone className="h-[17px] w-[17px] text-blue-accent shrink-0" />
                  {phoneDisplay}
                </a>
              )}
              {business.email && (
                <a
                  href={`mailto:${business.email}`}
                  className="flex items-center gap-2.5 font-body text-sm text-[#9fb0c7] hover:text-white transition-colors"
                >
                  <Mail className="h-[17px] w-[17px] text-blue-accent shrink-0" />
                  {business.email}
                </a>
              )}
              <div className="flex items-center gap-2.5 font-body text-sm text-[#9fb0c7]">
                <MapPin className="h-[17px] w-[17px] text-blue-accent shrink-0" />
                {business.county}, {business.address.addressRegion}
              </div>
            </div>
          </div>

          {/* Services */}
          <nav aria-label="Services">
            <div className={headingClass}>Services</div>
            <ul className="flex flex-col gap-[11px]">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className={linkClass}>
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/services"
                  className="font-body font-semibold text-[14.5px] text-blue-accent hover:text-white transition-colors"
                >
                  All Services
                </Link>
              </li>
            </ul>
          </nav>

          {/* Service areas */}
          <nav aria-label="Service areas">
            <div className={headingClass}>Service Areas</div>
            <ul className="flex flex-col gap-[11px]">
              {serviceAreas.map((a) => (
                <li key={a.slug}>
                  <Link to={`/service-areas/${a.slug}`} className={linkClass}>
                    {a.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/service-areas"
                  className="font-body font-semibold text-[14.5px] text-blue-accent hover:text-white transition-colors"
                >
                  All Areas
                </Link>
              </li>
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company">
            <div className={headingClass}>Company</div>
            <ul className="flex flex-col gap-[11px]">
              {company.map((c) => (
                <li key={c.href}>
                  <Link to={c.href} className={linkClass}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-9 md:mt-14 border-t border-white/10 py-[22px] flex flex-wrap gap-x-5 gap-y-2.5 justify-between items-center">
          <span className="font-body text-[13px] text-[#6f829c]">
            © {year} {business.name}. All rights reserved.
          </span>
          <span className="font-body text-[13px] text-[#6f829c]">
            Maintenance · Installation · Repair · {business.county}, NJ
          </span>
        </div>
        <div className="pb-7">
          <p className="font-body text-xs leading-[1.55] text-[#5c6e88] max-w-[840px]">
            {business.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
