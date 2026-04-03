export interface Product {
  id: string;
  model: string;
  name: string;
  tagline: string;
  category: "utm" | "auto-parts" | "rubber" | "plastics" | "wires" | "paper" | "hardness" | "dynamic";
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
    name: "Computer Servo Control Material Testing Machines",
    tagline: "High Precision, High Accuracy, High Stability — tensile, compression, flexural and bending test.",
    category: "utm",
    categoryLabel: "Universal Testing Machine",
    image: "ht-2402",
    description: "High Precision, High Accuracy, High Stability Material Testing Machines — able to do tensile, compression, flexural and bending test. ISO 9001 and CE certified, superior products fabricated by highly trained and experienced personnel. High strength aluminum alloy combined with streamlined design. Uses ball screw drive for less kinetic energy loss and noise elimination. Features a low-profile load cell with stable load induction, high accuracy, high stability, and a safety factor of 150%. Outstanding software with powerful control functions and testing speed range from 0.005 ~ 500 or 1000 mm/min. Standardized modular replacement design for quick grip switching.",
    specs: [
      { label: "Capacity", value: "50 ~ 250 kN" },
      { label: "Force Resolution", value: "1/200,000 (Hung Ta Interface Card)" },
      { label: "Force Accuracy", value: "Class 0.5 ± 0.5% or Class 1 ≤ ±1%" },
      { label: "Speed Range", value: "0.005 ~ 500 mm/min" },
      { label: "Drive", value: "AC Servo Motor & Servo Driver (Ball Screw)" },
      { label: "Tests", value: "Tensile, compression, flexural, bending" },
      { label: "Software", value: "Full PC suite with Excel/PDF export" },
      { label: "Certification", value: "ISO 9001, CE" },
    ],
    idealFor: ["QC laboratories", "R&D departments", "Manufacturing", "Educational institutions", "General metals laboratory"],
    standards: ["ISO 9001", "CE"],
    featured: true,
  },
  {
    id: "ht-9501",
    model: "HT-9501",
    name: "Electro-Hydraulic Servo Universal Testing Machine",
    tagline: "Where structural integrity meets laboratory precision.",
    category: "utm",
    categoryLabel: "Universal Testing Machine",
    image: "ht-9501",
    description: "With wide range of function and application, suitable for research, inspection, and testing in the field of metal, rubber, plastic, leather, cable and wire, textile, fiber, paper, PE, construction materials, electric appliance, petrochemical, transportation, automobile, package, polymer, aerospace and more. FDC55 high strength casting material with high stiffness axle materials for strong structure, high stability, and long durability. Hydraulic system adopts high efficiency pump and high conversational servo valve with excellent filtration. High accuracy loadcell with accuracy of load reaching ±0.005%, force accuracy reaches ±0.5 class. Close-loop fuzzy servo control matched with high precision servo valve.",
    specs: [
      { label: "Capacity", value: "300 ~ 4,000 kN" },
      { label: "Load Accuracy", value: "±1% (Class 1), optional ±0.5%" },
      { label: "Force Resolution", value: "1/200,000 (Hung Ta Interface Card)" },
      { label: "Drive System", value: "Electro-hydraulic servo" },
      { label: "Tests", value: "Tensile, compression, shear, bending, peeling" },
      { label: "Loading Speed", value: "≤100 max. (60 Hz)" },
      { label: "Crosshead Speed", value: "150 ~ 300 mm/min" },
      { label: "Optional", value: "Environmental chamber, extensometer, furnace" },
    ],
    idealFor: ["Steel mills", "Metal manufacturers", "Construction materials", "Automotive", "Petrochemical", "Aerospace"],
    standards: ["ASTM E4", "ASTM E8-04", "ISO 7500-1-2004", "ISO 6892-1", "GB/T 228-2010", "DIN 5122", "JIS B7721"],
    featured: true,
  },
  {
    id: "ht-2101",
    model: "HT-2101",
    name: "Electro-Hydraulic Servo Universal Testing Machine",
    tagline: "Versatile hydraulic testing for metals, polymers, and construction materials.",
    category: "utm",
    categoryLabel: "Universal Testing Machine",
    image: "ht-2101",
    description: "With wide range of function and application, suitable for research, inspection, and testing in the field of metal, rubber, plastic, leather, cable and wire, textile, fiber, paper, PE, construction materials, electric appliance, petrochemical, transportation, automobile, package, polymer, aerospace and more. FDC55 high strength casting material with driving screws and high stiffness axle materials for strong structure, high stability, and long durability. High accuracy loadcell with accuracy of load reaching ±0.005%, force accuracy reaches ±0.5 class. Standardized jaw holder specification for economic, convenient, and speedy replacement. Multi-purpose application test program for tensile, compression, shear, peeling, and displacement measurement.",
    specs: [
      { label: "Capacity", value: "300 ~ 2,000 kN" },
      { label: "Load Accuracy", value: "Class 1 ±1% (optional Class 0.5 ±0.5%)" },
      { label: "Force Resolution", value: "1/200,000 (Hung Ta Interface Card)" },
      { label: "Drive System", value: "Electro-hydraulic servo" },
      { label: "Tests", value: "Tensile, compression, bending, shear, peeling" },
      { label: "Loading Speed", value: "≤100 max. (60 Hz)" },
      { label: "Crosshead Speed", value: "150 ~ 300 mm/min" },
      { label: "Optional", value: "Bending fixture, compression, extensometer, wire-rope jig, furnace" },
    ],
    idealFor: ["Metal manufacturers", "Construction materials", "R&D laboratories", "Automotive", "Petrochemical"],
    standards: ["ASTM E4", "ASTM E8-04", "ISO 7500-1-2004", "ISO 6892-1", "GB/T 228-2010", "DIN 5122", "JIS B7721"],
    featured: true,
  },
];

export const accessories = [
  {
    id: "extensometer",
    name: "Two-Point Extensometer",
    description: "Clip-on extensometer for accurate gauge-length elongation measurement. Compatible with all Hung Ta UTM models. Required for ASTM D412 and ISO 37 compliance.",
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
  {
    id: "furnace",
    name: "Furnace Attachment",
    description: "High-temperature furnace for elevated temperature tensile and compression testing. Compatible with HT-9501 and HT-2101 series.",
  },
];

export const categories = [
  { id: "all", label: "All Products" },
  { id: "metal", label: "Metal & Steel" },
];
