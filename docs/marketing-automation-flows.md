# Marketing automation flows — drafts

Copy drafts for every flow in Section 15 of the brief, sequenced into two
rollout phases so launch doesn't wait on a paid platform. Nothing here is
wired up yet — these are ready-to-paste drafts for whichever platform ends
up installed (see README for the Shopify Email → Klaviyo recommendation).
Every draft assumes the real domain/store details from `docs/open-items.md`
are filled in before send.

## Phase 1 — launch day (native Shopify features, $0)

Shopify sends abandoned-checkout recovery emails automatically once a store
is live (Settings → Checkout) — no separate flow to build, just make sure
it's turned on and the email template matches the brand. The rest below
use Shopify Email (free under 10k sends/mo).

### 1. Welcome email — triggers on signup
**Subject:** Welcome to Charm & Co 🔗 here's 15% off
**Body:**
> You're in. Here's 15% off your first order — because starting your charm
> collection shouldn't wait.
>
> **[SHOP15]** — 15% off, first order only. Expires in 7 days.
>
> New drops, capsule launches, and restocks land in your inbox first. Talk soon.
>
> [Shop New Drops →]

### 2. First-order discount
Not a separate flow — the code in the welcome email above *is* this. Track
its own discount code (`SHOP15`) so it's measurable independent of other
promo codes.

### 3. Cart abandonment — 1 hour after cart activity, no checkout started
**Subject:** You left something in your cart 👀
**Body:**
> Still thinking about it? Your cart's saved — but these sell out fast.
>
> [items block]
>
> [Finish Checkout →]
>
> Need a nudge? Use **COMEBACK10** for 10% off, today only.

### 4. Post-purchase — sent immediately after order confirmation
**Subject:** It's on the way 🎉
**Body:**
> Thanks for shopping Charm & Co — your order's being packed up now.
>
> Tag us **@charmandco** when it arrives, we love seeing how you style it.
>
> P.S. Refer a friend and you both get $5 off.

### 5. Review request — 10 days after delivery (or 14 days after order if no delivery tracking yet)
**Subject:** How's your charm holding up?
**Body:**
> You've had a little time with it now — mind leaving a quick review?
> Photos get you extra entries into our monthly giveaway.
>
> [Leave a Review →]

## Phase 2 — once Klaviyo/SMS is added (post ~$10k/mo revenue, see README)

### 6. Welcome SMS — triggers on SMS opt-in
> Charm & Co: you're in! Reply Y to confirm & get your 15% code. Msg&data
> rates may apply. Reply STOP to opt out.

### 7. Browse abandonment — 2–4 hrs after viewing a product, no add-to-cart
**Subject:** Still eyeing the {{ product.title }}?
**Body:**
> It's still here. Here's a closer look — plus what pairs with it from the
> same capsule.
>
> [Complete the Look →]

### 8. Checkout abandonment — 30 min after checkout started, not completed (distinct from cart abandonment: further down the funnel, shorter delay, no discount on first touch)
**Subject:** Almost done — your order's one tap away
**Body:**
> You made it all the way to checkout. Pick up right where you left off.
>
> [Complete Your Order →]

### 9. Back-in-stock — triggers when a subscribed variant restocks
**Subject:** It's back: {{ product.title }}
**Body:**
> You asked, it's back. Grab it before it's gone again — these restocks
> don't usually last long.
>
> [Shop Now →]

### 10. New-drop announcement — triggers on new collection/capsule publish
**Subject:** NEW: the {{ capsule.title }} capsule just dropped
**Body:**
> Phone charm, bag charm, bracelet — all matching, all new. Shop the set or
> mix your own.
>
> [Shop {{ capsule.title }} →]

### 11. VIP segmentation — ongoing segment (not a single send)
Segment definition: 3+ orders OR $75+ lifetime spend. Gets early access to
new drops (24–48 hrs before public), a standing 10% code, and first pick on
limited restocks. Announce entry into the segment once:
**Subject:** You're a Charm & Co VIP 💫
**Body:**
> You've unlocked VIP access — early drops, a standing discount, and first
> dibs on restocks. Welcome to the inner circle.

### 12. Win-back — triggers at 60 days since last order, no purchase since
**Subject:** We miss you — here's 20% to come back
**Body:**
> It's been a minute. Your style's probably evolved (ours has too — check
> out what's new). Here's 20% off to pick back up.
>
> **[COMEBACK20]**
>
> [See What's New →]

## Sequencing notes
- Phase 1 needs nothing beyond the store existing and Shopify Email enabled.
- Phase 2 needs: an SMS-capable platform, real order-volume data (for VIP
  thresholds and win-back timing), and enough catalog/traffic for browse
  abandonment to be worth the complexity.
- All discount codes above are illustrative — create real ones in Shopify
  admin with actual expiry/usage limits before any flow goes live.
