import { Helmet } from "react-helmet";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { business } from "@/config/business";

const FAQ = () => {
  const faqs = [
    {
      question: "Do I need a permit for a standby generator in Monmouth County?",
      answer:
        `Yes. Standby generator installations in ${business.county}, NJ require an electrical permit and, where a gas line is involved, a plumbing/mechanical permit through your municipality, followed by an inspection. We coordinate the permits and schedule the inspections as part of the installation.`,
    },
    {
      question: "Should I run my generator on natural gas or propane?",
      answer:
        "If your home already has natural gas service, that's usually the simplest, lowest-maintenance fuel because it never needs refilling. Homes without gas service typically run on a propane tank. We assess what's available at your property and recommend the right fuel setup.",
    },
    {
      question: "How big a generator do I need?",
      answer:
        "It depends on your home's square footage, whether you want to power essential circuits or the whole house, and large loads like central air, well pumps, and electric ranges. We perform an on-site load calculation rather than guessing, so the unit is sized to your actual usage.",
    },
    {
      question: "Will a standby generator run my whole house?",
      answer:
        "It can, depending on the size of the unit and your home's electrical demand. Some homeowners choose a whole-house system that powers everything; others select an essential-circuit setup covering heat, refrigeration, well pump, and key outlets at a lower cost. We size it to your priorities during the on-site survey.",
    },
    {
      question: "How often does a standby generator need service?",
      answer:
        "Most standby generators should be serviced at least once a year, with an oil change due annually or after a set number of run hours, whichever comes first. Homes with frequent or long outages may need service more often. Regular maintenance is the best way to make sure the unit starts during an outage.",
    },
    {
      question: `What areas do you serve?`,
      answer:
        `We install and service standby generators across ${business.county}, NJ, including Middletown, Holmdel, Colts Neck, Rumson, Marlboro, Manalapan, Wall, Howell, Freehold, Red Bank, and Tinton Falls. If you don't see your town, get in touch. We may still be able to help.`,
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-foreground text-background heavy-border-b py-20 md:py-28">
        <div className="w-full max-w-6xl mx-auto px-6 md:px-10">
          <div className="brutalist-section-eyebrow text-background/70">FAQ</div>
          <h1 className="brutalist-headline text-4xl md:text-7xl text-background mb-6 leading-[0.95]">
            Generator Questions.
            <br />
            <span className="text-background/70">Honest Answers.</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-background/85 max-w-2xl border-l-4 border-background pl-5">
            What homeowners ask us most about standby generators, answered up front.
            If your question isn't here, just reach out.
          </p>
        </div>
      </section>

      {/* FAQ list */}
      <section className="py-20 bg-background heavy-border-b">
        <div className="w-full max-w-3xl mx-auto px-6 md:px-10">
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="heavy-border bg-background group">
                <summary className="cursor-pointer p-5 font-headline font-bold uppercase tracking-wider text-sm text-foreground flex justify-between items-center gap-4">
                  <span>{f.question}</span>
                  <span className="font-headline font-black text-2xl text-foreground/40 group-open:rotate-45 transition-transform flex-shrink-0">+</span>
                </summary>
                <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed px-5 pb-5 border-t border-border pt-4">
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-20 bg-foreground text-background">
        <div className="w-full max-w-3xl mx-auto px-6 md:px-10 text-center">
          <h2 className="brutalist-headline text-3xl md:text-5xl text-background mb-4">Still Have Questions?</h2>
          <p className="font-body text-lg text-background/80 mb-10">
            Can't find what you're looking for? Request a free estimate and we'll walk you
            through the options for your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/get-estimate"
              className="inline-flex items-center justify-center gap-2 font-headline font-black uppercase tracking-wider text-sm px-8 py-4 bg-background text-foreground border-b-4 border-background/40 hover:bg-background/90 active:translate-y-0.5 active:border-b-0 transition-all rounded-none"
            >
              Get a Free Estimate
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
