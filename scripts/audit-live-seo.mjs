import { writeFile, mkdir } from "node:fs/promises";
import { JSDOM } from "jsdom";

const origin = "https://www.hungtainstrument.com.my";
const routes = process.argv.slice(2);
if (!routes.length) routes.push("/testing-machine-calibration-thailand", "/testing-machine-calibration-indonesia", "/tensile-machine-calibration-malaysia", "/tensile-testing-machine-malaysia");
const results = [];
for (const route of routes) {
  let url = new URL(route, origin).href;
  const chain = [];
  const visited = new Set();
  let result;
  for (let step = 0; step < 8; step++) {
    if (visited.has(url)) throw new Error(`Redirect loop: ${url}`);
    visited.add(url);
    const response = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(20000) });
    chain.push({ url, status: response.status });
    if (response.status >= 300 && response.status < 400 && response.headers.get("location")) {
      url = new URL(response.headers.get("location"), url).href;
      continue;
    }
    const dom = new JSDOM(await response.text());
    const document = dom.window.document;
    const noindex = /noindex/i.test(`${response.headers.get("x-robots-tag") || ""} ${document.querySelector('meta[name="robots"]')?.content || ""}`);
    const refresh = Boolean(document.querySelector('meta[http-equiv="refresh"]'));
    const javascriptRedirect = [...document.scripts].some(script => /(?:location\.(?:replace|assign)\s*\(|(?:window\.)?location(?:\.href)?\s*=)/.test(script.textContent));
    result = { route, chain, canonical: document.querySelector('link[rel="canonical"]')?.href, title: document.title, noindex, refresh, javascriptRedirect, heading: document.querySelector("h1")?.textContent, ok: response.status === 200 && !noindex && !refresh && !javascriptRedirect && Boolean(document.querySelector("main h1")) };
    dom.window.close();
    break;
  }
  if (!result) throw new Error(`Too many redirects: ${route}`);
  results.push(result);
}
await mkdir("output/website-boost-2026-10-15", { recursive: true });
await writeFile("output/website-boost-2026-10-15/live-seo-audit.json", JSON.stringify({ checkedAt: new Date().toISOString(), results }, null, 2));
console.log(JSON.stringify(results));
if (results.some(result => !result.ok)) process.exitCode = 1;
