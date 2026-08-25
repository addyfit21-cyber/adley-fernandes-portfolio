const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function runOptimizations() {
  console.log('--- 1. Generating Carousel / Wheel Thumbnails ---');
  const heroDir = './public/Images/Hero page animation';
  const thumbDir = './public/Images/Hero page animation/thumbs';
  if (!fs.existsSync(thumbDir)) fs.mkdirSync(thumbDir, { recursive: true });

  const heroImgs = [
    'TVB BRand BOOK-13.webp',
    'TVB BRand BOOK-14.webp',
    'TVB BRand BOOK-15.webp',
    'TVB BRand BOOK-17.webp',
    'TVB BRand BOOK-19.webp',
    'TVB BRand BOOK-20.webp',
    'TVB CAP Mockup-01.webp',
    'TVB Guitar picks-01.webp',
    'TVB Stickers Mockup-01.webp',
    'TVB Tshirt Mockup-01.webp',
    'Benner backaging mockup-01.webp',
    'Benner logo mockup-01.webp',
    'Benner packaging 2-01.webp',
    'Lukes iced coffee banner mockup-01.webp',
    'Lukes iced coffee logo mockup-01.webp',
  ];

  for (const img of heroImgs) {
    const srcPath = path.join(heroDir, img);
    const destPath = path.join(thumbDir, img);
    const buf = fs.readFileSync(srcPath);
    await sharp(buf)
      .resize(560, 560, { fit: 'cover', position: 'center' })
      .webp({ quality: 80, effort: 6 })
      .toFile(destPath);
    console.log(`Generated thumb: ${img} (${(fs.statSync(destPath).size/1024).toFixed(1)} KB)`);
  }

  console.log('\n--- 2. Converting & Optimizing Brand Logos to WebP ---');
  const brandLogos = [
    { src: './public/Images/Brands/teas cds.png', dest: './public/Images/Brands/teas cds.webp', maxWidth: 800 },
    { src: './public/Images/Brands/TVB Primary Logo white.png', dest: './public/Images/Brands/TVB Primary Logo white.webp', maxWidth: 800 },
    { src: './public/Images/Brands/GTE Logo white.png', dest: './public/Images/Brands/GTE Logo white.webp', maxWidth: 800 },
    { src: './public/Images/Brands/Adesign studio/Adesign logo colour-01.png', dest: './public/Images/Brands/Adesign studio/Adesign logo colour-01.webp', maxWidth: 800 },
    { src: './public/Images/Brands/Adesign studio/uploaded_logo.png', dest: './public/Images/Brands/Adesign studio/uploaded_logo.webp', maxWidth: 800 },
  ];

  for (const item of brandLogos) {
    if (fs.existsSync(item.src)) {
      const buf = fs.readFileSync(item.src);
      await sharp(buf)
        .resize({ width: item.maxWidth, withoutEnlargement: true })
        .webp({ quality: 90, effort: 6, alphaQuality: 90 })
        .toFile(item.dest);
      const origSize = fs.statSync(item.src).size;
      const newSize = fs.statSync(item.dest).size;
      console.log(`Optimized logo: ${item.src} -> ${(origSize/1024).toFixed(1)} KB to ${(newSize/1024).toFixed(1)} KB`);
    }
  }

  console.log('\n--- 3. Optimizing Heavy Category & Portfolio Images ---');
  const heavyImages = [
    { src: './public/Images/Brands/venom_berries/Album_art_final.webp', maxDim: 1400, quality: 80 },
    { src: './public/Images/Brands/venom_berries/TVB_Post-01.webp', maxDim: 1400, quality: 80 },
    { src: './public/Images/footer1.png', dest: './public/Images/footer1.webp', maxDim: 1600, quality: 80 },
    { src: './public/Images/Footer 2.png', dest: './public/Images/Footer 2.webp', maxDim: 1600, quality: 80 },
    { src: './public/Images/contact_workspace.png', dest: './public/Images/contact_workspace.webp', maxDim: 1200, quality: 80 },
  ];

  for (const item of heavyImages) {
    if (fs.existsSync(item.src)) {
      const origSize = fs.statSync(item.src).size;
      const buf = fs.readFileSync(item.src);
      const dest = item.dest || item.src;
      const outputBuffer = await sharp(buf)
        .resize({ width: item.maxDim, height: item.maxDim, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: item.quality, effort: 6 })
        .toBuffer();
      fs.writeFileSync(dest, outputBuffer);
      const newSize = fs.statSync(dest).size;
      console.log(`Optimized: ${item.src} (${(origSize/1024).toFixed(1)} KB -> ${(newSize/1024).toFixed(1)} KB)`);
    }
  }

  console.log('\n--- 4. Optimizing ART Work Sketches ---');
  const artDir = './public/Images/ART work';
  const artFiles = ['IMG_0213 (2).webp', 'IMG_0498.webp', 'IMG_1390.webp', 'IMG_9606 (2).webp'];
  for (const file of artFiles) {
    const p = path.join(artDir, file);
    if (fs.existsSync(p)) {
      const origSize = fs.statSync(p).size;
      const buf = fs.readFileSync(p);
      const outputBuffer = await sharp(buf)
        .resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80, effort: 6 })
        .toBuffer();
      fs.writeFileSync(p, outputBuffer);
      const newSize = fs.statSync(p).size;
      console.log(`Optimized sketch: ${file} (${(origSize/1024).toFixed(1)} KB -> ${(newSize/1024).toFixed(1)} KB)`);
    }
  }

  console.log('\nALL ASSETS OPTIMIZATION COMPLETE!');
}

runOptimizations().catch(console.error);
