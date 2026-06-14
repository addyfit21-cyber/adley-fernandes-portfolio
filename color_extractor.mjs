import { Jimp } from 'jimp';
import jpeg from 'jpeg-js';

jpeg.maxMemoryUsageInMB = 2048;

async function extractColors() {
  try {
    const image = await Jimp.read('Images/LUKES ICED COFFEE.jpg');
    image.resize({ w: 150 });
    const counts = {};
    
    for (let x = 0; x < image.bitmap.width; x++) {
      for (let y = 0; y < image.bitmap.height; y++) {
        const hex = image.getPixelColor(x, y).toString(16).padStart(8, '0').slice(0, 6).toUpperCase();
        
        const r = parseInt(hex.slice(0,2), 16);
        const g = parseInt(hex.slice(2,4), 16);
        const b = parseInt(hex.slice(4,6), 16);
        
        if (r > 240 && g > 240 && b > 240) continue;
        if (r < 20 && g < 20 && b < 20) continue;
        
        counts[hex] = (counts[hex] || 0) + 1;
      }
    }
    
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    console.log("Top colors:");
    for(let i = 0; i < 20; i++) {
      if(sorted[i]) console.log(`#${sorted[i][0]} : ${sorted[i][1]}`);
    }
  } catch (err) {
    console.error(err);
  }
}

extractColors();
