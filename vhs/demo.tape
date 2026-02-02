# Demo recording template
# Run with: vhs demo.tape
#
# Customize the commands below for your project.
# Adjust sleep timeouts based on command execution time.

Output demo.gif
Output demo.webm
Output demo.mp4

Set Shell "zsh"
Set FontFamily "JetBrainsMono NFM SemiBold"
Set FontSize 30
Set Width 1800
Set Height 800
# Custom theme matching landing page colors
# Update these values if you change the page color scheme
Set Theme { "name": "LandingPage", "black": "#0f0f14", "red": "#ef6487", "green": "#5eca89", "yellow": "#fdd877", "blue": "#65aef7", "magenta": "#7c3aed", "cyan": "#43c1be", "white": "#e5e5e5", "brightBlack": "#9ca3af", "brightRed": "#ef6487", "brightGreen": "#5eca89", "brightYellow": "#fdd877", "brightBlue": "#65aef7", "brightMagenta": "#a78bfa", "brightCyan": "#43c1be", "brightWhite": "#ffffff", "background": "#0f0f14", "foreground": "#e5e5e5", "selection": "#2d2640", "cursor": "#7c3aed" }
Set TypingSpeed 40ms

# Example commands - replace with your own
Type "project-name --help"
Enter
Sleep 2s

Type "project-name input.txt --output ./results"
Enter
Sleep 3s
