import Header from "@/components/Header";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { business } from "@/config/business";

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`Generator FAQ | ${business.name}`}
        description={`Common questions about standby generators in ${business.county}, NJ: permits, sizing, fuel type, maintenance, and whole-house backup power during ${business.utility} outages.`}
        canonical="/faq"
      />
      <Header />
      <main>
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;