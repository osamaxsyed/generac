import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { business, phoneDisplay, phoneHref } from "@/config/business";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Cost Guide", href: "/whole-house-generator-cost" },
    { name: "About", href: "/about" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background heavy-border-b" role="banner">
      <div className="w-full px-6 md:px-10 py-5 flex justify-between items-center">
        {/* Logo wordmark */}
        <Link
          to="/"
          className="font-headline font-black italic tracking-tighter text-xl md:text-2xl uppercase text-foreground"
        >
          {business.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-2" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="font-headline font-bold uppercase tracking-wider text-xs px-4 py-2 hover:bg-foreground hover:text-background transition-colors duration-75 active:translate-y-0.5"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          {business.phone && (
            <a
              href={phoneHref}
              className="hidden md:inline-flex items-center gap-2 font-headline font-bold uppercase tracking-wider text-xs px-4 py-2 border-2 border-foreground hover:bg-foreground hover:text-background transition-colors duration-75 active:translate-y-0.5"
            >
              <Phone className="h-3.5 w-3.5" />
              {phoneDisplay}
            </a>
          )}
          <button
            onClick={() => navigate("/get-estimate")}
            className="hidden md:inline-flex brutalist-cta px-6 py-3"
          >
            Get Estimate
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 border-2 border-foreground"
            aria-label="Toggle mobile menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {isMenuOpen && (
        <nav
          className="lg:hidden border-t-2 border-foreground bg-background"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="px-6 py-4 font-headline font-bold uppercase tracking-wider text-sm border-b border-border hover:bg-foreground hover:text-background transition-colors"
              >
                {link.name}
              </Link>
            ))}

            <div className="p-6 flex flex-col gap-3">
              <button
                onClick={() => {
                  navigate("/get-estimate");
                  setIsMenuOpen(false);
                }}
                className="brutalist-cta w-full"
              >
                Get Estimate
              </button>
              {business.phone && (
                <a
                  href={phoneHref}
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-2 font-headline font-bold uppercase tracking-wider text-sm px-6 py-3 border-2 border-foreground hover:bg-foreground hover:text-background transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {phoneDisplay}
                </a>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
