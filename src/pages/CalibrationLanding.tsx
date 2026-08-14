import { ArrowRight, CheckCircle2, ClipboardCheck, Gauge, ShieldCheck, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import { usePageSeo } from "@/hooks/use-page-seo";
import { trackLeadEvent } from "@/lib/analytics";
import { buildWhatsAppUrl } from "@/lib/leadLinks";

interface CalibrationLandingProps {
  onOpenQuote: () => void;
}

const calibrationNeeds = [
  "Machine model, capacity and serial number",
  "Current machine condition and location",
  "Required calibration date or audit deadline",
  "Existing certificate, report or customer requirement",
];

const equipmentTypes = [
  "Tensile testing machines",
  "Universal testing machines",
  "Load cells and force systems",
  "Compression and material testing equipment",
];

const searchTerms = [
  "Testing machine calibration Malaysia",
  "Tensile machine calibration",
  "Universal testing machine calibration",
  "Load cell calibration Malaysia",
  "ISO 17025 calibration Malaysia",
];

const calibrationFocus = [
  {
    title: "Testing machine calibration",
    desc: "Support for factories and QA laboratories that need force, displacement or load-system checking before customer audits.",
  },
  {
    title: "Tensile machine calibration",
    desc: "For tensile testers used in metal, rubber, copper, wire, cable and material strength testing applications.",
  },
  {
    title: "Universal testing machine calibration",
    desc: "For UTM systems used across tensile, compression, bending and flexural testing workflows.",
  },
  {
    title: "Load cell calibration support",
    desc: "For load cells, force systems and load measurement chains used in material testing equipment.",
  },
  {
    title: "ISO/IEC 17025 preparation",
    desc: "Hung Ta is preparing ISO/IEC 17025 calibration capability. We will only make official certificate claims after approval documents are ready.",
  },
];

const CalibrationLanding = ({ onOpenQuote }: CalibrationLandingProps) => {
  usePageSeo({
    title: "Testing Machine Calibration Malaysia | Hung Ta Instrument",
    description:
      "Calibration support for tensile machines, universal testing machines, load systems and factory QC equipment in Malaysia. Hung Ta is preparing ISO/IEC 17025 calibration capability.",
    canonicalPath: "/calibration-service-malaysia",
  });

  return (
    <main className="pt-20">
      <section className="bg-primary text-primary-foreground industrial-grid">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <AnimatedSection>
            <div className="max-w-4xl">
              <p className="text-accent text-xs font-bold uppercase tracking-[0.28em] mb-4">Testing machine calibration Malaysia</p>
              <h1 className="font-serif text-5xl md:text-7xl leading-[0.95] mb-6">Calibration support for testing machines and QC equipment.</h1>
              <p className="text-lg md:text-xl text-primary-foreground/72 max-w-3xl leading-relaxed">
                Calibration support for tensile machines, universal testing machines, load systems and material testing equipment. Hung Ta is preparing ISO/IEC 17025 calibration capability for audit-driven factories and laboratories.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Button onClick={onOpenQuote} className="rounded-full bg-accent text-white hover:bg-orange-light font-semibold gap-2 px-7">
                  Request Calibration Support <ArrowRight className="w-4 h-4" />
                </Button>
                <a
                  href={buildWhatsAppUrl({
                    source: "calibration_landing_hero",
                    machine: "Testing machine calibration",
                    requirement: "Calibration support for tensile / universal testing machine",
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackLeadEvent("whatsapp_click", { location: "calibration_landing_hero" })}
                >
                  <Button variant="outline" className="rounded-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold px-7">
                    WhatsApp Sales Manager
                  </Button>
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-muted border-b border-border">
        <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-3">
          {["Factory QC", "QA audits", "Load systems", "ISO/IEC 17025 preparation"].map((item) => (
            <div key={item} className="bg-white border border-border rounded-lg px-4 py-3 flex items-center gap-2 text-sm font-semibold">
              <ShieldCheck className="w-4 h-4 text-accent" />
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10">
          <AnimatedSection>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent mb-3">Calibration buyer fit</p>
            <h2 className="text-3xl md:text-5xl font-black mb-5">For factories and laboratories that need reliable calibration records</h2>
            <p className="text-muted-foreground leading-relaxed">
              The strongest calibration enquiries usually come from QA teams preparing for customer audits, internal quality checks or machine reliability reviews.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.08}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="border border-border rounded-lg p-6 bg-white">
                <Gauge className="w-6 h-6 text-accent mb-4" />
                <h3 className="text-xl font-black mb-4">Equipment</h3>
                <ul className="space-y-3">
                  {equipmentTypes.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-border rounded-lg p-6 bg-white">
                <ClipboardCheck className="w-6 h-6 text-accent mb-4" />
                <h3 className="text-xl font-black mb-4">Before Quotation</h3>
                <ul className="space-y-3">
                  {calibrationNeeds.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-3xl mb-10">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent mb-3">Calibration support scope</p>
              <h2 className="text-3xl md:text-5xl font-black mb-5">Built around the calibration searches buyers actually use</h2>
              <p className="text-muted-foreground leading-relaxed">
                This page is prepared for customers searching for testing machine calibration, tensile machine calibration, universal testing machine calibration, load cell calibration and ISO/IEC 17025 preparation support in Malaysia.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {calibrationFocus.map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 0.05}>
                <div className="h-full border border-border rounded-lg p-5 bg-white">
                  <ShieldCheck className="w-5 h-5 text-accent mb-4" />
                  <h3 className="text-lg font-black mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="bg-white border border-border rounded-lg p-8 md:p-10">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                <div className="max-w-2xl">
                  <Wrench className="w-8 h-8 text-accent mb-5" />
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent mb-3">Google Ads focus</p>
                  <h2 className="text-3xl md:text-4xl font-black mb-4">Search terms we are targeting</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    These are high-intent searches from customers who may already have testing equipment and need service, calibration support or audit readiness.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 max-w-xl">
                  {searchTerms.map((term) => (
                    <span key={term} className="bg-muted border border-border rounded-full px-4 py-2 text-sm font-semibold">
                      {term}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-navy-gradient text-center">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <p className="text-accent text-xs font-bold uppercase tracking-[0.24em] mb-3">Calibration support Malaysia</p>
            <h2 className="text-3xl md:text-5xl font-black text-primary-foreground mb-4">Need calibration support for a testing machine?</h2>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto mb-8">
              Send your machine model, capacity, location and calibration requirement. Hung Ta will advise the suitable next step.
            </p>
            <Button onClick={onOpenQuote} className="rounded-full bg-accent text-white hover:bg-orange-light font-semibold px-8">
              Request Calibration Support
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
};

export default CalibrationLanding;
