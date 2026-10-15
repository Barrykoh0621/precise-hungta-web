import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Download, Gauge, Wrench, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ht9501Img from "@/assets/ht-9501.jpg";
import ht2402Img from "@/assets/ht-2402.webp";
import ht2101Img from "@/assets/ht-2101.jpg";
import { products } from "@/data/products";
import { testingGuides } from "@/data/resources";
import { machinePages } from "@/data/machine-pages";
import { usePageSeo } from "@/hooks/use-page-seo";
import { trackLeadEvent } from "@/lib/analytics";

interface IndexProps { onOpenQuote: () => void; }
const images: Record<string, string> = { "ht-9501": ht9501Img, "ht-2402": ht2402Img, "ht-2101": ht2101Img };
const applications = [
  { label: "Metal & wire", description: "Review expected force, specimen dimensions, grips and elongation measurement for your material.", route: "/tensile-testing-machine-malaysia/", models: ["ht-9501", "ht-2101", "armstrong-waw-300d"] },
  { label: "Rubber & plastics", description: "Match the force range, travel, test speed and grip faces to rubber, plastics and polymer samples.", route: "/electrical-tensile-testing-machine-malaysia/", models: ["ht-2402", "ht-2402w25", "ht-2328-utm"] },
  { label: "Compression", description: "Start with specimen dimensions, expected load, platen requirements and the test method you need to follow.", route: "/compression-machine-malaysia/", models: ["armstrong-yew-3000e", "ht-9501", "armstrong-waw-300d"] },
];

export default function Index({ onOpenQuote }: IndexProps) {
  const [selected, setSelected] = useState(0);
  const application = applications[selected];
  usePageSeo({ title: "Tensile Testing Machines & Calibration Malaysia | Hung Ta Instrument", description: "Compare tensile, universal and compression testing machines. Hung Ta Instrument supports Malaysia factories with machine selection, grips, service and calibration enquiries.", canonicalPath: "/" });
  const productLink = (id: string) => machinePages[id]?.path || `/products/?product=${id}`;
  return <main className="home-page pt-20">
    <section className="machine-hero relative overflow-hidden" aria-labelledby="home-title">
      <img src={ht9501Img} width={1200} height={600} fetchPriority="high" decoding="async" alt="Hung Ta HT-9501 electro-hydraulic universal testing machine with control console" className="machine-hero-image absolute" />
      <div className="container mx-auto px-5 relative z-10"><div className="machine-hero-copy">
        <p className="text-xs font-semibold text-accent mb-5">MALAYSIA OPERATIONS SINCE 1992</p>
        <h1 id="home-title" className="text-4xl md:text-6xl leading-[1.08] mb-5">Hung Ta Instrument</h1>
        <p className="text-xl md:text-2xl font-semibold leading-snug mb-5">Materials testing machines.<br />Local service and support.</p>
        <p className="text-base text-primary/75 leading-relaxed max-w-md mb-7">Tensile, universal and compression testing systems for your factory or laboratory. Discuss your materials, fixtures and calibration requirements with our Malaysia team.</p>
        <div className="flex flex-wrap gap-3"><a href="#machine-selector" className="home-action bg-accent text-white hover:bg-orange-light">Find a testing machine <ArrowRight className="w-4 h-4" /></a><Link to="/calibration-service-malaysia/" className="home-action border border-primary/25 hover:bg-white">Calibration & service <Wrench className="w-4 h-4" /></Link></div>
      </div></div>
      <a href={productLink("ht-9501")} className="machine-hero-caption absolute z-10 text-xs font-medium underline underline-offset-4">HT-9501 / View system specifications <ArrowUpRight className="inline w-3 h-3" /></a>
    </section>
    <div className="border-y border-border"><div className="container mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-4 py-5 text-xs md:text-sm">{["Malaysia sales & support", "Machine & fixture selection", "Calibration enquiries", "Spare parts & servicing"].map(text => <span key={text} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 shrink-0 text-accent" />{text}</span>)}</div></div>

    <section id="machine-selector" className="scroll-mt-24 py-14 md:py-20"><div className="container mx-auto px-5">
      <div className="home-section-heading"><div><p className="home-eyebrow">EQUIPMENT SELECTION</p><h2 className="home-heading">Start with your application</h2></div><Link to="/products/" className="home-link">All testing equipment <ArrowRight className="w-4 h-4" /></Link></div>
      <div role="tablist" aria-label="Testing application" className="flex flex-wrap border-b border-border mb-7">{applications.map((item, index) => <button key={item.label} type="button" role="tab" id={`application-${index}`} aria-selected={selected === index} aria-controls="application-panel" tabIndex={selected === index ? 0 : -1}
        onKeyDown={event => { if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return; event.preventDefault(); const next = event.key === "Home" ? 0 : event.key === "End" ? applications.length - 1 : (selected + (event.key === "ArrowRight" ? 1 : -1) + applications.length) % applications.length; setSelected(next); document.getElementById(`application-${next}`)?.focus(); }}
        onClick={() => { setSelected(index); trackLeadEvent("application_select", { application: item.label }); }} className={`px-4 md:px-6 py-4 text-sm font-semibold border-b-2 ${selected === index ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-primary"}`}>{item.label}</button>)}</div>
      <div id="application-panel" role="tabpanel" aria-labelledby={`application-${selected}`}><div className="home-section-heading"><p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">{application.description}</p><Link to={application.route} className="home-link">Application details <ArrowUpRight className="w-4 h-4" /></Link></div>
        <div className="grid md:grid-cols-3 gap-6">{application.models.map(id => { const product = products.find(item => item.id === id)!; return <article key={id} className="border border-border rounded overflow-hidden flex flex-col bg-white">
          <a href={productLink(id)} className="block aspect-[4/3] border-b border-border bg-[#f7f7f7]"><img src={images[product.image] || `/${product.image}`} alt={`${product.brand || "Hung Ta"} ${product.model} ${product.name}`} width={600} height={450} loading="lazy" decoding="async" className="h-full w-full object-contain p-5 mix-blend-multiply" /></a>
          <div className="p-5 flex flex-col flex-1"><p className="text-xs text-muted-foreground mb-2">{product.brand || "Hung Ta"} / {product.categoryLabel}</p><h3 className="text-xl mb-2"><a href={productLink(id)}>{product.model}</a></h3><p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{product.name}</p><dl className="flex justify-between gap-3 border-t border-border pt-4 mb-5 text-sm"><dt className="text-muted-foreground">Capacity</dt><dd className="font-semibold">{product.specs.find(spec => spec.label === "Capacity")?.value || "Discuss your requirement"}</dd></dl><a href={productLink(id)} className="text-sm font-semibold text-accent flex items-center justify-between">Specifications & enquiry <ArrowRight className="w-4 h-4" /></a></div>
        </article>; })}</div>
      </div>
    </div></section>

    <section className="bg-[#f3f5f6] border-y border-border py-14 md:py-20"><div className="container mx-auto px-5 grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">
      <div><p className="home-eyebrow">KEEP YOUR EQUIPMENT WORKING</p><h2 className="home-heading mb-5">Calibration, service<br />and the right fixtures.</h2><p className="text-muted-foreground leading-relaxed mb-6 max-w-lg">Already have a testing machine? Send the brand, model, capacity, location and due date. We will review the scope and service requirements before quotation.</p><Link to="/calibration-service-malaysia/" className="home-link text-accent">Discuss calibration support <ArrowRight className="w-4 h-4" /></Link></div>
      <div className="divide-y divide-border border-y border-border">{[
        { icon: Gauge, title: "Testing machine calibration", text: "Tensile testers, UTM systems and load measurement requirements.", path: "/calibration-service-malaysia/" },
        { icon: Wrench, title: "Maintenance & troubleshooting", text: "Machine symptoms, previous service history and repair enquiries.", path: "/universal-testing-machine-service-malaysia/" },
        { icon: CheckCircle2, title: "Grips, fixtures & spare parts", text: "Match your specimen, force range and existing machine interface.", path: "/spare-parts/" },
      ].map(item => <a key={item.title} href={item.path} className="flex gap-4 py-6 group"><item.icon className="w-5 h-5 shrink-0 text-accent mt-1" /><div className="flex-1"><h3 className="text-base mb-2 group-hover:text-accent">{item.title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p></div><ArrowUpRight className="w-4 h-4 shrink-0 mt-1" /></a>)}</div>
    </div></section>

    <section className="py-14 md:py-20"><div className="container mx-auto px-5"><div className="home-section-heading"><div><p className="home-eyebrow">ARMSTRONG EQUIPMENT</p><h2 className="home-heading">More options for your laboratory</h2></div><Link to="/armstrong-testing-machines-malaysia/" className="home-link">Full Armstrong range <ArrowRight className="w-4 h-4" /></Link></div><div className="grid md:grid-cols-2 gap-6">{["armstrong-waw-300d", "armstrong-yew-3000e"].map(id => { const product = products.find(item => item.id === id)!; return <article key={id} className="border-y border-border py-6 grid grid-cols-[100px_1fr] sm:grid-cols-[160px_1fr] gap-5"><a href={productLink(id)}><img src={`/${product.image}`} width={240} height={240} alt={`Armstrong ${product.model}`} loading="lazy" className="w-full aspect-square object-contain" /></a><div><p className="text-xs text-muted-foreground mb-2">{product.specs[0].value}</p><h3 className="text-xl mb-2"><a href={productLink(id)}>{product.model}</a></h3><p className="text-sm text-muted-foreground leading-relaxed mb-4">{product.name}</p><a href={productLink(id)} className="home-link text-accent">View specifications <ArrowRight className="w-4 h-4" /></a></div></article>; })}</div></div></section>

    <section className="bg-[#f3f5f6] border-y border-border py-14 md:py-20"><div className="container mx-auto px-5"><div className="home-section-heading"><div><p className="home-eyebrow">TECHNICAL RESOURCES</p><h2 className="home-heading">Plan your next test</h2></div><Link to="/resources/" className="home-link">All guides <ArrowRight className="w-4 h-4" /></Link></div><div className="grid md:grid-cols-3 gap-7">{[testingGuides[0], testingGuides[1], testingGuides[3]].map(guide => <article key={guide.path} className="border-t-2 border-primary pt-5"><p className="text-xs text-muted-foreground mb-3">{guide.category}</p><h3 className="text-xl mb-3"><a href={guide.path} className="hover:text-accent">{guide.title}</a></h3><p className="text-sm text-muted-foreground leading-relaxed mb-5">{guide.description}</p><a href={guide.path} className="home-link">Read guide <ArrowRight className="w-4 h-4" /></a></article>)}</div></div></section>
    <section className="py-14 md:py-20"><div className="container mx-auto px-5 flex flex-col md:flex-row justify-between items-start gap-8"><div className="max-w-xl"><p className="home-eyebrow">TALK TO OUR MALAYSIA TEAM</p><h2 className="home-heading mb-4">What do you need to test?</h2><p className="text-muted-foreground leading-relaxed">Share your sample material, test method and capacity, or the model of your existing machine. Our team follows up during business hours.</p></div><div className="flex flex-col items-start gap-4 md:pt-7"><Button onClick={onOpenQuote} className="rounded bg-accent text-white hover:bg-orange-light gap-2 px-6">Request a quotation <ArrowUpRight className="w-4 h-4" /></Button><a href="/testing-machine-enquiry-checklist.txt" download className="home-link"><Download className="w-4 h-4" />Download enquiry checklist</a></div></div></section>
  </main>;
}
