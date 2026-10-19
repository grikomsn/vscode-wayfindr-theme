# Local verification

Date: October 19, 2026 (Asia/Jakarta).

## Environment

- macOS arm64.
- Visual Studio Code Insiders **1.143.0-insider**, commit `4c6cba1504409c9eb8ee1d27fa383152a7d2d76e`.
- Dedicated **Wayfindr Preview** profile.
- Extension ID: `grikomsn.wayfindr-theme`, version **0.3.0**.
- Build runtime: Node.js **24.18.0**; packaging tool: `@vscode/vsce` **4.0.0**.

## Automated checks

`npm run check` passes:

- Generated theme JSON agrees with the palette and generator.
- All ten manifest contributions resolve and have matching names and dark/light bases; the yellow Dark/Light pair remains first.
- All ten themes enable semantic highlighting and supply opaque syntax colors.
- Each variant supplies 319 UI colors (324 in Contrast), 31 TextMate rules, and 29 semantic rules.
- Checked text roles on background, surface, and raised surface reach at least 4.5:1; the two Gray Contrast variants require at least 7:1. Existing minimums: **4.93:1 Dark**, **4.51:1 Light**, **4.70:1 Night**, **4.66:1 Day**.
- Button and remote-status labels have at least 4.5:1 contrast.
- README screenshots and the extension icon exist.
- Gray background, sidebar, and raised surface RGB channels differ by at most 8, checking that the surfaces stay neutral.
- Gray Contrast borders reach at least 3:1 against the three tested surfaces.
- Main text contrast increases from Soft to Standard to Contrast for both gray appearances.
- SHA-256 comparisons confirm all four existing theme JSON files are byte-for-byte unchanged from 0.2.0.

Gray text minimums across all tested roles and surfaces:

| Level | Dark | Light |
| --- | --- | --- |
| Soft | 5.07:1 | 4.58:1 |
| Standard | 5.10:1 | 4.58:1 |
| Contrast | 8.03:1 | 7.29:1 |

The lowest pair is not necessarily the main foreground text. Main text contrast against the editor increases from **8.76 → 11.68 → 16.08** in dark and **7.94 → 10.67 → 16.09** in light.

All 319 color identifiers were checked against strings in the installed Insiders workbench and built-in Git extension bundles. This verifies the identifiers are present, not that every UI state has been exercised.

## Visual checks in the installed extension

The packaged VSIX was installed with `code-insiders --install-extension`. All ten themes were selected through **Preferences: Color Theme** across the 0.1.0, 0.2.0, and 0.3.0 reviews. These were checks of the installed extension, not a browser mockup.

- **Night:** TypeScript keywords, strings, types, numeric values, readonly constants, functions, template strings, and comments; sidebar, tabs, breadcrumbs, status bar, minimap, and terminal.
- **Day:** The same TypeScript specimen, plus CSS selectors, properties, values, numbers, strings, comments, and inline color decorators.
- **Dark (0.2.0):** The TypeScript specimen, warm yellow-tinted charcoal editor, sidebar, tabs, status bar, breadcrumbs, minimap, and terminal.
- **Light (0.2.0):** The TypeScript specimen, muted yellow editor, deeper yellow sidebar, tabs, status bar, breadcrumbs, minimap, and terminal.
- **Gray (0.3.0):** All six new themes selected and individually captured. Checked the TypeScript specimen, comments, semantic syntax, neutral editor/sidebar/terminal surfaces, tabs, breadcrumbs, status bar, minimap, gold actions, and terminal ANSI colors. Contrast screenshots also show the stronger boundaries, focus outlines, and indentation.
- **Terminal:** All 16 normal/bright ANSI colors and success/warning/error labels in all ten variants, using `examples/terminal-colors.sh`.
- **Completion:** CSS completion popup in Day, including selected-row background, label contrast, icons, and border.
- **Token inspector:** The Day comment resolves to `#626C5F` on `#FCFAF4`, italic, with a reported **5.25:1** contrast ratio and the intended TextMate rule.

Screenshots: [Dark](../images/wayfindr-dark.png), [Light](../images/wayfindr-light.png), [Night](../images/wayfindr-night.png), [Day](../images/wayfindr-day.png).

Gray screenshots: [Dark Soft](../images/wayfindr-gray-dark-soft.png), [Light Soft](../images/wayfindr-gray-light-soft.png), [Dark](../images/wayfindr-gray-dark.png), [Light](../images/wayfindr-gray-light.png), [Dark Contrast](../images/wayfindr-gray-dark-contrast.png), [Light Contrast](../images/wayfindr-gray-light-contrast.png).

## Limits

The declared VS Code 1.85 minimum was not tested on that release, and stable VS Code was not visually exercised. Python, JSON, and Markdown specimens are supplied for follow-up review. Diff/merge views, debugger states, every diagnostic state, and third-party extension UIs have color mappings but were not all opened individually. The contrast checks cover the specified text/surface pairs and do not constitute a full accessibility audit. The Gray Contrast themes use `vs`/`vs-dark` UI bases rather than the dedicated high-contrast bases.

The theme validation above was performed on the local VSIX before repository creation. The subsequent GitHub setup and first public release use the Changesets flow described in [publishing setup](publishing.md).
