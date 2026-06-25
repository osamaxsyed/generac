import { Link } from "react-router-dom";
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

const ServicesOverview = () => {
  const sorted = [...servicesData].sort((a, b) => b.priority - a.priority);
  const featured = sorted.slice(0, 4);
  const rest = sorted.slice(4);

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-12 pb-6 heavy-border-b flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="brutalist-section-eyebrow">What We Do</div>
            <h2 className="brutalist-headline text-3xl md:text-5xl text-foreground">
              Generator Installation &amp; Service
            </h2>
          </div>
          <p className="font-body text-base md:text-lg text-muted-foreground md:max-w-md">
            Whole-house and standby generators for Monmouth County homes — installed,
            maintained, and repaired to keep you powered through JCP&amp;L outages.
          </p>
        </div>

        {/* Featured services — bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[260px] mb-10">
          {featured.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Power;
            const span =
              i === 0 ? "md:col-span-7" : i === 1 ? "md:col-span-5" : "md:col-span-6";
            return (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className={`${span} bento-card text-left group`}
              >
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between border-l-8 border-foreground">
                  <div className="flex items-center gap-3">
                    <Icon className="h-8 w-8 text-foreground" />
                    {i === 0 && (
                      <span className="bg-foreground text-background font-headline font-black uppercase tracking-wider text-[10px] px-3 py-1">
                        Featured Service
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="brutalist-headline text-2xl md:text-3xl text-foreground mb-2">
                      {service.name}
                    </h3>
                    <p className="font-body text-sm md:text-base text-muted-foreground mb-4 max-w-md">
                      {service.description}
                    </p>
                    <span className="font-headline font-bold uppercase tracking-wider text-xs text-foreground inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                      View Service <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Remaining services chip list */}
        <div className="border-t-2 border-foreground pt-8">
          <div className="brutalist-section-eyebrow mb-4">More Services</div>
          <div className="flex flex-wrap gap-2">
            {rest.map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="px-4 py-2 bg-muted text-foreground hover:bg-foreground hover:text-background border-2 border-foreground font-headline font-bold uppercase tracking-wider text-[11px] transition-colors"
              >
                {service.name}
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link
              to="/services"
              className="font-headline font-bold uppercase tracking-wider text-sm text-foreground inline-flex items-center gap-2 hover:gap-3 transition-all"
            >
              View All Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
