<div align="center">

<img src="https://raw.githubusercontent.com/arafatomer66/kiln-ui/main/assets/banner.svg" alt="Kiln UI — কিলন" width="100%" />

# Kiln UI · কিলন

**An Angular component library inspired by Bangladeshi visual heritage.**

Standalone components · Signal-based APIs · Dual-script typography · **56 polished components**.

[![npm](https://img.shields.io/npm/v/kiln-ui.svg?label=npm&color=1B3A6F)](https://www.npmjs.com/package/kiln-ui)
[![license](https://img.shields.io/badge/license-MIT-1B3A6F)](https://github.com/arafatomer66/kiln-ui/blob/main/LICENSE)
[![Angular](https://img.shields.io/badge/Angular-20%2B-1B3A6F)](https://angular.dev)
[![Made in Dhaka](https://img.shields.io/badge/Made%20in-Dhaka%20%F0%9F%87%A7%F0%9F%87%A9-E8A33D)](https://github.com/arafatomer66)

[**Documentation**](https://arafatomer66.github.io/kiln-ui) · [**Components**](https://arafatomer66.github.io/kiln-ui/components/button) · [**Theming**](https://arafatomer66.github.io/kiln-ui/theming) · [**Admin demo**](https://arafatomer66.github.io/kiln-ui/showcase/admin) · [**GitHub**](https://github.com/arafatomer66/kiln-ui)

</div>

---

## Why Kiln UI?

Most Angular component libraries feel placeless — generic Material clones styled in grey-and-blue. **Kiln UI** is an experiment in building tooling with a sense of place: a design language rooted in **Bangladeshi visual heritage**, but engineered with the modern Angular patterns developers expect today.

Three motifs anchor the system:

- **Jute** — warm neutrals drawn from the country's iconic export.
- **Nokshi kantha** — geometric corner glyphs (`❖`) and *alpana* dividers, the embroidered patterns of stitched quilts.
- **Dual-script type** — Latin and Bangla pairings (Inter × Hind Siliguri, Fraunces × Tiro Bangla) with matched x-heights.

Sharp 4px corners. Stamp shadow with no blur. Vibrant indigo and marigold accents. **Zero compromise on accessibility, type safety, or modern Angular idioms.**

---

## 30-second quickstart

```bash
npm install kiln-ui @angular/cdk
```

Register the provider in `app.config.ts`:

```ts
import { ApplicationConfig } from '@angular/core';
import { provideKilnUI } from 'kiln-ui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideKilnUI({ theme: 'light' }),
  ],
};
```

Import the global styles in `src/styles.scss`:

```scss
@use 'kiln-ui/styles/all' as *;
@use 'kiln-ui/styles/fonts.css';
```

Use a component:

```ts
import { Component } from '@angular/core';
import { KnButtonComponent, KnCardComponent } from 'kiln-ui';

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [KnButtonComponent, KnCardComponent],
  template: `
    <kn-card>
      <h2>Welcome to Kiln UI</h2>
      <kn-button variant="solid">Get started →</kn-button>
    </kn-card>
  `,
})
export class HelloComponent {}
```

Full documentation at **[arafatomer66.github.io/kiln-ui](https://arafatomer66.github.io/kiln-ui)**.

> **Tip:** `ng add kiln-ui` does all of the above automatically (provider, styles, fonts, CDK).

---

## See it in action

A polished mini-CRM admin demo, built entirely from Kiln UI primitives. **[Open the live demo →](https://arafatomer66.github.io/kiln-ui/showcase/admin)**

<a href="https://arafatomer66.github.io/kiln-ui/showcase/admin">
  <img src="https://raw.githubusercontent.com/arafatomer66/kiln-ui/main/assets/preview-admin-dashboard.png" alt="Kiln UI admin dashboard" width="100%" />
</a>

<table>
  <tr>
    <td width="50%"><a href="https://arafatomer66.github.io/kiln-ui/showcase/admin/orders"><img src="https://raw.githubusercontent.com/arafatomer66/kiln-ui/main/assets/preview-admin-orders.png" alt="Orders page" /></a></td>
    <td width="50%"><a href="https://arafatomer66.github.io/kiln-ui/showcase/admin/products"><img src="https://raw.githubusercontent.com/arafatomer66/kiln-ui/main/assets/preview-admin-products.png" alt="Products grid" /></a></td>
  </tr>
  <tr>
    <td><a href="https://arafatomer66.github.io/kiln-ui/components/button"><img src="https://raw.githubusercontent.com/arafatomer66/kiln-ui/main/assets/preview-button-page.png" alt="Button docs" /></a></td>
    <td><a href="https://arafatomer66.github.io/kiln-ui/components/stat-card"><img src="https://raw.githubusercontent.com/arafatomer66/kiln-ui/main/assets/preview-stat-card-page.png" alt="Stat card docs" /></a></td>
  </tr>
</table>

Press **⌘K** / **Ctrl+K** anywhere on the docs site to try the command palette.

---

## Components

All 56 components are **standalone**, **signal-based**, **OnPush by default**, and ship with full ARIA support.

### Foundation (14)
Button · Input · Textarea · Checkbox · Radio · Switch · Badge · Chip · Avatar · Spinner · Progress · Divider · Card · Alert

### Overlay (7)
Tooltip · Dropdown · Menu · Select · Modal · Drawer · Toast

### Composite (6)
Tabs · Accordion · Stepper · Pagination · Date Picker · Table

### Advanced (8)
Skeleton · Empty State · OTP Input · Phone Input · Combobox · File Upload · Date Range Picker · Command Palette

### Extended (6)
Sparkline · Stat Card · Slider · Tag Input · Tree · Calendar

### Pro (15)
Form Field · Time Picker · Number Format Input · Color Picker · Rating · Avatar Group · Breadcrumbs · Page State · Loading Bar · Confirm Dialog · Bottom Sheet · Action Sheet · Pull to Refresh · Tour · Virtual Table

Each component has its own documentation page with live examples, copy-paste code, an API reference table, and accessibility notes — see the [docs site](https://arafatomer66.github.io/kiln-ui).

There's also a [**live admin demo**](https://arafatomer66.github.io/kiln-ui/showcase/admin) — a realistic mini-CRM built entirely from Kiln UI primitives, showing 22+ components in real usage. Press `⌘K` / `Ctrl+K` from the docs site to try the command palette.

---

## Theming

Every visual decision is exposed as a **CSS custom property** prefixed with `--kn-`. Override per-instance, per-section, or app-wide.

```scss
:root {
  --kn-brand: #0f5132;
  --kn-brand-strong: #093d22;
  --kn-accent: #ffd166;
}
```

Dark mode is built in — toggle with the `KnThemeService` or set `data-kn-theme="dark"` on `<html>`.

---

## Why I built this

I'm Omer — a Dhaka-based engineer building consumer products for emerging markets. After shipping a number of Angular dashboards for clients across Bangladesh's RMG and SaaS sectors, I wanted a component library that:

1. **Felt rooted somewhere.** Most "neutral" design systems are anything but — they carry a Silicon Valley aesthetic baked into every shadow and corner radius. Kiln UI is openly, deliberately Bangladeshi.
2. **Used modern Angular properly.** Signals, `inject()`, standalone components, `ControlValueAccessor` for form integration, `@angular/cdk` for overlays. No NgModules, no decorator-based DI fallbacks, no compromise.
3. **Came with documentation that respects the reader.** Every component page has at least 3 working examples, an API table, and accessibility notes — same quality bar as Material or PrimeNG.

If any of that resonates, I'd love your feedback or contribution.

---

## Roadmap

- **v0.1** — Foundation, overlay, and composite components (27).
- **v0.2** — Advanced set (8): OTP, phone, combobox, file upload, date range, command palette, skeleton, empty state.
- **v0.3** — Extended set (6): sparkline, stat card, slider, tag input, tree, calendar. Plus `ng add kiln-ui` schematic.
- **v0.4** — Pro set (15): form field, time picker, number format, color picker, rating, avatar group, breadcrumbs, page state, loading bar, confirm dialog, bottom sheet, action sheet, pull to refresh, tour, virtual table. **(You are here — 56 components total.)**
- **v1.0** — Stable API, full a11y audit, comprehensive Bangla locale, plugin packages (`kiln-charts`, `kiln-icons`, `kiln-editor`).

---

## Contributing

Issues, feature requests, and pull requests are warmly welcomed. See [CONTRIBUTING.md](https://github.com/arafatomer66/kiln-ui/blob/main/CONTRIBUTING.md) for setup, code style, and how to add a new component.

If you find Kiln UI useful, please consider [starring on GitHub](https://github.com/arafatomer66/kiln-ui) — it genuinely helps the project find more contributors.

---

## Author

**Omer Arafat** · Dhaka, Bangladesh
Long-time Angular and Flutter engineer building products for emerging-market consumers.

- GitHub: [@arafatomer66](https://github.com/arafatomer66)
- Email: [arafatomer66@gmail.com](mailto:arafatomer66@gmail.com)

---

## License

MIT — see [LICENSE](https://github.com/arafatomer66/kiln-ui/blob/main/LICENSE).

<div align="center">

<sub>Built with care in Dhaka. <i>যত্নে গড়ো।</i></sub>

</div>
