# Teen Accessories Brand — Shopify Build Brief

Prepared: August 25, 2026. This is the source brief this repo is being built
against, kept verbatim for reference. See `README.md` for what has actually
been implemented so far and `docs/open-items.md` for what's still pending.

## 0. How Claude Code Should Use This Document
1. Read this entire brief before touching any code or store settings.
2. Resolve Section 1 (Access & Prerequisites) and Section 2 (Open Questions) first — most of this cannot start without them. If access or answers are missing, ask for them rather than guessing or inventing placeholder brand/product data and presenting it as final.
3. Then follow the Working Method in Section 18 for every stage of the build: audit existing state → report findings → propose a prioritized plan → build in controlled stages → test after each stage → keep a changelog.
4. Where a better current technical approach exists than something specified below — a newer Shopify theme architecture, a changed Amazon integration, a deprecated app — explain the tradeoff and use the approach that best protects sales, SEO, speed, reliability, Amazon compatibility, scalability, and maintainability. Verify current platform capabilities with a live search before relying on anything below as fact — this brief was written August 2026 and some specifics (theme names, app names, program eligibility) can change.

## 1. Access & Prerequisites (read first)

**Store & theme access**
- Existing store or brand-new? → **Brand new.**
- Shopify CLI/theme source access → not available in this build environment; theme developed locally against a vendored Horizon copy.
- GitHub integration recommended for version control and staging → production workflow.

**Store configuration**
- Shopify plan tier gates checkout customization, Functions, multi-currency, B2B, API limits. → **Recommended: Basic to start.**
- Admin API / Storefront API tokens → not yet issued.

**Brand assets**
- Brand name/domain, logo, colors, fonts → **undecided, needs help deciding** (working name "Charm & Co" chosen provisionally).
- Real product photography/video or supplier-provided images → **needs sourcing.**

**Product & supplier data**
- Real SKUs, cost, pricing, weights/dimensions, descriptions → **not yet available, needs sourcing help.**
- Supplier relationship details (lead times, MOQ, drop-ship vs. stock) → **not yet available.**

**Sales channel & marketing accounts**
- Amazon Seller Central → **no account yet.**
- Google Merchant Center, GA4 → not yet set up.
- Meta/TikTok/Pinterest pixel IDs → not yet created.
- Email/SMS platform → **not decided, Claude Code recommended one** (Shopify Email → Klaviyo later).
- Reviews app → **not decided, Claude Code recommended one** (Judge.me).

**Budget / constraints**
- Monthly app budget → flexible, no ceiling given.
- Target launch date → none fixed.

## 2. Open Questions (resolved so far)
1. Brand name and domain → undecided, working name "Charm & Co" chosen; real domain pending.
2. New store or existing → new store.
3. Real initial product data → not ready, needs sourcing help.
4. Amazon Seller Central status → no account yet.
5. Email/SMS and reviews platforms → Claude Code recommended Shopify Email → Klaviyo, and Judge.me.
6. App budget ceiling → flexible/unset.
7. Launch timeline → none fixed.
8. Existing social following/ad accounts → not yet asked/answered.
9. Who supplies product photography/video → needs sourcing help.

## 3. Role & Operating Mode
Act as a senior, multi-disciplinary e-commerce build team — Shopify development/theme architecture, e-commerce UX/UI and CRO, brand strategy for a teen/young-adult accessories label, technical SEO, Google Shopping, Amazon/Shopify integration, marketing automation, analytics/tracking, performance engineering, and QA. Confirm actual plan tier before assuming Plus-only features are available.

## 4. Project Overview & Business Model
New Shopify brand selling trendy, affordable accessories primarily for teenagers and young adults.

Initial product categories:
1. Beaded phone charms and phone wrist straps
2. Bag and backpack charms
3. Friendship bracelets
4. Bracelet-making kits
5. Claw clips and small hair accessories
6. Matching accessory sets
7. Small giftable accessories generally under $15–$20

Hero category: **Phone charms.**

Business flow: Supplier → Shopify → Amazon → Social media → Customer. Selling through both Shopify DTC and Amazon simultaneously.

Must be designed from day one for: Shopify direct sales, Amazon via the appropriate current integration, Google Merchant Center/Shopping, TikTok, Instagram, Facebook, Pinterest, email, SMS, reviews, bundles, upsells/cross-sells, abandoned-cart automation, and cross-channel inventory sync.

Not a generic dropshipping template site — build like a real, scalable consumer brand.

## 5. Target Customer & Brand Feel
Teenagers and young adults. Trendy, modern, fun, social, expressive, affordable, giftable, premium enough to trust — not childish, so it can expand into broader young-adult accessories later. Avoid an overly pink or juvenile palette.

## 6. Design Direction
Mobile-first (iPhone before desktop) — most traffic from TikTok, Instagram, Google, and Amazon-adjacent phone searches. Prioritize: strong product imagery, short vertical video, fast navigation, quick add-to-cart, clear CTAs, bundles, recommendations, social proof, easy checkout, fast load times, clean layout.

Visual system: clean backgrounds; pastel/youthful (not exclusively pink) accents; strong typography; rounded cards/buttons; large imagery; generous whitespace; modern iconography; visual collection tiles.

## 7. Homepage Architecture
1. Announcement bar
2. Header/navigation
3. Hero — "MAKE IT YOURS." / "Phone charms, bag charms, bracelets and accessories made for your vibe." / CTAs "SHOP NEW DROPS" and "BEST SELLERS"
4. Featured category cards: Phone Charms, Bag Charms, Bracelets, Hair, Matching Sets, Gifts Under $20
5. Trending Now
6. Shop by Style — Pastel, Y2K, Colorful, Minimal, Black & White, Stars, Hearts, Initials
7. Complete the Look (styled outfit-style module)
8. Best-selling bundles
9. Social video / UGC section
10. Reviews / social proof
11. Email + SMS signup
12. Full footer

## 8. Navigation
New · Phone Charms · Bag Charms · Bracelets · Hair · Sets · Under $15 · Sale

## 9. Collection Architecture
Standard: New Arrivals, Best Sellers, Phone Charms, Bag & Backpack Charms, Bracelets, Bracelet Kits, Hair Accessories, Matching Sets, Gifts Under $15, Gifts Under $20, Sale, Shop All.

Curated capsule collections (coordinated-by-color/theme, core to brand strategy, drives merchandising):
- **PINK POP** — pink phone charm, pink bag charm, pink bracelet, pink claw clip, pink bundle
- **MIDNIGHT** — black/silver phone charm, black bag charm, black bracelet, black hair accessory, matching set
- **OCEAN** — blue/white phone charm, blue bag charm, blue bracelet, matching bundle

Use tags/metafields so these stay dynamically manageable from the admin rather than hardcoded (implemented via product tags + automated collections — see `docs/tagging-conventions.md`).

## 10. Product Page Requirements
High-quality image gallery + video; price, variants, color selector; Add to Cart + Buy Now; sticky mobile add-to-cart bar; material/dimensions/shipping/returns info; reviews, FAQs; related products, Complete the Look, Frequently Bought Together, bundle upsells.

## 11. Cross-Sell / AOV Strategy
Attribute-aware recommendations, not generic "related products." A pink phone charm viewer should see a pink bag charm, bracelet, hair clip, and the pink bundle — driven by shared color/style/capsule attributes, not manual per-product curation. Goal: increase AOV through coordinated, relevant bundling.

## 12. Initial Catalog Scope
Deliberately small and real: 8 phone charms, 3 bag charms, 2 bracelet products, 2 hair/accessory products, ~3 bundles. Do not pad with placeholder SKUs — real data required before launch; scaffolding with clearly-labeled placeholders is fine for structural/theme work in the meantime.

## 13. SEO Requirements
Semantic HTML, correct heading structure, unique titles/meta descriptions, canonical URLs, XML sitemap, robots controls, structured data (Product, Organization, BreadcrumbList), breadcrumbs, internal linking, descriptive alt text, clean URLs, strong Core Web Vitals, responsive images, mobile optimization, GSC/GA4/Merchant Center readiness. No doorway pages, no keyword stuffing.

Future content/SEO topics (blog posts, not thin doorway pages): best phone charms for teens, cute phone charm ideas, how to attach a phone charm, backpack charm ideas, cute accessories for school, small gifts for teenage girls, friendship bracelet ideas, matching phone/backpack accessories, teen accessory trends.

## 14. Amazon Multi-Channel Strategy
Shopify and Amazon must coexist without inventory/listing conflicts. Shopify's channel app for Amazon is **Marketplace Connect**; Amazon separately runs **Buy with Prime** (invite/category-limited). Verify current eligibility/pricing/scope before implementing — don't assume availability. Cover: listing sync, inventory sync, FBA vs. Shopify-to-Amazon MCF vs. self-fulfillment, and whether Buy with Prime is worth pursuing given category/seller status.

## 15. Marketing Automation
Design flows for (sequence per staged rollout, don't build all at once): welcome email, welcome SMS, first-order discount, browse abandonment, cart abandonment, checkout abandonment, post-purchase, review request, back-in-stock, new-drop announcement, VIP segmentation, win-back.

## 16. Analytics & Tracking
Measure sessions, source/medium, product views, add-to-cart, begin-checkout, purchase, conversion rate, AOV, revenue, bundle sales, returning customer rate, email revenue, paid media revenue. Implement via GA4 and Shopify's Web Pixels API rather than raw third-party scripts in theme.liquid where avoidable. Server-side/Conversions API tracking for Meta and TikTok where feasible.

## 17. Performance Requirements
Avoid unnecessary apps, bloated JS, uncompressed images, excessive trackers, layout shift, heavy animation libraries. Prefer Shopify-native functionality over an app for everything.

## 18. Code Quality & Theme Architecture
Reusable sections/snippets, clean Liquid, maintainable CSS, minimal JS, Online Store 2.0 best practices. Don't hard-code product info that should be dynamic — use metafields/metaobjects (or tags/automated collections, see deviation note in README) so the store stays admin-manageable without code changes. Theme base: confirm Dawn vs. Horizon vs. whatever is current before committing — chosen: **Horizon**.

## 19. QA Checklist
Before declaring any stage complete, test: mobile/desktop/tablet; Safari and Chrome; navigation; variants; add to cart; cart; full checkout; discount codes; search; filters; forms; email capture; analytics events; broken links; 404 behavior; structured data validity; page speed (Core Web Vitals).

## 20. Working Method
1. Inspect existing project/store — don't assume blank slate.
2. Audit architecture, theme, apps, integrations, performance, SEO, analytics.
3. Report what exists before proposing changes.
4. Identify problems/risks.
5. Produce a prioritized implementation plan.
6. Preserve working functionality — don't delete/overwrite without understanding it.
7. Implement in controlled stages.
8. Test after every major stage.
9. Keep a running changelog of everything modified.

## 21. Decision Priority Framework
When more than one approach is viable: sales, SEO, speed, reliability, Amazon compatibility, scalability, maintainability — in that order. At every decision: does this improve trust, conversion, AOV, mobile experience, organic discoverability, speed, and future automation? The store has to sell — optimize for that.
