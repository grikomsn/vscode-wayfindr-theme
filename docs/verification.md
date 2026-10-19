# Verification

Theme review: October 19, 2026, macOS arm64, Insiders **1.143.0-insider**, **Wayfindr Preview** profile, VSIX **0.3.0**. Build: Node.js 24.18.0, `@vscode/vsce` 4.0.0.

## Automated

`npm run check` validates all ten generated themes, manifest entries, semantic colors, assets, neutral gray surfaces, and contrast. Tested text roles on editor/sidebar/widget surfaces meet **4.5:1**, or **7:1** in Gray Contrast; Contrast borders meet **3:1**. Main text contrast increases from Soft to Standard to Contrast. The four earlier palettes remain unchanged.

| Gray text minimum | Dark | Light |
| --- | --- | --- |
| Soft | 5.07:1 | 4.58:1 |
| Standard | 5.10:1 | 4.58:1 |
| Contrast | 8.03:1 | 7.29:1 |

## Installed VSIX review

All ten themes were selected in Insiders. Checked TypeScript syntax, comments, workbench surfaces, terminal ANSI colors, and Contrast boundaries. Day also covered CSS completion and token inspection.

| Palette | Dark preview | Light preview |
| --- | --- | --- |
| Yellow | [Dark](../images/wayfindr-dark.png) | [Light](../images/wayfindr-light.png) |
| Gray Soft | [Dark](../images/wayfindr-gray-dark-soft.png) | [Light](../images/wayfindr-gray-light-soft.png) |
| Gray Standard | [Dark](../images/wayfindr-gray-dark.png) | [Light](../images/wayfindr-gray-light.png) |
| Gray Contrast | [Dark](../images/wayfindr-gray-dark-contrast.png) | [Light](../images/wayfindr-gray-light-contrast.png) |
| Original | [Night](../images/wayfindr-night.png) | [Day](../images/wayfindr-day.png) |

## Coverage limits

Stable VS Code and the declared 1.85 minimum were not visually tested. Python, JSON, Markdown, diff/debugger states, and third-party UIs were not fully exercised. Contrast checks cover specified color pairs, not a full accessibility audit; Contrast variants use normal light/dark UI bases.
