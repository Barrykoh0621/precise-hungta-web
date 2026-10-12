import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { JSDOM } from "jsdom";

const origin = "https://www.hungtainstrument.com.my";

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
