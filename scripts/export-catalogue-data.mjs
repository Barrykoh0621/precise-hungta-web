import { readFile, writeFile, mkdir } from "node:fs/promises";
import ts from "typescript";

const source = await readFile("src/data/products.ts", "utf8");
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const { products } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
await mkdir("tmp", { recursive: true });
await writeFile("tmp/catalogue-products.json", JSON.stringify(products, null, 2));
console.log(`Exported ${products.length} product records`);
