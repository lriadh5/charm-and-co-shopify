# Changelog

All entries newest first. This is a build/dev changelog, not a customer-facing one.

## 2026-08-25 — Theme-check fixes + placeholder catalog

**Fixed** (found by installing `@shopify/cli` and running `shopify theme check`):
- Sections can't use `{% doc %}` (snippet/block-only) — switched the four new sections to `{% comment %}`.
- `{% stylesheet %}` must be static CSS; moved dynamic `settings.color_palette` values into inline custom properties on the wrapping element instead (`price-tier-badge` snippet, `testimonials` section).
- Added `.theme-check.yml` disabling `MatchingTranslations` — store launches English-only, so incomplete translations across the 30+ vendor locale files aren't a real defect (Shopify falls back to `en.default.json`).
- Verified: 364 files, 0 offenses.

**Added**
- `dev/sample-data/products.csv` — 18 placeholder products matching the brief's Section 12 catalog scope (8 phone charms, 3 bag charms, 2 bracelets, 2 hair accessories, 3 bundles), tagged with the `capsule_*` convention so Complete the Look / price-tier logic has real data to render against in dev. All rows import as `draft`/unpublished and every field is explicitly marked `[PLACEHOLDER]` — see `dev/sample-data/README.md` for import steps and what still needs to happen (capsule/price-tier automated collections) before it's usable.

## 2026-08-25 — Initial theme scaffold

**Context:** No Shopify store exists yet for this brand. Working autonomously
per store owner's instruction ("don't wait for permission, choose the best
option and continue") after resolving the blocking brand/product/Amazon
questions via conversation. See `docs/open-items.md` for what's still
genuinely blocked on the store owner (real store, domain, product data,
photography, Amazon account).

**Added**
- Vendored Shopify Horizon theme (`git clone --depth 1` from `Shopify/horizon`, upstream `LICENSE.md`/`release-notes.md` preserved, upstream README kept as `VENDOR_README.md`).
- Brand color palette + rounded card/button radii in `config/settings_data.json` (lavender/butter/mint pastel system, deliberately not pink-dominant per Section 5 of the brief).
- `snippets/price-tier-badge.liquid` + `blocks/price-tier-badge.liquid` — automatic "Under $15"/"Under $20" badge computed from live product price.
- `sections/shop-by-style.liquid` — merchant-managed style tiles.
- `sections/complete-the-look.liquid` — capsule-tag-driven attribute-aware cross-sell (see `docs/tagging-conventions.md`); wired into `templates/product.json` between the main product block and native product recommendations, and onto the homepage in `templates/index.json`.
- `sections/bundle-showcase.liquid` — collection-driven bundle cards with automatic "Save $X" messaging.
- `sections/ugc-social.liquid` — vertical video/UGC grid, block-based.
- `sections/testimonials.liquid` — zero-cost curated-quote social proof placeholder for the reviews slot until a reviews app is installed.
- `templates/index.json` rebuilt to the brief's Section 7 homepage order (hero → featured categories → trending → shop by style → complete the look → bundles → UGC → testimonials; header/footer/email-signup already handled by Horizon's existing header/footer groups, left untouched).
- New locale keys `content.price_tier_under_15` / `content.price_tier_under_20` in `locales/en.default.json`.
- `README.md`, `docs/build-brief.md`, `docs/open-items.md`, `docs/tagging-conventions.md`, `docs/platform-access-notes.md`.

**Deliberate deviations from the literal brief text** (rationale in README):
- Capsule/style grouping implemented via product tags + Shopify automated collections instead of metafields/metaobjects.
- Price-tier badging computed from `product.price` at render time instead of a metafield.

**Not done / explicitly deferred**
- Nothing pushed to a real Shopify store — none of this has been run through `shopify theme check` or viewed in a browser (no Shopify CLI/store access in this environment; see `docs/platform-access-notes.md`). Treat every new section as unverified until checked in the theme editor.
- No real product/collection data loaded (would require fabricating a catalog, which the brief explicitly prohibits).
- No GitHub remote configured yet — pending `owner/repo` from the store owner.
- Amazon, Google Merchant Center, GA4, pixels, email/SMS app, and reviews app are all recommended in README but not installed/connected (no store to connect them to yet).
