import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import path from "node:path";
import ts from "typescript";
import { JSDOM } from "jsdom";

const origin = "https://www.hungtainstrument.com.my";
async function loadData(file) {
  const source = await readFile(file, "utf8");
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
}
const escape = value => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

export async function generateMachinePages(dist, shell) {
  const { products } = await loadData("src/data/products.ts");
  const { machinePages } = await loadData("src/data/machine-pages.ts");
  const localImages = { "ht-2402": "src/assets/ht-2402.webp", "ht-9501": "src/assets/ht-9501.jpg", "ht-2101": "src/assets/ht-2101.jpg" };
  const rendered = [];
  await mkdir(path.join(dist, "product-images/models"), { recursive: true });
  for (const [id, page] of Object.entries(machinePages)) {
    const product = products.find(item => item.id === id);
    if (!product) throw new Error(`Missing machine data: ${id}`);
    const route = page.path.replace(/^\/|\/$/g, "");
    let image = `/${product.image}`;
    if (localImages[id]) {
      image = `/product-images/models/${id}${path.extname(localImages[id])}`;
      await copyFile(localImages[id], path.join(dist, image));
    }
    if (!image.startsWith("/product-images/")) throw new Error(`Invalid machine image: ${image}`);
    await readFile(path.join(dist, image));
    const name = `${product.brand || "Hung Ta"} ${product.model}`;
    const title = `${product.model} ${page.titleType || (product.category === "compression" ? "Compression" : id === "ht-2402" ? "Tensile" : "Universal")} Testing Machine Malaysia | ${product.brand || "Hung Ta"}`;
    const specs = page.showAllSpecs ? product.specs : product.specs.filter(spec => ["Capacity", "Drive System", "Tests", "Control", "Machine type", "Force Accuracy", "Load Accuracy", "Force Resolution"].includes(spec.label));
    const packaging = id === "armstrong-zl-9001a";
    const message = `Hello Hung Ta Instrument, I would like a quotation for ${name}.\n${packaging ? "Carton dimensions (L x W x H)" : "Material / specimen"}: \nRequired force range: \nTest method: \n${packaging ? "Compression / holding and report requirements" : "Grips / fixtures"}: \nCompany and location: \nRequired date: `;
    const whatsapp = `https://wa.me/60126280096?text=${encodeURIComponent(message)}`;
    const related = Object.entries(machinePages).filter(([other]) => other !== id).slice(0, 3);
    const dom = new JSDOM(shell);
    const document = dom.window.document;
    document.title = title;
    for (const selector of ['script[type="module"]', 'link[rel="stylesheet"]', 'link[rel="modulepreload"]', 'script[type="application/ld+json"]']) {
      document.querySelectorAll(selector).forEach(element => element.remove());
    }
    const meta = (attribute, key, value) => {
      let element = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!element) { element = document.createElement("meta"); element.setAttribute(attribute, key); document.head.append(element); }
      element.setAttribute("content", value);
    };
    meta("name", "description", page.summary);
    meta("property", "og:title", title);
    meta("property", "og:description", page.summary);
    meta("property", "og:type", "product");
    meta("property", "og:url", `${origin}${page.path}`);
    meta("property", "og:image", `${origin}${image}`);
    meta("property", "og:image:alt", `${name} ${product.name}`);
    meta("name", "twitter:title", title);
    meta("name", "twitter:description", page.summary);
    meta("name", "twitter:image", `${origin}${image}`);
    document.querySelector('link[rel="canonical"]').href = `${origin}${page.path}`;
    document.querySelector('link[rel="icon"]').href = "/favicon.svg";
    for (const href of ["/seo-landing.css", "/machine-details.css"]) {
      const link = document.createElement("link"); link.rel = "stylesheet"; link.href = href; document.head.append(link);
    }
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": [
      { "@type": "ItemPage", "name": `${name} ${product.name}`, "image": `${origin}${image}`, "description": page.summary, "url": `${origin}${page.path}`, "about": { "@type": "Thing", "name": `${name} ${product.name}`, "identifier": product.model }, "publisher": { "@type": "Organization", "name": "Hung Ta Instrument Enterprise", "url": `${origin}/` } },
      { "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Home", "item": `${origin}/` }, { "@type": "ListItem", "position": 2, "name": "Testing machines", "item": `${origin}/products/` }, { "@type": "ListItem", "position": 3, "name": name, "item": `${origin}${page.path}` } ] },
    ] });
    document.head.append(schema);
    document.body.innerHTML = `
      <a class="skip-link" href="#machine-main">Skip to specifications</a>
      <header class="topbar"><a class="brand" href="/"><img src="/favicon.svg" width="44" height="44" alt="Hung Ta logo">Hung Ta Instrument</a><nav class="nav" aria-label="Main navigation"><a href="/products/">Products</a><a href="/calibration-service-malaysia/">Calibration</a><a href="/resources/">Resources</a><a href="/contact/">Contact</a></nav></header>
      <main id="machine-main">
        <div class="model-intro"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/products/">Testing machines</a><span>/ ${escape(product.model)}</span></nav><p class="eyebrow">${escape(product.brand || "Hung Ta")} / ${escape(product.categoryLabel)}</p><h1>${escape(product.model)}</h1><p class="model-subtitle">${escape(product.name)}</p></div>
        <section class="model-overview" aria-label="Equipment overview"><figure><img src="${image}" width="720" height="600" fetchpriority="high" alt="${escape(`${name} ${product.name}`)}"><figcaption>${escape(page.imageCaption || "Catalogue image. Confirm the supplied configuration and accessories in your quotation.")}</figcaption></figure><div><p class="model-summary">${escape(page.summary)}</p><dl class="quick-specs">${specs.slice(0, 3).map(spec => `<div><dt>${escape(spec.label)}</dt><dd>${escape(spec.value)}</dd></div>`).join("")}</dl><a class="button primary" href="${escape(whatsapp)}" target="_blank" rel="noopener noreferrer" data-model="${id}">Request ${escape(product.model)} quotation &#8599;</a><a class="text-link" href="mailto:hungtatest@yahoo.com?subject=${encodeURIComponent(`${name} quotation enquiry`)}">Email your requirement</a>${product.catalogueUrl ? `<a class="text-link" href="/${escape(product.catalogueUrl)}" target="_blank" rel="noopener noreferrer">Download product catalogue (PDF) &#8595;</a>` : ""}<p class="model-note">Malaysia team in Seremban. Monday-Friday, 8:30 AM-6:00 PM.</p></div></section>
        <section class="section model-specifications"><h2>Technical specifications</h2><p>Listed catalogue specifications for ${escape(product.model)}. Final capacity, accuracy class, test methods and supplied fixtures depend on the configuration confirmed in your quotation.</p><table><caption>${escape(product.model)} specification reference</caption><tbody>${specs.map(spec => `<tr><th scope="row">${escape(spec.label)}</th><td>${escape(spec.value)}</td></tr>`).join("")}</tbody></table></section>
        <section class="section muted"><h2>Complete your testing system</h2><div class="model-support-grid"><div><h3>${packaging ? "Carton dimensions and compression setup" : "Grips and specimen fixtures"}</h3><p>${packaging ? "Send carton length, width, height, expected compression load and required holding time. Confirm platen clearance, specimen positioning and report requirements for your packaging test." : "Send specimen shape, dimensions, material and expected force. Grip faces, bending supports and compression platens must match the sample and machine interface."}</p><a href="${packaging ? "/contact/" : "/tensile-grips-selection-guide/"}">${packaging ? "Discuss your packaging test" : "Read the grip selection guide"} &#8594;</a></div><div><h3>Calibration and machine support</h3><p>Discuss the working range, location, required records and due date. Review the required service scope before arranging an appointment.</p><a href="/calibration-service-malaysia/">Calibration support in Malaysia &#8594;</a></div></div></section>
        <section class="section"><h2>Before requesting your quotation</h2><ol><li>Material, specimen dimensions and required test method.</li><li>Expected maximum force, test speed and elongation measurement needs.</li><li>Required grips, fixtures, software reports and site installation details.</li><li>Company, factory location, delivery timing and documentation requirements.</li></ol><a href="/testing-machine-enquiry-checklist.pdf" target="_blank" rel="noopener noreferrer">Enquiry checklist (PDF) &#8595;</a><h2 class="related-title">Other testing systems</h2><ul class="related-models">${related.map(([otherId, otherPage]) => `<li><a href="${otherPage.path}">${escape(products.find(item => item.id === otherId).model)} ${escape(products.find(item => item.id === otherId).categoryLabel)} &#8594;</a></li>`).join("")}</ul></section>
      </main><footer class="footer"><strong>Hung Ta Instrument Enterprise</strong><p>Malaysia operations since 1992.</p><p>109, Taman A.S.T., Jalan Sungai Ujong, 70200 Seremban, Negeri Sembilan, Malaysia</p><p><a href="tel:+60126280096">012-628 0096</a> &middot; <a href="mailto:hungtatest@yahoo.com">hungtatest@yahoo.com</a></p><a href="/contact/">Contact our Malaysia team</a></footer>`;
    const tracking = document.createElement("script");
    tracking.textContent = `document.querySelectorAll('a[href^="https://wa.me/"]').forEach(function(link){link.addEventListener('click',function(){if(window.gtag)window.gtag('event','whatsapp_click',{event_category:'lead',location:'machine_specification',product_id:link.dataset.model});});});`;
    document.body.append(tracking);
    await mkdir(path.join(dist, route), { recursive: true });
    await writeFile(path.join(dist, route, "index.html"), dom.serialize());
    rendered.push({ id, ...page, name: product.model });
    dom.window.close();
  }
  return rendered;
}
