import { readFile, writeFile, mkdir } from "node:fs/promises";
import ts from "typescript";

const source = await readFile("src/data/products.ts", "utf8");
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const { products } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
const selected = products.filter(product => ["armstrong-wds-20", "armstrong-zl-9001a"].includes(product.id));
if (selected.length !== 2) throw new Error("Expected the two confirmed Armstrong products");
await mkdir("tmp", { recursive: true });
await writeFile("tmp/armstrong-catalogue-data.json", JSON.stringify(selected, null, 2));
console.log("Exported two product records for catalogue generation");
