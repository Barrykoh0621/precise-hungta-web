import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { products } from "@/data/products";
import { toast } from "sonner";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll respond within 24 hours.");
  };

  return (
    <main className="pt-16">
      <section className="bg-navy-gradient py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-black text-primary-foreground mb-4">Contact Us</h1>
            <p className="text-primary-foreground/70 max-w-xl text-lg">Get in touch with our team for enquiries, quotations, or technical support.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-12">
            {/* Form */}
            <div className="md:col-span-3">
              <AnimatedSection>
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="c-name">Name *</Label>
                      <Input id="c-name" required placeholder="Your name" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="c-company">Company *</Label>
                      <Input id="c-company" required placeholder="Company name" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="c-email">Email *</Label>
                      <Input id="c-email" type="email" required placeholder="email@company.com" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="c-phone">Phone</Label>
                      <Input id="c-phone" placeholder="+60 12-345 6789" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Product of Interest</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a product (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((p) => (
                          <SelectItem key={p.id} value={p.id}>{p.model} — {p.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="c-message">Message *</Label>
                    <Textarea id="c-message" required rows={5} placeholder="Tell us about your requirements, testing standards you need to meet, or any questions you have..." />
                  </div>
                  <Button type="submit" className="bg-accent text-accent-foreground hover:bg-orange-light font-semibold w-full md:w-auto px-8">
                    Send Message
                  </Button>
                </form>
              </AnimatedSection>
            </div>

            {/* Info */}
            <div className="md:col-span-2">
              <AnimatedSection delay={0.1}>
                <div className="space-y-8">
                  <div>
                    <h3 className="font-bold text-lg mb-4">Contact Information</h3>
                    <ul className="space-y-4 text-sm">
                      <li className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span>109 Taman AST,<br />Jalan Sungai Ujong,<br />Seremban, Negeri Sembilan,<br />Malaysia</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-accent shrink-0" />
                        <a href="tel:+60376360031" className="hover:text-accent transition-colors">+603-7636 0031</a>
                      </li>
                      <li className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-accent shrink-0" />
                        <div>
                          <p className="text-xs text-accent font-medium">Marketing Manager</p>
                          <a href="tel:+60126280096" className="hover:text-accent transition-colors">012-628 0096</a>
                        </div>
                      </li>
                      <li className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-accent shrink-0" />
                        <a href="mailto:hungtatest@yahoo.com" className="hover:text-accent transition-colors">hungtatest@yahoo.com</a>
                      </li>
                      <li className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <div>
                          <p>Mon – Fri: 9:00 AM – 6:00 PM</p>
                          <p>Sat: 9:00 AM – 1:00 PM</p>
                          <p>Sun & Public Holidays: Closed</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <a
                      href="https://wa.me/60122201096"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="w-full bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-primary-foreground font-semibold">
                        Chat on WhatsApp
                      </Button>
                    </a>
                  </div>

                  {/* Map */}
                  <div className="rounded-lg overflow-hidden border border-border">
                    <iframe
                      title="Hung Ta (M) Instrument Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.5!2d101.9387!3d2.7258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cdcb3e3f4b1b1d%3A0x0!2s109+Taman+AST+Seremban!5e0!3m2!1sen!2smy!4v1!5m2!1sen!2smy"
                      width="100%"
                      height="250"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
