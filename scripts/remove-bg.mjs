import fs from 'fs';
import path from 'path';
import { Jimp } from 'jimp';

const inputPath = path.resolve('public/assets/hero-worker-source.png');
const outputPath = path.resolve('public/assets/hero-worker.png');

const image = await Jimp.read(inputPath);
const cropLeft = Math.floor(image.bitmap.width * 0.2);
const cropWidth = image.bitmap.width - cropLeft;
image.crop({ x: cropLeft, y: 0, w: cropWidth, h: image.bitmap.height });

const { width, height, data } = image.bitmap;

function sampleCorner(x0, y0, size) {
  let r = 0, g = 0, b = 0, n = 0;
  for (let y = y0; y < y0 + size && y < height; y++) {
    for (let x = x0; x < x0 + size && x < width; x++) {
      const i = (y * width + x) * 4;
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      n++;
    }
  }
  return { r: r / n, g: g / n, b: b / n };
}

const size = Math.min(40, Math.floor(width * 0.08), Math.floor(height * 0.08));
const samples = [
  sampleCorner(0, 0, size),
  sampleCorner(width - size, 0, size),
  sampleCorner(0, height - size, size),
  sampleCorner(width - size, height - size, size),
];

const bg = {
  r: samples.reduce((s, c) => s + c.r, 0) / samples.length,
  g: samples.reduce((s, c) => s + c.g, 0) / samples.length,
  b: samples.reduce((s, c) => s + c.b, 0) / samples.length,
};

console.log(`Background color ~ rgb(${bg.r | 0}, ${bg.g | 0}, ${bg.b | 0})`);

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * 4;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const dist = Math.sqrt((r - bg.r) ** 2 + (g - bg.g) ** 2 + (b - bg.b) ** 2);
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;

    let alpha = 255;
    if (dist < 35 && lum < 70) {
      alpha = 0;
    } else if (dist < 75 || lum < 55) {
      const t = Math.min(1, Math.max(0, (dist - 35) / 45));
      const t2 = Math.min(1, Math.max(0, (lum - 40) / 50));
      alpha = Math.round(255 * Math.max(t, t2 * 0.85));
    }

    data[i + 3] = alpha;
  }
}

// Trim transparent padding
let minX = width, minY = height, maxX = 0, maxY = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (data[(y * width + x) * 4 + 3] > 20) {
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }
}

const pad = 8;
minX = Math.max(0, minX - pad);
minY = Math.max(0, minY - pad);
maxX = Math.min(width - 1, maxX + pad);
maxY = Math.min(height - 1, maxY + pad);

image.crop({ x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 });
await image.write(outputPath);

console.log(`Saved: ${outputPath} (${(fs.statSync(outputPath).size / 1024).toFixed(0)} KB)`);
