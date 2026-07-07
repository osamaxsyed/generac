import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import HowItWorks from "@/components/HowItWorks";
import ServiceAreas from "@/components/ServiceAreas";
import EmergencyBanner from "@/components/EmergencyBanner";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { business } from "@/config/business";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${business.name} | Standby Generators in Monmouth County NJ`}
        description={business.description}
        canonical="/"
        keywords="standby generator installation Monmouth County NJ, whole house generator, Generac installer NJ, generator maintenance, generator repair, JCP&L outage backup power"
      />
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <HowItWorks />
        <ServiceAreas />
        <EmergencyBanner />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
