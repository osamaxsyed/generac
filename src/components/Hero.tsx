import { Calendar, ArrowRight, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { business, phoneDisplay, phoneHref } from "@/config/business";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-[640px] md:min-h-[720px] flex items-center justify-center overflow-hidden heavy-border-b bg-foreground">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground to-foreground"></div>
      </div>

      <div className="relative z-10 w-full px-6 md:px-10 py-24 max-w-6xl mx-auto">
        <h1 className="brutalist-headline text-5xl md:text-7xl lg:text-8xl text-background leading-[0.95] mb-6 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
          Whole-House
          <br />
          <span className="text-background/80">Generator Installation &amp; Service</span>
        </h1>

        <p className="font-headline font-bold uppercase tracking-wider text-sm md:text-base text-background/80 mb-8">
          {business.county}, {business.state}
        </p>

        <p className="font-body text-lg md:text-xl text-background/90 max-w-2xl mb-10 border-l-4 border-background pl-5 py-1 leading-relaxed">
          Standby generator installation, maintenance, and repair to keep your home
          powered through {business.utility} outages — automatically, day or night.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button onClick={() => navigate("/get-estimate")} className="brutalist-cta">
            <Calendar className="h-4 w-4" />
            Get a Free Estimate
            <ArrowRight className="h-4 w-4" />
          </button>
          {business.phone ? (
            <a
              href={phoneHref}
              className="inline-flex items-center justify-center gap-2 font-headline font-black uppercase tracking-wider text-sm px-8 py-4 bg-transparent text-background border-2 border-background hover:bg-background hover:text-foreground active:translate-y-0.5 transition-all rounded-none"
            >
              <Phone className="h-4 w-4" />
              {phoneDisplay}
            </a>
          ) : (
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 font-headline font-black uppercase tracking-wider text-sm px-8 py-4 bg-transparent text-background border-2 border-background hover:bg-background hover:text-foreground active:translate-y-0.5 transition-all rounded-none"
            >
              View Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
