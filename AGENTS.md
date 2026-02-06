# AI Agent Quick Reference

Bun-based static site generator that creates project landing pages from config files, HTML sections, and README content.

## Run Command

```bash
bun run generator/bin/generate.ts \
  --docs <path> \
  --readme <path> \
  --output <path> \
  --templates <path>
```

## File Map

| Task | File(s) |
|------|---------|
| Project metadata | `docs/pages/config.yaml` |
| Theme colors | `docs/pages/theme.css` (overrides only) |
| Base theme defaults | `templates/styles/theme.css` |
| Page sections | `docs/pages/sections/*.html` |
| Section order & nav | `docs/pages/config.yaml` → `sections` array |
| Documentation content | Project `README.md` (between `<!-- docs:start -->` / `<!-- docs:end -->`) |
| Templates | `templates/*.njk` |
| CSS components/layout | `templates/styles/*.css` |
| Icons | `templates/icons/*.svg` |
| Generator code | `generator/bin/generate.ts`, `generator/lib/*.ts` |

## Config Structure

```yaml
name: project-name
tagline: Short description
github: username/repo
author:
  name: Your Name
  website: https://yoursite.com

sections:
  - id: hero
    file: sections/hero.html
    nav: false
  - id: docs
    source: readme          # Extracts from README.md markers
    nav: true
    nav_label: Documentation

navbar_buttons:             # Optional (defaults to GitHub button)
  - label: GitHub
    href: https://github.com/username/repo
    style: secondary        # primary | secondary
    icon: github            # github | download

imprint:                    # Optional
  enabled: true
  name: Your Name
  address: |
    Street 123
    12345 City
  email_encrypted: "base64-encrypted-email"
  phone_encrypted: "base64-encrypted-phone"
  encryption_key: "rot13-encoded-key"
```

## Section Sources

- **`file:`** — Path to HTML file relative to docs/pages/ (e.g., `sections/hero.html`)
- **`source: readme`** — Extracts content between `<!-- docs:start -->` / `<!-- docs:end -->` markers in README.md

## Key CSS Variables

```css
--color-primary: #7c3aed;           /* Buttons, links, accents */
--color-primary-hover: #6d28d9;     /* Hover states */
--color-bg: #0f0f14;                /* Page background */
--color-text: #e5e5e5;              /* Body text */
--color-text-bright: #ffffff;       /* Headings */
```

Full list in [GUIDE.md](GUIDE.md#all-css-variables).

## Syntax Highlighting

Shiki with `github-dark` theme, built at compile time. Supported languages:

`bash` (aliases: `shell`, `sh`, `zsh`), `json`, `yaml`, `toml`, `typescript`, `javascript`, `rust`, `go`

## Icon System

```html
<i data-icon="github"></i>
```

Replaced at build time with inline SVGs from `templates/icons/`. Available: `github`, `download`.

## Claude Code Skill

This project provides a `/setup-project-page` Claude Code skill (defined in `skills/setup-project-page/SKILL.md`) that automates setting up a landing page in another project. It analyzes the target project, extracts metadata, and scaffolds the full `docs/pages/` directory structure including config, theme, sections, README markers, and an optional GitHub Actions workflow.

## Common Tasks

| Task | How |
|------|-----|
| Change primary color | Edit `docs/pages/theme.css` — set `--color-primary` and `--color-primary-hover` |
| Add a section | Create HTML file in `docs/pages/sections/`, add entry to `sections` in `config.yaml` |
| Add navbar button | Add entry to `navbar_buttons` in `config.yaml` |
| Change favicon | Automatic — generated from `--color-primary` and `--color-primary-hover` |
| Add CSS classes | Use classes from `templates/styles/` — see [GUIDE.md](GUIDE.md#css-classes-reference) |

## Validation Checklist

- [ ] `config.yaml` has `name`, `github`, `sections`
- [ ] All `file:` paths in sections exist under `docs/pages/`
- [ ] README.md contains `<!-- docs:start -->` and `<!-- docs:end -->` markers
- [ ] `theme.css` color values are valid hex (required for favicon generation)
- [ ] Code blocks in README specify a supported language tag
- [ ] Assets referenced in sections exist in `docs/pages/assets/`
- [ ] Generator runs without errors: `bun run generator/bin/generate.ts --docs ./docs/pages --readme ./README.md --output ./dist --templates /path/to/templates`
