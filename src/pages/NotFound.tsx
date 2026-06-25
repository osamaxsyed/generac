import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { business } from "@/config/business";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Page Not Found | {business.name}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Header />
      <main className="flex-1 flex items-center justify-center bg-foreground text-background">
        <div className="w-full max-w-3xl mx-auto px-6 md:px-10 py-20 text-center">
          <div className="brutalist-section-eyebrow text-background/70">Error</div>
          <h1 className="brutalist-headline text-7xl md:text-9xl text-background mb-6">404</h1>
          <p className="brutalist-headline text-2xl md:text-4xl text-background/80 mb-8">Page Not Found</p>
          <p className="font-body text-base md:text-lg text-background/70 mb-10">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 font-headline font-black uppercase tracking-wider text-sm px-8 py-4 bg-background text-foreground border-b-4 border-background/40 hover:bg-background/90 active:translate-y-0.5 active:border-b-0 transition-all rounded-none"
          >
            Return Home <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
