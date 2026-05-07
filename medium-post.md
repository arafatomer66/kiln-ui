# Building an Angular component library rooted in Bangladeshi visual heritage

*How I shipped Kiln UI — 41 components, modern Angular, and a design language with a sense of place.*

---

![Kiln UI admin dashboard — stat cards with sparklines, recent orders, activity feed, all rendered in jute neutrals and indigo on a Bangla-Latin layout](https://raw.githubusercontent.com/arafatomer66/kiln-ui/main/assets/preview-admin-dashboard.png)

A few weeks ago I went looking for an Angular component library to bootstrap an internal dashboard. Material was fine. PrimeNG was fine. Taiga UI was fine.

They were all *fine* in the way that a hotel lobby is fine. Comfortable, neutral, forgettable.

Every "neutral" design system is anything but. Every shadow, corner radius, and accent color carries an aesthetic — and that aesthetic is almost always Silicon Valley. Soft greys, blue accents, 8px-rounded everything. It's not bad. It just has a *place*, and that place isn't here.

I'm in Dhaka. So I built a library that's openly, deliberately rooted somewhere.

## What is Kiln UI?

[**Kiln UI**](https://github.com/arafatomer66/kiln-ui) is an Angular component library inspired by Bangladeshi visual heritage. 41 components — standalone, signal-based, `OnPush` by default — with a design language drawn from three motifs:

* **Jute** — the warm neutrals that define the page surface, drawn from the country's iconic export.
* **Nokshi kantha** — geometric corner glyphs (`❖`) and alpana dividers, the embroidered patterns of stitched quilts.
* **Dual-script type** — Latin and Bangla pairings (Inter × Hind Siliguri, Fraunces × Tiro Bangla), with matched x-heights and rhythm.

The result is a system where sharp 4px corners replace puffy 16px ones. Stamp shadows (no blur, just an offset block) replace the blurry diffuse Material drop. Vibrant indigo and marigold accents replace the safe corporate blue. Every card carries small ❖ corner glyphs, like the corners of a stitched textile.

It looks like Bangladesh. That's the entire experiment.

## Modern Angular, no compromise

Aesthetics aside, I wanted the engineering bar to be high. Most "indie" component libraries cheat — they use NgModules, decorators-as-DI, missing accessibility, no form integration. Kiln UI uses modern Angular only:

* **Standalone components** everywhere. No NgModules anywhere.
* **Signal-based APIs** — `input()`, `output()`, `model()`, `signal()`, `computed()`. No `@Input/@Output` decorators.
* **`inject()` for DI** — no constructor injection.
* **`ChangeDetectionStrategy.OnPush`** mandatory.
* **`ControlValueAccessor`** on every form control — works with both reactive and template forms.
* **`@angular/cdk`** for overlays, portals, and focus trap. Battle-tested behavior, on-brand styling.
* **Full ARIA** on every interactive component, with keyboard navigation, focus rings, and screen-reader-tested labels.

```ts
import { Component } from '@angular/core';
import { KnButtonComponent, KnCardComponent } from 'kiln-ui';

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [KnButtonComponent, KnCardComponent],
  template: `
    <kn-card>
      <h2>Welcome</h2>
      <kn-button variant="solid">Get started →</kn-button>
    </kn-card>
  `,
})
export class HelloComponent {}
```

That's the entire integration story.

## The 41 components

Organized into five tiers, each tier deeper than the last:

* **Foundation (14)** — Button, Input, Textarea, Checkbox, Radio, Switch, Badge, Chip, Avatar, Spinner, Progress, Divider, Card, Alert.
* **Overlay (7)** — Tooltip, Dropdown, Menu, Select, Modal, Drawer, Toast.
* **Composite (6)** — Tabs, Accordion, Stepper, Pagination, Date Picker, Table.
* **Advanced (8)** — Skeleton, Empty State, OTP Input, Phone Input, Combobox, File Upload, Date Range Picker, Command Palette.
* **Extended (6)** — Sparkline, Stat Card, Slider, Tag Input, Tree, Calendar.

Two of those deserve a callout because they're aimed at the markets I work in:

**OTP Input** — six-digit auto-advance, paste support, `autocomplete="one-time-code"` for iOS SMS auto-fill. Most consumer apps in Bangladesh, India, and the broader region use phone-OTP login. This is the input you reach for every single time, and most libraries don't have a good one.

**Phone Input** — international country picker defaulting to 🇧🇩 +880. Ships with 13 popular regions out of the box. Simple, direct, fully form-bound.

The Command Palette is the showpiece — a fuzzy ⌘K-style launcher with grouped commands, shortcut hints, and run callbacks. It powers the docs site search and the admin demo.

## Live admin demo

I needed something more than a feature catalog, so I built a polished mini-CRM showcase that uses 22+ components in realistic context:

![Kiln UI orders page with a sortable table, status filter, and pagination](https://raw.githubusercontent.com/arafatomer66/kiln-ui/main/assets/preview-admin-orders.png)

* **Dashboard** with `KnStatCard` tiles, embedded sparklines, an activity feed, and a date-range picker.
* **Orders** with sortable table, search, status filter, drawer-based detail view.
* **Customers** with split list/detail, tabbed detail view, modal for adding new customers (using the phone input with a country picker).
* **Products** with a card grid, low-stock badges, and tooltips.
* **Settings** with tabbed forms, accordion of invoices, multi-step team-onboarding stepper that includes phone-OTP verification, and drag-drop file upload for avatars.

[**Try the live demo →**](https://arafatomer66.github.io/kiln-ui/showcase/admin)

Press **⌘K** anywhere on the docs site to try the command palette.

## Theming with CSS variables only

Every visual decision is exposed as a CSS custom property prefixed with `--kn-`. Override per-instance, per-section, or app-wide:

```scss
:root {
  --kn-brand: #0f5132;
  --kn-brand-strong: #093d22;
  --kn-accent: #ffd166;
}
```

Dark mode is built in — toggle with `KnThemeService` or set `data-kn-theme="dark"` on `<html>`.

No SCSS import gymnastics. No theme generators. No build-time configs. Just override the variables you want.

## One-line install

```bash
npm install kiln-ui @angular/cdk
```

Or, even better, with the schematic that ships in the package:

```bash
ng add kiln-ui
```

This wires `provideKilnUI()` into your `app.config.ts`, imports the global styles + fonts into your `styles.scss`, adds `@angular/cdk` to your `package.json`, and runs `npm install`. One command and you're ready to import components.

## Why I built this

Three reasons, in order of importance:

1. **I wanted Angular tooling that felt rooted somewhere.** That's the experiment. If you're an Angular developer in South Asia, in the Middle East, in any region whose visual heritage doesn't get represented in our tooling — this might land for you.

2. **I wanted to build with modern Angular properly.** Not a drop-in Material clone with a dark theme. A library where every component goes through `ControlValueAccessor`, every overlay uses CDK, every interactive surface has `aria-*` attributes. The kind of library that doesn't make you wince when you `git blame` six months later.

3. **Most "indie" libraries have terrible documentation.** I've used many, and their docs pages are usually one Storybook page, three example variants, and a vibe-based prop description. Kiln UI's docs match the bar Material and PrimeNG set: per-component pages with at least 3 working examples, an API table, accessibility notes, and a copy-paste import line.

## What's next

* **v0.4** — schematics for component scaffolds (`ng generate @kiln-ui:component my-thing`), virtual-scroll table.
* **v1.0** — stable API, full a11y audit, comprehensive Bangla locale, plugin packages (`kiln-charts` wrapping ApexCharts/Chart.js, `kiln-editor` wrapping Tiptap).

If any of this resonates — the BD-heritage angle, the modern-Angular bar, the documentation philosophy — I'd love your feedback. Issues, ideas, and pull requests are all welcome at [github.com/arafatomer66/kiln-ui](https://github.com/arafatomer66/kiln-ui).

If you find it useful, a star helps the project find more contributors.

Built with care in Dhaka.
*যত্নে গড়ো।*

---

**Links**
* 📦 npm: [npmjs.com/package/kiln-ui](https://www.npmjs.com/package/kiln-ui)
* 🌐 Docs: [arafatomer66.github.io/kiln-ui](https://arafatomer66.github.io/kiln-ui)
* 💻 Repo: [github.com/arafatomer66/kiln-ui](https://github.com/arafatomer66/kiln-ui)
* 🎬 Live admin demo: [arafatomer66.github.io/kiln-ui/showcase/admin](https://arafatomer66.github.io/kiln-ui/showcase/admin)
