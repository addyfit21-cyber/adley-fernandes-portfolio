const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const rootDir = 'C:\\Users\\addyf\\Downloads\\adley-fernandes-portfolio-master (1)\\adley-fernandes-portfolio-main';
const tvbDir = path.join(rootDir, 'public/Images/Branding/TVB BRAND BOOK');
const files = fs.readdirSync(tvbDir).filter(f => f.endsWith('.jpg'));

async function compressAll() {
  for (const file of files) {
    const inputPath = path.join(tvbDir, file);
    const outputPath = path.join(tvbDir, file.replace('.jpg', '.webp'));
    console.log(`Compressing ${file}...`);
    try {
      await sharp(inputPath)
        .webp({ quality: 80, effort: 4 })
        .resize({ width: 1920, withoutEnlargement: true })
        .toFile(outputPath);
      console.log(`Success: ${outputPath}`);
      // Delete original huge jpg
      fs.unlinkSync(inputPath);
    } catch (err) {
      console.error(`Error compressing ${file}:`, err);
    }
  }
}

compressAll();
