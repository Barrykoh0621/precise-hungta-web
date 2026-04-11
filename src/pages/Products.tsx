import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { products, categories, accessories } from "@/data/products";
import AnimatedSection from "@/components/AnimatedSection";
import ht9501Img from "@/assets/ht-9501.jpg";
import ht2402Img from "@/assets/ht-2402.jpg";
import ht2101Img from "@/assets/ht-2101.jpg";
import { ArrowUpRight, Package } from "lucide-react";

const localImages: Record<string, string> = {
  "ht-9501": ht9501Img,
  "ht-2402": ht2402Img,
  "ht-2101": ht2101Img,
};

function getProductImage(image: string): string {
  // If it's a URL, use directly; otherwise look up local import
  if (image.startsWith("http")) return image;
  return localImages[image] || "";
}

interface ProductsProps {
  onOpenQuote: (productId?: string) => void;
}

const Products = ({ onOpenQuote }: ProductsProps) => {
  const [searchParams] = useSearchParams();
  const expandedId = searchParams.get("product");
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? products : products.filter((p) => p.category === filter);

  return (
    <main className="pt-16">
      {/* Header */}
      <section className="bg-navy-gradient py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-black text-primary-foreground mb-4">Our Products</h1>
            <p className="text-primary-foreground/70 max-w-xl text-lg">Universal Testing Machines for metal, textile, rubber, and polymer testing — engineered by Hung Ta, supported locally.</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter */}
      <section className="border-b border-border sticky top-16 bg-background z-30">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-3">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                  filter === c.id
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {filtered.map((product, i) => (
              <AnimatedSection key={product.id} delay={i * 0.05}>
                <div
                  id={product.id}
                  className={`bg-card border rounded-lg overflow-hidden ${
                    expandedId === product.id ? "border-accent ring-2 ring-accent/20" : "border-border"
                  }`}
                >
                  <div className="grid md:grid-cols-3 gap-0">
                    <div className="aspect-[4/3] md:aspect-auto md:max-h-[280px] bg-muted overflow-hidden">
                      <img src={getProductImage(product.image)} alt={product.name} className="w-full h-full object-contain p-4" />
                    </div>
                    <div className="md:col-span-2 p-6 md:p-8">
                      <span className="text-xs font-semibold text-accent">{product.categoryLabel}</span>
                      <h2 className="text-2xl font-bold mt-1 mb-1">{product.model} — {product.name}</h2>
                      <p className="text-accent font-medium text-sm mb-3 italic">{product.tagline}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-5">{product.description}</p>

                      <div className="grid grid-cols-2 gap-2 mb-5">
                        {product.specs.map((s) => (
                          <div key={s.label} className="text-sm">
                            <span className="font-semibold">{s.label}:</span>{" "}
                            <span className="text-muted-foreground">{s.value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mb-5">
                        <span className="text-sm font-semibold">Ideal for: </span>
                        <span className="text-sm text-muted-foreground">{product.idealFor.join(" • ")}</span>
                      </div>

                      <Button onClick={() => onOpenQuote(product.id)} className="bg-accent text-accent-foreground hover:bg-orange-light font-semibold gap-1">
                        Enquire Now <ArrowUpRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Accessories */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-3xl font-black mb-8">Accessories & Add-Ons</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accessories.map((acc, i) => (
              <AnimatedSection key={acc.id} delay={i * 0.1}>
                <div className="bg-card border border-border rounded-lg p-6 flex gap-4">
                  <div className="w-10 h-10 rounded bg-accent/10 flex items-center justify-center shrink-0">
                    <Package className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{acc.name}</h3>
                    <p className="text-sm text-muted-foreground">{acc.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Products;
