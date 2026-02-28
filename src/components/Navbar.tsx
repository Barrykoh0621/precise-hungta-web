import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-primary-foreground/10">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-accent flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-accent-foreground" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2v20M8 6l4-4 4 4M8 18l4 4 4-4" />
            </svg>
          </div>
          <span className="text-primary-foreground font-bold text-lg tracking-tight">
            Hung Ta <span className="text-accent">(M)</span> Instrument
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === link.path
                  ? "text-accent"
                  : "text-primary-foreground/80 hover:text-primary-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button
            onClick={onOpenQuote}
            className="ml-3 bg-accent text-accent-foreground hover:bg-orange-light font-semibold gap-1"
            size="sm"
          >
            Get a Quote <ArrowUpRight className="w-4 h-4" />
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-primary-foreground p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden bg-primary border-t border-primary-foreground/10 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block px-6 py-3 text-sm font-medium ${
                location.pathname === link.path
                  ? "text-accent"
                  : "text-primary-foreground/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="px-6 pt-2">
            <Button
              onClick={() => { onOpenQuote(); setMobileOpen(false); }}
              className="w-full bg-accent text-accent-foreground hover:bg-orange-light font-semibold"
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
