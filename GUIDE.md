# Project Page Starter — Guide

This guide walks you through creating a project landing page from scratch: setting up the file structure, configuring your page, writing content, customizing the look, and deploying the result. Reference material for CSS classes, syntax highlighting, and optional features follows at the end.

## How It Works

The generator takes a handful of input files and produces a complete static site:

```
config.yaml + theme.css + HTML sections + README.md  →  generator  →  static site
```

You describe your page in a `config.yaml` file, write each section as a standalone HTML snippet, optionally pull documentation straight from your project's README, and pick your colors in a `theme.css`. The generator combines all of that with its built-in templates and outputs a production-ready site you can deploy anywhere.

## Setting Up Your Project

Start by creating a `docs/` directory in your project with this structure:

```
your-project/
├── README.md                    # Your project readme (with docs markers)
└── docs/
    ├── config.yaml              # Page configuration
    ├── theme.css                # Color overrides (optional)
    ├── sections/
    │   ├── hero.html            # Hero section
    │   ├── highlights.html      # Feature highlights
    │   ├── demo.html            # Demo video (optional)
    │   ├── quick-start.html     # Installation & usage
    │   └── footer.html          # Page footer
    └── assets/
        ├── demo.webm            # Demo video (optional)
        └── demo.mp4             # Safari fallback (optional)
```

The rest of this guide walks through each of these files.

## Configuration

The `config.yaml` file is the central piece — it defines your project metadata, which sections appear on the page, and in what order.

### Minimal example

```yaml
name: your-project
tagline: A short description
github: username/repo

author:
  name: Your Name
  website: https://yoursite.com

sections:
  - id: hero
    file: sections/hero.html
    nav: false

  - id: highlights
    file: sections/highlights.html
    nav: false

  - id: quickstart
    file: sections/quick-start.html
    nav: true
    nav_label: Quick Start

  - id: docs
    source: readme
    nav: true
    nav_label: Documentation

  - id: footer
    file: sections/footer.html
    nav: false
```

### Required fields

| Field | Description |
|-------|-------------|
| `name` | Project name (shown in navbar and page title) |
| `tagline` | Short description (shown in page title) |
| `github` | GitHub repository path, e.g. `username/repo` |
| `author` | Object with `name` and `website` |
| `sections` | Array of section definitions (see below) |

### Sections

The `sections` array controls what appears on the page and in what order. Each entry is either backed by an HTML file or a special source:

| Property | Required | Description |
|----------|----------|-------------|
| `id` | Yes | Unique identifier, used for `#anchor` links |
| `file` | No* | Path to HTML file (relative to docs/) |
| `source` | No* | Special source — currently only `readme` is supported |
| `nav` | Yes | `true` to show in navbar, `false` to hide |
| `nav_label` | If nav=true | Text shown in the navbar link |

\*Either `file` or `source` must be specified.

Sections with `file:` load an HTML snippet from your `docs/` directory. Sections with `source: readme` extract content from your project's README.md (see [README.md Markers](#readmemd-markers) below).

### Navbar buttons (optional)

By default, the navbar shows a single GitHub button linking to your repo. To customize the buttons:

```yaml
navbar_buttons:
  - label: Quick Start
    href: "#quickstart"
    style: primary
    icon: download
  - label: GitHub
    href: https://github.com/username/repo
    style: secondary
    icon: github
```

| Property | Required | Description |
|----------|----------|-------------|
| `label` | Yes | Button text |
| `href` | Yes | Link target (URL or `#anchor`) |
| `style` | No | `primary` or `secondary` (default: `secondary`) |
| `icon` | No | `github` or `download` |

### Imprint (optional)

For German legal compliance (§ 5 TMG). See [Imprint and Legal](#imprint-and-legal) at the end of this guide for details.

```yaml
imprint:
  enabled: true
  name: Your Name
  address: |
    Street 123
    12345 City
    Country
  email_encrypted: "encrypted-string"
  phone_encrypted: "encrypted-string"
  encryption_key: "your-key"
```

## Writing Section Content

Each section is a standalone HTML file in `docs/sections/`. You don't need a full HTML document — just the section markup. The generator wraps everything in a complete page structure for you.

The examples below show the typical sections. You can add, remove, or reorder them freely by changing the `sections` array in `config.yaml`.

### sections/hero.html

The hero is the first thing visitors see — project name, tagline, and call-to-action buttons.

```html
<section id="hero" class="hero section">
  <div class="container text-center">
    <h1>Your Project</h1>
    <p class="hero-tagline">A short, catchy tagline</p>
    <p class="hero-description text-muted">
      A longer description of what your project does.
    </p>
    <div class="hero-buttons">
      <a href="#quickstart" class="btn btn-primary">Get Started</a>
      <a href="https://github.com/user/repo" class="btn btn-secondary">
        View on GitHub
      </a>
    </div>
  </div>
</section>
```

### sections/highlights.html

Three feature cards in a grid. Good for communicating key value props at a glance.

```html
<section id="highlights" class="highlights section">
  <div class="container">
    <div class="grid grid-3">
      <div class="feature-box">
        <h3>Feature One</h3>
        <p class="text-muted">Description of feature one.</p>
      </div>
      <div class="feature-box">
        <h3>Feature Two</h3>
        <p class="text-muted">Description of feature two.</p>
      </div>
      <div class="feature-box">
        <h3>Feature Three</h3>
        <p class="text-muted">Description of feature three.</p>
      </div>
    </div>
  </div>
</section>
```

### sections/demo.html (optional)

A demo video, optionally wrapped in a macOS-style terminal frame. Skip this section entirely if you don't have a demo — just remove it from `config.yaml`.

With terminal frame:

```html
<section id="demo" class="demo section bg-alt">
  <div class="container">
    <div class="macos-window">
      <div class="macos-titlebar">
        <div class="macos-buttons">
          <span class="macos-btn close"></span>
          <span class="macos-btn minimize"></span>
          <span class="macos-btn maximize"></span>
        </div>
      </div>
      <div class="macos-content">
        <video autoplay loop muted playsinline>
          <source src="assets/demo.webm" type="video/webm">
          <source src="assets/demo.mp4" type="video/mp4">
        </video>
      </div>
    </div>
  </div>
</section>
```

Without the frame:

```html
<section id="demo" class="demo section bg-alt">
  <div class="container">
    <video autoplay loop muted playsinline class="demo-video">
      <source src="assets/demo.webm" type="video/webm">
      <source src="assets/demo.mp4" type="video/mp4">
    </video>
  </div>
</section>
```

### sections/quick-start.html

Installation instructions with tabbed variants (e.g., Homebrew vs. Cargo vs. binary download). Tabs are wired up automatically — just use matching `data-tab` attributes on buttons and panels. The first tab should have the `active` class on both its button and panel.

```html
<section id="quickstart" class="section">
  <div class="container content-narrow">
    <h2>Quick Start</h2>

    <div class="tabs">
      <div class="tab-buttons">
        <button class="tab-button active" data-tab="cargo">Cargo</button>
        <button class="tab-button" data-tab="binary">Binary</button>
        <button class="tab-button" data-tab="source">Source</button>
      </div>
      <div class="tab-panels">
        <div class="tab-panel active" data-tab="cargo">
          <div class="code-block">
            <pre><code class="language-bash">cargo install your-project</code></pre>
          </div>
        </div>
        <div class="tab-panel" data-tab="binary">
          <p>Download from the releases page:</p>
          <p class="mt-md">
            <a href="https://github.com/user/repo/releases" class="btn btn-secondary btn-sm">
              View Releases
            </a>
          </p>
        </div>
        <div class="tab-panel" data-tab="source">
          <div class="code-block">
            <pre><code class="language-bash">git clone https://github.com/user/repo
cd repo
cargo build --release</code></pre>
          </div>
        </div>
      </div>
    </div>

    <h3>Basic Usage</h3>
    <div class="code-block">
      <pre><code class="language-bash">your-project --help</code></pre>
    </div>
  </div>
</section>
```

### sections/footer.html

```html
<footer id="footer" class="footer">
  <div class="container text-center">
    <p class="footer-tagline">Your project tagline here</p>
    <p class="text-muted text-sm">
      Made with love by <a href="https://yoursite.com">Your Name</a>
    </p>
    <p class="text-muted text-sm mt-sm">
      <a href="imprint.html">Imprint / Impressum</a>
    </p>
  </div>
</footer>
```

## README.md Markers

Instead of duplicating your project's documentation into the landing page, the generator can extract it directly from your README.md. Wrap the relevant section with markers:

```markdown
<!-- docs:start -->
## Documentation

Everything between these markers will be extracted
and rendered in the Documentation section of your landing page.

### Subsections work too

| Tables | Work |
|--------|------|
| Yes    | They do |

```bash
# Code blocks with syntax highlighting
echo "Hello, world!"
```

<!-- docs:end -->
```

Then reference it in `config.yaml` with `source: readme` instead of `file:`:

```yaml
  - id: docs
    source: readme
    nav: true
    nav_label: Documentation
```

The markers must be on their own lines. Only content between them is extracted — the rest of the README is ignored. Markdown is rendered to HTML with full syntax highlighting.

## Customizing the Theme

With your content in place, the next step is making it look right. The generator ships with a dark theme by default. To customize it, create a `theme.css` in your `docs/` directory. You only need to include the variables you want to override — the generator merges your file with the base theme.

### Quick start: changing colors

Most of the time you only need to set three values:

```css
:root {
  --color-primary: #7c3aed;
  --color-primary-hover: #6d28d9;
  --color-primary-subtle: #2d2640;
}
```

These control buttons, links, accent borders, and the auto-generated favicon.

### Favicon

The favicon is generated automatically from `--color-primary` and `--color-primary-hover`. These must be valid hex colors (e.g., `#7c3aed`), not CSS functions or variables.

### Light theme

To create a light theme, override the background, text, and shadow variables:

```css
:root {
  --color-bg: #ffffff;
  --color-bg-transparent: rgba(255, 255, 255, 0.9);
  --color-bg-alt: #f5f5f5;
  --color-bg-card: #ffffff;
  --color-bg-code: #f8f8f8;
  --color-bg-titlebar: #e5e5e5;

  --color-text: #374151;
  --color-text-muted: #6b7280;
  --color-text-bright: #111827;

  --color-border: #e5e7eb;

  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.1);
  --shadow-lg: 0 20px 50px rgba(0,0,0,0.15);
}
```

### All CSS variables

For fine-grained control, here is the complete set of variables and their defaults.

**Brand colors:**

```css
:root {
  --color-primary: #7c3aed;           /* Main accent: buttons, links */
  --color-primary-hover: #6d28d9;     /* Hover state for primary */
  --color-primary-subtle: #2d2640;    /* Subtle accent for borders/backgrounds */
}
```

**Warning colors:**

```css
:root {
  --color-warning-rgb: 245, 158, 11;  /* RGB values for warning color */
  --color-warning: rgb(var(--color-warning-rgb));
  --color-warning-subtle: rgba(var(--color-warning-rgb), 0.1);
}
```

**Backgrounds:**

```css
:root {
  --color-bg: #0f0f14;                /* Page background */
  --color-bg-transparent: rgba(15, 15, 20, 0.9); /* Semi-transparent navbar */
  --color-bg-alt: #1a1a24;            /* Alternate sections (demo, docs) */
  --color-bg-card: #1f1f2e;           /* Card backgrounds */
  --color-bg-code: #1e1e2e;           /* Code block backgrounds */
  --color-bg-titlebar: #1a1a20;       /* macOS window titlebar */
}
```

**Text:**

```css
:root {
  --color-text: #e5e5e5;              /* Body text */
  --color-text-muted: #9ca3af;        /* Secondary text */
  --color-text-bright: #ffffff;       /* Headings, emphasis */
}
```

**Borders and shadows:**

```css
:root {
  --color-border: #2e2e3e;            /* Card borders, dividers */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 20px 50px rgba(0, 0, 0, 0.5);
}
```

**Typography:**

```css
:root {
  --font-sans: system-ui, -apple-system, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}
```

**Spacing:**

```css
:root {
  --space-xs: 0.25rem;   /* 4px */
  --space-sm: 0.5rem;    /* 8px */
  --space-md: 1rem;      /* 16px */
  --space-lg: 2rem;      /* 32px */
  --space-xl: 4rem;      /* 64px */
  --space-2xl: 6rem;     /* 96px */
}
```

**Layout:**

```css
:root {
  --container-max: 1100px;
  --border-radius: 8px;
  --border-radius-lg: 12px;
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
}
```

## Running the Generator

Once your `docs/` directory is set up, run the generator to produce your site.

```bash
bun run generator/bin/generate.ts \
  --docs ./docs \
  --readme ./README.md \
  --output ./dist \
  --templates /path/to/project-page-starter/templates
```

### CLI arguments

| Option | Short | Required | Description |
|--------|-------|----------|-------------|
| `--docs` | `-d` | Yes | Path to your docs/ directory |
| `--readme` | `-r` | Yes | Path to your project's README.md |
| `--output` | `-o` | Yes | Output directory for the generated site |
| `--templates` | `-t` | Yes | Path to the project-page-starter templates/ directory |

### What it produces

```
dist/
├── index.html
├── imprint.html                 # If enabled in config
├── favicon.svg                  # Auto-generated from theme colors
├── styles/
│   └── styles.css               # Single bundled CSS file
└── assets/
    └── (copied from docs/assets/)
```

All CSS from the templates is bundled into a single `styles.css` via LightningCSS. The output is a self-contained static site — open `dist/index.html` in a browser to preview.

## Deploying

The output is plain static HTML. Deploy it anywhere: GitHub Pages, Netlify, Vercel, or any static host.

### GitHub Actions

For automated deployment on every push, add this workflow to your project at `.github/workflows/pages.yml`:

```yaml
name: Deploy Pages

on:
  push:
    branches: [main]
    paths:
      - 'README.md'
      - 'docs/**'

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          path: project

      - uses: actions/checkout@v4
        with:
          repository: jakobwesthoff/project-page-starter
          path: generator

      - uses: oven-sh/setup-bun@v1

      - name: Install dependencies
        run: cd generator/generator && bun install

      - name: Create output directories
        run: mkdir -p dist/styles dist/assets

      - name: Generate pages
        run: |
          bun run generator/generator/bin/generate.ts \
            --docs project/docs \
            --readme project/README.md \
            --output dist \
            --templates generator/templates

      - name: Copy project assets
        run: cp -r project/docs/assets/* dist/assets/ 2>/dev/null || true

      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

Then enable GitHub Pages in your repository settings:
1. Go to Settings > Pages
2. Under "Build and deployment", select "GitHub Actions"

---

The sections above cover the full workflow from setup to deployment. Everything below is reference material you can consult as needed.

---

## CSS Classes Reference

The templates provide a set of CSS classes you can use in your section HTML files.

### Layout

- `.container` — Centered container with max-width
- `.content-narrow` — Narrower content width for readability
- `.section` — Standard section padding
- `.bg-alt` — Alternating background color

### Grid

- `.grid` — CSS Grid container
- `.grid-2` — 2-column grid
- `.grid-3` — 3-column grid

### Typography

- `.text-center` — Center-aligned text
- `.text-muted` — Muted/secondary text color
- `.text-sm` — Smaller text
- `.text-lg` — Larger text

### Components

- `.btn` — Base button styles
- `.btn-primary` — Primary button (filled)
- `.btn-secondary` — Secondary button (outline)
- `.btn-sm` — Small button
- `.feature-box` — Feature card with hover effect
- `.code-block` — Code block wrapper
- `.tabs`, `.tab-button`, `.tab-panel` — Tabbed interface
- `.macos-window`, `.macos-titlebar`, `.macos-content` — macOS window frame

### Spacing

- `.mt-xs` through `.mt-2xl` — Margin top
- `.mb-xs` through `.mb-2xl` — Margin bottom
- `.py-xs` through `.py-2xl` — Padding vertical
- `.px-xs` through `.px-2xl` — Padding horizontal

### Responsive breakpoints

| Breakpoint | Width | Changes |
|------------|-------|---------|
| Mobile | < 640px | Single column, smaller hero text, hero logo scales down |
| Tablet | < 768px | Hidden nav links, stacked highlights, single-column tabs |
| Desktop | > 768px | Full layout with all features visible |

## Syntax Highlighting

Code blocks in both HTML sections and README content are highlighted at build time using [Shiki](https://shiki.style/) with the `github-dark` theme. No client-side JavaScript is needed.

In HTML section files, use the standard `language-*` class:

```html
<pre><code class="language-bash">echo "highlighted"</code></pre>
```

In README content, use fenced code blocks with a language tag:

````markdown
```bash
echo "highlighted"
```
````

### Supported languages

| Language | Aliases |
|----------|---------|
| `bash` | `shell`, `sh`, `zsh` |
| `json` | |
| `yaml` | |
| `toml` | |
| `typescript` | |
| `javascript` | |
| `rust` | |
| `go` | |

Unrecognized language tags are rendered as plain text without highlighting.

## Icon System

Icons in HTML are written as `<i data-icon="name"></i>` and replaced at build time with inline SVGs from `templates/icons/`.

Available icons: `github`, `download`.

These are primarily used in navbar buttons (see [Navbar buttons](#navbar-buttons-optional)), but you can use them in section HTML as well.

## Recording a Demo Video with VHS

If your project has a CLI, a terminal recording makes a great demo section. The `vhs/` directory in this repository contains a pre-configured [VHS](https://github.com/charmbracelet/vhs) tape file with a custom theme that matches the landing page colors.

### Recording

```bash
cd vhs
vhs demo.tape
cp demo.webm demo.mp4 ../docs/assets/
```

### Retina display

The tape records at 2x resolution (e.g., 1800x800 for a 900x400 display size). The CSS displays the video at half its native size, making text crisp on HiDPI screens.

### Theme sync

The VHS tape includes a custom color theme. If you change your page colors, update the VHS theme to match:

| CSS Variable | VHS Theme Key |
|--------------|---------------|
| `--color-bg` | `background` |
| `--color-text` | `foreground` |
| `--color-primary` | `magenta` |

### Customizing the recording

Edit `vhs/demo.tape`:

```
Set FontSize 30
Set Width 1800           # 2x display width
Set Height 800           # 2x display height

Type "your-command --flag"
Enter
Sleep 2s
```

See the [VHS documentation](https://github.com/charmbracelet/vhs) for all available commands.

### Requirements

- [VHS](https://github.com/charmbracelet/vhs) (`brew install vhs`)
- [ttyd](https://github.com/tsl0922/ttyd) (`brew install ttyd`)
- [ffmpeg](https://ffmpeg.org/) (`brew install ffmpeg`)

## Imprint and Legal

The generator can produce an `imprint.html` page for German legal compliance (§ 5 TMG). This is optional — if you don't need it, omit the `imprint` section from `config.yaml` and remove the imprint link from your footer.

### Contact encryption

To prevent scraping of contact information from your repository, email and phone are stored in encrypted form in `config.yaml` and decrypted client-side with JavaScript. A noscript fallback is included.

Use this Node.js script to generate the encrypted values:

```javascript
function encrypt(text, key) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    result += String.fromCharCode(charCode);
  }
  // ROT13 the result
  return result.replace(/[a-zA-Z]/g, c =>
    String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26)
  );
}

const key = 'your-secret-key';
console.log('email:', encrypt('your@email.com', key));
console.log('phone:', encrypt('+49 123 456789', key));
```

Then add the outputs to your `config.yaml`:

```yaml
imprint:
  enabled: true
  name: Your Name
  address: |
    Street 123
    12345 City
  email_encrypted: "output-from-script"
  phone_encrypted: "output-from-script"
  encryption_key: "your-secret-key"
```

## Migration Guide

If you have an existing landing page built from an earlier version of this project (the static HTML/CSS template), follow these steps to convert it to the generator workflow.

1. **Add README markers** — Find your documentation content and add it to your README.md between `<!-- docs:start -->` / `<!-- docs:end -->` markers.

2. **Create docs/ structure**

   ```bash
   mkdir -p docs/sections docs/assets
   ```

3. **Create config.yaml** — Extract project name, tagline, GitHub URL, and author information.

4. **Create theme.css** — Copy the CSS custom properties (colors) from your existing theme.

5. **Extract HTML sections** — Copy each section from your existing `index.html` into separate files:
   - Hero → `sections/hero.html`
   - Highlights → `sections/highlights.html`
   - Demo → `sections/demo.html`
   - Quick Start → `sections/quick-start.html`
   - Footer → `sections/footer.html`

6. **Copy assets** — Move demo videos and images to `docs/assets/`.

7. **Add GitHub Actions workflow** — Copy the workflow from the [GitHub Actions](#github-actions) section.

8. **Test locally**

   ```bash
   bun run generator/bin/generate.ts \
     --docs ./docs \
     --readme ./README.md \
     --output ./test-dist \
     --templates /path/to/project-page-starter/templates
   ```

9. **Verify and deploy** — Open `test-dist/index.html` in your browser to verify, then commit and push.

## Troubleshooting

### "README.md must contain markers"

Make sure your README.md includes both markers:
```markdown
<!-- docs:start -->
Content here
<!-- docs:end -->
```

### Styles not loading

Check that the `--templates` path points to the correct directory containing the `styles/` folder.

### Images/videos not showing

Ensure assets are in `docs/assets/` and referenced with relative paths like `assets/demo.webm`.

### Syntax highlighting not working

Code blocks must specify a language:
````markdown
```bash
echo "This will be highlighted"
```
````

See [Supported languages](#supported-languages) for the full list.
