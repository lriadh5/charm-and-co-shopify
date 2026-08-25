# Tagging conventions for merchandising

These are plain Shopify product tags, applied from the admin (or in bulk via
a CSV import later) — no app or metafield setup required. Everything below
is designed so a non-technical person can add a new capsule or style from the
Shopify admin alone, with zero code changes.

## Capsule tags (drives "Complete the Look")

Tag format: `capsule_<collection-handle>`

Example: a product in the "Pink Pop" capsule gets the tag `capsule_pink-pop`.

Setup per capsule:
1. Create a collection titled e.g. "Pink Pop" (Shopify will generate the
   handle `pink-pop` automatically — check it under the collection's SEO
   settings if unsure).
2. Make it an **automated** collection with the condition `Tagged with capsule_pink-pop`
   (or add products manually — either works).
3. Tag every product that belongs in that capsule with `capsule_pink-pop`.

The `complete-the-look` section reads the current product's first
`capsule_*` tag, strips the `capsule_` prefix to get the collection handle,
and pulls other products from that collection (excluding the product being
viewed). No section settings need to change when a new capsule is added.

Planned capsules from the brief: `capsule_pink-pop`, `capsule_midnight`,
`capsule_ocean`.

## Style tags (drives "Shop by Style")

`shop-by-style.liquid` is block-based, not tag-driven — each tile is added
manually in the theme editor and links to wherever the merchant wants
(a collection, or a tag search URL like `/collections/all?filter.p.tag=Y2K`).
If/when the catalog is large enough that tag-search links are worth
formalizing, apply plain descriptive tags (`Pastel`, `Y2K`, `Minimal`,
`Colorful`, `Black & White`, `Hearts`, `Stars`, `Initials`) and point each
tile's link at the matching filtered collection URL.

## Price tiers ("Under $15" / "Under $20")

No tag needed. `snippets/price-tier-badge.liquid` reads `product.price`
directly and can never go stale. For the actual "Gifts Under $15" /
"Gifts Under $20" collections, use Shopify's native automated collection
condition **Price is less than $15.00** (and $20.00) — this is a built-in
Shopify feature, no app or code required.
