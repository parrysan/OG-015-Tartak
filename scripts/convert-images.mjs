/**
 * HEIC to WebP + AVIF conversion script for Tartak-Budrol website.
 *
 * Reads all .HEIC files from assets/tartak-photos/ and writes:
 *   - {basename}.webp  (quality 85) -> public/images/
 *   - {basename}.avif  (quality 60) -> public/images/
 *
 * Output filenames are lowercased for web consistency.
 *
 * Strategy:
 *   1. Try sharp (fast, native, bundled libheif).
 *   2. If sharp fails for a file (libheif "bad seek" on some iPhone HEIC
 *      variants), fall back to ImageMagick `magick` CLI.
 *
 * Usage:
 *   node scripts/convert-images.mjs
 *
 * Prerequisites (macOS, one-time):
 *   brew install imagemagick    (fallback HEIC decoder)
 */

import sharp from 'sharp';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { readdir, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const execFileAsync = promisify(execFile);

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');

const SOURCE_DIR = join(PROJECT_ROOT, 'assets', 'tartak-photos');
const OUTPUT_DIR = join(PROJECT_ROOT, 'public', 'images');

const WEBP_QUALITY = 85;
const AVIF_QUALITY = 60;

// ---------------------------------------------------------------------------
// Try to convert a single HEIC using sharp (bundled libheif)
// ---------------------------------------------------------------------------
async function convertWithSharp(inputPath, stem) {
  const webpPath = join(OUTPUT_DIR, `${stem}.webp`);
  const avifPath = join(OUTPUT_DIR, `${stem}.avif`);
  const img = sharp(inputPath);
  const [webpInfo, avifInfo] = await Promise.all([
    img.clone().webp({ quality: WEBP_QUALITY }).toFile(webpPath),
    img.clone().avif({ quality: AVIF_QUALITY }).toFile(avifPath),
  ]);
  return { webpKB: (webpInfo.size / 1024).toFixed(1), avifKB: (avifInfo.size / 1024).toFixed(1) };
}

// ---------------------------------------------------------------------------
// Fall back to ImageMagick `magick` CLI
// ---------------------------------------------------------------------------
async function convertWithMagick(inputPath, stem) {
  const webpPath = join(OUTPUT_DIR, `${stem}.webp`);
  const avifPath = join(OUTPUT_DIR, `${stem}.avif`);

  await Promise.all([
    execFileAsync('magick', [
      inputPath,
      '-quality', String(WEBP_QUALITY),
      webpPath,
    ]),
    execFileAsync('magick', [
      inputPath,
      '-quality', String(AVIF_QUALITY),
      avifPath,
    ]),
  ]);

  // Get rough sizes for logging
  const { stat } = await import('node:fs/promises');
  const [ws, as] = await Promise.all([stat(webpPath), stat(avifPath)]);
  return { webpKB: (ws.size / 1024).toFixed(1), avifKB: (as.size / 1024).toFixed(1) };
}

// ---------------------------------------------------------------------------
// Convert a single HEIC file (sharp first, magick fallback)
// ---------------------------------------------------------------------------
async function convertFile(filename) {
  const inputPath = join(SOURCE_DIR, filename);
  const stem = basename(filename, extname(filename)).toLowerCase();

  // Skip if both outputs already exist (incremental builds)
  const webpPath = join(OUTPUT_DIR, `${stem}.webp`);
  const avifPath = join(OUTPUT_DIR, `${stem}.avif`);
  if (existsSync(webpPath) && existsSync(avifPath)) {
    console.log(`  ${filename} -> already converted, skipping`);
    return { filename, ok: true, skipped: true };
  }

  let result;
  let method = 'sharp';

  try {
    result = await convertWithSharp(inputPath, stem);
  } catch {
    method = 'magick';
    result = await convertWithMagick(inputPath, stem);
  }

  console.log(`  ${filename} [${method}] -> ${stem}.webp (${result.webpKB} KB) + ${stem}.avif (${result.avifKB} KB)`);
  return { filename, ok: true, skipped: false };
}

// ---------------------------------------------------------------------------
// Verify magick is available (called once if sharp fails on first file)
// ---------------------------------------------------------------------------
async function checkMagick() {
  try {
    await execFileAsync('magick', ['--version']);
    return true;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log('Converting HEIC source photos to WebP + AVIF...');
  console.log(`  Source:  ${SOURCE_DIR}`);
  console.log(`  Output:  ${OUTPUT_DIR}`);
  console.log('');

  // Ensure output directory exists
  await mkdir(OUTPUT_DIR, { recursive: true });

  // Discover HEIC source files (case-insensitive extension match)
  const allFiles = await readdir(SOURCE_DIR);
  const heicFiles = allFiles.filter((f) => f.toUpperCase().endsWith('.HEIC'));

  if (heicFiles.length === 0) {
    console.error('ERROR: No .HEIC files found in', SOURCE_DIR);
    process.exit(1);
  }

  console.log(`Found ${heicFiles.length} HEIC file(s).\n`);

  // Pre-flight: verify magick is available as fallback
  const magickAvailable = await checkMagick();
  if (!magickAvailable) {
    console.warn('WARNING: ImageMagick `magick` not found — will rely on sharp only.');
    console.warn('  Install with: brew install imagemagick');
    console.warn('');
  }

  // Convert files sequentially to avoid memory spikes
  let successCount = 0;
  let skippedCount = 0;
  const errors = [];

  for (const filename of heicFiles) {
    try {
      const r = await convertFile(filename);
      if (r.skipped) skippedCount++;
      else successCount++;
    } catch (err) {
      errors.push(`${filename}: ${err.message ?? String(err)}`);
    }
  }

  console.log('');
  console.log(
    `Summary: ${successCount} converted, ${skippedCount} skipped, ${errors.length} errors (of ${heicFiles.length} total).`,
  );

  if (errors.length > 0) {
    console.error(`\nErrors (${errors.length}):`);
    for (const err of errors) {
      console.error(' ', err);
    }
    process.exit(1);
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
