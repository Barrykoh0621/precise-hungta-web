import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { JSDOM } from "jsdom";

const origin = "https://www.hungtainstrument.com.my";

test("Every sitemap page has complete, consistent social sharing metadata", async () => {
  const xml = new JSDOM(await readFile("dist/sitemap.xml", "utf8"), { contentType: "application/xml" });
  for (const loc of xml.window.document.getElementsByTagName("loc")) {
    const url = new URL(loc.textContent);
    const dom = new JSDOM(await readFile(path.join("dist", url.pathname, "index.html"), "utf8"));
    const doc = dom.window.document;
    assert.equal(doc.querySelector('meta[property="og:title"]').content, doc.title);
    assert.equal(doc.querySelector('meta[property="og:description"]').content, doc.querySelector('meta[name="description"]').content);
    assert.equal(doc.querySelector('meta[property="og:url"]').content, url.href);
    assert.equal(doc.querySelector('meta[name="twitter:card"]').content, "summary_large_image");
    const image = new URL(doc.querySelector('meta[property="og:image"]').content);
    assert.equal(image.origin, origin);
    await readFile(path.join("dist", image.pathname));
    assert.equal(doc.querySelector('meta[name="twitter:image"]').content, image.href);
    dom.window.close();
  }
  xml.window.close();
});

test("Priority category pages connect buyers to guides, calibration and the PDF", async () => {
  for (const route of ["tensile-testing-machine-malaysia", "universal-testing-machine-malaysia"]) {
    const dom = new JSDOM(await readFile(`dist/${route}/index.html`, "utf8"));
    const section = dom.window.document.querySelector("#buyer-resources");
    assert.ok(section.querySelector('a[href="/tensile-grips-selection-guide/"]'));
    assert.ok(section.querySelector('a[href="/calibration-service-malaysia/"]'));
    assert.ok(section.querySelector('a[href="/testing-machine-enquiry-checklist.pdf"]'));
    for (const image of dom.window.document.querySelectorAll(".card img")) {
      const url = new URL(image.getAttribute("src"), `${origin}/${route}/`);
      await readFile(path.join("dist", url.pathname));
    }
    dom.window.close();
  }
});

test("Priority machine pages expose real specifications, images, enquiries and sitemap entries", async () => {
  const sitemap = await readFile("dist/sitemap.xml", "utf8");
  for (const [route, model] of [
    ["ht-2402-tensile-testing-machine", "HT-2402"],
    ["ht-9501-universal-testing-machine", "HT-9501"],
    ["ht-2101-universal-testing-machine", "HT-2101"],
    ["armstrong-waw-300d-universal-testing-machine", "WAW-300D"],
    ["armstrong-yew-3000e-compression-testing-machine", "YEW-3000E"],
  ]) {
    const dom = new JSDOM(await readFile(`dist/${route}/index.html`, "utf8"));
    const document = dom.window.document;
    assert.equal(document.querySelector("h1").textContent, model);
    assert.equal(document.querySelector('link[rel="canonical"]').href, `${origin}/${route}/`);
    assert.ok(document.querySelector("table th").textContent.includes("Capacity"));
    const image = document.querySelector("figure img").getAttribute("src");
    await readFile(path.join("dist", image));
    const enquiry = document.querySelector('a[href^="https://wa.me/"]');
    assert.ok(new URL(enquiry.href).searchParams.get("text").includes(model));
    assert.ok(document.querySelector('a[href="/calibration-service-malaysia/"]'));
    const schema = JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent);
    const itemPage = schema["@graph"].find(item => item["@type"] === "ItemPage");
    assert.equal(itemPage.about.identifier, model);
    assert.ok(itemPage.image.includes(image));
    assert.ok(!schema["@graph"].some(item => item["@type"] === "Product"), "quote-only pages must not claim price/review rich-result eligibility");
    assert.ok(sitemap.includes(`${origin}/${route}/`));
    assert.ok(!document.querySelector('script[type="module"]'), "static specifications must not be replaced by a 404 app route");
    dom.window.close();
  }
});

test("Homepage has a raster social image and crawlable machine specification links", async () => {
  const dom = new JSDOM(await readFile("dist/index.html", "utf8"));
  const document = dom.window.document;
  const image = new URL(document.querySelector('meta[property="og:image"]').content);
  assert.equal(image.origin, origin);
  await readFile(path.join("dist", image.pathname));
  assert.ok(document.querySelector('a[href="/ht-9501-universal-testing-machine/"]'));
  const business = JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent);
  assert.equal(business.foundingDate, "1992");
  assert.ok((await readFile("dist/robots.txt", "utf8")).startsWith("User-agent:"));
  dom.window.close();
});

test("Calibration service illustration is locally hosted with stable dimensions", async () => {
  const dom = new JSDOM(await readFile("dist/calibration-service-malaysia/index.html", "utf8"));
  const image = dom.window.document.querySelector('img[src*="tensile-machine-service.webp"]');
  assert.ok(image);
  assert.equal(image.getAttribute("width"), "1672");
  assert.equal(image.getAttribute("height"), "941");
  assert.ok(dom.window.document.querySelector("figcaption").textContent.includes("AI-generated"));
  assert.ok((await readFile("dist/product-images/tensile-machine-service.webp")).length > 1000);
  dom.window.close();
});

test("Company history distinguishes Taiwan and Malaysia establishment dates", async () => {
  const dom = new JSDOM(await readFile("dist/about/index.html", "utf8"));
  const text = dom.window.document.body.textContent;
  assert.ok(text.includes("September 1975 in Taiwan"));
  assert.ok(text.includes("Malaysian operations began in 1992"));
  assert.ok(!text.includes("Sdn. Bhd."));
  dom.window.close();
});

test("New Armstrong models have product images and downloadable catalogues", async () => {
  const landing = await readFile("dist/armstrong-testing-machines-malaysia/index.html", "utf8");
  for (const model of ["waw-300d", "yew-3000e"]) {
    const id = `armstrong-${model}`;
    assert.ok(landing.includes(model.toUpperCase()));
    assert.ok(landing.includes(`catalogues/products/${id}.pdf`));
    const pdf = await readFile(`dist/catalogues/products/${id}.pdf`);
    assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
    assert.ok((await readFile(`dist/product-images/${id}.png`)).length > 1000);
  }
});

test("Interactive deep links serve indexable HTML and real app assets", async () => {
  for (const route of ["contact", "products", "services", "about", "spare-parts", "resources"]) {
    const dom = new JSDOM(await readFile(`dist/${route}/index.html`, "utf8"));
    const document = dom.window.document;
    assert.equal(document.querySelector('link[rel="canonical"]').href, `${origin}/${route}/`);
    assert.equal(document.querySelector('meta[name="robots"]'), null);
    assert.ok(document.querySelector("#root h1"), `${route} needs readable fallback content`);
    assert.ok(!document.documentElement.innerHTML.includes("location.replace"));
    const script = document.querySelector('script[type="module"][src]');
    assert.ok(script, `${route} needs the interactive app`);
    await readFile(path.resolve("dist", route, script.getAttribute("src")));
    dom.window.close();
  }
});

test("Home and resource pages expose crawlable routes without JavaScript", async () => {
  for (const file of ["dist/index.html", "dist/resources/index.html"]) {
    const dom = new JSDOM(await readFile(file, "utf8"));
    const document = dom.window.document;
    assert.ok(document.querySelector("#root h1"));
    assert.ok(document.querySelector('a[href="/calibration-service-malaysia/"]') || document.querySelector('a[href="/testing-machine-calibration-checklist-malaysia/"]'));
    assert.ok(document.querySelector('a[href="/contact/"]'));
    dom.window.close();
  }
  const checklist = await readFile("dist/testing-machine-enquiry-checklist.txt", "utf8");
  assert.ok(checklist.includes("hungtatest@yahoo.com"));
});

test("Customer checklist links open the PDF rather than the legacy text download", async () => {
  const pdf = await readFile("dist/testing-machine-enquiry-checklist.pdf");
  assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
  for (const route of ["resources", "tensile-grips-selection-guide", "ht-2402-tensile-testing-machine", "ht-9501-universal-testing-machine"]) {
    const dom = new JSDOM(await readFile(`dist/${route}/index.html`, "utf8"));
    const link = dom.window.document.querySelector('a[href$="testing-machine-enquiry-checklist.pdf"]');
    assert.ok(link, `${route} must offer the PDF checklist`);
    assert.ok(link.textContent.includes("PDF"));
    assert.equal(link.hasAttribute("download"), false);
    assert.equal(link.target, "_blank");
    assert.equal(dom.window.document.querySelector('a[href$="testing-machine-enquiry-checklist.txt"]'), null);
    dom.window.close();
  }
});

test("Every sitemap URL exists and agrees with its page canonical", async () => {
  const dom = new JSDOM(await readFile("dist/sitemap.xml", "utf8"), { contentType: "application/xml" });
  const urls = [...dom.window.document.getElementsByTagName("loc")].map((loc) => loc.textContent);
  assert.equal(new Set(urls).size, urls.length);
  for (const url of urls) {
    assert.ok(url.startsWith(`${origin}/`) && url.endsWith("/"));
    const page = new JSDOM(await readFile(path.join("dist", new URL(url).pathname, "index.html"), "utf8"));
    assert.equal(page.window.document.querySelector('link[rel="canonical"]').href, url);
    assert.ok(!page.window.document.querySelector('meta[name="robots"]')?.content.includes("noindex"));
    page.window.close();
  }
  dom.window.close();
});

test("Calibration guides display the questions and answers in their FAQ schema", async () => {
  for (const route of ["tensile-machine-calibration-malaysia", "testing-machine-calibration-checklist-malaysia"]) {
    const dom = new JSDOM(await readFile(`dist/${route}/index.html`, "utf8"));
    const document = dom.window.document;
    const schema = [...document.querySelectorAll('script[type="application/ld+json"]')]
      .map((script) => JSON.parse(script.textContent)).find((item) => item["@type"] === "FAQPage");
    for (const question of schema.mainEntity) {
      assert.ok(document.body.textContent.includes(question.name));
      assert.ok(document.body.textContent.includes(question.acceptedAnswer.text));
    }
    dom.window.close();
  }
});
