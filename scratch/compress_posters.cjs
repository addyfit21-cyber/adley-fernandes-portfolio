const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'Images', 'posters page');

async function processImages() {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png'));
  
  for (const file of files) {
    const inputPath = path.join(dir, file);
    const outputPath = path.join(dir, file.replace(/\.[^/.]+$/, "") + ".webp");
    
    console.log(`Processing ${file}...`);
    try {
      await sharp(inputPath)
        .resize({ width: 1920, withoutEnlargement: true }) // limit width to 1920 for web
        .webp({ quality: 80 }) // compress with WebP
        .toFile(outputPath);
        
      console.log(`Saved compressed image to ${outputPath}`);
      // delete original to save space
      fs.unlinkSync(inputPath);
      console.log(`Deleted original file ${file}`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
}

processImages();
