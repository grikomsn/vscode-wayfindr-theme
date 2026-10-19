import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { variants, resolvePalette } from './variants.mjs';

const root = new URL('../', import.meta.url);
const read = async (path) => JSON.parse(await readFile(new URL(path, root), 'utf8'));
const pkg = await read('package.json');
const palettes = await read('palette.json');
const hex = /^#[\da-f]{6}([\da-f]{2})?$/i;
const luminance = (color) => {
  const rgb = color.slice(1, 7).match(/../g).map((c) => parseInt(c, 16) / 255).map((c) => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
};
const contrast = (a, b) => (Math.max(luminance(a), luminance(b)) + 0.05) / (Math.min(luminance(a), luminance(b)) + 0.05);
assert.equal(pkg.categories.includes('Themes'), true);
assert.equal(pkg.main, undefined, 'Static themes must not need a runtime entry point');
assert.equal(pkg.activationEvents, undefined, 'Static themes need no activation events');
assert.equal(new Set(pkg.contributes.themes.map((t) => t.id)).size, variants.length);
assert.deepEqual(pkg.contributes.themes.map((t) => t.id), variants.map((v) => v.label));
await access(new URL(pkg.icon, root));
const icon = await readFile(new URL(pkg.icon, root));
assert.ok(icon.byteLength <= 1024 * 1024, 'Marketplace icon must not exceed 1024 KB');
assert.equal(icon.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', 'Marketplace icon must be a PNG');
assert.ok(icon.readUInt32BE(16) >= 128, 'Marketplace icon must be at least 128px wide');
assert.equal(icon.readUInt32BE(16), icon.readUInt32BE(20), 'Marketplace icon must be square');
const readme = await readFile(new URL('README.md', root), 'utf8');
for (const [, image] of readme.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) {
  if (!image.startsWith('https://')) await access(new URL(image, root));
}
for (const [i, contribution] of pkg.contributes.themes.entries()) {
  const theme = await read(contribution.path);
  const variant = variants[i];
  const p = resolvePalette(palettes, variant.key);
  assert.equal(theme.name, contribution.id);
  assert.equal(theme.type, contribution.uiTheme === 'vs-dark' ? 'dark' : 'light');
  assert.equal(contribution.uiTheme, variant.uiTheme);
  assert.equal(theme.colors['editor.background'], p.background);
  assert.equal(theme.colors['terminal.background'], p.background);
  assert.equal(theme.semanticHighlighting, true);
  assert.ok(Object.keys(theme.colors).length >= 300);
  for (const [key, value] of Object.entries(theme.colors)) assert.match(value, hex, key);
  for (const rule of theme.tokenColors) {
    assert.ok(rule.scope.length > 0, rule.name);
    assert.match(rule.settings.foreground, hex, rule.name);
  }
  for (const [key, value] of Object.entries(theme.semanticTokenColors)) {
    const color = typeof value === 'string' ? value : value.foreground;
    if (color) assert.match(color, hex, key);
  }
  const roles = ['foreground', 'muted', 'faint', 'keyword', 'string', 'function', 'type', 'number', 'constant', 'property', 'comment', 'operator', 'error', 'warning', 'info', 'success'];
  const surfaces = ['background', 'surface', 'raised'];
  const threshold = variant.level === 'contrast' ? 7 : 4.5;
  let minimum = Infinity;
  for (const role of roles) for (const surface of surfaces) {
    const ratio = contrast(p[role], p[surface]);
    minimum = Math.min(minimum, ratio);
    assert.ok(ratio >= threshold, `${theme.name}: ${role} on ${surface} has ${ratio.toFixed(2)}:1 contrast; expected ${threshold}:1`);
  }
  assert.ok(contrast(theme.colors['button.foreground'], theme.colors['button.background']) >= 4.5);
  assert.ok(contrast(theme.colors['statusBarItem.remoteForeground'], theme.colors['statusBarItem.remoteBackground']) >= 4.5);
  if (variant.family === 'gray') {
    for (const surface of surfaces) {
      const rgb = p[surface].slice(1).match(/../g).map((c) => parseInt(c, 16));
      assert.ok(Math.max(...rgb) - Math.min(...rgb) <= 8, `${theme.name}: ${surface} must stay neutral gray`);
      if (variant.level === 'contrast') {
        assert.ok(contrast(p.border, p[surface]) >= 3, `${theme.name}: visible boundaries need at least 3:1 contrast`);
      }
    }
  }
  console.log(`${theme.name}: ${Object.keys(theme.colors).length} UI colors, ${theme.tokenColors.length} TextMate rules, ${Object.keys(theme.semanticTokenColors).length} semantic rules; minimum text contrast ${minimum.toFixed(2)}:1`);
}

for (const type of ['dark', 'light']) {
  const levels = ['soft', 'standard', 'contrast'].map((level) => {
    const variant = variants.find((v) => v.family === 'gray' && v.type === type && v.level === level);
    const p = resolvePalette(palettes, variant.key);
    return contrast(p.foreground, p.background);
  });
  assert.ok(levels[0] < levels[1] && levels[1] < levels[2], `Gray ${type}: text contrast must increase from Soft to Standard to Contrast`);
}
