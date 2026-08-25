const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function test() {
  // Test carousel wheel thumbs
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

  let origTotal = 0;
  let newTotal = 0;

  for (const img of heroImgs) {
    const srcPath = path.join(heroDir, img);
    const destPath = path.join(thumbDir, img);
    const origStat = fs.statSync(srcPath);
    origTotal += origStat.size;

    // Resize to 560x560 max (2x retina for 280x280 CSS display), cover fit, quality 80
    await sharp(srcPath)
      .resize(560, 560, { fit: 'cover', position: 'center' })
      .webp({ quality: 80, effort: 6 })
      .toFile(destPath);

    const newStat = fs.statSync(destPath);
    newTotal += newStat.size;
    console.log(`${img}: ${(origStat.size/1024).toFixed(1)} KB -> ${(newStat.size/1024).toFixed(1)} KB`);
  }

  console.log(`\nCarousel Thumbs Total: ${(origTotal/(1024*1024)).toFixed(2)} MB -> ${(newTotal/1024).toFixed(1)} KB (${((1 - newTotal/origTotal)*100).toFixed(1)}% reduction)`);
}

test();
