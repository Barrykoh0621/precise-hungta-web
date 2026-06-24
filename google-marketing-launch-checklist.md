# Google Marketing Launch Checklist

Company: HUNG TA INSTRUMENT (M) Sdn. Bhd.

## Current Reality

The website landing pages are live on GitHub Pages, but Google search ranking does not appear instantly. Google needs to discover, crawl, index and rank the pages.

The official domain `hungtainstrument.com.my` is purchased and Active in Exabytes.

However, DNS still points to the Exabytes parking page (`103.7.9.22`). A support ticket has been submitted to Exabytes asking them to point the domain to GitHub Pages.

Temporary live URLs:

- `https://barrykoh0621.github.io/precise-hungta-web/hydraulic-testing-machine-malaysia`
- `https://barrykoh0621.github.io/precise-hungta-web/compression-machine-malaysia`
- `https://barrykoh0621.github.io/precise-hungta-web/electrical-tensile-testing-machine-malaysia`
- `https://barrykoh0621.github.io/precise-hungta-web/tensile-testing-machine-malaysia`
- `https://barrykoh0621.github.io/precise-hungta-web/universal-testing-machine-malaysia`
- `https://barrykoh0621.github.io/precise-hungta-web/material-testing-machine-malaysia`

Final target URLs after domain activation:

- `https://www.hungtainstrument.com.my/hydraulic-testing-machine-malaysia`
- `https://www.hungtainstrument.com.my/compression-machine-malaysia`
- `https://www.hungtainstrument.com.my/electrical-tensile-testing-machine-malaysia`
- `https://www.hungtainstrument.com.my/tensile-testing-machine-malaysia`
- `https://www.hungtainstrument.com.my/universal-testing-machine-malaysia`
- `https://www.hungtainstrument.com.my/material-testing-machine-malaysia`

## 1. Google Business Profile

Update these fields:

- Website: use the GitHub Pages URL first; replace with `https://www.hungtainstrument.com.my/` after DNS is active.
- Business description:
  HUNG TA INSTRUMENT (M) Sdn. Bhd. supplies hydraulic testing machines, compression machines, electrical tensile testing machines and material testing equipment for manufacturers, laboratories and QA teams across Malaysia, Singapore and Asia. We support metal, rubber and copper industries with machine selection, installation, training, calibration guidance and service support.
- Products/services:
  - Hydraulic Testing Machine
  - Compression Testing Machine
  - Electrical Tensile Testing Machine
  - Universal Testing Machine
  - Testing Machine Service and Calibration

## 2. Google Search Console

Temporary property:

- `https://barrykoh0621.github.io/precise-hungta-web/`

Submit sitemap:

- `https://barrykoh0621.github.io/precise-hungta-web/sitemap-github.xml`

Final property after domain activation:

- `https://www.hungtainstrument.com.my/`

Final sitemap:

- `https://www.hungtainstrument.com.my/sitemap.xml`

Technical SEO status:

- LocalBusiness / Organization structured data added to the homepage.
- Product landing page structured data uses the live host automatically, so it works on GitHub Pages now and the official domain after DNS is active.
- Landing pages target hydraulic testing machine, compression machine, electrical tensile testing machine, tensile testing machine, universal testing machine and material testing machine searches.
- Direct route fallback pages added for contact, products, services and about, so shared links and browser refreshes are safer on GitHub Pages.

## 3. Google Ads Search Campaigns

Start with Search Ads only. Do not start with Display/banner ads.

Budget:

- Current approved test: RM15/day
- Monthly target: RM400-RM500
- Estimated 30-day spend: about RM456
- Ready-to-launch setup prepared in `google-ads-ready-to-launch.md`

Campaign A: Universal / Tensile Testing Machine

- tensile testing machine Malaysia
- universal testing machine Malaysia
- universal tensile machine
- tensile tester supplier Malaysia
- UTM machine Malaysia

Landing page:

- `/tensile-testing-machine-malaysia`
- `/universal-testing-machine-malaysia`

Campaign B: Calibration / ISO 17025 Preparation

- testing machine calibration Malaysia
- tensile machine calibration
- universal testing machine calibration
- load cell calibration Malaysia
- ISO 17025 calibration Malaysia

Landing page:

- `/calibration-service-malaysia`

Paused for later:

- Hydraulic testing machine
- Compression machine
- Broad material testing machine

## 4. Weekly Google Business Posts

Status: draft posts prepared in `google-business-posts-june-2026.md`.

Post 1:

Hydraulic testing machines for metal, copper and construction material QC. Hung Ta Instrument supports machine selection, installation and service across Malaysia.

Post 2:

Need a compression testing machine for concrete, packaging or factory QC? Send us your specimen type, capacity and test standard for recommendation.

Post 3:

Electrical tensile testing machines for metal, rubber, copper, wire and cable quality control. Request quotation from Hung Ta Instrument Malaysia.

## 5. Lead Tracking

Track these actions:

- WhatsApp click
- Quote form click
- Phone click
- Email click
- Landing page visits

Tool needed:

- Google Analytics 4
- Google Ads conversion tracking

Website status:

- Lead tracking event hooks are prepared for quote modal open, quotation email preparation and WhatsApp clicks.
- These events will start reporting after a GA4 / Google Ads tag is added.

## 6. Exabytes Ticket

Ticket purpose:

Ask Exabytes to replace the parking DNS records and point `hungtainstrument.com.my` to GitHub Pages.

Requested DNS records:

- `www` CNAME to `barrykoh0621.github.io`
- Apex/root A records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`

Status: ticket submitted on 24/06/2026 after reCAPTCHA verification.

## 7. Google Business Photos

Status: uploaded to Google Business Profile on 24/06/2026. Google shows the new photos as pending review.

Photos generated for the profile:

- `public/google-business-photos/google-business-01-tensile-lab.png`
- `public/google-business-photos/google-business-02-factory-qa-tensile.png`
- `public/google-business-photos/google-business-03-tensile-grip-detail.png`
- `public/google-business-photos/google-business-04-compression-machine.png`
- `public/google-business-photos/google-business-05-modern-company-front.png`

## 8. Google Business Products and Services

Status: product/service copy prepared in `google-business-products-services.md`.

Use these first:

- Hydraulic Testing Machine
- Compression Testing Machine
- Electrical Tensile Testing Machine
- Universal Testing Machine
- Testing Machine Service and Calibration Guidance
