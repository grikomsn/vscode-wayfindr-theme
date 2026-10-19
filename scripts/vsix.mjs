import { readFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = fileURLToPath(new URL('../', import.meta.url));
const pkg = JSON.parse(await readFile(`${root}package.json`, 'utf8'));
const output = `${root}dist/${pkg.name}-${pkg.version}.vsix`;
const action = process.argv[2];
let command;
let args;
if (action === 'package') {
  await mkdir(`${root}dist`, { recursive: true });
  command = 'vsce';
  args = ['package', '--no-dependencies', '--out', output];
} else if (action === 'sideload') {
  command = 'code-insiders';
  args = ['--install-extension', output, '--force', ...process.argv.slice(3)];
} else if (action === 'publish') {
  if (!process.env.VSCE_PAT) throw new Error('Set VSCE_PAT before publishing');
  command = 'vsce';
  args = ['publish', '--packagePath', output, '--skip-duplicate'];
} else {
  throw new Error('Expected package, sideload, or publish');
}
const result = spawnSync(command, args, { cwd: root, stdio: 'inherit' });
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
