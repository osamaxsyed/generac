import { ShieldCheck, MapPin, BadgeCheck, Wrench } from "lucide-react";
import { business } from "@/config/business";

const About = () => {
  const values = [
    {
      icon: ShieldCheck,
      title: "Generators are all we do",
      description:
        "No HVAC side jobs, no general handyman work. Standby power is our entire focus, which means deep, specialized knowledge of sizing, installation, and service.",
    },
    {
      icon: MapPin,
      title: `Local to ${business.county}`,
      description: `We know the ${business.utility} grid and how outages play out here after nor'easters and summer storms. Our trucks are nearby, so estimates and storm response come fast — typically within ${business.stats.responseTime}.`,
    },
    {
      icon: BadgeCheck,
      title: "Licensed & insured",
      description:
        "Every installation is wired and inspected to New Jersey code, with permits and municipal inspections handled as part of the job.",
    },
    {
      icon: Wrench,
      title: "Maintenance that prevents failures",
      description:
        "Scheduled service, oil and filter changes, battery checks, and load testing keep your generator ready to start the moment the grid goes down.",
    },
  ];

  return (
    <section id="why" className="section bg-muted border-t border-border">
      <div className="container-x">
        <div className="max-w-3xl mx-auto text-center">
          <div className="eyebrow">Why Us</div>
          <h2 className="display text-3xl md:text-5xl text-balance">
            Why {business.county} homeowners choose a generator-only specialist
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground mt-4 leading-relaxed">
            A focused, local team beats a big-box generalist every time your power
            is on the line — backed by {business.stats.yearsInBusiness} years and{" "}
            {business.stats.generatorsServiced} generators serviced.
          </p>
        </div>

        <div className="mt-12 md:mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div key={value.title} className="card-soft p-7">
                <span className="icon-tile">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="font-headline font-semibold text-lg text-foreground mt-5">
                  {value.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground mt-2.5 leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
