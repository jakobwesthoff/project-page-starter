# AI Agent Quick Reference

Quick reference for AI agents working with this landing page template.

## Page Structure

```
Hero          →  Name/logo, tagline, CTA buttons
Highlights    →  3 key value props (no section title)
Demo          →  Video in macOS window frame
Quick Start   →  Tabbed installation methods + usage examples
Documentation →  Options table, examples, config
Footer        →  Tagline, credit, imprint link
```

## File Overview

| Task | File to Edit |
|------|--------------|
| Change colors/fonts | `template/styles/theme.css` |
| Change page content | `template/index.html` |
| Change page structure | `template/styles/layout.css` |
| Add UI components | `template/styles/components.css` |
| Add utility classes | `template/styles/utilities.css` |
| Update legal info | `template/imprint.html` |
| Record demo video | `vhs/demo.tape` |

## Content Placeholders to Replace

Search and replace these in `template/index.html`:

| Placeholder | Replace With | Occurrences |
|-------------|--------------|-------------|
| `Project Name` | Actual project name | ~4 (title, navbar, hero, footer) |
| `username/project` | GitHub repo path | ~3 (navbar, hero, footer) |
| `yourwebsite.com` | Author's website | ~2 (footer) |
| `Your Name` | Author name | ~1 (footer) |
| `A one-line description...` | Project tagline | 1 (hero) |
| `Your project tagline...` | Footer tagline | 1 (footer) |
| Highlight titles/descriptions | Actual feature descriptions | 3 (highlights section) |
| Installation commands | Actual install commands | 3 (tabs) |
| CLI options table | Actual CLI options | 1 (docs section) |
| Code examples | Actual usage examples | Multiple |

## Logo Options

### Navbar (choose one)

```html
<!-- OPTION 1: Text only (default) -->
<a href="#" class="navbar-brand">
  <span>Project Name</span>
</a>

<!-- OPTION 2: Logo + Text - uncomment and remove Option 1 -->
<a href="#" class="navbar-brand">
  <svg><!-- logo SVG --></svg>
  <span>Project Name</span>
</a>
```

### Hero (choose one)

```html
<!-- OPTION 1: Text only (default) -->
<h1>Project Name</h1>

<!-- OPTION 2: Logo + Text - uncomment and remove Option 1 -->
<div class="hero-logo">
  <img src="assets/logo.svg" class="hero-logo-img">
</div>
<h1>Project Name</h1>

<!-- OPTION 3: Combined logo - uncomment and remove Option 1 -->
<div class="hero-logo">
  <img src="assets/logo-full.svg" class="hero-logo-full">
</div>
```

## Key CSS Variables

When theming, these are the most important variables in `template/styles/theme.css`:

```css
--color-primary: #7c3aed;      /* Main accent color */
--color-bg: #0f0f14;           /* Page background */
--color-text: #e5e5e5;         /* Body text */
--color-text-bright: #ffffff;  /* Headings */
```

## Adding/Removing Installation Tabs

Each tab needs a matching button and panel with the same `data-tab` value:

```html
<button class="tab-button" data-tab="mytab">Tab Name</button>

<div class="tab-panel" data-tab="mytab">
  <div class="code-block">
    <pre><code class="language-bash">command here</code></pre>
  </div>
</div>
```

First tab should have `active` class on both button and panel.

## Adding Syntax Highlighting Languages

Add more Prism.js language components before the closing `</body>`:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.30.0/components/prism-LANGUAGE.min.js" integrity="..." crossorigin="anonymous"></script>
```

Then use `class="language-LANGUAGE"` on code blocks.

## VHS Theme Sync

If changing the page color scheme, update `vhs/demo.tape` to match:

```
Set Theme { "background": "#YOUR_BG", "foreground": "#YOUR_TEXT", "magenta": "#YOUR_PRIMARY", ... }
```

Key colors to sync:
- `background` → `--color-bg`
- `foreground` → `--color-text`
- `magenta` → `--color-primary`

## Imprint Page

- Required by German law (§ 5 TMG)
- Optional elsewhere - remove footer link if not needed
- Contains placeholder address - must be replaced with real info
- Has bilingual disclaimer comment (EN/DE) about being a template

## Common Tasks

### Change Primary Color

1. Edit `template/styles/theme.css`:
   ```css
   --color-primary: #NEW_COLOR;
   --color-primary-hover: #DARKER_SHADE;
   --color-primary-subtle: #SUBTLE_SHADE;
   ```

2. Update VHS theme in `vhs/demo.tape`:
   ```
   "magenta": "#NEW_COLOR", "brightMagenta": "#LIGHTER_SHADE"
   ```

### Add a New Section

1. Add HTML in `template/index.html` after existing sections
2. Add CSS in `template/styles/layout.css`
3. Add nav link in navbar if needed
4. Scroll spy will automatically track sections with `id` attributes

### Remove Demo Video Section

1. Delete the `<section id="demo" class="demo">` block in `template/index.html`
2. Remove "Demo" from navbar links
3. Optionally remove `.demo` styles from `template/styles/layout.css`

### Remove Imprint Link

Delete from footer in `template/index.html`:
```html
<!-- Remove this line -->
<a href="imprint.html">Imprint/Impressum</a>
```

## Validation Checklist

After customizing, verify:

- [ ] All "Project Name" placeholders replaced
- [ ] All GitHub URLs updated (`username/project`)
- [ ] All code examples match actual CLI
- [ ] Options table matches actual CLI options
- [ ] Highlights describe actual features
- [ ] Demo video present in `template/assets/` (or section removed)
- [ ] Footer links correct
- [ ] Page renders correctly at mobile/tablet/desktop widths
- [ ] All nav links scroll to correct sections
- [ ] Tabs switch correctly
