import { AlertTriangle, Phone, ArrowRight, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { business, phoneDisplay, phoneHref } from "@/config/business";

const issues = [
  "Generator won't start",
  "Flashing or error codes on the controller",
  "Transfer switch won't transfer to generator",
  "Storm or power-surge damage",
];

const EmergencyBanner = () => {
  const navigate = useNavigate();

  return (
    <section id="emergency" className="relative overflow-hidden bg-slate-hero scroll-mt-[84px]">
      <div className="absolute inset-0 bg-[linear-gradient(115deg,#1a1c20,#26292f_46%,#1a1c20)]" />
      <div className="absolute inset-0 bg-[radial-gradient(90%_80%_at_78%_12%,rgba(245,158,11,0.16),transparent_55%)]" />
      <div className="absolute inset-0 opacity-40 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:38px_38px]" />

      <div className="relative container-x section grid gap-[clamp(28px,4vw,56px)] items-center lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 font-body font-semibold text-[12.5px] text-amber bg-amber/10 border border-amber/25">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-amber opacity-60 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber" />
            </span>
            24/7 Emergency Repair
          </span>
          <h2 className="display text-[clamp(28px,3.6vw,46px)] leading-[1.08] text-white mt-5">
            Generator down? We respond fast.
          </h2>
          <p className="font-body text-[clamp(15.5px,1.5vw,18px)] leading-relaxed text-[#c4c8d0] mt-4 max-w-[540px]">
            When the power's out and your backup won't cooperate, every minute counts. Our specialists
            are on call around the clock for the issues that leave {business.county} homes in the dark.
          </p>

          <div className="flex flex-wrap gap-4 mt-7">
            {business.phone ? (
              <a href={phoneHref} className="inline-flex items-center gap-2.5 font-body font-semibold text-[15.5px] text-slate-hero bg-amber px-7 py-4 rounded-xl hover:brightness-105 transition-all">
                <Phone className="h-[18px] w-[18px]" />
                {phoneDisplay}
              </a>
            ) : (
              <button onClick={() => navigate("/get-estimate")} className="inline-flex items-center gap-2.5 font-body font-semibold text-[15.5px] text-slate-hero bg-amber px-7 py-4 rounded-xl hover:brightness-105 transition-all">
                Request Emergency Service
                <ArrowRight className="h-[18px] w-[18px]" />
              </button>
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-7 backdrop-blur-sm">
          <div className="flex items-center gap-2.5 mb-5">
            <span className="grid place-items-center w-10 h-10 rounded-xl bg-amber/15 border border-amber/25">
              <AlertTriangle className="h-5 w-5 text-amber" />
            </span>
            <span className="font-headline font-semibold text-[17px] text-white">Call us right away if you see:</span>
          </div>
          <ul className="flex flex-col gap-3.5">
            {issues.map((issue) => (
              <li key={issue} className="flex items-start gap-3 font-body text-[15.5px] leading-snug text-[#e2e8f0]">
                <Zap className="h-[18px] w-[18px] text-amber shrink-0 mt-0.5 fill-amber" />
                {issue}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default EmergencyBanner;
