import { useMemo, useState } from "react";
import { ArrowUpRight, Cable, CircleDot, Layers, Search, Scissors, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnimatedSection from "@/components/AnimatedSection";
import { usePageSeo } from "@/hooks/use-page-seo";
import { buildWhatsAppUrl } from "@/lib/leadLinks";

interface SparePartsProps {
  onOpenQuote: () => void;
}

type GripItem = { code: string; name: string; family: string; image?: string };

// Grip references are transcribed from the Taiwan Hung Ta booklet; China partner supply is confirmed by the owner, while machine compatibility must still be checked.
const grips: GripItem[] = [
    { code: "SF309", name: "Hydraulic Grips", family: "Tensile grips", image: "sf309-hydraulic-grips-concept.png" },
    { code: "SF308", name: "Tensile Grips", family: "Tensile grips", image: "sf308-tensile-grips-concept.png" },
  { code: "SF151", name: "Compression Platen", family: "Compression fixtures", image: "sf151-compression-platen-concept.png" },
    { code: "SF155", name: "3 Points Rupture Fixtures for Concrete", family: "Bending fixtures", image: "sf155-concrete-bending-fixture-concept.png" },
  { code: "SF014", name: "Wedge Grips", family: "Tensile grips", image: "sf014-wedge-grips-concept.png" },
  { code: "SF019", name: "Wedge Grips", family: "Tensile grips", image: "sf019-wedge-grips-concept.png" },
    { code: "SF004C", name: "Wedge Grips", family: "Tensile grips", image: "sf004c-wedge-grips-concept.png" },
  { code: "SF155A", name: "Transverse Test Fixture", family: "Bending fixtures", image: "sf155a-transverse-fixture-concept.png" },
  { code: "SF006E", name: "E Type Grips", family: "Tensile grips", image: "sf006e-e-type-grips-concept.png" },
  { code: "SF051", name: "Wedge Grips", family: "Tensile grips", image: "sf051-wedge-grips-concept.png" },
  { code: "SF021", name: "Spoke Fixture", family: "Wire & rope fixtures", image: "sf021-spoke-fixture-concept.png" },
  { code: "SF035", name: "Steel Rope Fixture", family: "Wire & rope fixtures", image: "sf035-steel-rope-fixture-concept.png" },
  { code: "SF001J", name: "J Type Grips", family: "Tensile grips", image: "sf001j-j-type-grips-concept.png" },
  { code: "SF063", name: "Strand Grips", family: "Wire & rope fixtures", image: "sf063-strand-grips-concept.png" },
  { code: "SF046", name: "Fixtures for Nub / Nut Shape", family: "Special fixtures", image: "sf046-nut-shape-fixture-concept.png" },
  { code: "SF065", name: "Fixtures for Nub / Nut Shape", family: "Special fixtures", image: "sf065-nub-nut-fixture-concept.png" },
  { code: "SF042", name: "Oval Ring Fixture", family: "Special fixtures", image: "sf042-oval-ring-fixture-concept.png" },
  { code: "SF013", name: "Single Yarn Fixture", family: "Textile & webbing", image: "sf013-single-yarn-fixture-concept.png" },
  { code: "SF089C", name: "Tensile Grips for Cloth Strip", family: "Textile & webbing", image: "sf089c-cloth-strip-grips-concept.png" },
  { code: "SF072", name: "Webbing Fixture", family: "Textile & webbing", image: "sf072-webbing-fixture-concept.png" },
  { code: "SF158", name: "Spool Flat Closed Clamp", family: "Textile & webbing", image: "sf158-spool-clamp-concept.png" },
  { code: "SF127", name: "Webbing Fixture", family: "Textile & webbing", image: "sf127-webbing-fixture-concept.png" },
  { code: "SF009", name: "Screw-Driven Grips for Yarn", family: "Textile & webbing", image: "sf009-yarn-screw-grips-concept.png" },
  { code: "SF089", name: "Webbing Fixture", family: "Textile & webbing", image: "sf089-webbing-fixture-concept.png" },
  { code: "SF078T", name: "T Type Grips for Leather", family: "Rubber & leather", image: "sf078t-leather-t-grips-concept.png" },
  { code: "SF157", name: "Grips for Rope & Cord", family: "Wire & rope fixtures", image: "sf157-rope-cord-grips-concept.png" },
  { code: "SF066", name: "Fabric Clamp", family: "Textile & webbing", image: "sf066-fabric-clamp-concept.png" },
  { code: "SF093", name: "Manual Single Eccentric Grips for Rubber", family: "Rubber & leather", image: "sf093-rubber-eccentric-grips-concept.png" },
  { code: "SF012L", name: "L Type Grips for Rubber", family: "Rubber & leather", image: "sf012l-rubber-l-grips-concept.png" },
  { code: "SF008", name: "Peel Fixture for Footwear", family: "Rubber & leather", image: "sf008-footwear-peel-fixture-concept.png" },
  { code: "SF147", name: "Self-Closing Wedge Clamps", family: "Tensile grips", image: "sf147-self-closing-wedge-grips-concept.png" },
  { code: "SF126PE", name: "Grips for PE Film", family: "Film & plastics", image: "sf126pe-film-grips-concept.png" },
  { code: "SF094", name: "Latex & PE Film Grips", family: "Film & plastics", image: "sf094-latex-film-grips-concept.png" },
  { code: "SF043PE", name: "Grips for PE Board", family: "Film & plastics", image: "sf043pe-board-grips-concept.png" },
  { code: "SF159", name: "Anvil Clamps for Brick Tear Tests", family: "Special fixtures", image: "sf159-brick-anvil-clamps-concept.png" },
  { code: "SF039 8", name: "Peg Type Holder", family: "Special fixtures", image: "sf039-8-peg-holder-concept.png" },
  { code: "SF609B", name: "Tensile Grips for Tyre Spoke", family: "Wire & rope fixtures", image: "sf609b-tyre-spoke-grips-concept.png" },
  { code: "SF002", name: "3 Points Rupture Fixtures", family: "Bending fixtures", image: "sf002-3-point-bending-fixture-concept.png" },
  { code: "SF061", name: "Compression Cages", family: "Compression fixtures", image: "sf061-compression-cage-concept.png" },
  { code: "SF100", name: "Lunging Fixture", family: "Special fixtures", image: "sf100-special-fixture-concept.png" },
  { code: "SF301A", name: "Tensile Grips for Fine Wire / Nylon Thread", family: "Wire & rope fixtures", image: "sf301a-fine-wire-grips-concept.png" },
  { code: "SF082", name: "Pneumatic Grips", family: "Tensile grips", image: "sf082-pneumatic-grips-concept.png" },
  { code: "SF134", name: "Pneumatic Wedge Grips", family: "Tensile grips", image: "sf134-pneumatic-wedge-grips-concept.png" },
  { code: "SF122", name: "Ball Base", family: "Bending fixtures", image: "sf122-ball-base-concept.png" },
  { code: "SF156", name: "Bending Plane Fixture", family: "Bending fixtures", image: "sf156-bending-plane-fixture-concept.png" },
  { code: "SF003BB", name: "B Type Tensile Grips", family: "Tensile grips", image: "sf003bb-b-type-grips-concept.png" },
  { code: "SF116", name: "Pneumatic Grips", family: "Tensile grips", image: "sf116-pneumatic-grips-concept.png" },
  { code: "SF186B", name: "Tensile Grips for Fine Fiber Optic", family: "Wire & rope fixtures", image: "sf186b-fiber-optic-grips-concept.png" },
  { code: "SF185B", name: "Tensile Grips for Fine Fiber Optic", family: "Wire & rope fixtures", image: "sf185b-fiber-optic-grips-concept.png" },
  { code: "SF165", name: "Adhesion Grips for Leather", family: "Rubber & leather", image: "sf165-leather-adhesion-grips-concept.png" },
  { code: "SF200", name: "Tensile Grips for Anti-Erosion Netting", family: "Textile & webbing", image: "sf200-netting-grips-concept.png" },
  { code: "SF199PVC", name: "Tensile Grips for Rubber-Insulated Copper Wire", family: "Wire & rope fixtures", image: "sf199pvc-insulated-copper-grips-concept.png" },
  { code: "SF166", name: "Compression Cages", family: "Compression fixtures", image: "sf166-compression-cage-concept.png" },
  { code: "SF124A", name: "Tensile Grips for Fine Insulated Copper Wire", family: "Wire & rope fixtures", image: "sf124a-fine-copper-grips-concept.png" },
  { code: "SF164", name: "Bending Nose", family: "Bending fixtures", image: "sf164-bending-nose-concept.png" },
  { code: "SF201PVC", name: "Tensile Grips for Rubber-Insulated Wire", family: "Wire & rope fixtures", image: "sf201pvc-insulated-wire-grips-concept.png" },
];

const SpareParts = ({ onOpenQuote }: SparePartsProps) => {
  const [family, setFamily] = useState("All grips");
  const [search, setSearch] = useState("");
  usePageSeo({
    title: "Testing Machine Grips, Fixtures & Spare Parts | Hung Ta Malaysia",
    description: "Find testing machine grips, jaws, wire fixtures, compression platens, paper specimen tools and compatible accessories. Share your machine model and sample details for a fit check.",
  });

  const whatsappUrl = buildWhatsAppUrl({
    source: "spare-parts-page",
    machine: "Testing machine spare part / grip / fixture",
    requirement: "Please check compatibility. I will provide the tester model, sample material, sample size and required test force.",
  });
  const families = ["All grips", ...new Set(grips.map((grip) => grip.family))];
  const visibleGrips = useMemo(() => grips.filter((grip) =>
    (family === "All grips" || grip.family === family) &&
    `${grip.code} ${grip.name} ${grip.family}`.toLowerCase().includes(search.toLowerCase())
  ), [family, search]);

  return (
    <main className="pt-20">
      <section className="bg-primary text-primary-foreground overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <AnimatedSection>
            <p className="text-accent text-xs font-bold uppercase tracking-[0.28em] mb-4">Parts & fixtures</p>
            <h1 className="font-serif text-5xl md:text-6xl mb-6">Grip</h1>
            <p className="text-lg text-primary-foreground/70 max-w-xl leading-relaxed">Browse individual grip and fixture models by code and application. These listed models can be supplied through our China partner; we confirm exact fit and specifications against your machine and sample before quotation.</p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Button onClick={onOpenQuote} className="rounded-full bg-accent text-white hover:bg-orange-light font-semibold gap-2">Request a fit check <ArrowUpRight className="w-4 h-4" /></Button>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold hover:bg-white/10">Send details on WhatsApp</a>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <figure className="rounded-xl overflow-hidden border border-white/10 bg-white/5">
              <img src="/product-images/spare-parts-fixtures-concept.png" alt="Illustrative studio image of material-testing grips and fixtures" className="w-full aspect-[3/2] object-cover" />
              <figcaption className="px-4 py-2 text-xs text-primary-foreground/55">Illustrative visual only - confirm actual part design and compatibility before order.</figcaption>
            </figure>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent mb-3">Individual grip catalogue</p>
            <h2 className="text-3xl md:text-4xl font-black mb-4">{visibleGrips.length} grips & fixtures</h2>
            <p className="text-muted-foreground max-w-3xl mb-7">Each item has its own card, model code and application. The codes below are transcribed from the legacy reference booklet; current supplier availability and code equivalence are not yet confirmed.</p>
          </AnimatedSection>
          <div className="flex flex-col lg:flex-row gap-4 justify-between mb-7">
            <div className="relative w-full lg:max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by code or grip type" className="pl-9 bg-white" /></div>
            <div className="flex gap-2 overflow-x-auto pb-2">{families.map((item) => <button key={item} onClick={() => setFamily(item)} className={`px-3 py-2 text-xs font-semibold whitespace-nowrap rounded-full border ${family === item ? "bg-primary text-white border-primary" : "bg-white text-primary border-border"}`}>{item}</button>)}</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {visibleGrips.map((grip) => {
              const imagePath = grip.image ? `/product-images/${grip.image}` : undefined;
              const itemWhatsApp = buildWhatsAppUrl({ source: "spare-parts-grip-card", machine: `${grip.code} ${grip.name}`, requirement: "Please confirm current availability and compatibility with my testing machine and specimen." });
              return <article key={grip.code} className="overflow-hidden rounded-lg border border-border bg-white flex flex-col hover:border-accent/50 hover:shadow-navy transition-all">
                <div className="aspect-square bg-muted border-b border-border flex items-center justify-center p-3">
                  {imagePath ? <img src={imagePath} alt={`${grip.code} ${grip.name} illustrative render`} className="w-full h-full object-contain" loading="lazy" /> : <div className="flex flex-col items-center gap-2 text-muted-foreground"><Wrench className="w-8 h-8 opacity-50" /><span className="text-[10px] uppercase tracking-wider">New item image pending</span></div>}
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-[0.16em]">{grip.family}</span>
                  <h3 className="font-black text-sm mt-1">{grip.code}</h3>
                  <p className="text-xs text-muted-foreground mt-1 flex-1">{grip.name}</p>
                  {imagePath && <p className="text-[10px] text-muted-foreground mt-3">AI illustrative render - verify actual part.</p>}
                  <a href={itemWhatsApp} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center justify-center gap-1 rounded-full bg-primary text-white px-3 py-2 text-[11px] font-semibold">Check fit / request quote <ArrowUpRight className="w-3 h-3" /></a>
                </div>
              </article>;
            })}
          </div>
        </div>
      </section>

      <section className="py-14 bg-muted border-y border-border">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-center">
          <div><p className="text-xs font-bold uppercase tracking-[0.24em] text-accent mb-2">For a faster fit check</p><h2 className="text-2xl font-black mb-2">Send us these four details</h2><p className="text-sm text-muted-foreground">Machine model · sample material · sample dimensions · maximum test force</p></div>
          <div className="flex flex-wrap gap-3"><Button onClick={onOpenQuote} className="rounded-full bg-primary text-white">Request a fit check</Button><a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold">WhatsApp</a></div>
        </div>
      </section>
    </main>
  );
};

export default SpareParts;
