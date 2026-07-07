import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Phone, ArrowRight, CheckCircle2 } from "lucide-react";
import { business, SITE_URL, phoneDisplay, phoneHref } from "@/config/business";

const costFactors = [
  {
    title: "Home size and electrical load",
    body: "The single biggest driver of cost is how much power you need. A larger home with central air, a well pump, electric range, and other heavy loads requires a higher-capacity generator than a smaller home covering just the essentials. We perform an on-site load calculation rather than estimating from square footage alone.",
  },
  {
    title: "Whole-house vs essential-circuit coverage",
    body: "Powering your entire home costs more than backing up a select group of essential circuits (heat, refrigeration, the well pump, and key outlets). Many homeowners choose essential-circuit coverage to keep costs down while still staying comfortable through an outage.",
  },
  {
    title: "Fuel type: natural gas vs propane",
    body: "If your home already has natural gas service, that is usually the simplest hookup. Homes without gas typically run on a propane tank, which may add the cost of the tank and its connection. The right choice depends on what is available at your property.",
  },
  {
    title: "Transfer switch",
    body: "Every permanently installed standby generator needs a transfer switch to safely move your home between utility and generator power. An automatic transfer switch handles this on its own; a whole-house switch sized for your full panel differs from a smaller essential-circuit switch.",
  },
  {
    title: "Electrical panel and wiring",
    body: "Older or fully loaded electrical panels sometimes need an upgrade to safely add a generator circuit. Existing wiring may also need code-compliant modifications. We only recommend a panel upgrade when it is genuinely required for a safe installation.",
  },
  {
    title: "Permits and inspection",
    body: "Standby generator installations in New Jersey require electrical and, where a gas line is involved, plumbing or mechanical permits through your municipality, plus an inspection. Permit and inspection fees vary by town and are part of a proper, code-compliant install.",
  },
  {
    title: "Installation labor and site work",
    body: "Labor covers the pad, generator placement, fuel line, electrical tie-in, and commissioning. Site conditions (how far the unit sits from the panel and gas meter, and the type of pad) all influence the work involved.",
  },
];

const faqs = [
  {
    question: "What determines whole house generator cost?",
    answer: "Whole house generator cost depends on several factors working together: the size of the generator your home's electrical load requires, whether you cover the whole house or just essential circuits, your fuel type, the transfer switch, any electrical panel upgrades, permits and inspection, and the installation labor for your specific site. Because every home is different, the most reliable way to understand your cost is a free on-site assessment.",
  },
  {
    question: "Is a whole-house or essential-circuit generator cheaper?",
    answer: "An essential-circuit setup is generally less expensive because it uses a smaller generator and transfer switch to back up only critical loads (heat, refrigeration, the well pump, and key outlets) rather than your entire panel. A whole-house system costs more but powers everything. We help you weigh comfort against budget during the assessment so you choose the right level of coverage.",
  },
  {
    question: "Does fuel type affect cost?",
    answer: "It can. If your home already has natural gas service, that is usually the simplest and lowest-maintenance fuel because it never needs refilling. Homes without gas service typically run on propane, which may add the cost of a tank and its connection. We assess what is available at your property and recommend the most practical fuel setup.",
  },
  {
    question: "Do I need a permit to install a generator in Monmouth County?",
    answer: "Yes. Standby generator installations in New Jersey require electrical permits and, where a gas line is involved, plumbing or mechanical permits through your local municipality, along with an inspection. We coordinate the permit process and schedule the required inspections as part of the installation.",
  },
];

const WholeHouseGeneratorCost = () => {
  const navigate = useNavigate();
  const hasPhone = Boolean(business.phone);
  const canonical = `${SITE_URL}/whole-house-generator-cost`;

  const pageTitle = `Whole House Generator Cost in NJ: What to Expect | ${business.name}`;
  const pageDescription =
    "What goes into whole house generator cost in New Jersey? Understand the factors (home size, fuel type, transfer switch, panel, and permits) and get a free on-site quote.";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Whole House Generator Cost", item: canonical },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonical} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Header />

      <main>
        {/* Breadcrumb */}
        <div className="bg-background border-b-2 border-border">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-10 py-3">
            <nav className="flex items-center gap-2 font-headline font-bold uppercase tracking-wider text-xs text-muted-foreground flex-wrap">
              <Link to="/" className="hover:text-foreground">Home</Link>
              <span>/</span>
              <span className="text-foreground">Whole House Generator Cost</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-foreground text-background heavy-border-b py-20 md:py-28">
          <div className="w-full max-w-6xl mx-auto px-6 md:px-10">
            <div className="brutalist-section-eyebrow text-background/70">Cost Guide</div>
            <h1 className="brutalist-headline text-4xl md:text-7xl text-background mb-6 leading-[0.95]">
              Whole House Generator Cost
              <br />
              <span className="text-background/70">in New Jersey.</span>
            </h1>
            <p className="font-body text-lg md:text-xl text-background/85 max-w-2xl mb-10 border-l-4 border-background pl-5">
              There is no single sticker price for a whole-house generator. What you pay depends on your home, your power needs, and your site. Here is what actually drives the cost, so you can plan with realistic expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/get-estimate")}
                className="brutalist-cta bg-background text-foreground border-background/30"
              >
                Get a Free On-Site Quote <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href={hasPhone ? phoneHref : "/get-estimate"}
                className="inline-flex items-center justify-center gap-2 font-headline font-black uppercase tracking-wider text-sm px-8 py-4 bg-transparent text-background border-2 border-background hover:bg-background hover:text-foreground transition-all rounded-none"
              >
                <Phone className="h-4 w-4" />
                {hasPhone ? phoneDisplay : "Get a Quote"}
              </a>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-20 bg-background heavy-border-b">
          <div className="w-full max-w-4xl mx-auto px-6 md:px-10">
            <div className="brutalist-section-eyebrow">Why It Varies</div>
            <h2 className="brutalist-headline text-2xl md:text-4xl text-foreground mb-6">
              Cost Is a Range, Not a Number
            </h2>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-5">
              A standby generator is an installed electrical and fuel system, not an appliance you buy off a shelf. The final price reflects the size of the unit your home needs, how much of the house you want to back up, your fuel source, the electrical work required, and the permitting and labor for your specific property. Two homes on the same street can land at very different numbers.
            </p>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">
              In {business.county}, reliable backup power matters because {business.utility} customers can face extended outages during nor'easters, summer storms, and winter ice events. Investing in the right system, sized correctly and installed to code, is what keeps your heat, well pump, and refrigeration running when the grid goes down. Below are the factors that determine where your project falls in the range.
            </p>
          </div>
        </section>

        {/* Cost factors */}
        <section className="py-20 bg-muted heavy-border-b">
          <div className="w-full max-w-5xl mx-auto px-6 md:px-10">
            <div className="brutalist-section-eyebrow">What Drives The Cost</div>
            <h2 className="brutalist-headline text-2xl md:text-4xl text-foreground mb-10">
              The Factors That Matter
            </h2>
            <div className="space-y-4">
              {costFactors.map((factor) => (
                <div key={factor.title} className="bento-card bg-background p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-foreground flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="brutalist-headline text-lg md:text-xl text-foreground mb-2">{factor.title}</h3>
                      <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">{factor.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Whole-house vs essential tradeoff */}
        <section className="py-20 bg-background heavy-border-b">
          <div className="w-full max-w-4xl mx-auto px-6 md:px-10">
            <div className="brutalist-section-eyebrow">The Key Decision</div>
            <h2 className="brutalist-headline text-2xl md:text-4xl text-foreground mb-6">
              Whole-House vs Essential-Circuit
            </h2>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-5">
              The biggest lever on cost is how much of your home you choose to back up. A <strong className="text-foreground">whole-house system</strong> powers everything automatically, so an outage is barely noticeable, but it requires a larger generator and a transfer switch sized for your full electrical panel.
            </p>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">
              An <strong className="text-foreground">essential-circuit system</strong> backs up only the loads that matter most (heating, refrigeration, the well pump, and key outlets and lighting) using a smaller, lower-cost generator. For many {business.county} homeowners, essential-circuit coverage delivers the comfort and safety they need at a more accessible price. The right choice comes down to your priorities and budget, which is exactly what an on-site assessment is for.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-muted heavy-border-b">
          <div className="w-full max-w-3xl mx-auto px-6 md:px-10">
            <div className="brutalist-section-eyebrow">FAQ</div>
            <h2 className="brutalist-headline text-2xl md:text-4xl text-foreground mb-8">
              Whole House Generator Cost: FAQ
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details key={i} className="heavy-border bg-background group">
                  <summary className="cursor-pointer p-5 font-headline font-bold uppercase tracking-wider text-sm text-foreground flex justify-between items-center gap-4">
                    <span>{faq.question}</span>
                    <span className="font-headline font-black text-2xl text-foreground/40 group-open:rotate-45 transition-transform flex-shrink-0">+</span>
                  </summary>
                  <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed px-5 pb-5 border-t border-border pt-4">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-foreground text-background">
          <div className="w-full max-w-4xl mx-auto px-6 md:px-10 text-center">
            <h2 className="brutalist-headline text-3xl md:text-5xl text-background mb-4">
              Get a Real Number for Your Home
            </h2>
            <p className="font-body text-lg text-background/80 mb-10 max-w-2xl mx-auto">
              The only way to know your whole-house generator cost is a free on-site assessment. We'll size the system, review your fuel and panel, and give you a clear, no-obligation quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/get-estimate")}
                className="brutalist-cta bg-background text-foreground border-background/30"
              >
                Request Free Quote <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href={hasPhone ? phoneHref : "/get-estimate"}
                className="inline-flex items-center justify-center gap-2 font-headline font-black uppercase tracking-wider text-sm px-8 py-4 bg-transparent text-background border-2 border-background hover:bg-background hover:text-foreground transition-all rounded-none"
              >
                <Phone className="h-4 w-4" />
                {hasPhone ? phoneDisplay : "Get a Quote"}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WholeHouseGeneratorCost;
