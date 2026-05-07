# Changelog

All notable changes to Kiln UI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.1] — 2026-05-07

### Changed

- Renamed npm package from `@kiln/ui` to **`kiln-ui`** (unscoped). The `@kiln` org didn't exist on npm, so the unscoped name is both available and shorter to type. All docs and import examples updated. The workspace path alias `kiln-ui` already matched, so app imports are unchanged.

## [0.3.0] — 2026-05-07

### Added — 6 extended components (41 total)

- **Sparkline** — tiny inline SVG chart for stat cards. Tones, area fill, last-point highlight.
- **Stat Card** — dashboard-grade metric tile with delta, trend indicator, and inline sparkline.
- **Slider** — single-handle range slider with tick marks, suffix, custom min/max/step. Form-bound via CVA.
- **Tag Input** — type-and-add tags with Enter/comma/Tab to commit, Backspace to remove. Form-bound via CVA.
- **Tree** — recursive hierarchical view with expand/collapse, selection, and optional descriptions.
- **Calendar** — month-view with tone-coded events, today highlight, and click-to-select dates.

### Updated

- Admin dashboard: stat tiles now use the new `KnStatCard` with embedded sparklines (replaces hand-built tiles).
- Docs site: added "Extended" section to the sidebar with 6 new component pages.
- Total components: 35 → 41.

## [0.2.0] — 2026-05-07

### Added — 8 advanced components (35 total)

- **Skeleton** — animated placeholder for loading states. Variants: text, heading, block, avatar.
- **Empty State** — on-brand empty container with the alpana motif. Tone variants and CTA slot.
- **OTP Input** — six-digit one-time password with auto-advance, paste support, keyboard navigation, and `autocomplete="one-time-code"` for iOS SMS auto-fill.
- **Phone Input** — international phone with country picker. Defaults to 🇧🇩 +880; ships with 13 popular regions.
- **Combobox** — searchable type-to-filter select with option descriptions, async loading state, and clearable selection.
- **File Upload** — drag-and-drop uploader with multi-file support, per-file progress bars, size validation, and public progress API.
- **Date Range Picker** — two-date picker with presets (last 7/30/90 days, this month, this year). Form-bound via CVA.
- **Command Palette** — fuzzy-searchable ⌘K-style command launcher with grouped commands, shortcut hints, and run callbacks. Service-driven via `KnCommandPaletteService`.

### Updated

- Docs site: added "Advanced" section to the sidebar with 8 new component pages.
- Total components: 27 → 35.

## [0.1.0] — 2026-05-07

Initial public release.

### Added

- 27 standalone components across three groups:
  - **Foundation (14):** Button, Input, Textarea, Checkbox, Radio, Switch, Badge, Chip, Avatar, Spinner, Progress, Divider, Card, Alert.
  - **Overlay (7):** Tooltip, Dropdown, Menu, Select, Modal, Drawer, Toast.
  - **Composite (6):** Tabs, Accordion, Stepper, Pagination, Date Picker, Table.
- Complete CSS-variable design token system with light and dark themes.
- `provideKilnUI()` environment provider and `KnThemeService` for runtime theme control.
- Documentation site with per-component pages: live examples, API reference tables, accessibility notes.
- Bangla + Latin dual-script font pairings (Inter / Hind Siliguri / Fraunces / Tiro Bangla / JetBrains Mono).
- MIT license.
