# Platform access notes (this build environment)

- No `gh` CLI and no GitHub write credentials are available here — a repo
  had to be created by the store owner and shared as `owner/repo` so this
  session could attach and push to it.
- The Shopify CLI (`@shopify/cli`) was installed via `npm install -g` in
  this build environment and `shopify theme check` runs clean (364 files,
  0 offenses, see CHANGELOG). There is still no Shopify store or API token
  to connect to, so `shopify theme dev` (live local preview) and
  `shopify theme push` have **not** been run — none of the new sections
  have been visually verified in a real browser/theme editor yet. Do that
  against a real (even brand-new/blank) store before trusting the layout,
  spacing, or block behavior of anything new in this repo.
- Outbound network access in this environment does reach github.com
  (used to vendor the Horizon theme via `git clone`) and general web search,
  so research/verification steps were done live rather than from memory.
