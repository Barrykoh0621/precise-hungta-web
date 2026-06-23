import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded bg-accent flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-accent-foreground" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2v20M8 6l4-4 4 4M8 18l4 4 4-4" />
              </svg>
            </div>
            <span className="font-bold text-lg">Hung Ta <span className="text-accent">Instrument</span></span>
          </div>
          <p className="text-primary-foreground/60 text-sm leading-relaxed">
            Malaysia testing instrument supplier for tensile, universal, material, tyre, rubber, plastics, wire and paper testing applications.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4 text-accent">Quick Links</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            {[
              { label: "Products", path: "/products" },
              { label: "Services", path: "/services" },
              { label: "About Us", path: "/about" },
              { label: "Contact", path: "/contact" },
            ].map((l) => (
              <li key={l.path}>
                <Link to={l.path} className="hover:text-accent transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Industries */}
        <div>
          <h4 className="font-semibold mb-4 text-accent">Industries</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            {["Metal & Steel", "Rubber & Plastics", "Wire & Cable", "Tyre & Auto Parts", "Manufacturing QC"].map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-4 text-accent">Contact Us</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
              <span>109 Taman AST,<br />Jalan Sungai Ujong,<br />Seremban, Negeri Sembilan, Malaysia</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="w-4 h-4 shrink-0 text-accent" />
              <div className="space-y-1">
                <a href="tel:+60126280096" className="block hover:text-accent transition-colors">012-628 0096 Sales Manager</a>
                <a href="tel:+60122201096" className="block hover:text-accent transition-colors">012-220 1096 Product Specialist</a>
              </div>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 shrink-0 text-accent" />
              <a href="mailto:hungtatest@yahoo.com" className="hover:text-accent transition-colors">hungtatest@yahoo.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 mt-12 pt-6 text-center text-xs text-primary-foreground/40">
        © {new Date().getFullYear()} Hung Ta Instrument Sdn Bhd. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
