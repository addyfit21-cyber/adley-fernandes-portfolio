const fs = require('fs');
const path = require('path');

async function run() {
  let sharp;
  try {
    sharp = require('sharp');
  } catch (e) {
    console.error('Sharp is not installed. Please run "npm install sharp" first.');
    process.exit(1);
  }

  const dir = path.join(__dirname, '..', 'dist', 'Images', 'Branding', 'TVB BRAND BOOK');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));

  console.log(`Found ${files.length} images to compress.`);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const tempPath = path.join(dir, 'temp_' + file);
    
    console.log(`Compressing ${file}...`);
    try {
      await sharp(filePath)
        .resize({ width: 1920, withoutEnlargement: true }) // max width 1920
        .jpeg({ quality: 75, progressive: true }) // compress jpeg
        .toFile(tempPath);
      
      // replace original
      fs.renameSync(tempPath, filePath);
    } catch (err) {
      console.error(`Failed to compress ${file}:`, err.message);
    }
  }
  
  console.log('Compression complete!');
}

run();
