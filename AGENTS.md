# Repository guidance

- This is a static VS Code theme pack. Do not add extension host code or activation events for color themes.
- `palette.json` and `scripts/variants.mjs` are the palette sources; run `npm run build` after changing them and include generated JSON in `themes/`.
- Run `npm run check` and `npm run package` for palette, manifest, asset, and release changes. Visually check changed themes in VS Code Insiders.
- Add a Changeset for user-visible changes. Use the version pull request workflow for Marketplace releases.
- Keep credentials only in protected process memory and GitHub Actions secrets. Never commit or log them.
- `images/icon-direction.png` and `images/cover.png` are the selected generated assets. Preserve them during theme builds. Use imagegen for artwork edits; do not recreate or distort the Wayfindr logo.
