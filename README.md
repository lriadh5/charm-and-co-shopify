# Charm & Co — Shopify Theme

Shopify store for a new teen/young-adult accessories brand (phone charms,
bag charms, bracelets, hair accessories, matching sets). Built on Shopify's
**Horizon** theme. See `docs/build-brief.md` for the full source brief this
project is being built against, and `docs/open-items.md` for what's still
blocked on the store owner.

**Status: pre-launch theme scaffold.** No live Shopify store exists yet —
this repo is theme code only, developed locally against a vendored copy of
Horizon. `shopify theme check` passes clean (364 files, 0 offenses), but
nothing has been pushed to a real store or opened in the Shopify theme
editor/local dev server yet — there is no store to connect to in this build
environment (see `docs/platform-access-notes.md`). Treat layout/spacing/
block behavior of every new section as visually unverified until then.

## What's in this repo

- Vendored [Shopify Horizon](https://github.com/Shopify/horizon) theme (see `VENDOR_README.md`, `LICENSE.md`, `release-notes.md` for upstream docs).
- Brand customization: color palette, rounded card/button radii (`config/settings_data.json`).
- New custom sections (not part of stock Horizon):
  - `sections/shop-by-style.liquid` — merchant-managed style tiles (Pastel, Y2K, Minimal, etc.), no code changes needed to add/remove a style.
  - `sections/complete-the-look.liquid` — attribute-aware cross-sell driven by a `capsule_*` product tag (see `docs/tagging-conventions.md`), not a generic "related products" feed.
  - `sections/bundle-showcase.liquid` — bundle products pulled from a merchant-picked collection, with automatic "Save $X" messaging.
  - `sections/ugc-social.liquid` — vertical video/UGC grid for TikTok/Reels-style social proof.
  - `sections/testimonials.liquid` — zero-cost curated-quote social proof to use until a reviews app is installed (see recommendation below).
  - `blocks/price-tier-badge.liquid` + `snippets/price-tier-badge.liquid` — automatic "Under $15" / "Under $20" badge computed from the product's live price (no manual tagging to maintain).
- `templates/index.json` — homepage assembled per the brief's Section 7 architecture (hero → featured categories → trending → shop by style → complete the look → bundles → UGC → testimonials → footer w/ email signup).
- `templates/product.json` — adds Complete the Look and a material/dimensions block between the main product block and Shopify's native "You may also like" recommendations.
- `snippets/breadcrumbs.liquid` — visible breadcrumb nav + BreadcrumbList JSON-LD on product/collection pages (Horizon ships Product schema and full meta tags out of the box, but had no breadcrumbs at all).
- `blocks/product-details-metafields.liquid` — shows `material`/`dimensions` product metafields when set, hides itself otherwise.
- `dev/scripts/shopify-admin-setup.mjs` — one-shot Admin API script that creates the full collection set, main navigation menu, and metafield definitions (see `docs/collections-and-navigation.md`) once there's a store + token. Not run yet.
- `docs/collections-and-navigation.md`, `docs/marketing-automation-flows.md` — collection/nav spec and copy drafts for all 12 lifecycle email/SMS flows from Section 15, sequenced into a $0 launch-day phase and a Phase 2 once an SMS/Klaviyo platform is added.

## Decisions made autonomously (flagged for review)

- **Brand/store name:** "Charm & Co" — confirmed by the store owner as the Shopify store name. Domain and trademark availability still need checking before a real domain is purchased.
- **Theme base: Horizon**, not Dawn — Horizon is Shopify's current default for new stores. Its out-of-the-box mobile PageSpeed is weaker than a lean Dawn build, so Core Web Vitals need to be an explicit QA gate (see `docs/performance-notes.md`), not assumed.
- **Plan tier recommendation: Basic** to start (no Functions/checkout-scripting needed for an 18-SKU launch); upgrade to Grow/Advanced later if needed.
- **Capsule/style merchandising uses product tags + automated collections**, not metafields/metaobjects as the brief suggested. Reasoning: tags + Shopify's native automated-collection price/tag conditions achieve the same "admin-manageable, no code changes" goal natively, without needing an Admin API token or custom metafield definitions before a store even exists. See `docs/tagging-conventions.md`.
- **Price-tier badging ("Under $15/$20") is computed directly from `product.price`**, not a metafield, for the same reason — it can't go stale.
- **Email/SMS recommendation:** start with **Shopify Email** (native, free under 10k sends/mo) rather than paying for Klaviyo pre-revenue; move to Klaviyo (or add Postscript/Attentive for SMS) once nearing ~$10k/mo revenue where its automation/segmentation pays for itself.
- **Reviews recommendation:** **Judge.me** (free tier, or $15/mo flat for unlimited photos/video + Google Shopping syndication) over Loox, given the flexible-but-lean budget signal — Loox's paid tiers scale with order volume and get expensive fast.
- **Amazon:** deferred. No Seller Central account exists yet. When ready, **Shopify Marketplace Connect** is the current native integration path (free under 50 orders/mo). Buy with Prime is not worth pursuing pre-Brand-Registry/pre-volume.

## What is NOT done yet (needs the store owner)

See `docs/open-items.md` for the full list. Short version: there is no real
Shopify store, no domain, no real product/supplier data, and no Amazon
account yet, so none of this can go live. This repo is structural/theme work
only, per the brief's own instruction to scaffold with clearly-marked
placeholders rather than fabricate real catalog or brand data.
