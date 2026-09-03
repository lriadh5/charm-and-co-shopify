# Open items — needs the store owner

Nothing here can be resolved by writing more code. Listed in rough priority
order (blocking → nice-to-have-soon).

## Blocking launch entirely
1. **Create the actual Shopify store** (this build environment has no
   Shopify CLI/admin access — see `docs/platform-access-notes.md`). Once
   created: share the `.myshopify.com` domain and either connect it via
   Shopify's GitHub integration or run `shopify theme push` from this repo.
2. **Domain name.** "Charm & Co" is the confirmed store/brand name — still
   needs a real trademark/domain-availability check before a domain is
   purchased. Building on the default `.myshopify.com` address until then
   (per store owner's instruction).
3. **Real product/supplier data.** Section 12 of the brief calls for 8 phone
   charms, 3 bag charms, 2 bracelet products, 2 hair/accessory products, and
   ~3 bundles — real SKUs, cost, pricing, weights, and descriptions.
   Supplier sourcing (lead times, MOQ, drop-ship vs. held stock) also needs
   to happen; this cannot be fabricated.
4. **Product photography/video.** Needs sourcing — supplier-provided,
   in-house, or a photographer/content creator.
5. **Logo, exact brand colors/fonts** if different from the placeholder
   lavender/butter/mint palette set in `config/settings_data.json`.

## Needed before going live but not blocking theme work
6. Admin API custom app + token (scopes: products, inventory, orders,
   discounts) if/when bulk product import or automation is wanted.
7. Google Merchant Center account + GA4 property, Meta/TikTok/Pinterest
   pixel IDs — needed to wire up Web Pixels API tracking (Section 16 of the
   brief).
8. Existing social/ad accounts to connect (TikTok, Instagram, Pinterest) if
   any exist already.

## Deferred by design (per brief)
9. **Amazon.** No Seller Central account yet — this is explicitly a
   post-launch phase (see README's Amazon section). Nothing to do here
   until the Shopify store itself is live and selling.
10. **SMS marketing.** Recommended to add once revenue justifies Klaviyo or
    a dedicated SMS platform (Postscript/Attentive) — not worth the
    subscription cost pre-revenue.
