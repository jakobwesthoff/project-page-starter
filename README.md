# Landing Page Template

A single-page landing template for side projects. Plain HTML + CSS with CSS variables for theming. No build step required.

## Why This Exists

I build a lot of side projects—CLI tools, libraries, experiments, things that scratch an itch or make my life easier. Most of them end up on GitHub, and I wanted a simple way to give them a proper landing page: something that looks decent, has a quick start section people can actually follow, and maybe a demo video.

What I didn't want: yet another build system to maintain, dependencies to update, or a static site generator that needs its own config files. Just HTML and CSS that I can drop into a `docs/` folder, push to GitHub Pages, and forget about.

## tl;dr

- Plain HTML + CSS, no build step — copy, edit, deploy
- Theming via CSS variables in `theme.css`, content in `index.html`
- CSS split into layers: base, components, layout, utilities
- Minimal JavaScript for tabs and scroll spy only
- Dark theme and system fonts by default
- Page sections: hero → highlights → demo video → quick start (tabbed) → documentation → footer — remove or reorder as needed

## File Structure

```
project-page-templates/
├── README.md                   # This file
├── CUSTOMIZATION.md            # Detailed configuration guide
├── AGENTS.md                   # Quick reference for AI agents
├── template/
│   ├── index.html              # Main landing page
│   ├── imprint.html            # Legal imprint page (German law)
│   ├── styles/
│   │   ├── theme.css           # CSS variables - EDIT THIS for theming
│   │   ├── base.css            # Reset + typography
│   │   ├── components.css      # Buttons, cards, code blocks, tabs, etc.
│   │   ├── utilities.css       # Helper classes
│   │   └── layout.css          # Page structure (navbar, sections, footer)
│   └── assets/
│       └── .gitkeep            # Place demo.webm, demo.mp4, logo.svg here
└── vhs/
    ├── demo.tape               # VHS recording configuration
    └── README.md               # VHS recording instructions
```

### File Responsibilities

| File | Purpose | When to Edit |
|------|---------|--------------|
| `theme.css` | Colors, fonts, spacing variables | **Always** - customize per project |
| `base.css` | Box-sizing reset, typography defaults | Rarely |
| `components.css` | Buttons, cards, tabs, code blocks, etc. | When adding new components |
| `utilities.css` | Helper classes (.container, .grid, etc.) | When adding new utilities |
| `layout.css` | Navbar, hero, sections, footer | When changing page structure |
| `index.html` | Page content and structure | **Always** - add your content |
| `imprint.html` | Legal imprint page | If required by law in your jurisdiction |

## Quick Start

### Step 1: Copy the Template

Copy both `template/` and `vhs/` folders to your project:

```bash
cp -r template/ my-project/docs/
cp -r vhs/ my-project/docs/
```

### Step 2: Customize the Theme

Edit `template/styles/theme.css` to match your project:

```css
:root {
  --color-primary: #7c3aed;        /* Buttons, links, accents */
  --color-primary-hover: #6d28d9;  /* Hover states */
  --color-bg: #0f0f14;             /* Page background */
  /* ... see CUSTOMIZATION.md for all variables */
}
```

### Step 3: Update Content

Edit `template/index.html` and replace all placeholder content:

1. **`<title>` and meta description** - For SEO
2. **Navbar brand** - Choose text-only or logo+text option
3. **Hero section** - Choose logo option, update name and tagline
4. **Highlights** - Your key features
5. **Demo video** - Replace with your demo recording
6. **Quick Start tabs** - Your installation methods
7. **Documentation** - Your CLI options and examples
8. **Footer** - Your tagline, name, and links

### Step 4: Create Demo Video

For crisp retina display, record at 2x the display size:

1. Edit `vhs/demo.tape` with your commands
2. Set dimensions to 2x (e.g., 1800x800 for 900x400 display)
3. Run `vhs demo.tape`
4. Copy `demo.webm` and `demo.mp4` to `template/assets/`

The VHS tape includes a custom theme matching the page colors. Update it if you change the color scheme.

### Step 5: Deploy

Static HTML - deploy anywhere: GitHub Pages, Netlify, Vercel, etc.

## Additional Documentation

- **[CUSTOMIZATION.md](CUSTOMIZATION.md)** - Detailed configuration guide: CSS variables, page sections, components, VHS setup
- **[AGENTS.md](AGENTS.md)** - Quick reference for AI agents working with the template

## Browser Support

Modern browsers (2020+):
- Chrome/Edge 88+
- Firefox 78+
- Safari 14+

Uses: CSS Custom Properties, CSS Grid, Flexbox, `backdrop-filter`, `scroll-behavior: smooth`.

## Imprint Page

The template includes `imprint.html` for legal compliance. **Required by German law** (§ 5 TMG) - optional in other jurisdictions. Remove the footer link if not needed.

The imprint contains placeholder content that must be replaced with your actual legal information.

**Disclaimer**: The imprint template is provided as an example only and does not constitute legal advice. Please consult a legal professional to ensure compliance with applicable laws. The template author is not liable for any legal issues arising from use of this template.

## Third-Party CDN Resources

This template loads the following resources from external CDNs:

### Prism.js (Syntax Highlighting)

Loaded from [cdnjs.cloudflare.com](https://cdnjs.cloudflare.com/):

| Resource | Version | Purpose |
|----------|---------|---------|
| `prism.min.js` | 1.30.0 | Core syntax highlighting library |
| `prism-tomorrow.min.css` | 1.30.0 | Tomorrow theme stylesheet |
| `prism-bash.min.js` | 1.30.0 | Bash language support |
| `prism-toml.min.js` | 1.30.0 | TOML language support |

All CDN resources are loaded with [Subresource Integrity (SRI)](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) hashes to ensure file integrity.

**Prism.js License**: Prism.js is licensed under the [MIT License](https://github.com/PrismJS/prism/blob/master/LICENSE). See the [Prism.js repository](https://github.com/PrismJS/prism) for details.

**Disclaimer**: The template author is not responsible for the code, availability, or functionality of third-party CDN resources. By using this template, you acknowledge that these external resources are subject to their own licenses and terms of service. The author makes no warranties regarding the security, reliability, or continued availability of CDN-hosted content.

## License

[MIT](https://mit-license.org/)
