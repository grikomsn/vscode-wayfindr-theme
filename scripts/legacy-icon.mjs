import { readFile, writeFile } from 'node:fs/promises';
import { Resvg } from '@resvg/resvg-js';

const svg = await readFile(new URL('../images/icon.svg', import.meta.url));
const icon = new Resvg(svg, { fitTo: { mode: 'width', value: 256 } });
await writeFile(new URL('../images/icon.png', import.meta.url), icon.render().asPng());
console.log('Built legacy icon; the generated marketplace artwork is preserved');
