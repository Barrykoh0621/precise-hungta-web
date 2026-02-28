import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Wrench, Package, Headphones, ShieldCheck, Factory, FlaskConical, Cog, Cpu, Shirt, Beaker } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import heroImg from "@/assets/hero-lab.jpg";
import ht9501Img from "@/assets/ht-9501.jpg";
import ht2402Img from "@/assets/ht-2402.jpg";
import ht2101Img from "@/assets/ht-2101.jpg";
import { products } from "@/data/products";

interface IndexProps {
  onOpenQuote: () => void;
}

const productImages: Record<string, string> = {
  "ht-9501": ht9501Img,
  "ht-2402": ht2402Img,
  "ht-2101": ht2101Img,
};

const whyUs = [
  { icon: Wrench, title: "Expert Servicing", desc: "Factory-trained technicians with decades of experience in UTM maintenance and repair." },
  { icon: Package, title: "Wide Product Range", desc: "Complete portfolio of tensile testing machines from 100 N benchtop to 2,000 kN hydraulic systems." },
  { icon: Headphones, title: "Fast Support", desc: "Rapid response times across Peninsular Malaysia. Remote diagnostics and on-site visits." },
  { icon: ShieldCheck, title: "Certified Equipment", desc: "All instruments comply with ASTM, ISO, EN, and BS international testing standards." },
];

const industries = [
  { icon: Cog, label: "Manufacturing" },
  { icon: Factory, label: "Rubber & Glove" },
  { icon: Shirt, label: "Textiles" },
  { icon: Cpu, label: "Metal & Alloys" },
  { icon: Beaker, label: "Electronics" },
  { icon: FlaskConical, label: "R&D Labs" },
];

const featuredProducts = products.filter((p) => p.featured);

const Index = ({ onOpenQuote }: IndexProps) => {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <img src={heroImg} alt="Material testing laboratory" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="container mx-auto px-4 relative z-10 py-32">
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-6 border border-accent/30">
              Serving Malaysia Since 1990
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] max-w-3xl text-primary-foreground mb-6">
              Precision Testing Instruments for <span className="text-accent">Every Industry</span>
            </h1>
            <p className="text-lg md:text-xl max-w-xl text-primary-foreground/70 mb-8 leading-relaxed">
              Authorised distributor of Hung Ta universal testing machines in Malaysia. Expert sales, servicing, and calibration for your material testing needs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-orange-light font-semibold gap-1 shadow-accent">
                  View Our Products <ArrowUpRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" onClick={onOpenQuote} className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold">
                Request a Quote
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-muted border-b border-border">
        <div className="container mx-auto px-4 py-6 flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground font-medium">
          {["ISO 9001 Certified", "ASTM Compliant", "CE Marked", "20+ Years Experience", "500+ Installations"].map((t) => (
            <div key={t} className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent" />
              {t}
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-black text-center mb-4">Why Choose <span className="text-accent">Hung Ta (M)</span></h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">Your single-source partner for material testing instruments in Malaysia</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="bg-card border border-border rounded-lg p-6 hover:shadow-navy transition-shadow h-full">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-black text-center mb-4">Featured Products</h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">Universal Testing Machines engineered for precision, built for production</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, i) => (
              <AnimatedSection key={product.id} delay={i * 0.1}>
                <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-navy transition-shadow group h-full flex flex-col">
                  <div className="aspect-square bg-muted overflow-hidden">
                    <img
                      src={productImages[product.image]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-xs font-semibold text-accent mb-1">{product.categoryLabel}</span>
                    <h3 className="font-bold mb-1">{product.model}</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">{product.tagline}</p>
                    <Link to={`/products?product=${product.id}`}>
                      <Button variant="outline" size="sm" className="w-full font-semibold">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/products">
              <Button className="bg-accent text-accent-foreground hover:bg-orange-light font-semibold gap-1">
                View All Products <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-black text-center mb-4">Industries We Serve</h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">Trusted by leading manufacturers and laboratories across Malaysia</p>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((ind, i) => (
              <AnimatedSection key={ind.label} delay={i * 0.08}>
                <div className="bg-card border border-border rounded-lg p-6 text-center hover:border-accent transition-colors group">
                  <ind.icon className="w-8 h-8 mx-auto mb-3 text-steel group-hover:text-accent transition-colors" />
                  <span className="text-sm font-semibold">{ind.label}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy-gradient">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-black text-primary-foreground mb-4">Ready to Upgrade Your Testing Capability?</h2>
            <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8">Contact us today for a free consultation and quotation. Our engineers are ready to recommend the right solution for your industry.</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button size="lg" onClick={onOpenQuote} className="bg-accent text-accent-foreground hover:bg-orange-light font-semibold gap-1 shadow-accent">
                Request a Quote <ArrowUpRight className="w-5 h-5" />
              </Button>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold">
                  Contact Us
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
};

export default Index;
