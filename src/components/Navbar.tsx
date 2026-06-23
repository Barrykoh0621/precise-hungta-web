import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/BrandLogo";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Services", path: "/services" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

interface NavbarProps {
  onOpenQuote: () => void;
}

const Navbar = ({ onOpenQuote }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-20 px-4">
        <BrandLogo />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === link.path
                  ? "text-accent"
                  : "text-primary/75 hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button
            onClick={onOpenQuote}
            className="ml-3 rounded-full bg-accent text-white hover:bg-orange-light font-semibold gap-1 px-5"
            size="sm"
          >
            Get a Quote <ArrowUpRight className="w-4 h-4" />
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-primary p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border pb-4 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block px-6 py-3 text-sm font-medium ${
                location.pathname === link.path
                  ? "text-accent"
                  : "text-primary/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="px-6 pt-2">
            <Button
              onClick={() => { onOpenQuote(); setMobileOpen(false); }}
              className="w-full bg-accent text-white hover:bg-orange-light font-semibold"
              size="sm"
            >
              Get a Quote
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
