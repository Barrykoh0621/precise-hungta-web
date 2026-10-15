import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";

// Reuse the workstation's browser runtime; do not add a production dependency.
const require = createRequire(process.env.BROWSER_RUNTIME_PACKAGE || "C:/Users/huail/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json");
const { chromium } = require("playwright");
const origin = process.env.TEST_ORIGIN || "http://127.0.0.1:4173";
const output = "output/website-boost-2026-10-15";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const results = [];
try {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }, { width: 768, height: 1024 }, { width: 1920, height: 1080 }]) {
    const page = await browser.newPage({ viewport });
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto(origin, { waitUntil: "networkidle" });
    await page.locator("#home-title").waitFor();
    await page.locator("img").evaluateAll(images => images.forEach(image => image.loading = "eager"));
    await page.waitForFunction(() => [...document.images].every(image => image.complete));
    await page.screenshot({ path: `${output}/home-${viewport.width}.png`, fullPage: viewport.width === 390 });
    assert.equal(await page.locator("h1").count(), 1);
    const hero = await page.locator(".machine-hero-image").evaluate(image => ({ loaded: image.complete && image.naturalWidth > 0, rect: image.getBoundingClientRect().toJSON() }));
    assert.ok(hero.loaded);
    assert.ok(hero.rect.width > 200 && hero.rect.height > 150);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    if (overflow) console.log(await page.evaluate(() => [...document.querySelectorAll("body *")].filter(element => element.getBoundingClientRect().right > innerWidth + 1).map(element => ({ tag: element.tagName, class: element.className, text: element.textContent.slice(0, 70), right: element.getBoundingClientRect().right })).slice(0, 12)));
    assert.ok(!overflow, `Homepage overflows at ${viewport.width}`);
    await page.getByRole("tab", { name: "Rubber & plastics" }).click();
    assert.equal(await page.getByRole("tab", { name: "Rubber & plastics" }).getAttribute("aria-selected"), "true");
    await page.locator("#application-panel").getByRole("heading", { name: "HT-2402", exact: true }).waitFor();
    await page.getByRole("tab", { name: "Rubber & plastics" }).press("ArrowRight");
    assert.equal(await page.getByRole("tab", { name: "Compression", exact: true }).getAttribute("aria-selected"), "true");
    await page.getByRole("button", { name: "Request a quotation", exact: true }).click();
    await page.getByRole("dialog").waitFor();
    await page.keyboard.press("Escape");
    if (viewport.width < 1150) {
      await page.getByRole("button", { name: "Toggle menu" }).click();
      await page.locator("#mobile-navigation").getByRole("link", { name: "Calibration", exact: true }).click();
    } else await page.getByRole("navigation", { name: "Main navigation", exact: true }).getByRole("link", { name: "Calibration", exact: true }).click();
    await page.getByRole("heading", { level: 1, name: "Testing machine calibration support in Malaysia." }).waitFor();
    assert.equal(errors.length, 0, errors.join("\n"));
    await page.goto(`${origin}/ht-9501-universal-testing-machine/`, { waitUntil: "networkidle" });
    assert.equal(await page.getByRole("heading", { level: 1 }).textContent(), "HT-9501");
    assert.ok(await page.locator("table").textContent().then(text => text.includes("300 ~ 4,000 kN")));
    assert.ok(!(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)));
    await page.screenshot({ path: `${output}/ht9501-${viewport.width}.png`, fullPage: viewport.width === 390 });
    const whatsapp = await page.locator('a[href^="https://wa.me/"]').getAttribute("href");
    assert.ok(new URL(whatsapp).searchParams.get("text").includes("HT-9501"));
    assert.equal(errors.length, 0, errors.join("\n"));
    results.push({ viewport, homepage: "passed", applicationTabs: "passed", keyboardTabs: "passed", quoteModal: "passed", calibrationNavigation: "passed", specificationPage: "passed", horizontalOverflow: false, javascriptErrors: errors });
    await page.close();
  }
  const page = await browser.newPage();
  const response = await page.goto(`${origin}/products/?product=ht-9501`, { waitUntil: "networkidle" });
  assert.equal(response.status(), 200);
  await page.getByRole("dialog").waitFor();
  assert.ok(await page.getByRole("link", { name: "Open full specification page" }).getAttribute("href").then(href => href.includes("ht-9501-universal")));
  await page.close();
  await writeFile(`${output}/verification.json`, JSON.stringify({ origin, results, productDeepLink: "passed" }, null, 2));
  console.log(JSON.stringify({ origin, viewports: results.length, results: "passed", screenshots: output }));
} finally { await browser.close(); }
