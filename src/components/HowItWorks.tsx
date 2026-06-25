import { ClipboardList, FileCheck2, Hammer, RefreshCw } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: ClipboardList,
      title: "Free on-site assessment",
      description:
        "We visit your home, calculate your load, and size the right generator — no pressure, no obligation.",
    },
    {
      number: "02",
      icon: FileCheck2,
      title: "Proposal & permits",
      description:
        "A clear written proposal, then we pull the electrical and gas permits and schedule your install.",
    },
    {
      number: "03",
      icon: Hammer,
      title: "Professional installation",
      description:
        "A clean, code-compliant install of the pad, generator, fuel hookup, and automatic transfer switch.",
    },
    {
      number: "04",
      icon: RefreshCw,
      title: "Startup, testing & maintenance",
      description:
        "We commission and load-test the unit, pass inspection, and keep it storm-ready with ongoing maintenance.",
    },
  ];

  return (
    <section id="process" className="section bg-background">
      <div className="container-x">
        <div className="max-w-2xl mx-auto text-center">
          <div className="eyebrow">Our Process</div>
          <h2 className="display text-3xl md:text-5xl text-balance">
            Your path to reliable backup power
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground mt-4 leading-relaxed">
            A straightforward, four-step process — from first visit to year-round
            peace of mind.
          </p>
        </div>

        <div className="mt-12 md:mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="card-soft p-7">
                <div className="h-1 w-10 rounded bg-blue" />
                <div className="flex items-center gap-3 mt-5">
                  <span className="font-headline font-bold text-4xl text-blue-accent">
                    {step.number}
                  </span>
                  <span className="icon-tile-solid">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <h3 className="font-headline font-semibold text-lg text-foreground mt-4">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground mt-2.5 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
