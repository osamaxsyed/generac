import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Send, Phone, Mail } from "lucide-react";
import { business, phoneDisplay, phoneHref } from "@/config/business";

const ContactForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", service: "", location: "", description: "", timeline: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "estimate",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          serviceType: formData.service,
          address: formData.location,
          description: formData.description,
          preferredDate: formData.timeline,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        toast({ title: "Estimate Request Sent", description: "We'll contact you within 24 hours." });
        setFormData({ name: "", email: "", phone: "", service: "", location: "", description: "", timeline: "" });
      } else {
        throw new Error("Failed to submit");
      }
    } catch {
      toast({
        title: "Submission Error",
        description: "There was a problem. Please try calling us directly.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (name: string, value: string) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  return (
    <section id="contact" className="section bg-muted scroll-mt-[84px] border-t border-border">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="eyebrow">Free Estimate</div>
          <h2 className="display text-3xl md:text-[42px] leading-tight">
            Tell us about your home
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground mt-4">
            The more details you share, the more accurate your generator estimate. A specialist responds
            within 1 business hour.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-5">
            {(business.phone || business.email) && (
              <div className="card-soft p-6">
                <div className="eyebrow !mb-3">Direct Contact</div>
                {business.phone && (
                  <a href={phoneHref} className="flex items-center gap-3 font-headline font-semibold text-foreground hover:text-blue transition-colors mb-3">
                    <span className="icon-tile !w-9 !h-9"><Phone className="h-[18px] w-[18px]" /></span>
                    {phoneDisplay}
                  </a>
                )}
                {business.email && (
                  <a href={`mailto:${business.email}`} className="flex items-center gap-3 font-body text-sm text-muted-foreground hover:text-blue transition-colors break-all">
                    <span className="icon-tile !w-9 !h-9"><Mail className="h-[18px] w-[18px]" /></span>
                    {business.email}
                  </a>
                )}
              </div>
            )}

            <div className="card-soft p-6">
              <div className="eyebrow !mb-3">Why homeowners call us</div>
              <ul className="space-y-2.5 font-body text-sm text-muted-foreground">
                <li className="flex gap-2.5"><span className="text-blue mt-0.5">✓</span> Generators are all we do</li>
                <li className="flex gap-2.5"><span className="text-blue mt-0.5">✓</span> Local to {business.county}</li>
                <li className="flex gap-2.5"><span className="text-blue mt-0.5">✓</span> Licensed &amp; insured, NJ code</li>
                <li className="flex gap-2.5"><span className="text-blue mt-0.5">✓</span> Honest, no-obligation estimates</li>
              </ul>
            </div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-2 card-soft p-6 md:p-10">
            <h3 className="font-headline font-bold text-2xl text-foreground mb-6">Request your free estimate</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-body font-semibold text-sm text-foreground">Full Name *</Label>
                  <Input id="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} required className="input-soft" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-body font-semibold text-sm text-foreground">Phone *</Label>
                  <Input id="phone" type="tel" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} required className="input-soft" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="font-body font-semibold text-sm text-foreground">Email *</Label>
                <Input id="email" type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} required className="input-soft" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-body font-semibold text-sm text-foreground">What Do You Need?</Label>
                  <Select value={formData.service} onValueChange={(v) => handleChange("service", v)}>
                    <SelectTrigger className="input-soft"><SelectValue placeholder="Select a service" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="installation">New Generator Installation</SelectItem>
                      <SelectItem value="maintenance">Maintenance / Service Plan</SelectItem>
                      <SelectItem value="repair">Repair / Won't Start</SelectItem>
                      <SelectItem value="inspection">Inspection / Load Test</SelectItem>
                      <SelectItem value="battery">Battery or Oil Change</SelectItem>
                      <SelectItem value="electrical">Transfer Switch / Electrical</SelectItem>
                      <SelectItem value="other">Other / Not Sure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="font-body font-semibold text-sm text-foreground">Town</Label>
                  <Input id="location" placeholder={`Your town in ${business.county}`} value={formData.location} onChange={(e) => handleChange("location", e.target.value)} className="input-soft" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-body font-semibold text-sm text-foreground">Preferred Timeline</Label>
                <Select value={formData.timeline} onValueChange={(v) => handleChange("timeline", v)}>
                  <SelectTrigger className="input-soft"><SelectValue placeholder="When would you like to start?" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asap">ASAP</SelectItem>
                    <SelectItem value="week">Within a week</SelectItem>
                    <SelectItem value="month">Within a month</SelectItem>
                    <SelectItem value="quarter">Next 3 months</SelectItem>
                    <SelectItem value="flexible">I'm flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="font-body font-semibold text-sm text-foreground">Tell Us More *</Label>
                <Textarea
                  id="description"
                  placeholder="Home size, fuel type (natural gas or propane), whether you have an existing generator, and any issues you're seeing."
                  className="input-soft min-h-[120px]"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                <Send className="h-4 w-4" />
                Send Estimate Request
              </button>

              <p className="font-body text-xs text-muted-foreground text-center">
                No spam. Your info is only used to prepare your estimate.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
