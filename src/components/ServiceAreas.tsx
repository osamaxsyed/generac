import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { business } from "@/config/business";
import locationsData from "@/data/locations.json";

const ServiceAreas = () => {
  const cities = [...locationsData].sort((a, b) => b.priority - a.priority);

  return (
    <section id="areas" className="section bg-background scroll-mt-[84px]">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto">
          <div className="eyebrow">Service Areas</div>
          <h2 className="display text-3xl md:text-[42px] leading-tight">
            Serving homes across {business.county}
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground mt-4">
            Standby generator installation and service throughout {business.county}, NJ — keeping homes
            powered through {business.utility} outages.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-12">
          {cities.map((c) => (
            <Link
              key={c.slug}
              to={`/service-areas/${c.slug}`}
              className="card-soft group flex items-center justify-between gap-2 px-4 py-4"
            >
              <span className="flex items-center gap-2.5 font-body font-semibold text-[15px] text-foreground">
                <span className="icon-tile !w-9 !h-9">
                  <MapPin className="h-[18px] w-[18px]" />
                </span>
                {c.name}
              </span>
              <ArrowRight className="h-4 w-4 text-blue opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/service-areas" className="btn-primary">
            View All Service Areas <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/get-estimate"
            className="font-body font-semibold text-[15px] text-muted-foreground inline-flex items-center gap-2 hover:text-blue transition-colors"
          >
            Don't see your town? Get a free estimate
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreas;
