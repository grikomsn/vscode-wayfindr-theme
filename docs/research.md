# Palette and extension sources

Researched October 19, 2026 using parallel-web-search and GitHub.

Wayfindr's [homepage](https://wayfindr.io/) and [stylesheet](https://wayfindr.io/wp-content/cache/autoptimize/css/autoptimize_single_73fb884f456119268ba709e7d596a98e.css) supplied gold `#EFBA5A`, ink `#101828`, and the companion colors in [palette.json](../palette.json). Theme backgrounds and syntax tones are adapted for legibility.

The extension uses declarative `contributes.themes` entries with `vs` / `vs-dark` bases, semantic colors, and TextMate fallbacks. It has no activation code or runtime dependencies. The declared VS Code 1.85 floor has not been visually tested on that version.

Build tools are pinned in the lockfile. `@vscode/vsce` 4.0.0 packages with `--no-dependencies`; F5 launches the development host, and **Developer: Inspect Editor Tokens and Scopes** helps verify syntax colors.

References:

- [Color Theme Guide](https://code.visualstudio.com/api/extension-guides/color-theme)
- [Semantic Highlight Guide](https://code.visualstudio.com/api/language-extensions/semantic-highlight-guide)
- [Extension Manifest](https://code.visualstudio.com/api/references/extension-manifest)
- [vsce](https://github.com/microsoft/vscode-vsce)
- [Nostromo manifest](https://github.com/grikomsn/vscode-nostromo-theme/blob/main/package.json)

See [verification](verification.md) for tested coverage and [publishing](publishing.md) for releases.
