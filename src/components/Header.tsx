import { useState } from "react";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { business, phoneDisplay, phoneHref } from "@/config/business";
import logo from "@/assets/logo.jpeg";

const navLinks = [
  { name: "Services", href: "/services" },
  { name: "Service Areas", href: "/service-areas" },
  { name: "Cost Guide", href: "/whole-house-generator-cost" },
  { name: "About", href: "/about" },
  { name: "FAQ", href: "/faq" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header
      className="sticky top-0 z-[60] bg-slate-header/95 backdrop-blur-md border-b border-white/10"
      role="banner"
    >
      <div className="container-x h-[74px] flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0" aria-label={`${business.name} home`}>
          <span className="grid place-items-center bg-white rounded-xl p-1.5 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.4)]">
            <img src={logo} alt={`${business.name} logo`} className="h-9 md:h-11 w-auto" width={1024} height={730} />
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
          <div className="flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="font-body font-medium text-[14.5px] text-[#d9dde3] px-3 py-2.5 rounded-lg hover:bg-white/[0.07] hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 pl-2">
            {business.phone && (
              <a href={phoneHref} className="flex items-center gap-2.5 group">
                <span className="grid place-items-center w-9 h-9 rounded-lg bg-white/[0.08] border border-white/15">
                  <Phone className="h-4 w-4 text-blue-accent" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="font-body font-semibold text-[9.5px] tracking-[0.14em] uppercase text-blue-accent">
                    24/7 Service
                  </span>
                  <span className="font-headline font-semibold text-[15px] text-white">{phoneDisplay}</span>
                </span>
              </a>
            )}
            <button
              onClick={() => navigate("/get-estimate")}
              className="inline-flex items-center gap-2 font-body font-semibold text-[14.5px] text-white px-5 py-2.5 rounded-xl bg-green hover:brightness-110 transition-all"
            >
              Free Estimate
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden grid place-items-center w-10 h-10 rounded-lg bg-white/[0.08] border border-white/15 text-white"
          aria-label="Toggle mobile menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {isMenuOpen && (
        <nav className="lg:hidden border-t border-white/10 bg-slate-header" aria-label="Mobile navigation">
          <div className="container-x py-2 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="py-3.5 font-body font-medium text-[15px] text-[#d9dde3] border-b border-white/[0.06] hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="py-4 flex flex-col gap-3">
              <button
                onClick={() => {
                  navigate("/get-estimate");
                  setIsMenuOpen(false);
                }}
                className="inline-flex items-center justify-center gap-2 font-body font-semibold text-[15px] text-white px-6 py-3.5 rounded-xl bg-green"
              >
                Get a Free Estimate
                <ArrowRight className="h-4 w-4" />
              </button>
              {business.phone && (
                <a
                  href={phoneHref}
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-2 font-body font-semibold text-[15px] px-6 py-3 rounded-xl bg-white/[0.08] border border-white/15 text-white"
                >
                  <Phone className="h-4 w-4 text-blue-accent" />
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
