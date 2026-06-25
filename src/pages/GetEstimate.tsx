import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import SEO from "@/components/SEO";
import { business } from "@/config/business";

const GetEstimate = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`Get a Free Estimate | ${business.name}`}
        description={`Request a free, no-obligation estimate for standby generator installation, maintenance, or repair in ${business.county}, NJ. We respond within 24 hours.`}
        canonical="/get-estimate"
      />
      <Header />
      <main>
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default GetEstimate;
