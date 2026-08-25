# Placeholder catalog (NOT real product data)

18 products matching the brief's Section 12 catalog scope (8 phone charms, 3
bag charms, 2 bracelets, 2 hair accessories, 3 bundles), tagged with the
`capsule_*` convention from `docs/tagging-conventions.md` so the theme's
Complete the Look / Shop by Style / price-tier logic has something real to
render against during development.

**Every title, description, price, weight, and SKU here is invented and
marked `[PLACEHOLDER]`. None of it is real supplier or pricing data — do not
launch with this.** All rows import as `draft` / unpublished specifically so
nothing here can accidentally go live on a real storefront.

## To use

1. Once a real Shopify store exists: Shopify admin → Products → Import →
   upload `products.csv`.
2. Create the three capsule collections referenced by the tags — title them
   exactly "Pink Pop", "Midnight", "Ocean" (so their auto-generated handles
   match `pink-pop`, `midnight`, `ocean`) as **automated** collections with
   condition `Tagged with capsule_pink-pop` (etc.).
3. Create the price-based automated collections "Gifts Under $15" (condition:
   Price < $15.00) and "Gifts Under $20" (condition: Price < $20.00) — native
   Shopify feature, no code needed.
4. Set the featured-category and trending-now collection pickers in the
   homepage sections (`templates/index.json`, editable in the theme editor)
   once real collections exist.
5. Delete or replace every row here with real catalog data before launch.
