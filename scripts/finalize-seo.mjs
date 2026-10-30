import { readFile, writeFile, readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import { JSDOM } from "jsdom";
import { generateMachinePages } from "./machine-pages.mjs";

const origin = "https://www.hungtainstrument.com.my";
const dist = path.resolve("dist");
const shell = await readFile(path.join(dist, "index.html"), "utf8");
const machinePages = await generateMachinePages(dist, shell);

// Serve the existing interactive app at real URLs instead of noindex redirect stubs.
const appRoutes = {
  contact: {
    title: "Contact Hung Ta Instrument | Testing Machines & Calibration Malaysia",
    description: "Contact Hung Ta Instrument in Seremban for tensile testing machines, UTM service and calibration support. Call 012-628 0096. Monday-Friday, 8:30am-6pm.",
    content: '<h1>Contact Hung Ta Instrument</h1><p>Testing machine supply, service and calibration support in Malaysia.</p><address>109, Taman AST, Jalan Sungai Ujong, 70200 Seremban, Negeri Sembilan, Malaysia</address><p><a href="tel:+60126280096">012-628 0096 Sales Manager</a><br><a href="tel:+60122201096">012-220 1096 Product Specialist</a><br><a href="mailto:hungtatest@yahoo.com">hungtatest@yahoo.com</a></p><p>Monday to Friday, 8:30 AM - 6:00 PM. Service enquiries: Malaysia, Singapore and Asia.</p>',
  },
  services: {
    title: "Testing Machine Service & Calibration Support Malaysia | Hung Ta",
    description: "Service, maintenance, calibration support, software and spare parts for tensile and universal testing machines. Contact Hung Ta Instrument in Seremban, Malaysia.",
    content: '<h1>Testing Machine Service and Calibration Support</h1><p>Hung Ta supports factories and laboratories with machine servicing, maintenance, software, spare parts and calibration enquiries.</p><p><a href="../calibration-service-malaysia/">Testing machine calibration support in Malaysia</a></p><p><a href="../universal-testing-machine-service-malaysia/">Universal testing machine service</a></p>',
  },
  products: {
    title: "Testing Machine Catalogue Malaysia | Hung Ta Instrument",
    description: "Browse tensile, universal, hydraulic and compression testing machines, grips and fixtures for metal, rubber and copper quality control. Request a model quotation.",
    content: '<h1>Testing Machine Catalogue</h1><p>Testing instruments, grips and fixtures for factory and laboratory quality control.</p><ul><li><a href="../tensile-testing-machine-malaysia/">Tensile testing machines</a></li><li><a href="../universal-testing-machine-malaysia/">Universal testing machines</a></li><li><a href="../hydraulic-testing-machine-malaysia/">Hydraulic testing machines</a></li><li><a href="../compression-machine-malaysia/">Compression testing machines</a></li><li><a href="../spare-parts/">Spare parts and fixtures</a></li></ul>',
  },
  about: {
    title: "About Hung Ta Instrument | Testing Instruments Malaysia",
    description: "Hung Ta Instrument was founded in Taiwan in September 1975. Malaysian operations began in 1992, supplying testing machines and local support from Seremban.",
    content: '<h1>About Hung Ta Instrument</h1><p>HUNG TA INSTRUMENT was founded in September 1975 in Taiwan. Our Malaysian operations began in 1992.</p><p>Hung Ta Instrument supplies testing machines and supports factories, laboratories and QA teams from Seremban, Malaysia.</p><p>Our work includes machine selection, installation, service support and calibration enquiries for material testing equipment.</p>',
  },
  "spare-parts": {
    title: "Testing Machine Spare Parts, Grips & Fixtures Malaysia | Hung Ta",
    description: "Enquire about tensile testing machine grips, fixtures and spare parts in Malaysia. Share your machine model, sample material and capacity for compatibility review.",
    content: '<h1>Testing Machine Spare Parts, Grips and Fixtures</h1><p>Send your machine model, existing part details, sample material and capacity to Hung Ta for a compatibility review.</p><p><a href="../products/">Testing machine catalogue</a></p>',
  },
  resources: {
    title: "Testing Guides & Resources | Hung Ta Instrument Malaysia",
    description: "Practical guides for tensile testing machine selection, calibration preparation, grips and UTM service. Resources for Malaysia factory and laboratory QA teams.",
    content: "",
  },
};

const resourceSource = new JSDOM(await readFile("public/resources/index.html", "utf8"));
appRoutes.resources.content = resourceSource.window.document.querySelector("main").innerHTML;
resourceSource.window.close();
const modelLinks = `<section id="machine-specification-links"><h2>Machine specifications</h2><ul>${machinePages.map(page => `<li><a href="${page.path}">${page.name} testing machine specifications</a></li>`).join("")}</ul></section>`;
appRoutes.products.content += modelLinks;

function setMeta(document, attribute, key, content) {
  let element = document.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.append(element);
  }
  element.setAttribute("content", content);
}

for (const [route, data] of Object.entries(appRoutes)) {
  const dom = new JSDOM(shell);
  const document = dom.window.document;
  document.title = data.title;
  setMeta(document, "name", "description", data.description);
  setMeta(document, "property", "og:title", data.title);
  setMeta(document, "property", "og:description", data.description);
  setMeta(document, "name", "twitter:title", data.title);
  setMeta(document, "name", "twitter:description", data.description);
  document.querySelector('link[rel="canonical"]').href = `${origin}/${route}/`;
  setMeta(document, "property", "og:url", `${origin}/${route}/`);
  document.getElementById("root").innerHTML = `<header><a href="../">Hung Ta Instrument</a></header><main>${data.content}<p><a href="../contact/">Contact Hung Ta</a></p></main>`;
  for (const element of document.querySelectorAll("script[src], link[href]")) {
    const attribute = element.tagName === "SCRIPT" ? "src" : "href";
    const value = element.getAttribute(attribute);
    if (value.startsWith("./")) element.setAttribute(attribute, `../${value.slice(2)}`);
  }
  await writeFile(path.join(dist, route, "index.html"), dom.serialize());
  dom.window.close();
}

function canonicalize(value) {
  if (!value.startsWith(`${origin}/`)) return value;
  const url = new URL(value);
  if (url.search || url.hash || path.posix.extname(url.pathname)) return value;
  url.pathname = `${url.pathname.replace(/\/+$/, "")}/`;
  return url.href;
}

function normalizeSchema(value) {
  if (typeof value === "string") return canonicalize(value);
  if (Array.isArray(value)) return value.map(normalizeSchema);
  if (value && typeof value === "object") {
    const normalized = Object.fromEntries(Object.entries(value).map(([key, item]) => [key, normalizeSchema(item)]));
    if (typeof normalized.name === "string" && /^hung ta instrument.*sdn/i.test(normalized.name)) {
      normalized.name = "Hung Ta Instrument Enterprise";
      delete normalized.identifier;
    }
    return normalized;
  }
  return value;
}

const entries = await readdir(dist, { withFileTypes: true });
const pageFiles = ["index.html"];
for (const entry of entries.filter((item) => item.isDirectory())) {
  if (entry.name === "armstrong-waw-300d-universal-testing-machine") continue;
  try {
    await readFile(path.join(dist, entry.name, "index.html"));
    pageFiles.push(`${entry.name}/index.html`);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

const urls = new Set();
for (const file of pageFiles) {
  const dom = new JSDOM(await readFile(path.join(dist, file), "utf8"));
  const document = dom.window.document;
  if (file === "index.html" && !document.getElementById("machine-specification-links")) document.querySelector("#root main").insertAdjacentHTML("beforeend", modelLinks);
  if (["tensile-testing-machine-malaysia/index.html", "universal-testing-machine-malaysia/index.html"].includes(file) && !document.getElementById("machine-specification-links")) {
    const section = document.createElement("section");
    section.className = "section";
    section.innerHTML = modelLinks;
    document.querySelector("main").append(section);
  }
  const canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) throw new Error(`Missing canonical: ${file}`);
  const url = `${origin}/${file === "index.html" ? "" : `${path.posix.dirname(file)}/`}`;
  canonical.setAttribute("href", url);
  setMeta(document, "property", "og:url", url);
  const description = document.querySelector('meta[name="description"]')?.content;
  setMeta(document, "property", "og:title", document.title);
  setMeta(document, "name", "twitter:title", document.title);
  if (description) {
    setMeta(document, "property", "og:description", description);
    setMeta(document, "name", "twitter:description", description);
  }
  if (!document.querySelector('meta[property="og:type"]')) setMeta(document, "property", "og:type", "website");
  if (!document.querySelector('meta[property="og:image"]')) {
    setMeta(document, "property", "og:image", `${origin}/product-images/models/ht-9501.jpg`);
    setMeta(document, "property", "og:image:alt", "Hung Ta HT-9501 testing machine catalogue image");
  }
  setMeta(document, "property", "og:site_name", "Hung Ta Instrument");
  setMeta(document, "name", "twitter:card", "summary_large_image");
  setMeta(document, "name", "twitter:image", document.querySelector('meta[property="og:image"]').content);
  if (["tensile-testing-machine-malaysia/index.html", "universal-testing-machine-malaysia/index.html"].includes(file)) {
    for (const card of document.querySelectorAll(".card")) {
      const model = card.querySelector("h3")?.textContent.trim();
      const machine = machinePages.find(page => page.name === model);
      const image = card.querySelector("img");
      if (machine && image && ["HT-9501", "HT-2402", "HT-2101"].includes(model)) {
        image.src = `/product-images/models/${machine.id}${model === "HT-2402" ? ".webp" : ".jpg"}`;
      }
    }
    const resources = document.createElement("section");
    resources.className = "section";
    resources.id = "buyer-resources";
    resources.innerHTML = '<h2>Plan your testing system</h2><ul><li><a href="/how-to-choose-tensile-testing-machine-malaysia/">Machine selection guide</a></li><li><a href="/tensile-grips-selection-guide/">Grips and fixtures</a></li><li><a href="/calibration-service-malaysia/">Calibration support</a></li><li><a href="/testing-machine-enquiry-checklist.pdf" target="_blank" rel="noopener noreferrer">Enquiry checklist (PDF)</a></li></ul>';
    document.querySelector("main").append(resources);
  }
  const brandImage = document.querySelector(".brand img");
  if (brandImage) {
    brandImage.setAttribute("src", "../favicon.svg");
    brandImage.setAttribute("alt", "Hung Ta gear H mark");
  }
  const staticNav = document.querySelector(".topbar nav");
  if (staticNav && ![...staticNav.querySelectorAll("a")].some((link) => link.getAttribute("href")?.includes("resources"))) {
    const link = document.createElement("a");
    link.href = "/resources/";
    link.textContent = "Resources";
    staticNav.append(link);
  }
  const footer = document.querySelector(".footer");
  if (footer?.textContent.includes("Sdn. Bhd.")) {
    const name = footer.querySelector("strong");
    if (name) name.textContent = "Hung Ta Instrument Enterprise";
    for (const node of footer.childNodes) {
      if (node.nodeType === 3) node.textContent = node.textContent.replace("SSM 256852-H | ", "");
    }
  }
  if (footer && !footer.querySelector('a[href="https://g.page/r/CerseOxyZsvtEBM/review"]')) {
    const reviewLink = document.createElement("a");
    reviewLink.href = "https://g.page/r/CerseOxyZsvtEBM/review";
    reviewLink.target = "_blank";
    reviewLink.rel = "noopener noreferrer";
    reviewLink.textContent = "Share your experience on Google";
    footer.append(document.createElement("br"), reviewLink);
  }
  for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
    script.textContent = JSON.stringify(normalizeSchema(JSON.parse(script.textContent)), null, 2);
  }
  if (document.querySelector('meta[name="robots"]')?.content.includes("noindex")) {
    throw new Error(`Public page cannot be indexed: ${file}`);
  }
  for (const element of document.querySelectorAll('a[href]')) {
    const href = element.getAttribute("href");
    if (!href || href.startsWith("#")) continue;
    const target = new URL(href, url);
    if (target.origin === origin && !target.search && !target.hash && !path.posix.extname(target.pathname)) {
      element.setAttribute("href", `${target.pathname.replace(/\/+$/, "")}/`);
    }
  }
  for (const script of document.querySelectorAll('script[type="module"][src]')) {
    await readFile(path.resolve(dist, path.posix.dirname(file), script.getAttribute("src")));
  }
  await writeFile(path.join(dist, file), dom.serialize());
  urls.add(url);
  dom.window.close();
}

const sitemapDom = new JSDOM(await readFile(path.join(dist, "sitemap.xml"), "utf8"), { contentType: "application/xml" });
const sitemap = sitemapDom.window.document;
for (const entry of [...sitemap.getElementsByTagName("url")]) {
  const loc = entry.getElementsByTagName("loc")[0];
  loc.textContent = canonicalize(loc.textContent);
  if (!urls.has(loc.textContent)) entry.remove();
}
const existing = new Set([...sitemap.getElementsByTagName("loc")].map((loc) => loc.textContent));
for (const url of urls) {
  if (existing.has(url)) continue;
  const entry = sitemap.createElementNS(sitemap.documentElement.namespaceURI, "url");
  const loc = sitemap.createElementNS(sitemap.documentElement.namespaceURI, "loc");
  loc.textContent = url;
  entry.append(loc);
  sitemap.documentElement.append(entry);
}
// Only date pages actually edited, not every page on each deployment.
for (const entry of [...sitemap.getElementsByTagName("url")]) {
  const url = entry.getElementsByTagName("loc")[0].textContent;
  const updatedRoutes = ["/calibration-service-malaysia/", "/tensile-machine-calibration-malaysia/", "/universal-testing-machine-service-malaysia/", "/resources/", "/testing-machine-calibration-vs-servicing/"];
  const route = new URL(url).pathname;
  if (updatedRoutes.includes(route) || ["/", "/tensile-testing-machine-malaysia/", "/universal-testing-machine-malaysia/", "/calibration-service-malaysia/", "/tensile-machine-calibration-malaysia/", "/testing-machine-calibration-checklist-malaysia/", "/tensile-grips-selection-guide/", ...Object.keys(appRoutes).map((route) => `/${route}/`)].includes(route)) {
    let lastmod = entry.getElementsByTagName("lastmod")[0];
    if (!lastmod) {
      lastmod = sitemap.createElementNS(sitemap.documentElement.namespaceURI, "lastmod");
      entry.append(lastmod);
    }
    lastmod.textContent = updatedRoutes.includes(route) ? "2026-10-30" : route === "/products/" ? "2026-10-20" : ["/", "/tensile-testing-machine-malaysia/", "/universal-testing-machine-malaysia/"].includes(route) ? "2026-10-15" : "2026-10-12";
  }
  if (machinePages.some(page => page.path === new URL(url).pathname)) {
    let lastmod = entry.getElementsByTagName("lastmod")[0];
    if (!lastmod) { lastmod = sitemap.createElementNS(sitemap.documentElement.namespaceURI, "lastmod"); entry.append(lastmod); }
    lastmod.textContent = machinePages.find(page => page.path === new URL(url).pathname).lastmod || "2026-10-15";
  }
}
for (const name of ["sitemap.xml", "sitemap-github.xml"]) {
  await writeFile(path.join(dist, name), sitemapDom.serialize());
}
sitemapDom.window.close();
// Preserve previously shared links after the confirmed WAW model correction.
const legacyWaw = path.join(dist, "armstrong-waw-300d-universal-testing-machine");
await mkdir(legacyWaw, { recursive: true });
await writeFile(path.join(legacyWaw, "index.html"), '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=/armstrong-waw-300e-universal-testing-machine/"><link rel="canonical" href="https://www.hungtainstrument.com.my/armstrong-waw-300e-universal-testing-machine/"><title>WAW-300E | Hung Ta Instrument</title></head><body><a href="/armstrong-waw-300e-universal-testing-machine/">View the corrected WAW-300E model</a></body></html>');
console.log(`SEO verified: ${urls.size} indexable pages, canonical URLs, route assets and sitemap.`);
