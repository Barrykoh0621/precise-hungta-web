# Domain DNS Launch Checklist

Company: HUNG TA INSTRUMENT (M) Sdn. Bhd.

Official domain:

https://www.hungtainstrument.com.my/

## Current Status

The domain is purchased, but it is not pointing to GitHub Pages yet.

Latest check:

- `hungtainstrument.com.my` resolves to Exabytes parking IP `103.7.9.22`
- GitHub Pages site is still live at `https://barrykoh0621.github.io/precise-hungta-web/`
- The website repository already contains `public/CNAME` with `www.hungtainstrument.com.my`

## DNS Records Needed At Exabytes

Set these DNS records in Exabytes:

| Host | Type | Value |
| --- | --- | --- |
| www | CNAME | `barrykoh0621.github.io` |
| @ | A | `185.199.108.153` |
| @ | A | `185.199.109.153` |
| @ | A | `185.199.110.153` |
| @ | A | `185.199.111.153` |

Remove or replace the old parking A record:

`103.7.9.22`

## After DNS Changes

Check:

1. `www.hungtainstrument.com.my` opens the website.
2. `hungtainstrument.com.my` redirects or opens correctly.
3. GitHub Pages shows the custom domain as active.
4. HTTPS certificate is issued by GitHub.
5. Google Business website link is changed to `https://www.hungtainstrument.com.my/`.
6. Google Ads landing page URLs are changed from GitHub Pages to the official domain.

## Important

Do not launch Google Ads with the official domain until DNS and HTTPS are working.

If ads must start before DNS is fixed, use the temporary GitHub Pages URLs and update ads later.
