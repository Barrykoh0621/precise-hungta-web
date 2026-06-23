import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ClipboardCheck, Factory, FileText, Gauge, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import { products } from "@/data/products";
import type { Product } from "@/data/products";
import { usePageSeo } from "@/hooks/use-page-seo";
import ht9501Img from "@/assets/ht-9501.jpg";
import ht2402Img from "@/assets/ht-2402.jpg";
import ht2101Img from "@/assets/ht-2101.jpg";

const localImages: Record<string, string> = {
  "ht-9501": ht9501Img,
  "ht-2402": ht2402Img,
  "ht-2101": ht2101Img,
};

function getProductImage(image: string): string {
  if (image.startsWith("http")) return image;
  return localImages[image] || `${import.meta.env.BASE_URL}${image}`;
}

type LandingKey = "hydraulic" | "compression" | "electrical-tensile";

interface LandingConfig {
  eyebrow: string;
  title: string;
  subtitle: string;
  seoTitle: string;
  seoDescription: string;
  primaryKeyword: string;
  heroProductIds: string[];
  applications: string[];
  buyerNeeds: string[];
  standards: string[];
  quotePrompt: string;
  industries: string[];
}

const landingPages: Record<LandingKey, LandingConfig> = {
  hydraulic: {
    eyebrow: "Hydraulic testing machine Malaysia",
    title: "Hydraulic Testing Machines for High-Capacity QC",
    subtitle:
      "Electro-hydraulic universal testing machines for metal, construction material, copper and industrial component testing, with Malaysia sales and service support.",
    seoTitle: "Hydraulic Testing Machine Malaysia | Hung Ta Instrument",
    seoDescription:
      "Hydraulic testing machines and electro-hydraulic universal testing systems for metal, copper, construction material and factory QC in Malaysia.",
    primaryKeyword: "hydraulic testing machine Malaysia",
    heroProductIds: ["ht-9501", "ht-2101", "ht-8296"],
    applications: ["Tensile testing", "Compression testing", "Bending and shear", "High-capacity material verification"],
    buyerNeeds: ["Required capacity in kN", "Material type and sample size", "Test standard such as ASTM or ISO", "Fixture, extensometer or furnace requirements"],
    standards: ["ASTM E4", "ASTM E8", "ISO 7500-1", "ISO 6892-1", "JIS B7721"],
    quotePrompt: "Send us your material, force range and test standard for a hydraulic machine recommendation.",
    industries: ["Metal", "Copper", "Construction material", "Automotive", "Factory QA"],
  },
  compression: {
    eyebrow: "Compression machine Malaysia",
    title: "Compression Testing Machines for Reliable Strength Checks",
    subtitle:
      "Compression machines for concrete, metal parts, packaging and production QC teams that need dependable load control, reporting and local support.",
    seoTitle: "Compression Machine Malaysia | Hung Ta Instrument",
    seoDescription:
      "Compression testing machines for concrete, metal, packaging and factory QC applications in Malaysia, with quotation and service support from Hung Ta.",
    primaryKeyword: "compression machine Malaysia",
    heroProductIds: ["ht-8391", "ht-9501", "ht-2101"],
    applications: ["Concrete cube and cylinder tests", "Metal component compression", "Package and carton compression", "Production quality inspection"],
    buyerNeeds: ["Specimen type and dimensions", "Maximum load or capacity", "Required output report", "Manual, servo or automated control preference"],
    standards: ["ASTM C39", "EN 12390-4", "BS 1881", "ISO 7500-1"],
    quotePrompt: "Tell us your specimen type, capacity and reporting needs for a compression machine quotation.",
    industries: ["Construction QC", "Metal parts", "Packaging", "Laboratories", "Manufacturing"],
  },
  "electrical-tensile": {
    eyebrow: "Electrical tensile testing machine Malaysia",
    title: "Electrical Tensile Testing Machines for Factory QA Labs",
    subtitle:
      "Servo and electrical tensile testing machines for metal, rubber, copper, wire, cable and material strength testing, with software reports and local guidance.",
    seoTitle: "Electrical Tensile Testing Machine Malaysia | Hung Ta Instrument",
    seoDescription:
      "Electrical tensile testing machines and servo universal testing machines for metal, rubber, copper, wire and cable QC in Malaysia.",
    primaryKeyword: "electrical tensile testing machine Malaysia",
    heroProductIds: ["ht-2402", "ht-2402w25", "ht-2328-utm", "ht-2328-wire", "ht-8116"],
    applications: ["Tensile strength", "Elongation and strain", "Peel and adhesion", "Bending and flexural tests"],
    buyerNeeds: ["Material and sample geometry", "Capacity range", "Grip and fixture type", "Software, Excel/PDF and calibration needs"],
    standards: ["ASTM E8", "ASTM D412", "ISO 6892", "ISO 37", "IEC 60811"],
    quotePrompt: "Share your sample, grip requirement and testing standard for an electrical tensile machine recommendation.",
    industries: ["Metal", "Rubber", "Copper", "Wire and cable", "QA laboratories"],
  },
};

interface ProductLandingProps {
  pageKey: LandingKey;
  onOpenQuote: (productId?: string) => void;
}

function ProductCard({ product, onOpenQuote }: { product: Product; onOpenQuote: (productId?: string) => void }) {
  return (
    <div className="bg-white border border-border rounded-lg overflow-hidden hover:shadow-navy transition-shadow h-full flex flex-col">
      <div className="aspect-[4/3] bg-white border-b border-border flex items-center justify-center">
        <img src={getProductImage(product.image)} alt={product.name} className="w-full h-full object-contain p-6" />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-accent">{product.categoryLabel}</p>
        <h3 className="text-xl font-black mt-1">{product.model}</h3>
        <p className="text-sm text-muted-foreground mt-2 flex-1">{product.tagline}</p>
        <div className="mt-4 space-y-2">
          {product.specs.slice(0, 3).map((spec) => (
            <div key={`${product.id}-${spec.label}`} className="flex justify-between gap-3 text-xs border-t border-border pt-2">
              <span className="text-muted-foreground">{spec.label}</span>
              <span className="text-primary font-semibold text-right">{spec.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <Link to={`/products?product=${product.id}`}>
            <Button variant="outline" size="sm" className="w-full rounded-full text-xs">
              Details
            </Button>
          </Link>
          <Button size="sm" className="rounded-full bg-accent text-white hover:bg-orange-light text-xs" onClick={() => onOpenQuote(product.id)}>
            Quote
          </Button>
        </div>
      </div>
    </div>
  );
}

const ProductLanding = ({ pageKey, onOpenQuote }: ProductLandingProps) => {
  const page = landingPages[pageKey];
  const featuredProducts = page.heroProductIds
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product));

  usePageSeo({
    title: page.seoTitle,
    description: page.seoDescription,
  });

  return (
    <main className="pt-20">
      <section className="bg-primary text-primary-foreground industrial-grid">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <AnimatedSection>
            <div className="max-w-4xl">
              <p className="text-accent text-xs font-bold uppercase tracking-[0.28em] mb-4">{page.eyebrow}</p>
              <h1 className="font-serif text-5xl md:text-7xl leading-[0.95] mb-6">{page.title}</h1>
              <p className="text-lg md:text-xl text-primary-foreground/72 max-w-3xl leading-relaxed">{page.subtitle}</p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Button onClick={() => onOpenQuote()} className="rounded-full bg-accent text-white hover:bg-orange-light font-semibold gap-2 px-7">
                  Request Machine Quotation <ArrowRight className="w-4 h-4" />
                </Button>
                <Link to="/products">
                  <Button variant="outline" className="rounded-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold px-7">
                    View Full Catalogue
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-muted border-b border-border">
        <div className="container mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {["Since 1975", "SSM 256852-H", "Malaysia support", "ASTM / ISO guidance"].map((item) => (
            <div key={item} className="bg-white border border-border rounded-lg px-4 py-3 flex items-center gap-2 text-sm font-semibold">
              <ShieldCheck className="w-4 h-4 text-accent" />
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
            <AnimatedSection>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent mb-3">Buyer fit</p>
              <h2 className="text-3xl md:text-5xl font-black mb-5">Built for serious quality control decisions</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{page.quotePrompt}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {page.industries.map((industry) => (
                  <div key={industry} className="border border-border rounded-lg p-4 bg-white flex items-center gap-3">
                    <Factory className="w-5 h-5 text-accent" />
                    <span className="font-semibold text-sm">{industry}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.08}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="border border-border rounded-lg p-6 bg-white">
                  <Gauge className="w-6 h-6 text-accent mb-4" />
                  <h3 className="text-xl font-black mb-4">Applications</h3>
                  <ul className="space-y-3">
                    {page.applications.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border border-border rounded-lg p-6 bg-white">
                  <ClipboardCheck className="w-6 h-6 text-accent mb-4" />
                  <h3 className="text-xl font-black mb-4">Before Quotation</h3>
                  <ul className="space-y-3">
                    {page.buyerNeeds.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent mb-2">Recommended systems</p>
                <h2 className="text-3xl md:text-5xl font-black">Related Hung Ta models</h2>
              </div>
              <Link to="/products">
                <Button variant="outline" className="rounded-full font-semibold">
                  Full Catalogue <FileText className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((product, index) => (
              <AnimatedSection key={product.id} delay={index * 0.08}>
                <ProductCard product={product} onOpenQuote={onOpenQuote} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="bg-primary text-primary-foreground rounded-lg p-8 md:p-10 grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-8 items-center">
              <div>
                <p className="text-accent text-xs font-bold uppercase tracking-[0.24em] mb-3">Standards and support</p>
                <h2 className="text-3xl md:text-4xl font-black mb-4">Tell us the standard. We help match the machine.</h2>
                <p className="text-primary-foreground/70 leading-relaxed">
                  Hung Ta supports manufacturers and laboratories across Malaysia, Singapore and Asia with machine selection, installation, training, calibration guidance and service support.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {page.standards.map((standard) => (
                  <span key={standard} className="bg-white/10 border border-white/15 rounded-full px-4 py-2 text-sm font-semibold">
                    {standard}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-navy-gradient text-center">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <p className="text-accent text-xs font-bold uppercase tracking-[0.24em] mb-3">{page.primaryKeyword}</p>
            <h2 className="text-3xl md:text-5xl font-black text-primary-foreground mb-4">Ready to request a suitable testing machine?</h2>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto mb-8">{page.quotePrompt}</p>
            <Button onClick={() => onOpenQuote()} className="rounded-full bg-accent text-white hover:bg-orange-light font-semibold px-8">
              Request Quotation
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
};

export default ProductLanding;
