# Decisions

## Decision 001 - Keep MVP small

The first version will only support copying a cleaned current-tab URL using a keyboard shortcut.

Reason:
This provides a useful result quickly and avoids early scope creep.

## Decision 002 - Remove only know tracking parameters

The first version will not attempt aggressive URL canonicalization.

Reason:
Predictability is more important than being clever. Over-aggressive cleaning risks breaking legitimate links.

## Decision 003 - Keep cleaner logic pure

URL cleaning logic will be implemented as a pure function separate from browser APIs.

Reason:
This improves testability and reduces complexity.

## Decision 004 - Build for Chromium/Brave using Manifest V3

The extension will target the current Chromium extension model.

Reason:
This matches Brave compatibility and current browser extension practices.

## Decision 005 - Add options only after MVP

User-configurable rules and UI will be postponed until the core behavior works.

Reason:
Configuration adds complexity and should only be introduced after the basic product is stable.

## Decision 006 - Use an offscreen document for clipboard writes

Clipboard writes are implemented via an offscreen document rather than directly in the service worker.

Reason:
Manifest V3 service workers do not have DOM access. Chrome's offscreen document API is the recommended mechanism DOM-dependent clipboard operations in an extension context.
