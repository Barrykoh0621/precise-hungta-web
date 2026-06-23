import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/data/products";

interface ProductDetailModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEnquire: (productId: string) => void;
  getImage: (image: string) => string;
}

const ProductDetailModal = ({ product, open, onOpenChange, onEnquire, getImage }: ProductDetailModalProps) => {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{product.model} - {product.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-2">
          {/* Image */}
          <div className="bg-muted rounded-lg overflow-hidden max-h-56 flex items-center justify-center">
            <img src={getImage(product.image)} alt={product.name} className="w-full h-full object-contain p-4" />
          </div>

          {/* Tagline */}
          <p className="text-accent font-medium italic">{product.tagline}</p>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed">{product.description}</p>

          {/* Specs Table */}
          <div>
            <h3 className="font-semibold mb-2 text-sm">Specifications</h3>
            <div className="border border-border rounded-md overflow-hidden">
              {product.specs.map((s, i) => (
                <div key={s.label} className={`grid grid-cols-[140px_1fr] text-sm ${i % 2 === 0 ? "bg-muted/50" : "bg-background"}`}>
                  <span className="font-medium p-2 border-r border-border">{s.label}</span>
                  <span className="text-muted-foreground p-2">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Standards */}
          {product.standards && product.standards.length > 0 && (
            <div>
              <h3 className="font-semibold mb-1 text-sm">Standards</h3>
              <p className="text-sm text-muted-foreground">{product.standards.join(" | ")}</p>
            </div>
          )}

          {/* Ideal For */}
          <div>
            <h3 className="font-semibold mb-1 text-sm">Ideal For</h3>
            <div className="flex flex-wrap gap-2">
              {product.idealFor.map((item) => (
                <span key={item} className="text-xs bg-muted px-2.5 py-1 rounded-full text-muted-foreground">{item}</span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Button onClick={() => { onOpenChange(false); onEnquire(product.id); }} className="w-full rounded-full bg-accent text-white hover:bg-orange-light font-semibold gap-1">
            Enquire Now <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
