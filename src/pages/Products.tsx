import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { products, categories } from "@/data/products";
import type { Product } from "@/data/products";
import AnimatedSection from "@/components/AnimatedSection";
import ProductDetailModal from "@/components/ProductDetailModal";
import ht9501Img from "@/assets/ht-9501.jpg";
import ht2402Img from "@/assets/ht-2402.webp";
import ht2101Img from "@/assets/ht-2101.jpg";
import { ArrowUpRight, Download, Eye, FileText, Package } from "lucide-react";
import { accessories } from "@/data/products";
import { usePageSeo } from "@/hooks/use-page-seo";
import { machinePages } from "@/data/machine-pages";

const localImages: Record<string, string> = {
  "ht-9501": ht9501Img,
  "ht-2402": ht2402Img,
  "ht-2101": ht2101Img,
};

function getProductImage(image: string): string {
  if (image.startsWith("http")) return image;
  return localImages[image] || `${import.meta.env.BASE_URL}${image}`;
}

interface ProductsProps {
  onOpenQuote: (productId?: string) => void;
  initialBrand?: "Armstrong";
}

const Products = ({ onOpenQuote, initialBrand }: ProductsProps) => {
  usePageSeo({
    title: "Hydraulic, Compression & Electrical Tensile Testing Machines | Hung Ta Malaysia",
    description:
      "Browse hydraulic testing machines, compression machines, electrical tensile testing machines, material testing equipment and QC systems from Hung Ta Instrument Malaysia.",
  });

  const [searchParams] = useSearchParams();
  const requestedId = searchParams.get("product");
  const expandedId = requestedId === "armstrong-waw-300d" ? "armstrong-waw-300e" : requestedId;
  const categoryParam = searchParams.get("category");
  const brandParam = searchParams.get("brand");
  const [filter, setFilter] = useState("all");
  const [brandFilter, setBrandFilter] = useState<string>(initialBrand || brandParam || "all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = products.filter((p) =>
    (filter === "all" || p.category === filter) && (brandFilter === "all" || (p.brand || "Hung Ta") === brandFilter)
  );
  const activeCategory = categories.find((category) => category.id === filter);
  const categoryCounts = categories
    .filter((category) => category.id !== "all")
    .map((category) => ({
      ...category,
      count: products.filter((product) => product.category === category.id).length,
    }));

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

  useEffect(() => {
    setBrandFilter(initialBrand || brandParam || "all");
  }, [initialBrand, brandParam]);

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
            <p className="text-accent text-xs font-bold uppercase tracking-[0.28em] mb-4">{initialBrand ? "Armstrong product range" : "Product catalogue"}</p>
            <h1 className="font-serif text-5xl md:text-6xl text-primary-foreground mb-5">{initialBrand ? "Armstrong Testing Equipment" : "Testing Machine Products"}</h1>
            <p className="text-primary-foreground/68 max-w-2xl text-lg">{initialBrand ? "Explore the Armstrong-branded universal, compression testing and laboratory equipment range from Hung Ta Instrument." : "Browse Hung Ta and Armstrong testing machines and laboratory equipment by brand and application."}</p>
          </AnimatedSection>
        </div>
      </section>

      {!initialBrand && <section className="bg-muted border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.7fr] gap-8 items-center">
            <AnimatedSection>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent mb-2">Catalogue overview</p>
                <h2 className="text-2xl md:text-3xl font-black mb-3">{products.length}+ testing systems across {categoryCounts.length} application groups</h2>
                <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">
                  Browse by machine type, material application or testing standard. Priority enquiries include hydraulic testing machines, compression machines and electrical tensile testing machines for metal, rubber and copper industries.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: `${products.length}+`, label: "Models" },
                  { value: `${categoryCounts.length}`, label: "Categories" },
                  { value: "ISO / ASTM", label: "Standards" },
                ].map((item) => (
                  <div key={item.label} className="bg-white border border-border rounded-lg p-4">
                    <p className="text-2xl font-black text-primary">{item.value}</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>}

      <section className="py-8 border-b border-border bg-white">
        <div className="container mx-auto px-4 flex flex-wrap items-center gap-3">
          <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground mr-2">Browse by brand</span>
          <Link to="/products" className={`px-4 py-2 rounded-full text-sm ${brandFilter === "all" ? "bg-primary text-white" : "bg-muted text-primary"}`}>All brands</Link>
          <Link to="/products?brand=Hung%20Ta" className={`px-4 py-2 rounded-full text-sm ${brandFilter === "Hung Ta" ? "bg-primary text-white" : "bg-muted text-primary"}`}>Hung Ta</Link>
          <Link to="/armstrong-testing-machines-malaysia" className={`px-4 py-2 rounded-full text-sm ${brandFilter === "Armstrong" ? "bg-accent text-white" : "bg-muted text-primary"}`}>Armstrong</Link>
          {initialBrand && <span className="text-sm text-muted-foreground ml-auto">Armstrong is shown as a separate brand range; Hung Ta machines remain separately identified.</span>}
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
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent mb-2">
                  {activeCategory?.label || "All Products"}
                </p>
                <h2 className="text-3xl font-black">{filtered.length} catalogue items</h2>
              </div>
              <Button onClick={() => onOpenQuote()} className="rounded-full bg-accent text-white hover:bg-orange-light font-semibold gap-2 w-full md:w-auto">
                Request Catalogue / Quotation <FileText className="w-4 h-4" />
              </Button>
            </div>
          </AnimatedSection>
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
                    <div className="flex items-center justify-between gap-2"><span className="text-[10px] font-bold text-accent uppercase tracking-[0.16em]">{product.categoryLabel}</span><span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${product.brand === "Armstrong" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"}`}>{product.brand || "Hung Ta"}</span></div>
                    <h3 className="font-black text-base mt-1 line-clamp-1">{product.model}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2 flex-1">{product.tagline}</p>
                    <div className="mt-4 space-y-2 border-t border-border pt-3">
                      {product.specs.slice(0, 2).map((spec) => (
                        <div key={`${product.id}-${spec.label}`} className="flex items-start justify-between gap-3 text-[11px]">
                          <span className="text-muted-foreground">{spec.label}</span>
                          <span className="font-semibold text-primary text-right line-clamp-1">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                    {product.standards && product.standards.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {product.standards.slice(0, 2).map((standard) => (
                          <span key={`${product.id}-${standard}`} className="bg-muted text-muted-foreground text-[10px] font-semibold px-2 py-1 rounded-full">
                            {standard}
                          </span>
                        ))}
                      </div>
                    )}
                    {machinePages[product.id] && <a href={machinePages[product.id].path} className="mt-4 text-xs font-semibold text-accent inline-flex items-center gap-1">Full specification page <ArrowUpRight className="w-3.5 h-3.5" /></a>}
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4 w-full gap-1.5 text-xs rounded-full"
                      onClick={() => handleViewDetails(product)}
                    >
                      <Eye className="w-3.5 h-3.5" /> View Details
                    </Button>
                    {product.catalogueUrl && <a href={`/${product.catalogueUrl}`} target="_blank" rel="noreferrer" className="mt-2 w-full inline-flex items-center justify-center gap-1.5 text-xs rounded-full border border-border px-3 py-2 hover:bg-muted"><Download className="w-3.5 h-3.5" /> View Catalogue PDF</a>}
                    <Button
                      size="sm"
                      className="mt-2 w-full gap-1.5 text-xs rounded-full bg-primary text-white hover:bg-navy-light"
                      onClick={() => onOpenQuote(product.id)}
                    >
                      Request Quote <ArrowUpRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Accessories */}
      {!initialBrand && <section className="py-16 bg-muted">
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
      </section>}

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
