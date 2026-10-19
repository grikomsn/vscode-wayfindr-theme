# Publishing

Extension: `grikomsn.wayfindr-theme`. Releases follow the sibling Copilot Chat projects' Changesets workflow.

1. Add a user-visible change with `npm run changeset` and commit its note with the implementation.
2. Push to `main`; the Release workflow opens or updates the version PR.
3. Merge that PR after CI passes on Node.js 22, 24, and 26.
4. The workflow packages and publishes the VSIX, then attaches it to the matching GitHub release.

Changesets handles versioning only; nothing is published to npm. Packaging uses the manifest version and rewrites README links to GitHub. Development files and dependencies are excluded.

## Credential

The repository's **VSCE_PAT** Actions secret contains a dedicated, organization-scoped `grikomsn` PAT with **Marketplace (Manage)**. Publisher access was verified on October 20, 2026. Rotate it before **January 18, 2027**.

Verify replacements with `vsce verify-pat grikomsn`, then update the secret. Keep tokens out of source, command arguments, logs, screenshots, and chat; never regenerate a sibling project's token.

## Local package

```sh
npm ci
npm run package
```

`npm run release` publishes the packaged VSIX using `VSCE_PAT`; use the version PR for normal releases.

[VS Code publishing guide](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) · [Azure PAT management](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops)
