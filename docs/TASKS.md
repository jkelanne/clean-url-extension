# TASKS

## Phase 0 - Project setup

- [x] Create repository
- [x] Add README.md
- [x] Add docs/TASKS.md
- [x] Add docs/ARCHITECTURE.md
- [x] Add docs/DECISIONS.md

## Phase 1 - MVP scaffold

- [x] Create `manifest.json` using Manifest V3
- [ ] Add required permissions
- [ ] Add background service worker
- [ ] Add command definition for keyboard shortcuts
- [ ] Load extension as unpacked in Brave
- [ ] Confirm extension installs successfully

## Phase 2 - Core behavior

- [ ] Detect command shortcut event
- [ ] Query current active tab
- [ ] Read current tab URL
- [ ] Handle unsupported URLs safely
- [ ] Pass URL into cleaner function
- [ ] Copy cleaned URL to clipboard
- [ ] Add basic success feedback
- [ ] Add basic failure feedback

## Phase 3 - URL cleaner

- [ ] Create pure `cleanUrl(url)` function
- [ ] Define initial removable parameter list
- [ ] Remove `utm_*` parameters
- [ ] Remove `fbclid` 
- [ ] Remove `gclid`
- [ ] Remove `dclid`
- [ ] Remove `mc_cid`
- [ ] Remove `mc_eid`
- [ ] Preserve path, hash, and non-tracking parameters
- [ ] Normalize output only as needed
- [ ] Document cleaning rules

## Phase 4 - Manual testing

- [ ] Test on plain URL with no query parameters
- [ ] Test on URL with `utm_*`
- [ ] Test on URL with multiple mixed parameters
- [ ] Test on YouTube
- [ ] Test on news sites
- [ ] Test on e-commerce URLs
- [ ] Test behavior on internal browser pages
- [ ] Verify clipboard content after copy

## Phase 5 - Unit tests

- [ ] Add test framework
- [ ] Add test for `cleanUrl(url)`
- [ ] Add fixture-based test cases
- [ ] Test preservation of important parameters
- [ ] Test removal of known tracking parameters
- [ ] Test invalid URL handling
- [ ] Test idempotency where applicable

## Phase 6 - Polish

- [ ] Improve shortcut naming and documentation
- [ ] Add extension icons
- [ ] Add better user feedback
- [ ] Review permissions and reduce if possible
- [ ] Clean code structure
- [ ] Improve error messages
- [ ] Add install/use instructions to README

## Phase 7 - Optional post-MVP

- [ ] Add popup with "Copy clean URL" button
- [ ] Add options page
- [ ] Store custom removable parameters
- [ ] Add per-domain rules
- [ ] Add whitelist mode for selected sites
- [ ] Add context-menu action
- [ ] Add import/export for rules


