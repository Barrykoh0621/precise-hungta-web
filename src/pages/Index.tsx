import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Wrench, Package, Headphones, ShieldCheck, Factory, FlaskConical, Cog, Cpu, Shirt, Beaker, Gauge, CheckCircle2 } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import heroImg from "@/assets/hero-lab.jpg";
import ht9501Img from "@/assets/ht-9501.jpg";
import ht2402Img from "@/assets/ht-2402.jpg";
import ht2101Img from "@/assets/ht-2101.jpg";
import { products } from "@/data/products";
import { usePageSeo } from "@/hooks/use-page-seo";

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
  { icon: Package, title: "Priority Machine Range", desc: "Hydraulic testing machines, compression machines and electrical tensile testing machines for production QC." },
  { icon: Headphones, title: "Regional Support", desc: "Support for customers across Malaysia, Singapore and Asia. Remote diagnostics and on-site visits where suitable." },
  { icon: ShieldCheck, title: "Certified Equipment", desc: "All instruments comply with ASTM, ISO, EN, and BS international testing standards." },
];

const industries = [
  { icon: Cpu, label: "Metal" },
  { icon: Factory, label: "Rubber" },
  { icon: Cog, label: "Copper" },
  { icon: Beaker, label: "Laboratories" },
  { icon: Shirt, label: "Factory QC" },
  { icon: FlaskConical, label: "R&D Labs" },
];

const buyerSearches = [
  {
    title: "Tensile Testing Machine Malaysia",
    desc: "For metal, rubber, copper, wire and factory QA teams that need tensile strength and elongation testing.",
    path: "/tensile-testing-machine-malaysia",
  },
  {
    title: "Universal Testing Machine Malaysia",
    desc: "For tensile, compression, bending and material strength testing in one system.",
    path: "/universal-testing-machine-malaysia",
  },
  {
    title: "Testing Machine Calibration Malaysia",
    desc: "For factories, laboratories and QA teams that need calibration support and audit readiness.",
    path: "/calibration-service-malaysia",
  },
];

const performanceStats = [
  { value: "1975", label: "Established" },
  { value: "1000+", label: "Testing machine range" },
  { value: "10+", label: "Application categories" },
  { value: "MY", label: "Local sales & support" },
];

const qualityProofs = [
  {
    title: "Standards-Driven Testing",
    desc: "Support for common ASTM, ISO, EN, BS and JIS material testing applications, with machine recommendations based on sample, capacity and test method.",
    meta: "ASTM / ISO / EN / BS / JIS",
  },
  {
    title: "Malaysia Sales & Service",
    desc: "Consultation for machine selection, installation, training, calibration guidance, troubleshooting and spare parts support across Malaysia, Singapore and Asia.",
    meta: "Malaysia / Singapore / Asia",
  },
  {
    title: "Application Matching",
    desc: "Buyer conversations are guided by material type, force range, fixture requirement, software output and audit documentation needs.",
    meta: "Factory, lab and QA ready",
  },
];

const enquirySystem = [
  "Website and Google Ads bring buyers to focused tensile, UTM and calibration pages.",
  "WhatsApp templates collect machine model, capacity, location and required date.",
  "Sales can qualify the enquiry faster during business hours and prepare the next step.",
];

const featuredProducts = products.filter((p) => p.featured);

const Index = ({ onOpenQuote }: IndexProps) => {
  usePageSeo({
    title: "Hung Ta Instrument Malaysia | Hydraulic, Compression & Tensile Testing Machines",
    description:
      "Hung Ta supplies hydraulic testing machines, compression machines, electrical tensile testing machines, calibration, software and service support for metal, rubber and copper industries.",
  });

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <img src={heroImg} alt="Material testing laboratory" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="absolute inset-0 industrial-grid opacity-[0.08]" />
        <div className="container mx-auto px-4 relative z-10 py-24">
          <AnimatedSection>
            <div className="max-w-5xl">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-xs font-semibold mb-7 border border-white/20 uppercase tracking-[0.22em]">
                <Gauge className="w-4 h-4 text-accent" />
                Testing instruments since 1975
              </span>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] max-w-4xl text-white mb-7">
                The precise force behind quality control.
              </h1>
              <p className="text-lg md:text-xl max-w-2xl text-white mb-8 leading-relaxed bg-primary/78 backdrop-blur-sm border border-white/15 rounded-lg px-5 py-4 shadow-navy">
                Hydraulic testing machines, compression machines and electrical tensile testing machines for metal, rubber and copper manufacturers that need dependable results, service support and calibration guidance.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 mb-10">
              <Link to="/products">
                <Button size="lg" className="rounded-full bg-accent text-white hover:bg-orange-light font-semibold gap-1 shadow-accent px-7">
                  Explore Testing Machines <ArrowUpRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" onClick={onOpenQuote} className="rounded-full border-white bg-white text-primary hover:bg-white/90 font-semibold px-7">
                Request a Quote
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 max-w-4xl gap-4">
              {performanceStats.map((stat) => (
                <div key={stat.label} className="bg-primary/78 backdrop-blur-sm border border-white/15 rounded-lg px-4 py-4 shadow-navy">
                  <p className="text-3xl md:text-4xl font-black text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">{stat.value}</p>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-white font-bold mt-1 leading-snug">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-muted border-b border-border">
        <div className="container mx-auto px-4 py-6 flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground font-medium">
          {["Established 1975", "Malaysia Support", "ASTM / ISO Test Applications", "Hydraulic & Tensile Machines", "Malaysia, Singapore & Asia"].map((t) => (
            <div key={t} className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent" />
              {t}
            </div>
          ))}
        </div>
      </section>

      {/* Quality Proof */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent mb-3">Quality proof</p>
                <h2 className="text-3xl md:text-5xl font-black max-w-3xl">Built for audited quality control environments</h2>
              </div>
              <p className="text-muted-foreground max-w-xl leading-relaxed">
                Hung Ta helps buyers select testing machines around actual production materials, international test standards and long-term support needs.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {qualityProofs.map((proof, i) => (
              <AnimatedSection key={proof.title} delay={i * 0.08}>
                <div className="border border-border rounded-lg p-6 h-full bg-white hover:shadow-navy transition-shadow">
                  <div className="w-10 h-10 rounded-sm bg-accent/10 flex items-center justify-center mb-5">
                    <ShieldCheck className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent mb-2">{proof.meta}</p>
                  <h3 className="text-xl font-black mb-3">{proof.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{proof.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <p className="text-center text-xs font-bold uppercase tracking-[0.28em] text-accent mb-3">Engineered confidence</p>
            <h2 className="text-3xl md:text-5xl font-black text-center mb-4">Why Buyers Choose <span className="text-accent">Hung Ta</span></h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">A trusted source for tensile testing machines, material testing systems, service support and calibration guidance.</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="premium-panel border border-border rounded-lg p-7 hover:shadow-navy transition-shadow h-full">
                  <div className="w-12 h-12 rounded-sm bg-accent/10 flex items-center justify-center mb-5">
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
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <p className="text-center text-xs font-bold uppercase tracking-[0.28em] text-accent mb-3">Flagship systems</p>
            <h2 className="text-3xl md:text-5xl font-black text-center mb-4">Featured Testing Machines</h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">Built for buyers comparing hydraulic testing machines, compression machines, electrical tensile machines and universal testing systems in Malaysia.</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, i) => (
              <AnimatedSection key={product.id} delay={i * 0.1}>
                <div className="bg-white border border-border rounded-lg overflow-hidden hover:shadow-navy transition-all group h-full flex flex-col">
                  <div className="aspect-[4/3] bg-white overflow-hidden border-b border-border flex items-center justify-center">
                    <img
                      src={productImages[product.image]}
                      alt={product.name}
                      className="w-full h-full object-contain p-7 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-xs font-bold text-accent mb-2 uppercase tracking-[0.16em]">{product.categoryLabel}</span>
                    <h3 className="font-black text-xl mb-1">{product.model}</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">{product.tagline}</p>
                    <Link to={`/products?product=${product.id}`}>
                      <Button variant="outline" size="sm" className="w-full font-semibold rounded-full">
                        View System
                      </Button>
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/products">
              <Button className="rounded-full bg-accent text-white hover:bg-orange-light font-semibold gap-1 px-7">
                View All Products <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Buyer Search Paths */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <p className="text-center text-xs font-bold uppercase tracking-[0.28em] text-accent mb-3">Buyer pathways</p>
            <h2 className="text-3xl md:text-5xl font-black text-center mb-4">Find the Right Testing Machine Faster</h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
              Start from your material, test standard or application. Each path leads buyers to a focused machine category and faster quotation discussion.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {buyerSearches.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <Link to={item.path} className="block bg-primary text-primary-foreground border border-primary/10 rounded-lg p-7 hover:border-accent hover:shadow-navy transition-all h-full">
                  <CheckCircle2 className="w-6 h-6 text-accent mb-5" />
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-primary-foreground/62 mb-4">{item.desc}</p>
                  <span className="text-sm font-semibold text-accent inline-flex items-center gap-1">
                    View category <ArrowUpRight className="w-4 h-4" />
                  </span>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 24-hour enquiry intake */}
      <section className="py-20 bg-muted border-y border-border">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="bg-white border border-border rounded-lg p-8 md:p-10 grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8 items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent mb-3">24-hour enquiry intake</p>
                <h2 className="text-3xl md:text-5xl font-black mb-4">Let the website collect better leads even after office hours</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Buyers can send machine or calibration requirements any time. Hung Ta receives structured WhatsApp and email enquiries with the details needed for faster follow-up.
                </p>
              </div>
              <div className="space-y-3">
                {enquirySystem.map((item) => (
                  <div key={item} className="flex gap-3 bg-muted border border-border rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <p className="text-sm font-medium text-foreground/86">{item}</p>
                  </div>
                ))}
                <Button onClick={onOpenQuote} className="rounded-full bg-accent text-white hover:bg-orange-light font-semibold px-7 mt-2">
                  Send Machine Requirement
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <p className="text-center text-xs font-bold uppercase tracking-[0.28em] text-accent mb-3">Applications</p>
            <h2 className="text-3xl md:text-5xl font-black text-center mb-4">Industries We Serve</h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">Designed for production teams, QA laboratories and manufacturers that need dependable quality control testing equipment.</p>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((ind, i) => (
              <AnimatedSection key={ind.label} delay={i * 0.08}>
                <div className="bg-card border border-border rounded-lg p-6 text-center hover:border-accent hover:shadow-navy transition-all group">
                  <ind.icon className="w-8 h-8 mx-auto mb-3 text-steel group-hover:text-accent transition-colors" />
                  <span className="text-sm font-semibold">{ind.label}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-navy-gradient">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-black text-primary-foreground mb-4">Need a Tensile or Material Testing Machine?</h2>
            <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8">Tell us your sample material, capacity, test standard and application. Hung Ta can recommend a suitable testing solution and quotation.</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button size="lg" onClick={onOpenQuote} className="rounded-full bg-accent text-white hover:bg-orange-light font-semibold gap-1 shadow-accent px-7">
                Request a Quote <ArrowUpRight className="w-5 h-5" />
              </Button>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="rounded-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold px-7">
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
