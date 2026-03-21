# Clean URL Copier

A small Chromium-compatible browser extension for Brave/Chrome that copies a cleaned version of the current page URL to the clipboard.

## Goal

Build a useful, simple browser extension as an AI-driven software development exercise.

The extension should let the user trigger a keyboard shortcut and copy a cleaned version of the active tab's URL. The first version focuses on removing common tracking parameters without trying to aggressively rewrite or canonicalize URLs.

## Why this project

This project is intentionally small and useful. It is a good fit for AI-assisted development because it can be split into small, testable tasks:

- browser extension scaffold
- command handling
- active tab URL access
- clipboard copy
- optional user feedback
- tests for cleaning rules

It is also a good exercise in keeping scope under control.

## MVP

The first version should support the following:

- user presses a keyboard shortcut
- extension reads the current active tab URL
- extension removes known tracking parameters
- extension copies the cleaned URL to the clipboard
- extension optionally shows a small confirmation message or notification

## Example

Input:
```text
https://example.com/article?id=123&utm_source=newsletter&utm_medium=email&fbclid=abc123
```

Output:
```text
https://example.com/article?id=123
```

## Initial scope

### Included in MVP

- manifest V3 extension
- keyboard shortcut command
- basic URL cleaning
- clipboard copy
- minimal feedback
- support for Brave and Chrome

### Not included in MVP

- complex domain-specific rewriting
- sync across devices
- cloud storage
- analytics
- popup UI with advanced controls
- large rule system
- automatic page rewriting

## Definition of "clean"

For version 1, "clean" means:

- remove known tracking parameters
- preserve the rest of the URL as-is
- do not try to guess a site's canonical URL
- do not remove parameters unless they are clean known junk or explicitly configured

This is important for predictability.

## Candidate parameters to remove in MVP

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`
- `utm_id`
- `fbclid`
- `gclid`
- `dclid`
- `mc_cid`
- `mc_eid`

potentially later:

- `igshid`
- `si`
- `ref`
- `ref_src`

These later candidates should be treated carefully because some are site-specific and may be legitimate.

## User stories

### Code user story

As a user, I want to press a shortcut and copy a clean version of the current page URL so that I can share links without tracking parameters.

### Supporting user stories

- As a user, I want the extension to work in Brave.
- As a user, I want the cleaned URL copied directly to the clipboard
- As a user, I want the original important parameters preserved.
- As a user, I want predictable behavior.
- As a future user, I may want to configure which parameters are removed.

## Acceptance Criteria

- the extension installs in Brave as an unpacked extension
- pressing the configured shortcut on a normal web page copies a cleaned URL
- known tracking parameters are removed
- non-tracking parameters are preserved
- the extension does not fail silently
- the behavior is consistent across repeated tests


