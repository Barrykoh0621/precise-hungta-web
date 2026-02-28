import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { products } from "@/data/products";

interface QuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preselectedProduct?: string;
}

const QuoteModal = ({ open, onOpenChange, preselectedProduct }: QuoteModalProps) => {
  const [selectedProduct, setSelectedProduct] = useState(preselectedProduct || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We will get back to you within 24 hours.");
    onOpenChange(false);
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
              <Input id="q-name" required placeholder="Your name" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="q-company">Company</Label>
              <Input id="q-company" placeholder="Company name" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="q-email">Email *</Label>
              <Input id="q-email" type="email" required placeholder="email@company.com" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="q-phone">Phone</Label>
              <Input id="q-phone" placeholder="+60 12-345 6789" />
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
            <Textarea id="q-message" rows={3} placeholder="Tell us about your testing requirements..." />
          </div>
          <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-orange-light font-semibold">
            Submit Request
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteModal;
