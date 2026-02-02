# Customization Guide

Detailed configuration guide for the landing page template.

## CSS Variables (theme.css)

All colors, fonts, and spacing are defined as CSS variables in `template/styles/theme.css`. Edit this file to customize the look and feel.

```css
:root {
  /* Brand colors */
  --color-primary: #7c3aed;           /* Main accent: buttons, links */
  --color-primary-hover: #6d28d9;     /* Hover state for primary */
  --color-primary-subtle: #2d2640;    /* Subtle accent for borders/backgrounds */

  /* Backgrounds */
  --color-bg: #0f0f14;                /* Page background */
  --color-bg-transparent: rgba(15, 15, 20, 0.9); /* Semi-transparent navbar */
  --color-bg-alt: #1a1a24;            /* Alternate sections (demo, docs) */
  --color-bg-card: #1f1f2e;           /* Card backgrounds */
  --color-bg-code: #1e1e2e;           /* Code block backgrounds */
  --color-bg-titlebar: #1a1a20;       /* macOS window titlebar */

  /* Text */
  --color-text: #e5e5e5;              /* Body text */
  --color-text-muted: #9ca3af;        /* Secondary text */
  --color-text-bright: #ffffff;       /* Headings, emphasis */

  /* Borders & Shadows */
  --color-border: #2e2e3e;            /* Card borders, dividers */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 20px 50px rgba(0, 0, 0, 0.5);

  /* Typography */
  --font-sans: system-ui, -apple-system, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  /* Spacing */
  --space-xs: 0.25rem;   /* 4px */
  --space-sm: 0.5rem;    /* 8px */
  --space-md: 1rem;      /* 16px */
  --space-lg: 2rem;      /* 32px */
  --space-xl: 4rem;      /* 64px */
  --space-2xl: 6rem;     /* 96px */

  /* Layout */
  --container-max: 1100px;
  --border-radius: 8px;
  --border-radius-lg: 12px;

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
}
```

### Converting to Light Theme

Change the background and text variables:

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

## Page Sections

### Navbar

Two options for the brand:

```html
<!-- OPTION 1: Text only (default) -->
<a href="#" class="navbar-brand">
  <span>Project Name</span>
</a>

<!-- OPTION 2: Logo + Text -->
<a href="#" class="navbar-brand">
  <svg><!-- your logo SVG --></svg>
  <span>Project Name</span>
</a>
```

Features **scroll spy** - the active nav link updates as you scroll through sections.

### Hero

Three options for the title/logo:

```html
<!-- OPTION 1: Text only (default) -->
<h1>Project Name</h1>

<!-- OPTION 2: Logo + Text -->
<div class="hero-logo">
  <img src="assets/logo.svg" alt="Logo" class="hero-logo-img">
</div>
<h1>Project Name</h1>

<!-- OPTION 3: Combined logo with integrated text (no separate h1) -->
<div class="hero-logo">
  <img src="assets/logo-full.svg" alt="Project Name" class="hero-logo-full">
</div>
```

### Highlights

Three key value props without a section title:

```html
<section class="highlights">
  <div class="container">
    <div class="highlights-grid">
      <div class="highlight">
        <h3>Feature Title</h3>
        <p>Feature description.</p>
      </div>
      <div class="highlight">
        <h3>Another Feature</h3>
        <p>Another description.</p>
      </div>
      <div class="highlight">
        <h3>Third Feature</h3>
        <p>Third description.</p>
      </div>
    </div>
  </div>
</section>
```

### Demo

macOS-styled window with video:

```html
<div class="demo-window">
  <div class="macos-window">
    <div class="macos-window-titlebar">
      <div class="macos-window-buttons">
        <span class="macos-window-button close"></span>
        <span class="macos-window-button minimize"></span>
        <span class="macos-window-button maximize"></span>
      </div>
      <span class="macos-window-title">Terminal</span>
    </div>
    <div class="macos-window-content">
      <video autoplay loop muted playsinline>
        <source src="assets/demo.webm" type="video/webm">
        <source src="assets/demo.mp4" type="video/mp4">
      </video>
    </div>
  </div>
</div>
```

### Quick Start (Tabs)

Tabbed installation methods:

```html
<div class="tabs">
  <div class="tab-buttons">
    <button class="tab-button active" data-tab="homebrew">Homebrew</button>
    <button class="tab-button" data-tab="cargo">Cargo</button>
    <button class="tab-button" data-tab="binary">Binary</button>
  </div>
  <div class="tab-panels">
    <div class="tab-panel active" data-tab="homebrew">
      <div class="code-block">
        <pre><code class="language-bash">brew install project-name</code></pre>
      </div>
    </div>
    <div class="tab-panel" data-tab="cargo">
      <div class="code-block">
        <pre><code class="language-bash">cargo install project-name</code></pre>
      </div>
    </div>
    <div class="tab-panel" data-tab="binary">
      <div class="code-block">
        <pre><code class="language-bash">curl -fsSL https://example.com/install.sh | sh</code></pre>
      </div>
    </div>
  </div>
</div>
```

Add/remove tabs by adding/removing `tab-button` and `tab-panel` elements with matching `data-tab` attributes.

### Footer

```html
<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <p class="footer-tagline">Your project tagline or slogan here</p>
      <p class="footer-credit">
        Made with <span class="footer-heart">&hearts;</span> by
        <a href="https://yourwebsite.com">Your Name</a> |
        <!-- Imprint required by German law (§ 5 TMG) - optional elsewhere -->
        <a href="imprint.html">Imprint/Impressum</a>
      </p>
    </div>
  </div>
</footer>
```

## Syntax Highlighting

Uses [Prism.js](https://prismjs.com/) via CDN with the Tomorrow theme.

### Included Languages

- `bash` - Shell commands
- `toml` - Configuration files

### Adding Language Classes

```html
<pre><code class="language-bash">brew install my-tool</code></pre>
<pre><code class="language-toml">[config]
key = "value"</code></pre>
```

### Adding More Languages

Include additional Prism components from cdnjs:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.30.0/components/prism-python.min.js" integrity="..." crossorigin="anonymous"></script>
```

Find components and their SRI hashes at [cdnjs.com/libraries/prism](https://cdnjs.com/libraries/prism).

## Demo Video (VHS)

The `vhs/` folder contains a VHS tape file for recording terminal demos.

### Custom Theme

The tape uses a custom theme matching the landing page colors:

```
Set Theme { "name": "LandingPage", "black": "#0f0f14", "red": "#ef6487", "green": "#5eca89", "yellow": "#fdd877", "blue": "#65aef7", "magenta": "#7c3aed", "cyan": "#43c1be", "white": "#e5e5e5", "brightBlack": "#9ca3af", "brightRed": "#ef6487", "brightGreen": "#5eca89", "brightYellow": "#fdd877", "brightBlue": "#65aef7", "brightMagenta": "#a78bfa", "brightCyan": "#43c1be", "brightWhite": "#ffffff", "background": "#0f0f14", "foreground": "#e5e5e5", "selection": "#2d2640", "cursor": "#7c3aed" }
```

**Important**: If you change the page color theme, update the VHS theme to match.

### Retina Display

For crisp rendering on HiDPI displays, the video is recorded at 2x resolution:

- **Recording**: 1800x800 pixels
- **Display**: 900x400 CSS pixels

The CSS constrains the video to half its native size, ensuring sharp text on retina displays.

### Recording

```bash
cd vhs
vhs demo.tape
cp demo.webm demo.mp4 ../template/assets/
```

### Customizing the Recording

Edit `vhs/demo.tape`:

```
Set FontSize 30          # Adjust for readability
Set Width 1800           # 2x display width
Set Height 800           # 2x display height

Type "your-command --flag"
Enter
Sleep 2s
```

See the [VHS documentation](https://github.com/charmbracelet/vhs) for all available commands.

## Imprint Page

The template includes `template/imprint.html` for legal compliance.

**Required by German law** (§ 5 TMG) - optional in other jurisdictions. Remove the footer link if not needed.

The imprint contains placeholder content. Replace with your actual legal information:

- Name and address
- Contact information
- Legal disclaimers

## JavaScript Features

The template uses minimal vanilla JavaScript (inline at the bottom of `template/index.html`):

### Tab Switching

Handles the installation method tabs. Clicking a tab button shows the corresponding panel.

### Scroll Spy

Updates the active navbar link based on scroll position. Uses the navbar height as offset to determine which section is currently in view.

Both scripts are self-contained and have no external dependencies.

## Responsive Breakpoints

| Breakpoint | Width | Changes |
|------------|-------|---------|
| Mobile | < 640px | Single column, smaller hero text, hero logo scales down |
| Tablet | < 768px | Hidden nav links, stacked highlights, single-column tabs |
| Desktop | > 768px | Full layout with all features visible |

Media queries are defined in `template/styles/utilities.css` (grid) and `template/styles/layout.css` (sections).

## Adding New Sections

1. Add HTML in `template/index.html`:
   ```html
   <section id="newsection" class="newsection">
     <div class="container">
       <h2>Section Title</h2>
       <!-- Content -->
     </div>
   </section>
   ```

2. Add styles in `template/styles/layout.css`:
   ```css
   .newsection {
     padding-top: var(--space-2xl);
     padding-bottom: var(--space-2xl);
   }
   ```

3. Add nav link if needed:
   ```html
   <li><a href="#newsection">New Section</a></li>
   ```

## Adding New Components

Define new components in `template/styles/components.css`:

```css
.my-component {
  background-color: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: var(--space-md);
}
```

Always use CSS variables for colors, spacing, and fonts to maintain consistency with the theme.
