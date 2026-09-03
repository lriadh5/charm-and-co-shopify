# Collections & navigation structure

Full collection list and nav structure from Section 8/9 of the brief, plus
exactly how each collection is meant to populate itself (rule-based,
native Shopify features only — no app required). `dev/scripts/shopify-admin-setup.mjs`
creates all of this via the Admin API once a store + token exist; this doc
is the human-readable version of the same plan.

## Collections

| Title | Handle | Type | Rule |
|---|---|---|---|
| New Arrivals | `new-arrivals` | Automated | Tagged `new-arrival` |
| Best Sellers | `best-sellers` | Automated | Tagged `bestseller` |
| Phone Charms | `phone-charms` | Automated | Product type = `Phone Charm` |
| Bag & Backpack Charms | `bag-backpack-charms` | Automated | Product type = `Bag Charm` |
| Bracelets | `bracelets` | Automated | Product type = `Bracelet` |
| Bracelet Kits | `bracelet-kits` | Automated | Product type = `Bracelet Kit` |
| Hair Accessories | `hair-accessories` | Automated | Product type = `Hair Accessory` |
| Matching Sets | `matching-sets` | Automated | Tagged `Matching Set` |
| Gifts Under $15 | `gifts-under-15` | Automated | Price < $15.00 |
| Gifts Under $20 | `gifts-under-20` | Automated | Price < $20.00 |
| Sale | `sale` | Automated | Tagged `sale` (apply when a real discount is set) |
| Bundles | `bundles` | Automated | Tagged `Bundle` |
| Pink Pop | `pink-pop` | Automated | Tagged `capsule_pink-pop` |
| Midnight | `midnight` | Automated | Tagged `capsule_midnight` |
| Ocean | `ocean` | Automated | Tagged `capsule_ocean` |
| Shop All | *(none needed)* | — | Shopify provides `/collections/all` automatically — don't create a duplicate. |

`new-arrival` and `bestseller` are the two tags without a fully automatic
trigger — Shopify's automated-collection rules can't key off "days since
created" or actual sales velocity natively. Options, cheapest first: tag
manually at import/launch time; or set up a Shopify Flow (included on all
plans) that auto-tags `new-arrival` for the first N days after a product is
published, and `bestseller` past an order-count threshold — worth doing
once there's real order volume, not before.

## Navigation (main menu)

Matches Section 8 exactly:

| Label | Links to |
|---|---|
| New | `/collections/new-arrivals` |
| Phone Charms | `/collections/phone-charms` |
| Bag Charms | `/collections/bag-backpack-charms` |
| Bracelets | `/collections/bracelets` |
| Hair | `/collections/hair-accessories` |
| Sets | `/collections/matching-sets` |
| Under $15 | `/collections/gifts-under-15` |
| Sale | `/collections/sale` |

This is store data (Shopify's `main-menu`), not a theme file — it's set via
Shopify admin → Online Store → Navigation, or by running
`dev/scripts/shopify-admin-setup.mjs` once API access exists.

## What's already handled elsewhere

- Capsule/style tagging convention: `docs/tagging-conventions.md`.
- Homepage category tiles and the `shop-by-style` section pull from these
  same collections/tags — set the collection pickers in the theme editor
  once the collections above exist.
