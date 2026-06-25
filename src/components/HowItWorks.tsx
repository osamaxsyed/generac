import { ClipboardList, FileText, Hammer, CheckCircle2 } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: <ClipboardList className="h-8 w-8" />,
      title: "Assessment",
      description: "Free on-site visit with a load calculation to size your generator and confirm fuel and electrical needs.",
    },
    {
      number: "02",
      icon: <FileText className="h-8 w-8" />,
      title: "Proposal & Permits",
      description: "A clear written proposal, then we pull the electrical and gas permits and schedule the install.",
    },
    {
      number: "03",
      icon: <Hammer className="h-8 w-8" />,
      title: "Installation",
      description: "Professional install of the pad, generator, fuel hookup, and automatic transfer switch — to NJ code.",
    },
    {
      number: "04",
      icon: <CheckCircle2 className="h-8 w-8" />,
      title: "Startup & Service",
      description: "Startup, testing, and municipal inspection, plus ongoing maintenance so it starts when you need it.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-muted heavy-border-t heavy-border-b">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <div className="brutalist-section-eyebrow">Our Process</div>
          <h2 className="brutalist-headline text-3xl md:text-5xl text-foreground">
            From Assessment to Backup Power
          </h2>
          <div className="w-24 h-1 bg-foreground mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 heavy-border bg-background">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`p-8 md:p-10 relative group hover:bg-muted transition-colors ${
                i < steps.length - 1 ? "border-b-2 md:border-b-0 md:border-r-2 border-foreground" : ""
              }`}
            >
              <div className="absolute top-4 right-4 font-headline font-black text-5xl md:text-6xl text-foreground/10 group-hover:text-foreground/30 transition-colors">
                {step.number}
              </div>
              <div className="text-foreground mb-6">{step.icon}</div>
              <h3 className="brutalist-headline text-xl md:text-2xl text-foreground mb-3">
                {step.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
