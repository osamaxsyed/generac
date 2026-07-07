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
  Check,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import servicesData from "@/data/services.json";

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

// Slugs that represent recurring / plan-based offerings.
const recurringSlugs = new Set([
  "generator-maintenance",
  "preventive-maintenance",
  "seasonal-oil-changes",
]);

const Services = () => {
  const services = [...servicesData].sort((a, b) => b.priority - a.priority);

  return (
    <section className="section bg-background">
      <div className="container-x">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <div className="eyebrow">Our Services</div>
          <h2 className="display text-3xl md:text-[42px] leading-tight mb-4">
            Everything your generator needs, under one roof
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground">
            From whole-house installation to ongoing maintenance and emergency
            repair, we keep {`Monmouth County`} homes powered through every
            JCP&amp;L outage.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Power;
            const badge =
              i === 0
                ? "Most Popular"
                : recurringSlugs.has(service.slug)
                ? "Recurring Plans"
                : null;

            return (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="card-soft group p-7 md:p-8 flex flex-col"
              >
                {/* Top row: icon tile + optional badge */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="icon-tile">
                    <Icon className="h-6 w-6" />
                  </div>
                  {badge && <span className="pill">{badge}</span>}
                </div>

                <h3 className="font-headline font-bold text-xl text-foreground mb-2">
                  {service.name}
                </h3>
                <p className="font-body text-[15px] text-muted-foreground leading-relaxed mb-5">
                  {service.description}
                </p>

                <ul className="space-y-2.5 mb-6">
                  {service.features.slice(0, 4).map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-[14.5px] text-foreground/80"
                    >
                      <span className="grid place-items-center w-5 h-5 rounded-full bg-blue-tint text-blue shrink-0 mt-0.5">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="font-body">{feature}</span>
                    </li>
                  ))}
                </ul>

                <span className="mt-auto font-headline font-semibold text-sm text-blue inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                  Learn more <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <Link to="/services" className="btn-primary">
            View All Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
