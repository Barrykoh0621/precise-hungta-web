import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { products, categories } from "@/data/products";
import type { Product } from "@/data/products";
import AnimatedSection from "@/components/AnimatedSection";
import ProductDetailModal from "@/components/ProductDetailModal";
import ht9501Img from "@/assets/ht-9501.jpg";
import ht2402Img from "@/assets/ht-2402.jpg";
import ht2101Img from "@/assets/ht-2101.jpg";
import { Eye, Package } from "lucide-react";
import { accessories } from "@/data/products";

const localImages: Record<string, string> = {
  "ht-9501": ht9501Img,
  "ht-2402": ht2402Img,
  "ht-2101": ht2101Img,
};

function getProductImage(image: string): string {
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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = filter === "all" ? products : products.filter((p) => p.category === filter);

  // Auto-open modal if product param is in URL
  useState(() => {
    if (expandedId) {
      const found = products.find((p) => p.id === expandedId);
      if (found) {
        setSelectedProduct(found);
        setModalOpen(true);
      }
    }
  });

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

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

      {/* Product Card Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <AnimatedSection key={product.id} delay={i * 0.03}>
                <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg hover:border-accent/40 transition-all duration-200 flex flex-col h-full group">
                  {/* Image */}
                  <div className="aspect-square bg-muted overflow-hidden flex items-center justify-center">
                    <img
                      src={getProductImage(product.image)}
                      alt={product.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {/* Info */}
                  <div className="p-4 flex flex-col flex-1">
                    <span className="text-[10px] font-semibold text-accent uppercase tracking-wider">{product.categoryLabel}</span>
                    <h3 className="font-bold text-sm mt-1 line-clamp-1">{product.model}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2 flex-1">{product.tagline}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 w-full gap-1.5 text-xs"
                      onClick={() => handleViewDetails(product)}
                    >
                      <Eye className="w-3.5 h-3.5" /> View Details
                    </Button>
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

      {/* Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onEnquire={onOpenQuote}
        getImage={getProductImage}
      />
    </main>
  );
};

export default Products;
