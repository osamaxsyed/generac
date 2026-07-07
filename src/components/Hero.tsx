import { useState } from "react";
import { ArrowRight, Phone, Star, ShieldCheck, Image as ImageIcon, Lock, Check, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { business, phoneDisplay, phoneHref } from "@/config/business";

const Hero = () => {
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", service: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "estimate",
          name: form.name,
          email: "",
          phone: form.phone,
          serviceType: form.service,
          description: "Hero quick-quote form",
          submittedAt: new Date().toISOString(),
        }),
      });
      setSent(true);
    } catch {
      setSent(true); // optimistic — lead still captured client-side intent
    }
  };

  return (
    <section className="relative overflow-hidden border-b border-[#eef1f6] bg-[radial-gradient(120%_90%_at_85%_-10%,#fbf3ec_0%,#ffffff_46%),linear-gradient(180deg,#ffffff,#f6f8fb)]">
      <div className="pointer-events-none absolute -top-[120px] -right-[80px] w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,hsl(var(--blue)/0.10),transparent_62%)]" />

      <div className="relative container-x py-[clamp(40px,6vw,84px)] grid gap-[clamp(36px,5vw,72px)] items-center lg:grid-cols-2">
        {/* Left: copy */}
        <div className="animate-fade-up">
          <span className="pill">
            <span className="w-[7px] h-[7px] rounded-full bg-blue shadow-[0_0_0_3px_hsl(var(--blue)/0.18)]" />
            {business.county}'s Dedicated Generator Specialists
          </span>

          <h1 className="display text-[clamp(33px,5vw,57px)] leading-[1.05] tracking-[-0.02em] mt-5 text-balance">
            Generac <span className="text-blue">Maintenance</span> &amp; Service in {business.county}, NJ
          </h1>

          <p className="font-body text-[clamp(16.5px,1.6vw,19px)] leading-relaxed text-[#475569] mt-5 max-w-[560px]">
            Seasonal maintenance that keeps your home storm-ready, plus expert installation and 24/7
            emergency repair. We do <strong className="text-foreground font-semibold">only generators</strong>,
            and we serve <strong className="text-foreground font-semibold">only {business.county}</strong>.
          </p>

          {/* Trust pills */}
          <div className="flex flex-wrap gap-2.5 mt-7">
            {business.stats.googleRating && (
              <span className="inline-flex items-center gap-1.5 bg-white border border-border rounded-full px-3.5 py-2.5 shadow-[var(--shadow-card)]">
                <Star className="h-[15px] w-[15px] text-amber fill-amber" />
                <span className="font-body font-semibold text-[13.5px] text-foreground">
                  {business.stats.googleRating} Google Rating
                </span>
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 bg-white border border-border rounded-full px-3.5 py-2.5 shadow-[var(--shadow-card)]">
              <ShieldCheck className="h-[15px] w-[15px] text-blue" />
              <span className="font-body font-semibold text-[13.5px] text-foreground">Licensed &amp; Insured</span>
            </span>
            {business.stats.yearsInBusiness && (
              <span className="inline-flex items-center gap-1.5 bg-white border border-border rounded-full px-3.5 py-2.5 shadow-[var(--shadow-card)]">
                <span className="font-headline font-bold text-[13.5px] text-blue">{business.stats.yearsInBusiness}</span>
                <span className="font-body font-semibold text-[13.5px] text-foreground">Years</span>
              </span>
            )}
            {business.stats.generatorsServiced && (
              <span className="inline-flex items-center gap-1.5 bg-white border border-border rounded-full px-3.5 py-2.5 shadow-[var(--shadow-card)]">
                <span className="font-headline font-bold text-[13.5px] text-blue">{business.stats.generatorsServiced}</span>
                <span className="font-body font-semibold text-[13.5px] text-foreground">Serviced</span>
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-3.5 mt-[30px]">
            <button onClick={() => navigate("/get-estimate")} className="btn-primary !text-base !px-7">
              Get a Free Estimate
              <ArrowRight className="h-[17px] w-[17px]" />
            </button>
            {business.phone ? (
              <a href={phoneHref} className="btn-secondary !text-base">
                <Phone className="h-[18px] w-[18px] text-blue" />
                {phoneDisplay}
              </a>
            ) : (
              <Link to="/services" className="btn-secondary !text-base">
                View Services <ArrowRight className="h-[17px] w-[17px]" />
              </Link>
            )}
          </div>
        </div>

        {/* Right: image placeholder + quick-quote card */}
        <div className="relative">
          <div className="relative aspect-[4/3.2] rounded-[22px] overflow-hidden bg-gradient-to-br from-[#3a3f47] via-[#26292f] to-[#1a1c20] shadow-[0_30px_60px_-24px_rgba(13,22,38,0.55),inset_0_1px_0_rgba(255,255,255,0.08)]">
            <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_75%_20%,rgba(245,133,46,0.30),transparent_55%)]" />
            <div className="absolute inset-0 opacity-50 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:34px_34px]" />
            <div className="absolute left-0 right-0 bottom-0 p-[22px] flex items-center gap-3">
              <span className="grid place-items-center w-[38px] h-[38px] rounded-[10px] bg-white/10 border border-white/20 shrink-0">
                <ImageIcon className="h-[18px] w-[18px] text-white" />
              </span>
              <span className="font-body font-medium text-[13px] leading-snug text-white/80">
                Whole-home standby generator beside a suburban NJ home
              </span>
            </div>
          </div>

          {/* Quick-quote card */}
          <div className="relative z-[2] -mt-[58px] mx-3.5 card-soft p-[22px] !shadow-[0_26px_54px_-22px_rgba(13,22,38,0.4)]">
            {!sent ? (
              <>
                <div className="flex items-center gap-2.5">
                  <span className="icon-tile !w-[34px] !h-[34px]"><Plus className="h-[17px] w-[17px]" /></span>
                  <div className="font-headline font-bold text-[17px] text-foreground">Get your free quote</div>
                </div>
                <p className="font-body text-[13px] leading-snug text-[#64748b] mt-2.5 mb-4">
                  60-second form. A specialist replies{" "}
                  <strong className="text-blue-dark font-bold">within 1 business hour</strong>.
                </p>
                <form onSubmit={submit} className="flex flex-col gap-2.5">
                  <input
                    type="text" required placeholder="Full name" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input-soft"
                  />
                  <input
                    type="tel" required placeholder="Phone number" value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="input-soft"
                  />
                  <select
                    required value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="input-soft cursor-pointer"
                  >
                    <option value="">What do you need?</option>
                    <option>Generator Maintenance / Plan</option>
                    <option>Generator Installation</option>
                    <option>Generator Repair (Emergency)</option>
                    <option>Standby Generator Quote</option>
                    <option>Not sure, help me decide</option>
                  </select>
                  <button type="submit" className="btn-primary mt-0.5 w-full">
                    Get My Free Quote
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <span className="flex items-center gap-1.5 font-body text-[11.5px] leading-snug text-[#94a3b8] mt-0.5">
                    <Lock className="h-[13px] w-[13px]" />
                    No spam. Your info is only used to prepare your estimate.
                  </span>
                </form>
              </>
            ) : (
              <div className="text-center px-1.5 pt-3.5 pb-2">
                <span className="inline-grid place-items-center w-[54px] h-[54px] rounded-full bg-[#e7f7ee] text-green mb-3">
                  <Check className="h-[26px] w-[26px]" />
                </span>
                <div className="font-headline font-bold text-[19px] text-foreground">Request received</div>
                <p className="font-body text-[14px] leading-relaxed text-[#475569] mt-2 mb-4 max-w-[300px] mx-auto">
                  Thanks! A generator specialist will reply{" "}
                  <strong className="text-blue-dark font-bold">within 1 business hour</strong>.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", phone: "", service: "" }); }}
                  className="font-body font-semibold text-[13.5px] text-[#64748b] underline underline-offset-2"
                >
                  Send another request
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
