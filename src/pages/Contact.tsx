import { Building2, Clock, Globe2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AnimatedSection from "@/components/AnimatedSection";
import { usePageSeo } from "@/hooks/use-page-seo";
import { trackLeadEvent } from "@/lib/analytics";

const Contact = () => {
  usePageSeo({
    title: "Contact Hung Ta Instrument | Hydraulic, Compression & Tensile Testing Machines",
    description:
      "Contact Hung Ta Instrument Enterprise for hydraulic testing machine, compression machine, electrical tensile testing machine, calibration, software and support.",
  });

  return (
    <main className="pt-20">
      <section className="bg-primary py-24 industrial-grid">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <p className="text-accent text-xs font-bold uppercase tracking-[0.28em] mb-4">Quotation & support</p>
            <h1 className="font-serif text-5xl md:text-6xl text-primary-foreground mb-4">Contact Hung Ta</h1>
            <p className="text-primary-foreground/70 max-w-xl text-lg">
              Request a quotation for hydraulic testing machines, compression machines, electrical tensile testing machines, calibration, software or service support.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-[0.8fr_1fr] gap-10">
          <AnimatedSection>
            <div className="space-y-5">
              <div className="bg-card border border-border rounded-lg p-5 flex gap-4">
                <MapPin className="w-6 h-6 text-accent shrink-0" />
                <div>
                  <h2 className="font-bold mb-1">Seremban Office</h2>
                  <p className="text-sm text-muted-foreground">
                    109, Taman AST, Jalan Sungai Ujong,<br />
                    70200 Seremban, Negeri Sembilan, Malaysia
                  </p>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-5 flex gap-4">
                <Building2 className="w-6 h-6 text-accent shrink-0" />
                <div>
                  <h2 className="font-bold mb-1">Company</h2>
                  <p className="text-sm text-muted-foreground">Hung Ta Instrument Enterprise</p>
                  <p className="text-sm text-muted-foreground">Testing machine supply, service and calibration support</p>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-5 flex gap-4">
                <Phone className="w-6 h-6 text-accent shrink-0" />
                <div>
                  <h2 className="font-bold mb-1">Phone</h2>
                  <div className="space-y-1">
                    <a className="block text-sm text-muted-foreground hover:text-accent" href="tel:+60126280096" onClick={() => trackLeadEvent("phone_click", { phone: "012-6280096", location: "contact_page" })}>012-628 0096 Sales Manager</a>
                    <a className="block text-sm text-muted-foreground hover:text-accent" href="tel:+60122201096" onClick={() => trackLeadEvent("phone_click", { phone: "012-2201096", location: "contact_page" })}>012-220 1096 Product Specialist</a>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-5 flex gap-4">
                <MessageCircle className="w-6 h-6 text-accent shrink-0" />
                <div>
                  <h2 className="font-bold mb-1">WhatsApp</h2>
                  <a className="text-sm text-muted-foreground hover:text-accent" href="https://wa.me/60126280096" onClick={() => trackLeadEvent("whatsapp_click", { location: "contact_page" })}>012-628 0096 Sales Manager</a>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-5 flex gap-4">
                <Mail className="w-6 h-6 text-accent shrink-0" />
                <div>
                  <h2 className="font-bold mb-1">Email</h2>
                  <a className="text-sm text-muted-foreground hover:text-accent" href="mailto:hungtatest@yahoo.com" onClick={() => trackLeadEvent("email_click", { location: "contact_page" })}>hungtatest@yahoo.com</a>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-5 flex gap-4">
                <Clock className="w-6 h-6 text-accent shrink-0" />
                <div>
                  <h2 className="font-bold mb-1">Business Hours</h2>
                  <p className="text-sm text-muted-foreground">Monday to Friday, 8:30 AM - 6:00 PM</p>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-5 flex gap-4">
                <Globe2 className="w-6 h-6 text-accent shrink-0" />
                <div>
                  <h2 className="font-bold mb-1">Service Area</h2>
                  <p className="text-sm text-muted-foreground">Malaysia, Singapore and Asia</p>
                  <p className="text-sm text-muted-foreground mt-1">Main industries: metal, rubber and copper.</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.12}>
            <form
              className="bg-card border border-border rounded-lg p-6 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                const form = new FormData(event.currentTarget);
                const body = [
                  `Name: ${form.get("name")}`,
                  `Company: ${form.get("company")}`,
                  `Email: ${form.get("email")}`,
                  `Phone: ${form.get("phone")}`,
                  "",
                  `Testing requirement:`,
                  form.get("message"),
                ].join("\n");
                trackLeadEvent("contact_email_prepare", { location: "contact_page" });
                window.location.href = `mailto:hungtatest@yahoo.com?subject=${encodeURIComponent("Hung Ta website enquiry")}&body=${encodeURIComponent(body)}`;
              }}
            >
              <h2 className="text-2xl font-black">Send Testing Requirement</h2>
              <p className="text-sm text-muted-foreground">
                Include material, capacity, test standard and machine type. Key enquiries include hydraulic testing machines, compression machines and electrical tensile testing machines.
              </p>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" name="company" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone / WhatsApp</Label>
                  <Input id="phone" name="phone" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Requirement</Label>
                <Textarea id="message" name="message" rows={5} required />
              </div>
              <Button type="submit" className="w-full rounded-full bg-accent text-white hover:bg-orange-light font-semibold">
                Prepare Enquiry Email
              </Button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
};

export default Contact;
