/**
 * Generates web-sized AVIF/WebP derivatives from the client's original photographs.
 *
 * The originals in public/images are 4.5-7.6 MB each at 6000x4000 and must never be
 * served. This writes responsive derivatives to public/images/opt/ which are the only
 * image files the site references (and the only ones .vercelignore lets through).
 *
 * Run: npm run images
 */

import { mkdir, readdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const sourceDir = fileURLToPath(new URL("../public/images", import.meta.url));
const outDir = path.join(sourceDir, "opt");

const WIDTHS = [640, 1024, 1600, 2000];
const QUALITY = { avif: 52, webp: 72 };

async function main() {
  await mkdir(outDir, { recursive: true });

  const files = (await readdir(sourceDir))
    .filter((name) => /\.jpe?g$/i.test(name))
    .sort();

  if (files.length === 0) {
    console.log("No source photographs found in public/images.");
    return;
  }

  let total = 0;

  for (const file of files) {
    const slug = path.parse(file).name.toLowerCase();
    const input = path.join(sourceDir, file);

    for (const width of WIDTHS) {
      // .rotate() with no argument applies the EXIF orientation flag. Without it,
      // camera-rotated shots (0Q8A4992) are written on their side.
      const pipeline = sharp(input).rotate().resize({ width, withoutEnlargement: true });

      for (const format of ["avif", "webp"]) {
        const target = path.join(outDir, `${slug}-${width}.${format}`);
        const { size } = await pipeline
          .clone()
          [format]({ quality: QUALITY[format] })
          .toFile(target);
        total += size;
        console.log(`${path.basename(target)}  ${(size / 1024).toFixed(0)} KB`);
      }
    }

    // Inline placeholder so hero frames do not flash white before the AVIF lands.
    const lqip = await sharp(input).rotate().resize({ width: 24 }).blur(1.6).webp({ quality: 40 }).toBuffer();
    await writeFile(
      path.join(outDir, `${slug}-lqip.txt`),
      `data:image/webp;base64,${lqip.toString("base64")}`,
    );
  }

  console.log(`\n${files.length} photographs -> ${(total / 1024 / 1024).toFixed(1)} MB of derivatives.`);
}

await main();
