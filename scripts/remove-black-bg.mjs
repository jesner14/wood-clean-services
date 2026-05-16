import fs from 'fs';
import path from 'path';
import { Jimp } from 'jimp';

const inputPath = path.resolve(process.argv[2] || 'public/assets/hero-worker-source.png');
const outputPath = path.resolve('public/assets/hero-worker.png');

const image = await Jimp.read(inputPath);
const { width: w, height: h, data } = image.bitmap;

// Uniquement le fond noir CONNECTÉ aux bords — ne touche pas cheveux/barbe/vêtements
function isBackgroundPixel(i) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const maxC = Math.max(r, g, b);
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  // Noir pur uniquement (pas les ombres du visage ni le violet foncé)
  return maxC < 18 && lum < 20;
}

const visited = new Uint8Array(w * h);
const stack = [];

const push = (x, y) => {
  if (x < 0 || x >= w || y < 0 || y >= h) return;
  const id = y * w + x;
  if (visited[id]) return;
  const i = id * 4;
  if (!isBackgroundPixel(i)) return;
  visited[id] = 1;
  stack.push(id);
};

// Départ depuis tous les bords
for (let x = 0; x < w; x++) {
  push(x, 0);
  push(x, h - 1);
}
for (let y = 0; y < h; y++) {
  push(0, y);
  push(w - 1, y);
}

while (stack.length) {
  const id = stack.pop();
  const i = id * 4;
  data[i + 3] = 0;
  const x = id % w;
  const y = (id / w) | 0;
  push(x + 1, y);
  push(x - 1, y);
  push(x, y + 1);
  push(x, y - 1);
}

// Légère adoucissement des bords du masque (1px)
for (let y = 1; y < h - 1; y++) {
  for (let x = 1; x < w - 1; x++) {
    const i = (y * w + x) * 4;
    if (data[i + 3] > 0) continue;
    let opaqueNeighbors = 0;
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const ni = ((y + dy) * w + (x + dx)) * 4;
      if (data[ni + 3] > 200) opaqueNeighbors++;
    }
    if (opaqueNeighbors >= 2 && isBackgroundPixel(i)) {
      data[i + 3] = 0;
    } else if (opaqueNeighbors >= 1) {
      const r = data[i],
        g = data[i + 1],
        b = data[i + 2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      if (lum < 35) data[i + 3] = Math.round(255 * (lum / 35));
    }
  }
}

let transparentPx = 0;
for (let i = 3; i < data.length; i += 4) {
  if (data[i] < 128) transparentPx++;
}

// Rogner
let minX = w,
  minY = h,
  maxX = 0,
  maxY = 0;
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    if (data[(y * w + x) * 4 + 3] > 20) {
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }
}

const pad = 6;
image.crop({
  x: Math.max(0, minX - pad),
  y: Math.max(0, minY - pad),
  w: Math.min(w, maxX - minX + 1 + pad * 2),
  h: Math.min(h, maxY - minY + 1 + pad * 2),
});

await image.write(outputPath);
console.log(`Transparent: ${((transparentPx / (w * h)) * 100).toFixed(1)}%`);
console.log(`Saved: ${outputPath}`);
