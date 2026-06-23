import { useEffect, useState } from "react";
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
import { usePageSeo } from "@/hooks/use-page-seo";

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
  usePageSeo({
    title: "Testing Machine Products | Hung Ta Instrument Malaysia",
    description:
      "Browse tensile, universal, material, tyre, rubber, plastics, wire, cable, paper and hardness testing equipment from Hung Ta Instrument Malaysia.",
  });

  const [searchParams] = useSearchParams();
  const expandedId = searchParams.get("product");
  const categoryParam = searchParams.get("category");
  const [filter, setFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = filter === "all" ? products : products.filter((p) => p.category === filter);

  // Auto-open modal if product param is in URL
  useEffect(() => {
    if (expandedId) {
      const found = products.find((p) => p.id === expandedId);
      if (found) {
        setSelectedProduct(found);
        setModalOpen(true);
      }
    }
  }, [expandedId]);

  useEffect(() => {
    if (categoryParam && categories.some((category) => category.id === categoryParam)) {
      setFilter(categoryParam);
    }
  }, [categoryParam]);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="bg-primary py-24 industrial-grid">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <p className="text-accent text-xs font-bold uppercase tracking-[0.28em] mb-4">Product catalogue</p>
            <h1 className="font-serif text-5xl md:text-6xl text-primary-foreground mb-5">Testing Machine Products</h1>
            <p className="text-primary-foreground/68 max-w-2xl text-lg">Tensile, universal, material, tyre, rubber, plastics, wire, cable, paper and hardness testing equipment for quality control applications.</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter */}
      <section className="border-b border-border sticky top-20 bg-white/95 backdrop-blur z-30">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-3">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                  filter === c.id
                    ? "bg-accent text-white"
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
                <div className="bg-white border border-border rounded-lg overflow-hidden hover:shadow-navy hover:border-accent/40 transition-all duration-200 flex flex-col h-full group">
                  {/* Image */}
                  <div className="aspect-square bg-white overflow-hidden flex items-center justify-center border-b border-border">
                    <img
                      src={getProductImage(product.image)}
                      alt={product.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {/* Info */}
                  <div className="p-4 flex flex-col flex-1">
                    <span className="text-[10px] font-bold text-accent uppercase tracking-[0.16em]">{product.categoryLabel}</span>
                    <h3 className="font-black text-base mt-1 line-clamp-1">{product.model}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2 flex-1">{product.tagline}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 w-full gap-1.5 text-xs rounded-full"
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
