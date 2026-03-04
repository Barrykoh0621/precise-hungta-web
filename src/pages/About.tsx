import { ShieldCheck, Target, Users, Award } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const values = [
  { icon: Target, title: "Precision", desc: "We deliver testing solutions that meet the highest international accuracy standards." },
  { icon: Users, title: "Partnership", desc: "We build lasting relationships with our clients, serving as a trusted extension of their quality team." },
  { icon: ShieldCheck, title: "Integrity", desc: "Honest advice, transparent pricing, and genuine parts — always." },
  { icon: Award, title: "Excellence", desc: "Continuous improvement in everything we do, from service delivery to technical knowledge." },
];

const About = () => (
  <main className="pt-16">
    <section className="bg-navy-gradient py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h1 className="text-4xl md:text-5xl font-black text-primary-foreground mb-4">About Us</h1>
          <p className="text-primary-foreground/70 max-w-xl text-lg">Malaysia's authorised distributor for Hung Ta precision testing instruments.</p>
        </AnimatedSection>
      </div>
    </section>

    {/* Story */}
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <AnimatedSection>
          <h2 className="text-3xl font-black mb-6">Our Story</h2>
          <div className="prose prose-lg text-muted-foreground space-y-4">
            <p>
              Hung Ta (M) Instrument Sdn Bhd was established in 2005 as the authorised Malaysian distributor for Hung Ta Instrument Co., Ltd. — one of Asia's leading manufacturers of universal testing machines and material testing systems.
            </p>
            <p>
              From our base in Selangor, we serve manufacturers, laboratories, and quality control departments across Peninsular Malaysia and East Malaysia. Our mission is to provide world-class material testing solutions backed by local expertise, rapid servicing, and genuine spare parts support.
            </p>
            <p>
              Over two decades, we have installed more than 500 testing systems across industries ranging from rubber glove manufacturing and textile production to steel fabrication and automotive component testing. Our team of factory-trained engineers ensures every installation is commissioned to international standards and every customer receives ongoing support throughout the equipment lifecycle.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>

    {/* Mission & Vision */}
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="bg-card border border-border rounded-lg p-8 h-full">
              <h3 className="text-2xl font-bold mb-4 text-accent">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be Malaysia's most trusted partner for material testing equipment — delivering precision instruments, expert servicing, and responsive support that empowers manufacturers to meet the highest quality standards.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="bg-card border border-border rounded-lg p-8 h-full">
              <h3 className="text-2xl font-bold mb-4 text-accent">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To equip every Malaysian manufacturer and research laboratory with world-class testing technology and the technical support to use it with confidence — advancing quality, safety, and innovation across the nation's industries.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-3xl font-black text-center mb-12">Our Values</h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {values.map((v, i) => (
            <AnimatedSection key={v.title} delay={i * 0.1}>
              <div className="text-center p-6">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Certifications */}
    <section className="py-24" style={{ background: '#0B1C2E' }}>
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <p className="text-center text-sm font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: '#C9A84C', fontFamily: 'Montserrat, sans-serif' }}>
            Quality Assurance
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#FFFFFF' }}>
            Certifications & Standards
          </h2>
          <p className="text-center max-w-2xl mx-auto mb-16 text-base" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Montserrat, sans-serif' }}>
            Our instruments meet the most rigorous international testing standards, ensuring reliability and precision across every application.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {[
            { cert: "ISO 9001:2015", desc: "Quality Management System", tag: "ISO" },
            { cert: "ASTM E8/E9", desc: "Metallic Materials Testing", tag: "ASTM" },
            { cert: "ISO 6892", desc: "Tensile Testing of Metals", tag: "ISO" },
            { cert: "ISO 7500-1", desc: "Testing Machine Verification", tag: "ISO" },
            { cert: "ASTM E4", desc: "Force Verification Standards", tag: "ASTM" },
            { cert: "CE Certified", desc: "European Conformity Mark", tag: "Safety" },
            { cert: "ISO 37", desc: "Rubber Tensile Properties", tag: "Rubber" },
            { cert: "EN 455", desc: "Medical Gloves Standards", tag: "Medical" },
          ].map((item, i) => (
            <AnimatedSection key={item.cert} delay={i * 0.08}>
              <div
                className="relative rounded-lg p-6 transition-all duration-300 group cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderTop: '2px solid transparent',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderTopColor = '#C9A84C'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderTopColor = 'transparent'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
              >
                <span
                  className="inline-block text-[10px] font-bold tracking-wider uppercase rounded-full px-2.5 py-0.5 mb-3"
                  style={{ background: 'rgba(201,168,76,0.15)', color: '#C9A84C', fontFamily: 'Montserrat, sans-serif' }}
                >
                  {item.tag}
                </span>
                <h3 className="text-lg font-bold mb-1" style={{ color: '#FFFFFF', fontFamily: "'Cormorant Garamond', serif" }}>
                  {item.cert}
                </h3>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Montserrat, sans-serif' }}>
                  {item.desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.7}>
          <div className="mt-16 text-center pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-xs tracking-wider uppercase" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Montserrat, sans-serif' }}>
              SIRIM-Accredited · Trusted by 500+ installations across Malaysia
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  </main>
);

export default About;
