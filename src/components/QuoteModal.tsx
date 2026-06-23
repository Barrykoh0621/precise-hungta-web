import { useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { products } from "@/data/products";

interface QuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preselectedProduct?: string;
}

const QuoteModal = ({ open, onOpenChange, preselectedProduct }: QuoteModalProps) => {
  const selectedProduct = useMemo(
    () => products.find((product) => product.id === preselectedProduct),
    [preselectedProduct]
  );

  const subject = selectedProduct
    ? `Quotation request: ${selectedProduct.model}`
    : "Quotation request: Hung Ta testing machine";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Request a Machine Quotation</DialogTitle>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            const body = [
              `Name: ${form.get("name")}`,
              `Company: ${form.get("company")}`,
              `Email: ${form.get("email")}`,
              `Phone: ${form.get("phone")}`,
              `Machine: ${form.get("machine") || selectedProduct?.model || "Not specified"}`,
              "",
              `Testing requirement:`,
              form.get("message"),
            ].join("\n");

            window.location.href = `mailto:info@hungtatester.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          }}
        >
          <div className="grid gap-2">
            <Label htmlFor="quote-name">Name</Label>
            <Input id="quote-name" name="name" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="quote-company">Company</Label>
            <Input id="quote-company" name="company" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="quote-email">Email</Label>
              <Input id="quote-email" name="email" type="email" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quote-phone">Phone / WhatsApp</Label>
              <Input id="quote-phone" name="phone" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="quote-machine">Machine or service needed</Label>
            <Input
              id="quote-machine"
              name="machine"
              defaultValue={selectedProduct ? `${selectedProduct.model} - ${selectedProduct.name}` : ""}
              placeholder="Example: tensile testing machine, UTM, calibration"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="quote-message">Testing requirement</Label>
            <Textarea
              id="quote-message"
              name="message"
              rows={4}
              placeholder="Material, test standard, capacity, sample size, report/software needs..."
              required
            />
          </div>
          <Button type="submit" className="w-full rounded-full bg-accent text-white hover:bg-orange-light font-semibold">
            Prepare Email to Hung Ta
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteModal;
