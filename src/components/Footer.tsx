import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <div className="mb-4">
            <BrandLogo variant="light" size="sm" />
          </div>
          <p className="text-primary-foreground/60 text-sm leading-relaxed">
            Hung Ta Instrument Enterprise, supplier of hydraulic, compression and electrical tensile testing machines for metal, rubber and copper industries.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-accent">Quick Links</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            {[
              { label: "Products", path: "/products" },
              { label: "Hydraulic Machines", path: "/hydraulic-testing-machine-malaysia" },
              { label: "Compression Machines", path: "/compression-machine-malaysia" },
              { label: "Electrical Tensile Machines", path: "/electrical-tensile-testing-machine-malaysia" },
              { label: "Services", path: "/services" },
              { label: "About Us", path: "/about" },
              { label: "Contact", path: "/contact" },
            ].map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="hover:text-accent transition-colors">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-accent">Industries</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            {["Metal Testing", "Rubber Testing", "Copper Testing", "Compression Testing", "Factory QC"].map((industry) => (
              <li key={industry}>{industry}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-accent">Contact Us</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
              <span>109, Taman AST,<br />Jalan Sungai Ujong,<br />70200 Seremban, Negeri Sembilan, Malaysia</span>
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
          <p className="text-xs text-primary-foreground/40 mt-4">Service area: Malaysia, Singapore and Asia.</p>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 mt-12 pt-6 text-center text-xs text-primary-foreground/40">
        &copy; {new Date().getFullYear()} Hung Ta Instrument Enterprise All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
