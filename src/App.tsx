import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import ServicesIndex from "./pages/ServicesIndex";
import ServicePage from "./pages/ServicePage";
import WholeHouseGeneratorCost from "./pages/WholeHouseGeneratorCost";
import GetEstimate from "./pages/GetEstimate";
import AboutPage from "./pages/AboutPage";
import FAQPage from "./pages/FAQPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Sitemap from "./pages/Sitemap";
import NotFound from "./pages/NotFound";
import ServiceAreasPage from "./pages/ServiceAreasPage";
import LocationPage from "./pages/LocationPage";
import ServiceLocationPage from "./pages/ServiceLocationPage";

const queryClient = new QueryClient();

// Providers and routes are exported separately so the server entry
// (src/entry-server.tsx) can wrap AppRoutes in a StaticRouter while the
// client keeps BrowserRouter. Business/Organization/WebSite JSON-LD is
// injected statically by scripts/prerender.js, not at runtime.
export const AppProviders = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {children}
    </TooltipProvider>
  </QueryClientProvider>
);

export const AppRoutes = () => (
  <>
    <ScrollToTop />
    <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<ServicesIndex />} />
          <Route path="/services/:service" element={<ServicePage />} />
          <Route path="/whole-house-generator-cost" element={<WholeHouseGeneratorCost />} />
          <Route path="/get-estimate" element={<GetEstimate />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/sitemap" element={<Sitemap />} />

          {/* Programmatic SEO Routes */}
          <Route path="/service-areas" element={<ServiceAreasPage />} />
          <Route path="/service-areas/:location" element={<LocationPage />} />
          <Route path="/:service/:location" element={<ServiceLocationPage />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
  </>
);

const App = () => (
  <AppProviders>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AppProviders>
);

export default App;
