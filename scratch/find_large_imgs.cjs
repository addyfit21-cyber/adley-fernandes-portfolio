const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(full));
    } else if (/\.(webp|png|jpg|jpeg)$/i.test(file)) {
      results.push({ path: full, size: stat.size });
    }
  });
  return results;
}

async function run() {
  const files = getFiles('./public/Images').filter(f => f.size > 150 * 1024);
  console.log(`Found ${files.length} images > 150 KB:`);
  for (const f of files) {
    try {
      const meta = await sharp(f.path).metadata();
      console.log(`${(f.size/1024).toFixed(1)} KB | ${meta.width}x${meta.height} (${meta.format}) | ${f.path}`);
    } catch(e) {
      console.log(`${(f.size/1024).toFixed(1)} KB | [ERROR] | ${f.path}`);
    }
  }
}

run();
