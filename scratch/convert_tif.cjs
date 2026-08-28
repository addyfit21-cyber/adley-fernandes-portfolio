/**
 * Converts IMG_3600.TIF to Website_Hero.webp using utif (pure-JS TIFF decoder)
 * + sharp for WebP output. Bypasses libvips TIFF reader memory limits.
 */
const fs = require('fs');
const path = require('path');
const UTIF = require('utif');
const sharp = require('sharp');

const INPUT  = path.resolve(__dirname, '../public/Images/IMG_3600.TIF');
const OUTPUT = path.resolve(__dirname, '../public/Images/Website_Hero.webp');

console.log('Reading TIF...');
const buf = fs.readFileSync(INPUT);
console.log(`File size: ${(buf.length / 1024 / 1024).toFixed(1)} MB`);

// Decode the first IFD (image)
const ifds = UTIF.decode(buf);
console.log(`Found ${ifds.length} IFD(s)`);

const ifd = ifds[0];
UTIF.decodeImage(buf, ifd);

const { width, height } = ifd;
console.log(`Decoded: ${width} x ${height}`);

// UTIF gives us raw RGBA Uint8Array
const rgba = UTIF.toRGBA8(ifd);
console.log(`Raw RGBA buffer length: ${rgba.length} bytes`);

// Feed raw RGBA into sharp, resize and encode as WebP
const TARGET_WIDTH = 3000; // max output width for web
console.log(`Converting to WebP (target width: ${TARGET_WIDTH}px)...`);

sharp(Buffer.from(rgba), {
  raw: { width, height, channels: 4 }
})
  .resize(TARGET_WIDTH, null, { withoutEnlargement: true })
  .webp({ quality: 85, effort: 4 })
  .toFile(OUTPUT)
  .then(info => {
    const sizeMB = (info.size / 1024 / 1024).toFixed(2);
    console.log(`\n✅ Done!`);
    console.log(`   Output: ${OUTPUT}`);
    console.log(`   Dimensions: ${info.width} x ${info.height}`);
    console.log(`   File size: ${sizeMB} MB`);
  })
  .catch(err => {
    console.error('Sharp error:', err.message);
    process.exit(1);
  });
