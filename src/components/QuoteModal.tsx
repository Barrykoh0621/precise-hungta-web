import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { products } from "@/data/products";

// Web3Forms access key — get yours free at https://web3forms.com
const WEB3FORMS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";

interface QuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preselectedProduct?: string;
}

const QuoteModal = ({ open, onOpenChange, preselectedProduct }: QuoteModalProps) => {
  const [selectedProduct, setSelectedProduct] = useState(preselectedProduct || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_KEY);
    formData.append("subject", "New Quote Request — Hung Ta (M)");
    formData.append("from_name", "Hung Ta (M) Website");
    if (selectedProduct) formData.append("product_interest", selectedProduct);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Quote request sent! We'll get back to you within 24 hours.");
        onOpenChange(false);
        form.reset();
        setSelectedProduct(preselectedProduct || "");
      } else {
        toast.error(data.message || "Failed to send. Please call us directly.");
      }
    } catch {
      toast.error("Network error. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Request a Quote</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="q-name">Name *</Label>
              <Input id="q-name" name="name" required placeholder="Your name" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="q-company">Company</Label>
              <Input id="q-company" name="company" placeholder="Company name" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="q-email">Email *</Label>
              <Input id="q-email" name="email" type="email" required placeholder="email@company.com" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="q-phone">Phone</Label>
              <Input id="q-phone" name="phone" placeholder="+60 12-345 6789" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Product of Interest</Label>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger>
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((p) => (
                  <SelectItem key={p.id} value={p.id}>{p.model} — {p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="q-message">Message</Label>
            <Textarea id="q-message" name="message" rows={3} placeholder="Tell us about your testing requirements..." />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-accent-foreground hover:bg-orange-light font-semibold"
          >
            {loading ? "Sending..." : "Submit Request"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteModal;
