import { ShieldCheck, Target, Users, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";

const values = [
  { icon: Target, title: "Precision", desc: "Testing solutions that meet the highest international accuracy standards." },
  { icon: Users, title: "Partnership", desc: "A trusted extension of your quality team, built on lasting relationships." },
  { icon: ShieldCheck, title: "Integrity", desc: "Honest advice, transparent pricing, and genuine parts — always." },
  { icon: Award, title: "Excellence", desc: "Continuous improvement in service delivery and technical knowledge." },
];

const stats = [
  { value: "35+", label: "Years of Experience" },
  { value: "500+", label: "Machines Installed" },
  { value: "3+", label: "Industries Served" },
];

const About = () => (
  <main className="pt-16">
    {/* Hero */}
    <section className="bg-navy-gradient py-24">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <p className="text-accent font-montserrat text-sm font-semibold tracking-[0.25em] uppercase mb-4">About Hung Ta (M)</p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-6">
            Precision You Can<br />Count On
          </h1>
          <p className="text-primary-foreground/60 max-w-xl text-lg font-montserrat">
            Malaysia's authorised distributor for Hung Ta precision testing instruments since 1990.
          </p>
        </AnimatedSection>

        {/* Stats bar */}
        <AnimatedSection delay={0.2}>
          <div className="mt-14 grid grid-cols-3 max-w-2xl gap-8">
            {stats.map((s) => (
              <div key={s.label} className="border-l-2 border-accent/40 pl-5">
                <p className="text-3xl md:text-4xl font-serif text-primary-foreground">{s.value}</p>
                <p className="text-primary-foreground/50 text-sm font-montserrat mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>

    {/* Story — warm cream background with sticky sidebar */}
    <section className="py-24 bg-warm-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[280px_1fr] gap-12">
          {/* Sticky sidebar */}
          <AnimatedSection>
            <div className="md:sticky md:top-24">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Our Story</h2>
              <div className="w-12 h-1 bg-accent rounded-full" />
            </div>
          </AnimatedSection>

          {/* Scrolling content */}
          <AnimatedSection delay={0.15}>
            <div className="space-y-6 text-muted-foreground leading-relaxed font-montserrat">
              <p>
                Hung Ta (M) Instrument Sdn Bhd was established in 1990 as the authorised Malaysian distributor for Hung Ta Instrument Co., Ltd. — one of Asia's leading manufacturers of universal testing machines and material testing systems.
              </p>
              <p>
                From our base in Selangor, we serve manufacturers, laboratories, and quality control departments across Peninsular Malaysia and East Malaysia. Our mission is to provide world-class material testing solutions backed by local expertise, rapid servicing, and genuine spare parts support.
              </p>
              <p>
                Over three decades, we have installed more than 500 testing systems across industries ranging from rubber glove manufacturing and textile production to steel fabrication and automotive component testing. Our team of factory-trained engineers ensures every installation is commissioned to international standards and every customer receives ongoing support throughout the equipment lifecycle.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* Mission & Vision — navy section */}
    <section className="py-24 bg-navy-gradient">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="rounded-lg p-8 h-full border border-primary-foreground/10 bg-primary-foreground/5">
              <h3 className="font-serif text-2xl text-accent mb-4">Our Mission</h3>
              <p className="text-primary-foreground/60 leading-relaxed font-montserrat text-sm">
                To be Malaysia's most trusted partner for material testing equipment — delivering precision instruments, expert servicing, and responsive support that empowers manufacturers to meet the highest quality standards.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="rounded-lg p-8 h-full border border-primary-foreground/10 bg-primary-foreground/5">
              <h3 className="font-serif text-2xl text-accent mb-4">Our Vision</h3>
              <p className="text-primary-foreground/60 leading-relaxed font-montserrat text-sm">
                To equip every Malaysian manufacturer and research laboratory with world-class testing technology and the technical support to use it with confidence — advancing quality, safety, and innovation across the nation's industries.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>

    {/* Values — warm white */}
    <section className="py-24 bg-warm-white">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h2 className="font-serif text-3xl md:text-4xl text-center mb-14">Our Values</h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {values.map((v, i) => (
            <AnimatedSection key={v.title} delay={i * 0.1}>
              <div className="group relative bg-warm-cream border border-border rounded-lg p-7 text-center transition-all duration-300 hover:bg-navy hover:border-accent/30 cursor-default overflow-hidden">
                {/* Orange top border on hover */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="w-14 h-14 rounded-full bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                  <v.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-serif text-lg mb-2 text-foreground group-hover:text-primary-foreground transition-colors duration-300">{v.title}</h3>
                <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/60 transition-colors duration-300 font-montserrat">{v.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Certifications — premium navy + gold */}
    <section className="py-24" style={{ background: '#0B1C2E' }}>
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <p className="text-center text-sm font-semibold tracking-[0.3em] uppercase mb-3 font-montserrat" style={{ color: '#C9A84C' }}>
            Quality Assurance
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 font-cormorant text-primary-foreground">
            Certifications & Standards
          </h2>
          <p className="text-center max-w-2xl mx-auto mb-16 text-base font-montserrat" style={{ color: 'rgba(255,255,255,0.5)' }}>
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
                  className="inline-block text-[10px] font-bold tracking-wider uppercase rounded-full px-2.5 py-0.5 mb-3 font-montserrat"
                  style={{ background: 'rgba(201,168,76,0.15)', color: '#C9A84C' }}
                >
                  {item.tag}
                </span>
                <h3 className="text-lg font-bold mb-1 font-cormorant text-primary-foreground">
                  {item.cert}
                </h3>
                <p className="text-xs font-montserrat" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {item.desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.7}>
          <div className="mt-16 text-center pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-xs tracking-wider uppercase font-montserrat" style={{ color: 'rgba(255,255,255,0.35)' }}>
              SIRIM-Accredited · Trusted by 500+ installations across Malaysia
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>

    {/* Orange CTA banner */}
    <section className="bg-accent py-16">
      <div className="container mx-auto px-4 text-center">
        <AnimatedSection>
          <h2 className="font-serif text-3xl md:text-4xl text-accent-foreground mb-4">Ready to Upgrade Your Testing?</h2>
          <p className="text-accent-foreground/70 max-w-lg mx-auto mb-8 font-montserrat">
            Speak with our engineers about the right Hung Ta machine for your application.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-navy text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-navy-light transition-colors duration-300"
          >
            Get in Touch <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  </main>
);

export default About;
