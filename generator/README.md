# Generator

Bun/TypeScript CLI tool that generates project landing pages from config files and templates.

## Tech Stack

- [Bun](https://bun.sh/) — Runtime and package manager
- [Nunjucks](https://mozilla.github.io/nunjucks/) — HTML templating
- [Shiki](https://shiki.style/) — Syntax highlighting
- [LightningCSS](https://lightningcss.dev/) — CSS bundling and minification
- [Marked](https://marked.js.org/) — Markdown rendering

## Structure

```
generator/
├── bin/
│   └── generate.ts          # CLI entry point
└── lib/
    ├── config.ts             # config.yaml loading and validation
    ├── css.ts                # CSS bundling via LightningCSS
    ├── escape.ts             # HTML escaping utility
    ├── highlighting.ts       # Shiki syntax highlighting
    ├── html.ts               # HTML minification
    ├── icons.ts              # SVG icon replacement
    ├── markdown.ts           # Markdown rendering
    ├── pipeline.ts           # Reusable step pipeline with logging
    ├── readme.ts             # README marker extraction
    └── theme.ts              # Theme CSS merging
```

## Usage

See [GUIDE.md](../GUIDE.md) for complete documentation.
