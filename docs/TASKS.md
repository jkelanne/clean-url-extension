# TASKS

## Phase 0 - Project setup

- [x] Create repository
- [x] Add README.md
- [x] Add docs/TASKS.md
- [x] Add docs/ARCHITECTURE.md
- [x] Add docs/DECISIONS.md

## Phase 1 - MVP scaffold

- [x] Create `manifest.json` using Manifest V3
- [x] Add required permissions
- [x] Add background service worker
- [x] Add command definition for keyboard shortcuts
- [x] Load extension as unpacked in Brave
- [x] Confirm extension installs successfully

## Phase 2 - Core behavior

- [x] Add command listener in background.js
- [x] Query current active tab
- [x] Read current tab URL
- [ ] Handle unsupported URLs safely
- [x] Pass URL into cleaner function
- [x] Copy cleaned URL to clipboard
- [x] Add basic success feedback (console.log)
- [x] Add basic failure feedback (console.log)

## Phase 3 - URL cleaner

- [x] Create pure `cleanUrl(url)` function
- [x] Define initial removable parameter list
- [x] Remove `utm_*` parameters
- [x] Remove `fbclid` 
- [x] Remove `gclid`
- [ ] Remove `dclid`
- [ ] Remove `mc_cid`
- [ ] Remove `mc_eid`
- [ ] Preserve path, hash, and non-tracking parameters
- [ ] Normalize output only as needed
- [ ] Document cleaning rules

## Phase 4 - Manual testing

- [x] Test on plain URL with no query parameters
- [x] Test on URL with `utm_*`
- [x] Test on URL with multiple mixed parameters
- [ ] Test on YouTube
- [ ] Test on news sites
- [ ] Test on e-commerce URLs
- [ ] Test behavior on internal browser pages
- [x] Verify clipboard content after copy

## Phase 5 - Unit tests

- [x] Add test framework
- [x] Add test for `cleanUrl(url)`
- [ ] Add fixture-based test cases
- [ ] Test preservation of important parameters
- [ ] Test removal of known tracking parameters
- [ ] Test invalid URL handling
- [ ] Test idempotency where applicable

## Phase 6 - Next usability features
- [x] Add context menu item: "Copy Clean URL" to "page"
- [x] Handle context menu click in background service worker
- [x] Reuse existing URL cleaning and clipboard flow from context menu action
- [x] Manually test context menu behavior on normal web pages
- [x] Add context menu item "Copy Clean URL" to link
- [ ] Expand removable tracking parameters
- [ ] Review whether popup UI is still needed

## Phase 7 - Polish

- [ ] Improve shortcut naming and documentation
- [ ] Add extension icons
- [ ] Add system notifications for success and failure
- [ ] Replace console.log feedback with notifications where appropriate
- [ ] Review permissions and reduce if possible
- [ ] Clean code structure
- [ ] Improve error messages
- [ ] Add install/use instructions to README

## Phase 8 - Optional post-MVP

- [ ] Add popup with "Copy clean URL" button
- [ ] Add options page
- [ ] Store custom removable parameters
- [ ] Add per-domain rules
- [ ] Add whitelist mode for selected sites
- [ ] Add context-menu action
- [ ] Add import/export for rules


