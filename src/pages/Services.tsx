import { Button } from "@/components/ui/button";
import { Wrench, Target, Package, GraduationCap, ArrowUpRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { Link } from "react-router-dom";
import { usePageSeo } from "@/hooks/use-page-seo";

interface ServicesProps {
  onOpenQuote: () => void;
}

const services = [
  {
    icon: Wrench,
    title: "Machine Servicing & Repair",
    desc: "Factory-trained technicians perform preventive maintenance, breakdown repair, and performance restoration on all Hung Ta UTM models. We carry genuine spare parts and use OEM-standard procedures to ensure your equipment returns to peak operating condition.",
    points: ["Preventive maintenance contracts", "Emergency breakdown repair", "Load cell recalibration", "Software updates & upgrades"],
  },
  {
    icon: Target,
    title: "Calibration Services",
    desc: "Traceable calibration of load cells, extensometers, and displacement measurement systems. Our calibration procedures follow ISO 7500-1 and ASTM E4 requirements, ensuring your test results are audit-ready and internationally recognised.",
    points: ["Force calibration (ISO 7500-1)", "Extensometer verification", "Displacement accuracy checks", "Calibration certificates issued"],
  },
  {
    icon: Package,
    title: "Spare Parts Supply",
    desc: "As the authorised Malaysian distributor, we maintain a local inventory of critical spare parts including load cells, grips, jaws, extensometer arms, servo motors, and control boards. Fast delivery across Peninsular Malaysia.",
    points: ["Genuine Hung Ta spare parts", "Local stock for critical items", "Express delivery available", "Competitive pricing"],
  },
  {
    icon: GraduationCap,
    title: "Installation & Training",
    desc: "Complete turnkey installation of new equipment including site preparation guidance, machine commissioning, software setup, and operator training. We ensure your team is fully competent before we leave your site.",
    points: ["Site survey & preparation", "Machine installation & commissioning", "Operator training (hands-on)", "Test method development support"],
  },
];

const Services = ({ onOpenQuote }: ServicesProps) => {
  usePageSeo({
    title: "Testing Machine Service, Calibration & Support | Hung Ta",
    description:
      "Service support for Hung Ta testing instruments, including calibration, repair, upgrading, software application, spare parts and installation training.",
  });

  return (
  <main className="pt-20">
    <section className="bg-primary py-24 industrial-grid">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <p className="text-accent text-xs font-bold uppercase tracking-[0.28em] mb-4">Lifecycle care</p>
          <h1 className="font-serif text-5xl md:text-6xl text-primary-foreground mb-4">Service, Calibration & Support</h1>
          <p className="text-primary-foreground/70 max-w-xl text-lg">Support for testing instruments, machine servicing, upgrading, modification, calibration and software application.</p>
        </AnimatedSection>
      </div>
    </section>

    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 space-y-12">
        {services.map((svc, i) => (
          <AnimatedSection key={svc.title} delay={i * 0.1}>
            <div className="bg-card border border-border rounded-lg p-8 md:flex gap-8">
              <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mb-4 md:mb-0">
                <svc.icon className="w-7 h-7 text-accent" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-3">{svc.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">{svc.desc}</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-5">
                  {svc.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <Button onClick={onOpenQuote} className="rounded-full bg-accent text-white hover:bg-orange-light font-semibold gap-1" size="sm">
                  Get Service Quote <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>

    <section className="py-20 bg-navy-gradient">
      <div className="container mx-auto px-4 text-center">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-black text-primary-foreground mb-4">Need Urgent Support?</h2>
          <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8">Our service team is available for emergency breakdown support across Peninsular Malaysia.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a href="https://wa.me/60126280096" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="rounded-full bg-accent text-white hover:bg-orange-light font-semibold px-7">WhatsApp Us Now</Button>
            </a>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="rounded-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold px-7">Contact Page</Button>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  </main>
  );
};

export default Services;
