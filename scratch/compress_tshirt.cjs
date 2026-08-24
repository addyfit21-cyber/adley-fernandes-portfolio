const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '..', 'Images', 'Hero page animation', 'TVB Tshirt Mockup-01.jpg');
const outputPath = path.join(__dirname, '..', 'Images', 'Hero page animation', 'TVB Tshirt Mockup-01.webp');

async function compress() {
  const sizeBefore = fs.statSync(inputPath).size;

  await sharp(inputPath)
    .resize({ width: 2400, withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toFile(outputPath);

  const sizeAfter = fs.statSync(outputPath).size;
  const ratio = ((1 - sizeAfter / sizeBefore) * 100).toFixed(1);

  const mb = n => (n / 1024 / 1024).toFixed(2) + ' MB';
  console.log(`Compressed! ${mb(sizeBefore)} -> ${mb(sizeAfter)} (-${ratio}%)`);
}

compress().catch(console.error);
