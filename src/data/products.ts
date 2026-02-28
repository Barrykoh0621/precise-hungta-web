export interface Product {
  id: string;
  model: string;
  name: string;
  tagline: string;
  category: "metal" | "textile" | "rubber" | "accessory";
  categoryLabel: string;
  image: string;
  description: string;
  specs: { label: string; value: string }[];
  idealFor: string[];
  standards?: string[];
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "ht-2402",
    model: "HT-2402",
    name: "Single Column Benchtop Universal Testing Machine",
    tagline: "Compact precision — the ideal benchtop testing solution.",
    category: "metal",
    categoryLabel: "Multi-Purpose",
    image: "ht-2402",
    description: "The HT-2402 is Hung Ta's versatile single-column benchtop universal testing machine, delivering laboratory-grade accuracy in a compact footprint. Ideal for tensile, compression, peel, and flexural testing across a wide range of materials. Its intuitive PC-based software and quick-change grip system make it the perfect choice for QC stations, R&D labs, and production floors where space is limited but precision is non-negotiable.",
    specs: [
      { label: "Capacity", value: "100 N – 5 kN" },
      { label: "Configuration", value: "Single column, benchtop" },
      { label: "Drive", value: "Ball screw servo motor" },
      { label: "Speed Range", value: "0.5 – 500 mm/min" },
      { label: "Tests", value: "Tensile, compression, peel, flexural" },
      { label: "Software", value: "Full PC suite with Excel/PDF export" },
    ],
    idealFor: ["QC laboratories", "R&D departments", "Small manufacturers", "Educational institutions"],
    standards: ["ISO 9001", "CE"],
    featured: true,
  },
  {
    id: "ht-9501",
    model: "HT-9501",
    name: "Electro-Hydraulic Servo Universal Testing Machine",
    tagline: "Where structural integrity meets laboratory precision.",
    category: "metal",
    categoryLabel: "Metal & Steel",
    image: "ht-9501",
    description: "Engineered for high-capacity tensile, compression, bending, and shear testing of metals, structural steel, rebar, fasteners, and engineering alloys. Built on a reinforced FDC55 cast iron frame with zero-gap shaft construction for outstanding structural rigidity under maximum load.",
    specs: [
      { label: "Capacity", value: "Up to 2,000 kN" },
      { label: "Load Accuracy", value: "±0.5% (Class 1)" },
      { label: "Drive System", value: "Electro-hydraulic servo" },
      { label: "Tests", value: "Tensile, compression, shear, bending, peeling" },
      { label: "Standards", value: "ASTM E8/E9, ISO 6892, BS, DIN" },
      { label: "Optional", value: "Environmental chamber (-70°C to +250°C)" },
    ],
    idealFor: ["Steel mills", "Rebar producers", "Fastener manufacturers", "Automotive stamping QC"],
    standards: ["ASTM E8", "ASTM E9", "ISO 6892"],
    featured: true,
  },
  {
    id: "ht-2328",
    model: "HT-2328",
    name: "Computer Servo Control Material Testing Machine (Floor Type)",
    tagline: "Multi-material precision, built for the production floor.",
    category: "metal",
    categoryLabel: "Metal & Steel",
    image: "ht-2328",
    description: "The workhorse of metal and alloy testing labs. Ball screw servo drive eliminates hydraulic complexity while delivering smooth, controlled loading from 0.005 mm/min up to 500 mm/min. ISO 9001 and CE certified with full PC software suite.",
    specs: [
      { label: "Speed Range", value: "0.005 – 500 mm/min" },
      { label: "Drive", value: "Ball screw servo motor" },
      { label: "Tests", value: "Tensile, compression, flexural, bending" },
      { label: "Certification", value: "ISO 9001, CE" },
      { label: "Software", value: "Real-time graphing, auto pass/fail, Excel/PDF export" },
    ],
    idealFor: ["Aluminium extrusion QC", "Spring and wire testing", "Thin sheet metal tensile", "General metals laboratory"],
    standards: ["ISO 9001", "CE"],
    featured: true,
  },
  {
    id: "ht-2328t",
    model: "HT-2328T",
    name: "Computer Servo Universal Testing Machine (Textile Configuration)",
    tagline: "From yarn to finished fabric — one machine tests it all.",
    category: "textile",
    categoryLabel: "Textile & Fabric",
    image: "ht-2328",
    description: "The textile industry's choice for accurate tensile and elongation testing across yarn, thread, woven fabric, non-woven material, elastic bands, webbing, and industrial straps. Pre-loaded with textile-specific test norms.",
    specs: [
      { label: "Capacity", value: "1 – 10 kN" },
      { label: "Speed Range", value: "0.5 – 500 mm/min" },
      { label: "Grips", value: "Flat pneumatic textile grips" },
      { label: "Standards", value: "ASTM D5034, D5035, ISO 13934-1/2" },
      { label: "Output", value: "Tensile strength, elongation %, peak load" },
    ],
    idealFor: ["Fabric mills", "Garment manufacturers", "Sportswear brands", "Industrial webbing producers"],
    standards: ["ASTM D5034", "ISO 13934"],
    featured: true,
  },
  {
    id: "ht-2402t",
    model: "HT-2402T",
    name: "Single Column Desktop Tensile Tester (Textile & Ribbon)",
    tagline: "Benchtop precision for yarn, thread, and narrow fabric testing.",
    category: "textile",
    categoryLabel: "Textile & Fabric",
    image: "ht-2402",
    description: "Full universal testing capability in a compact single-column benchtop format for low-force textile applications — yarn count tensile, thread breaking strength, elastic band elongation, ribbon and lace testing.",
    specs: [
      { label: "Capacity", value: "100 N – 2 kN" },
      { label: "Configuration", value: "Single column, benchtop" },
      { label: "Tests", value: "Tensile, elongation, peel, loop strength" },
      { label: "Standards", value: "ASTM D2256, ISO 2062" },
    ],
    idealFor: ["Yarn spinners", "Garment QC stations", "Elastic manufacturers", "Embroidery thread producers"],
    standards: ["ASTM D2256", "ISO 2062"],
  },
  {
    id: "ht-2328r",
    model: "HT-2328R",
    name: "Computer Servo Universal Testing Machine (Rubber Configuration)",
    tagline: "The trusted testing partner of Malaysia's glove industry.",
    category: "rubber",
    categoryLabel: "Rubber & Glove",
    image: "ht-2328",
    description: "Factory-configured for rubber and elastomer testing with dumbbell die-cut specimen grips, two-point extensometer, and pre-loaded rubber test protocols. Widely used by Malaysia's top glove manufacturers.",
    specs: [
      { label: "Capacity", value: "1 – 5 kN" },
      { label: "Jaw Separation", value: "Up to 500 mm" },
      { label: "Grips", value: "Self-tightening rubber dumbbell grips" },
      { label: "Extensometer", value: "Two-point (included)" },
      { label: "Standards", value: "ASTM D412, ISO 37, EN 455" },
      { label: "Output", value: "Tensile strength (MPa), elongation at break (%)" },
    ],
    idealFor: ["Latex glove manufacturers", "Nitrile glove producers", "Tyre and seal producers"],
    standards: ["ASTM D412", "ISO 37", "EN 455"],
    featured: true,
  },
  {
    id: "ht-2402r",
    model: "HT-2402R",
    name: "Benchtop Rubber & Film Tensile Tester",
    tagline: "Fast, accurate batch testing for rubber films, strips, and thin specimens.",
    category: "rubber",
    categoryLabel: "Rubber & Glove",
    image: "ht-2402",
    description: "Compact solution for rubber film, thin sheet, latex film, and flexible packaging tensile testing. Complete test cycle in under 90 seconds with automatic data logging.",
    specs: [
      { label: "Capacity", value: "100 N – 2 kN" },
      { label: "Configuration", value: "Benchtop, single column" },
      { label: "Grips", value: "Flat rubber/film grips (self-tightening)" },
      { label: "Throughput", value: "Test cycle under 90 seconds" },
      { label: "Standards", value: "ASTM D412, ISO 37, ASTM D882" },
    ],
    idealFor: ["Glove QC sampling lines", "Latex film producers", "Flexible packaging manufacturers"],
    standards: ["ASTM D412", "ISO 37"],
  },
];

export const accessories = [
  {
    id: "extensometer",
    name: "Two-Point Rubber Extensometer",
    description: "Clip-on extensometer for accurate gauge-length elongation measurement on dumbbell rubber specimens. Compatible with all Hung Ta UTM models. Required for ASTM D412 and ISO 37 compliance.",
  },
  {
    id: "pneumatic-grips",
    name: "Pneumatic Textile Grips",
    description: "Foot-pedal operated pneumatic flat grips ensuring consistent clamping force on smooth synthetic fabrics. Available in 25mm, 50mm, and 100mm jaw face widths.",
  },
  {
    id: "temp-chamber",
    name: "High/Low Temperature Environmental Chamber",
    description: "Mount directly onto any Hung Ta floor-standing UTM for testing between -70°C and +250°C. No frame modification required.",
  },
  {
    id: "die-cutter",
    name: "Dumbbell Specimen Die Cutting Press",
    description: "Hydraulic die-cutting press for producing consistent Type C, Type 1, and ISO 37 dumbbell specimens from rubber sheets and gloves.",
  },
];

export const categories = [
  { id: "all", label: "All Products" },
  { id: "metal", label: "Metal & Steel" },
  { id: "textile", label: "Textile & Fabric" },
  { id: "rubber", label: "Rubber & Glove" },
];
