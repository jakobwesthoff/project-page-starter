# Project Page Starter

A static site generator that creates landing pages for side projects from simple config files.

## Why This Exists

I build a lot of side projects—CLI tools, libraries, experiments, things that scratch an itch or make my life easier. Most of them end up on GitHub, and I wanted a simple way to give them a proper landing page: something that looks decent, has a quick start section people can actually follow, and maybe a demo video.

It started as a set of static HTML and CSS files that I would copy between projects and edit by hand. That worked fine until I realized I was duplicating large chunks of my README.md files into the landing pages. So it quickly evolved into a generator that pulls documentation straight from the README automatically.

> **Note:** This is a highly opinionated tool built for my own workflow and needs. There's a fair chance it won't be useful to anyone but me. I maintain it with my own projects in mind, not a broader audience. That said, if you happen to need something like this, feel free to use it.

## tl;dr

- Define your page in `config.yaml` + HTML section files
- Extract documentation from your project's `README.md` automatically
- Run the generator — get a production-ready static site
- Theming via CSS variables, syntax highlighting via Shiki
- Dark theme and system fonts by default

## Quick Start

### 1. Create the docs structure in your project

```
your-project/
├── README.md
└── docs/
    ├── config.yaml
    ├── theme.css
    ├── sections/
    │   ├── hero.html
    │   ├── highlights.html
    │   ├── quick-start.html
    │   └── footer.html
    └── assets/
        └── (demo videos, images)
```

### 2. Add markers to your README.md

Wrap the content you want on the landing page:

```markdown
<!-- docs:start -->
## Documentation

This content will be extracted and rendered
in the Documentation section of your landing page.

<!-- docs:end -->
```

### 3. Run the generator

```bash
bun run generator/bin/generate.ts \
  --docs ./docs \
  --readme ./README.md \
  --output ./dist \
  --templates /path/to/project-page-starter/templates
```

### 4. Deploy

The `dist/` directory contains your complete static site. Deploy to GitHub Pages, Netlify, Vercel, or any static host.

## Documentation

- **[GUIDE.md](GUIDE.md)** — Comprehensive reference: configuration, theming, section files, CSS classes, GitHub Actions, and more
- **[AGENTS.md](AGENTS.md)** — Quick reference for AI agents working with this project

## Browser Support

Modern browsers (2020+):
- Chrome/Edge 88+
- Firefox 78+
- Safari 14+

Uses: CSS Custom Properties, CSS Grid, Flexbox, `backdrop-filter`, `scroll-behavior: smooth`.

## License

[MIT](https://mit-license.org/)
