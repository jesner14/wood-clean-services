/**
 * Prépare les logos depuis la charte PDF / fichiers source.
 */
import sharp from 'sharp';
import { existsSync } from 'node:fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const brandDir = join(root, 'public', 'assets', 'brand-pdf');
const outDir = join(root, 'public', 'assets');

/** Flood-fill depuis les bords : supprime uniquement le fond (pas le cercle blanc interne) */
function floodClearBackground(pixels, width, height) {
  const visited = new Uint8Array(width * height);
  const queue = [];

  const isBg = (idx) => {
    const r = pixels[idx];
    const g = pixels[idx + 1];
    const b = pixels[idx + 2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    return lum > 210 || (r > 200 && g > 200 && b > 200);
  };

  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const i = (y * width + x) * 4;
    if (visited[y * width + x]) return;
    if (!isBg(i)) return;
    visited[y * width + x] = 1;
    queue.push([x, y]);
  };

  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }

  while (queue.length) {
    const [x, y] = queue.pop();
    const i = (y * width + x) * 4;
    pixels[i + 3] = 0;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }

  // Supprime le halo blanc / gris clair autour du logo
  for (let pass = 0; pass < 2; pass++) {
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const a = pixels[i + 3];
      if (a === 0) continue;
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      const sat = Math.max(r, g, b) - Math.min(r, g, b);
      if (lum > 242 || (lum > 215 && sat < 35)) pixels[i + 3] = 0;
      else if (lum > 200 && sat < 45) pixels[i + 3] = Math.round(a * 0.08);
    }
  }
}

async function toTransparentLogo(input, output, maxHeight = 200) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .resize({ height: maxHeight, fit: 'inside' })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = Buffer.from(data);
  floodClearBackground(pixels, info.width, info.height);

  await sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ threshold: 1 })
    .png({ compressionLevel: 9 })
    .toFile(output);
}

async function iconOnly(input, output, size = 120) {
  await sharp(input)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(output);
}

// PDF p.1 — logo couleur | PDF p.9 — logo monochrome #EB8E8C (charte)
const fullColor = join(brandDir, 'Logo Wood Clean-1.png');
const accentCoral = join(brandDir, 'Logo Wood Clean-9.png');
const markOnly = join(brandDir, 'Logo Wood Clean-2.png');

if (!existsSync(fullColor) || !existsSync(accentCoral)) {
  console.error('Pages PDF manquantes. Lancez : npx pdf-to-img "Logo Wood Clean.pdf"');
  process.exit(1);
}

await toTransparentLogo(fullColor, join(outDir, 'logo.png'), 200);
await toTransparentLogo(accentCoral, join(outDir, 'logo-accent.png'), 200);
await iconOnly(markOnly, join(outDir, 'logo-mark.png'), 128);

console.log('Logos générés : logo.png, logo-accent.png, logo-mark.png');
