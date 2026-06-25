import Header from "@/components/Header";
import About from "@/components/About";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { business } from "@/config/business";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`About | ${business.name}`}
        description={`${business.name} installs and services standby and whole-house generators across ${business.county}, NJ. Licensed, insured, and local — protecting homes from ${business.utility} outages.`}
        canonical="/about"
      />
      <Header />
      <main>
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;