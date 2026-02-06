# Templates

Nunjucks templates and static assets used by the generator. These are the generator's source files — you don't edit them directly. Customize your site via `docs/theme.css` and `docs/sections/`.

## Contents

- `*.njk` — HTML templates (base layout, index page, imprint page, favicon)
- `partials/` — Reusable template components (navbar)
- `styles/` — CSS source files (bundled into a single `styles.css` at build time)
- `scripts/` — JavaScript (tab switching, scroll spy — inlined into HTML)
- `icons/` — SVG icons (replaced inline at build time via `<i data-icon="name">`)

## Usage

See [GUIDE.md](../GUIDE.md) for complete documentation.
