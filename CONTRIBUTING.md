# Contributing to Kiln UI

Thanks for your interest! Kiln UI is an early-stage open source project — feedback, bug reports, and contributions of any size are welcome.

## Local setup

```bash
git clone https://github.com/arafatomer66/kiln-ui.git
cd kiln-ui
npm install
```

The repo is an Angular workspace with two projects:

- **`projects/kiln-ui`** — the publishable library (`@kiln/ui`).
- **`projects/docs`** — the documentation + demo site, deployed to GitHub Pages.

### Common scripts

```bash
# Build the library
ng build kiln-ui

# Serve the docs site (consumes the built library)
ng build kiln-ui --watch &  # rebuilds on lib changes
ng serve docs

# Run unit tests
ng test kiln-ui
```

The docs app imports from `kiln-ui` via the workspace path mapping in `tsconfig.json`, so a fresh library build is required after changing library code.

## Adding a new component

1. Scaffold the directory under `projects/kiln-ui/src/lib/<my-component>/`:
   - `<my-component>.component.ts` — the source. Selector prefix is `kn-`, class prefix is `Kn`.
   - `<my-component>.scss` — scoped styles (or inline styles in the `@Component` decorator for small components).
   - `index.ts` — re-export the public symbols.
2. Add the export to `projects/kiln-ui/src/public-api.ts`.
3. Add a docs page at `projects/docs/src/app/pages/components/<my-component>.page.ts` following the existing pattern: page header, import snippet, 3+ live examples, API table, accessibility notes.
4. Add a route entry in `projects/docs/src/app/app.routes.ts`.
5. Add the slug to `projects/docs/src/app/layout/components-nav.ts` under the appropriate group.

## Code conventions

- **Standalone components** only. No NgModules.
- **Signal-based APIs** — use `input()`, `output()`, `model()`, `signal()`, `computed()`. No `@Input/@Output` decorators.
- **`inject()` for DI** — no constructor injection.
- **`ChangeDetectionStrategy.OnPush`** is mandatory.
- Form components must implement `ControlValueAccessor` and provide `NG_VALUE_ACCESSOR`.
- Selectors are kebab-case prefixed with `kn-`. CSS variables are kebab-case prefixed with `--kn-`.
- Use `@angular/cdk` for any overlay/portal/focus-trap behavior — don't reinvent it.
- Tests: at minimum, a smoke test that the component creates without errors and that key inputs/outputs work.

## Commit style

Conventional Commits are encouraged but not required. Common prefixes:

- `feat: add KnAccordion component`
- `fix: resolve focus trap in KnModal on Escape`
- `docs: clarify theming overrides`
- `refactor: simplify KnSelect option resolution`

## Pull requests

- Keep PRs focused — one component or one fix per PR.
- Include a screenshot/GIF for visual changes.
- Update the docs page if you change the API of an existing component.
- Make sure `ng build kiln-ui` and `ng build docs` both succeed.

## Code of Conduct

Be kind, be specific, be patient. We follow the [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).

## Questions?

Open a [Discussion](https://github.com/arafatomer66/kiln-ui/discussions) or email [arafatomer66@gmail.com](mailto:arafatomer66@gmail.com).
