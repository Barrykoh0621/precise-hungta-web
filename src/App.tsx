import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import QuoteModal from "@/components/QuoteModal";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductLanding from "./pages/ProductLanding";
import NotFound from "./pages/NotFound";
import { trackLeadEvent } from "@/lib/analytics";

const queryClient = new QueryClient();
const routerBasename =
  window.location.hostname.endsWith("github.io") && window.location.pathname.startsWith("/precise-hungta-web")
    ? "/precise-hungta-web"
    : "/";

const RedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");
    if (redirect) {
      navigate(redirect, { replace: true });
    }
  }, [navigate]);

  return null;
};

const App = () => {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState<string | undefined>();

  const openQuote = (productId?: string) => {
    setQuoteProduct(productId);
    setQuoteOpen(true);
    trackLeadEvent("quote_modal_open", { product_id: productId });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={routerBasename}>
          <RedirectHandler />
          <Navbar onOpenQuote={() => openQuote()} />
          <Routes>
            <Route path="/" element={<Index onOpenQuote={() => openQuote()} />} />
            <Route path="/hydraulic-testing-machine-malaysia" element={<ProductLanding pageKey="hydraulic" onOpenQuote={openQuote} />} />
            <Route path="/compression-machine-malaysia" element={<ProductLanding pageKey="compression" onOpenQuote={openQuote} />} />
            <Route path="/electrical-tensile-testing-machine-malaysia" element={<ProductLanding pageKey="electrical-tensile" onOpenQuote={openQuote} />} />
            <Route path="/products" element={<Products onOpenQuote={openQuote} />} />
            <Route path="/services" element={<Services onOpenQuote={() => openQuote()} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <WhatsAppButton />
          <QuoteModal open={quoteOpen} onOpenChange={setQuoteOpen} preselectedProduct={quoteProduct} />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
