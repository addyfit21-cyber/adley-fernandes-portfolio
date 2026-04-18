const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const limitMb = 1; // target max ~1MB (approx rough proxy by max resolution / quality)
const dirs = ['Images', 'Templates'];

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      // Process if > 1MB
      if (stat.size > 1 * 1024 * 1024) {
        console.log(`Compressing: ${fullPath} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
        const tempPath = fullPath + '.temp' + ext;
        
        try {
          let pipeline = sharp(fullPath).resize({ width: 1920, withoutEnlargement: true });
          
          if (ext === '.png') {
            pipeline = pipeline.png({ quality: 60, compressionLevel: 8, palette: true });
          } else {
            pipeline = pipeline.jpeg({ quality: 60, progressive: true });
          }

          await pipeline.toFile(tempPath);
          
          // Replace original
          fs.unlinkSync(fullPath);
          fs.renameSync(tempPath, fullPath);
          
          const newStat = fs.statSync(fullPath);
          console.log(` -> Done: ${(newStat.size / 1024 / 1024).toFixed(2)} MB`);
        } catch (e) {
          console.error(`Failed to compress ${fullPath}: ${e}`);
          if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        }
      }
    }
  }
}

async function run() {
  for (const dir of dirs) {
    const absoluteDir = path.join(__dirname, dir);
    if (fs.existsSync(absoluteDir)) {
      await processDirectory(absoluteDir);
    }
  }
}

run();
