# Architecture

## Overview

The extension listens for a keyboard shortcut, reads the active tab URL, cleans it using a pure URL-processing module, and copies the result to the clipboard.

## Main components

### 1. Manifest

Responsible for:

- declaring the extension metadata
- enabling the background service worker
- defining the keyboard shortcut command
- declaring permissions

### 2. Background service worker

Responsible for:

- listening for command events
- locating the active tab
- validating the tab URL
- calling the URL cleaner
- copying the result to clipboard
- handling success/failure feedback

This should remain thin and orchestration-focused.

### 3. URL cleaner

Responsible for:

- holding the list of removable parameters
- providing matching logic for patterns like `utm_*`
- later support for domain specific overrides if needed

## Design princibles

### Keep browser logic separate from URL logic

The cleaner should not know anything about tabs, commands, or clipboard APIs. This makes testing much easier.

### Prefer explicit rules

Only remove parameters that are clearly known tracking junk or explicitly configured by the user.

### Avoid hidden behavior

The extension should not rewrite the full URL structure unless that behavior is clearly defined and tested.

## Basic flow

1. user presses shortcut
2. background service worker receives command
3. active tab is queried
4. URL is extracted
5. cleaner removes known tracking parameters
6. cleaned URL is copied to clipboard
7. user receives feedback

## Error cases to handle

- no active tab
- tab has no URL
- unsupported URL scheme
- malformed URL
- clipboard write fails

## Proposed architecture

- `manifest.json`
    - defines permissions, background service worker, and commands
- `background.js`
    - handles the keyboard shortcut
    - gets the active tab URL
    - calls URL cleaner
    - copies result to clipboard
    - trigger feedback
- `cleaner.js`
    - contains pure URL cleaning logic
    - should be easy to unit test
- `rules.js`
    - list of removable parameters
    - later can support domain-specific rules
- optional popup / optional pages
    - not required for MVP

## Testing strategy

### Unit tests

Focus on the cleaner logic:

- input URL
- expected output URL

### Manual tests

Focus on browser behavior:

- shortcut works
- active tab is read correctly
- clipboard contains expected result
- feedback is shown

## Future extension points

- Popup UI
- options storage
- custom rules
- domain-specific rule sets
- context menu entry
- domain override, for example: `x.com` -> `fxtwitter.com`

