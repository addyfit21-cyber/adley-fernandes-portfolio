const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

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

async function check() {
  let total = 0;
  for (const img of heroImgs) {
    const p = path.join('./public/Images/Hero page animation', img);
    const stat = fs.statSync(p);
    const meta = await sharp(p).metadata();
    total += stat.size;
    console.log(`${img}: ${meta.width}x${meta.height}, ${(stat.size/1024).toFixed(1)} KB`);
  }
  console.log(`TOTAL HERO ANIMATION IMAGES: ${(total/(1024*1024)).toFixed(2)} MB`);
}

check();
