import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target directory
const targetDir = path.join(__dirname, 'public', 'Images');

// Recursive function to get all images
function getFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files);
    } else {
      if (name.toLowerCase().endsWith('.png') || name.toLowerCase().endsWith('.jpg') || name.toLowerCase().endsWith('.jpeg')) {
        files.push(name);
      }
    }
  }
  return files;
}

async function processImages() {
  const files = getFiles(targetDir);
  console.log(`Found ${files.length} images to compress.`);

  let totalOriginalSize = 0;
  let totalNewSize = 0;

  for (const file of files) {
    const originalSize = fs.statSync(file).size;
    totalOriginalSize += originalSize;

    const parsedPath = path.parse(file);
    const newPath = path.join(parsedPath.dir, `${parsedPath.name}.webp`);

    try {
      console.log(`Processing: ${parsedPath.name}${parsedPath.ext} -> .webp`);
      
      await sharp(file)
        .resize({ width: 1920, withoutEnlargement: true }) // Cap width at 1920px
        .webp({ quality: 80, effort: 6 }) // High compression effort
        .toFile(newPath);

      const newSize = fs.statSync(newPath).size;
      totalNewSize += newSize;
      
      // Delete original file
      fs.unlinkSync(file);
      
      console.log(`  - Original: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`  - New: ${(newSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`  - Savings: ${((originalSize - newSize) / originalSize * 100).toFixed(1)}%`);

    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }

  console.log('\n--- Compression Summary ---');
  console.log(`Total Original Size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total New Size: ${(totalNewSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total Savings: ${((totalOriginalSize - totalNewSize) / totalOriginalSize * 100).toFixed(1)}%`);
}

processImages();
