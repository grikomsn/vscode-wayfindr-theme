# Extension setup research

Researched October 19, 2026 using parallel-web-search and the GitHub connector.

- A color theme is a declarative `contributes.themes` extension. Each entry supplies a relative theme path and a `vs` or `vs-dark` UI base. No activation events, JavaScript entry point, or extension host code are needed. [Color Theme Guide](https://code.visualstudio.com/api/extension-guides/color-theme), [Contribution Points](https://code.visualstudio.com/api/references/contribution-points)
- Include `semanticHighlighting: true`, explicit semantic colors, and TextMate rules for languages without semantic providers. Semantic colors must be opaque. [Semantic Highlight Guide](https://code.visualstudio.com/api/language-extensions/semantic-highlight-guide)
- Set a real `engines.vscode` range and a Themes category. This project chooses `^1.85.0` as a modern compatibility floor; this is a declared floor, not proof of a visual test on 1.85. [Extension Manifest](https://code.visualstudio.com/api/references/extension-manifest.md)
- Use local development tools with a committed lockfile. `@vscode/vsce` 4.0.0 was the current npm release when checked; its project requires Node.js 22 or newer. Static themes can package with `--no-dependencies`. [vsce](https://github.com/microsoft/vscode-vsce)
- Create a VSIX with `vsce package`, inspect its contents, then sideload with `code-insiders --install-extension`. A Marketplace account is unnecessary for this local workflow. [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- F5 starts an Extension Development Host. Use **Developer: Inspect Editor Tokens and Scopes** to investigate scope and semantic colors. [Color Theme Guide](https://code.visualstudio.com/api/extension-guides/color-theme), [Syntax Highlight Guide](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide)
- Nostromo provides a useful precedent for multiple JSON theme contributions, a publisher namespace, a PNG icon, a license, and a gallery banner. This implementation uses a fresh palette and source generator. [Nostromo manifest](https://github.com/grikomsn/vscode-nostromo-theme/blob/main/package.json)

The initial local scaffold omitted repository metadata and used local-only packaging flags. On October 20, 2026, the public repository and publishing workflow were added, verified repository/homepage/issue URLs were set, and normal README asset URL rewriting was restored. See [publishing setup](publishing.md).

## Palette provenance

Wayfindr's homepage declares `--main-color: #efba5a` and `--secondary-color: #101828`. Its [main stylesheet](https://wayfindr.io/wp-content/cache/autoptimize/css/autoptimize_single_73fb884f456119268ba709e7d596a98e.css) also contains the plum, green, sage, sky, periwinkle, pink, forest, and cloud colors in `palette.json`. Cream `#FDF4D7` is present in the homepage's inline styles. [Wayfindr](https://wayfindr.io/)

Search output for follow-up: `/tmp/wayfindr-vscode-theme-setup.json`. Website source snapshots used during extraction: `/tmp/wayfindr-homepage.html` and `/tmp/wayfindr-main.css`.
