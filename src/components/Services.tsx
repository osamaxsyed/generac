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

const Services = () => {
  const services = [...servicesData].sort((a, b) => b.priority - a.priority);

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-12 pb-6 heavy-border-b">
          <div className="brutalist-section-eyebrow">What We Do</div>
          <h2 className="brutalist-headline text-3xl md:text-5xl text-foreground mb-4">
            Standby Generator Services
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground max-w-3xl">
            From whole-house installation to ongoing maintenance and repair, we keep
            Monmouth County homes powered through every JCP&amp;L outage.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 heavy-border bg-background">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Power;
            return (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className={`group p-8 flex flex-col hover:bg-foreground hover:text-background transition-colors border-foreground
                  ${i % 3 !== 2 ? "lg:border-r-2" : ""}
                  ${i % 2 !== 1 ? "md:border-r-2 lg:border-r-2" : "md:border-r-0"}
                  border-b-2`}
              >
                <div className="mb-5 text-foreground group-hover:text-background transition-colors">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="brutalist-headline text-xl text-foreground group-hover:text-background mb-2 transition-colors">
                  {service.name}
                </h3>
                <p className="font-body text-sm text-muted-foreground group-hover:text-background/80 leading-relaxed mb-4 transition-colors flex-1">
                  {service.description}
                </p>
                <span className="font-headline font-bold uppercase tracking-wider text-xs inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {service.shortName} <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 heavy-border-t">
          <Link
            to="/services"
            className="font-headline font-bold uppercase tracking-wider text-sm text-foreground inline-flex items-center gap-2 hover:gap-3 transition-all"
          >
            View All Services <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/get-estimate" className="brutalist-cta">
            Get a Free Estimate
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
