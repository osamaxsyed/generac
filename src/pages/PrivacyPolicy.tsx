import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { business, phoneDisplay } from "@/config/business";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Information We Collect",
      intro: "We collect information you provide directly to us, such as when you:",
      list: [
        "Request a quote or estimate",
        "Schedule an appointment",
        "Contact us via phone, email, or contact form",
        "Subscribe to our newsletter",
        "Leave a review or testimonial",
      ],
    },
    {
      title: "How We Use Your Information",
      intro: "We use the information we collect to:",
      list: [
        "Provide and improve our generator services",
        "Process and respond to your requests",
        "Schedule appointments and coordinate service delivery",
        "Send you important updates about your projects",
        "Communicate about our services and promotions",
        "Comply with legal obligations",
      ],
    },
    {
      title: "Information Sharing",
      intro: "We do not sell, trade, or otherwise transfer your personal information to third parties except:",
      list: [
        "With your explicit consent",
        "To service providers who assist us in operating our business",
        "When required by law or to protect our rights",
        "In connection with a business transfer or merger",
      ],
    },
    {
      title: "Data Security",
      body: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.",
    },
    {
      title: "Your Rights",
      intro: "You have the right to:",
      list: [
        "Access, update, or delete your personal information",
        "Opt out of marketing communications",
        "Request a copy of your data",
        "File a complaint with relevant authorities",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`Privacy Policy | ${business.name}`}
        description={`Read the privacy policy for ${business.name}. Learn how we collect, use, and protect your personal information.`}
        canonical="/privacy"
      />
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-foreground text-background heavy-border-b py-16 md:py-20">
          <div className="w-full max-w-5xl mx-auto px-6 md:px-10">
            <div className="brutalist-section-eyebrow text-background/70">Legal</div>
            <h1 className="brutalist-headline text-4xl md:text-6xl text-background mb-4 leading-[0.95]">
              Privacy Policy
            </h1>
            <p className="font-headline font-bold uppercase tracking-wider text-xs text-background/70">
              Last Updated: March 1, 2024
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-20 bg-background heavy-border-b">
          <div className="w-full max-w-3xl mx-auto px-6 md:px-10 space-y-10">
            {sections.map((s) => (
              <div key={s.title} className="heavy-border bg-background p-6 md:p-8">
                <h2 className="brutalist-headline text-xl md:text-2xl text-foreground mb-4 pb-3 border-b-2 border-foreground">
                  {s.title}
                </h2>
                {s.intro && (
                  <p className="font-body text-base text-muted-foreground mb-4 leading-relaxed">{s.intro}</p>
                )}
                {s.body && (
                  <p className="font-body text-base text-muted-foreground leading-relaxed">{s.body}</p>
                )}
                {s.list && (
                  <ul className="space-y-2">
                    {s.list.map((item) => (
                      <li
                        key={item}
                        className="font-body text-base text-muted-foreground border-l-4 border-foreground pl-3 py-1"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <div className="heavy-border bg-foreground text-background p-6 md:p-8">
              <h2 className="brutalist-headline text-xl md:text-2xl text-background mb-4">Contact Us</h2>
              <p className="font-body text-base text-background/85 mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul className="space-y-2 font-body text-base text-background/90">
                {business.email && (
                  <li><span className="font-headline font-bold uppercase tracking-wider text-xs text-background/70 mr-2">Email:</span> {business.email}</li>
                )}
                {business.phone && (
                  <li><span className="font-headline font-bold uppercase tracking-wider text-xs text-background/70 mr-2">Phone:</span> {phoneDisplay}</li>
                )}
                <li><span className="font-headline font-bold uppercase tracking-wider text-xs text-background/70 mr-2">Service Area:</span> {business.county}, {business.state}</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
