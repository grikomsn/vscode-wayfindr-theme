# Wayfindr Theme

![Wayfindr Theme cover](images/cover.png)

Ten light and dark VS Code themes inspired by [Wayfindr](https://wayfindr.io/): muted yellow, quiet gray, gold accents, and botanical syntax colors.

## Themes

| Palette | Dark | Light |
| --- | --- | --- |
| **Yellow · primary** | Wayfindr Dark | Wayfindr Light |
| Gray · soft | Wayfindr Gray Dark Soft | Wayfindr Gray Light Soft |
| Gray · standard | Wayfindr Gray Dark | Wayfindr Gray Light |
| Gray · contrast | Wayfindr Gray Dark Contrast | Wayfindr Gray Light Contrast |
| Original · ink / paper | Wayfindr Night | Wayfindr Day |

Soft reduces surface separation; Contrast adds stronger text, borders, and selection outlines. All variants cover the workbench, terminal, TextMate scopes, and semantic tokens.

| Wayfindr Dark | Wayfindr Light |
| --- | --- |
| ![Wayfindr Dark](images/wayfindr-dark.png) | ![Wayfindr Light](images/wayfindr-light.png) |

[All previews and verification](docs/verification.md).

## Install

Install [Wayfindr Theme from the Marketplace](https://marketplace.visualstudio.com/items?itemName=grikomsn.wayfindr-theme), or run:

```sh
code --install-extension grikomsn.wayfindr-theme
```

Requires VS Code 1.85+. Open **Preferences: Color Theme** (`Cmd+K Cmd+T` on macOS) and choose **Wayfindr**. For automatic switching, set the preferred dark/light themes to **Wayfindr Dark** / **Wayfindr Light** and enable **Window: Auto Detect Color Scheme**.

## Develop

Requires Node.js 22.11+. Palette sources: [palette.json](palette.json) and `scripts/variants.mjs`.

```sh
npm ci
npm run build
npm run check
npm run package
npm run sideload -- --profile 'Wayfindr Preview'
```

Sideload targets Insiders. Press **F5** for an Extension Development Host; use `examples/` for syntax checks. See [publishing](docs/publishing.md) and [palette sources](docs/research.md).

## Credits

Independent project inspired by [Wayfindr](https://wayfindr.io/), with extension structure informed by [Nostromo](https://github.com/grikomsn/vscode-nostromo-theme). Generated arrow/map artwork contains no Wayfindr logo. [Asset provenance](docs/assets.md) · [MIT](LICENSE).
