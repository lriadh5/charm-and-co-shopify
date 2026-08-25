# Platform access notes (this build environment)

- No `gh` CLI and no GitHub write credentials are available here — a repo
  had to be created by the store owner and shared as `owner/repo` so this
  session could attach and push to it.
- No `shopify` CLI is installed and there is no Shopify store/API token to
  connect to, so nothing in this repo has been run through
  `shopify theme dev`, `shopify theme check`, or pushed to a real store.
  Before this theme goes live: install the Shopify CLI, run
  `shopify theme check` (lint) and `shopify theme dev` (local preview)
  against a real (even brand-new/blank) store, and fix anything that
  surfaces — none of the new sections in this repo have been visually
  verified in a browser yet.
- Outbound network access in this environment does reach github.com
  (used to vendor the Horizon theme via `git clone`) and general web search,
  so research/verification steps were done live rather than from memory.
