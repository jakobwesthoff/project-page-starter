# VHS Demo Recordings

This folder contains [VHS](https://github.com/charmbracelet/vhs) tape files for recording terminal demos that match the landing page template.

## Contents

- `demo.tape` - VHS tape script with custom theme matching the landing page colors

## Usage

### Recording

```bash
cd vhs
vhs demo.tape
```

### Copy to Template

After recording, copy the video files to the template assets:

```bash
cp demo.webm demo.mp4 ../docs/assets/
```

## Configuration

### Retina Display (2x Resolution)

The tape is configured for crisp rendering on HiDPI displays:

```
Set FontSize 30
Set Width 1800    # 2x of 900px display width
Set Height 800    # 2x of 400px display height
```

The CSS in the template displays the video at half size (900x400), making text sharp on retina screens.

### Custom Theme

The tape includes a custom theme matching the landing page colors:

```
Set Theme { "name": "LandingPage", "background": "#0f0f14", "foreground": "#e5e5e5", "magenta": "#7c3aed", ... }
```

**Important**: If you change colors in `docs/theme.css`, update the VHS theme to match:

| CSS Variable | VHS Theme Key |
|--------------|---------------|
| `--color-bg` | `background` |
| `--color-text` | `foreground` |
| `--color-primary` | `magenta` |

### Customizing the Recording

Edit `demo.tape` to record your own commands:

```
Type "your-command --flag"
Enter
Sleep 2s

Type "another-command"
Enter
Sleep 5s
```

See the [VHS documentation](https://github.com/charmbracelet/vhs) for all available commands.

## Requirements

- [VHS](https://github.com/charmbracelet/vhs) (`brew install vhs`)
- [ttyd](https://github.com/tsl0922/ttyd) (`brew install ttyd`)
- [ffmpeg](https://ffmpeg.org/) (`brew install ffmpeg`)

## Output Files

VHS generates multiple formats:

- `demo.gif` - Animated GIF (larger file size, universal support)
- `demo.webm` - WebM video (smaller, modern browsers)
- `demo.mp4` - MP4 video (fallback for Safari)

The template uses WebM with MP4 fallback for best quality/size balance.
