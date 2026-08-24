const fs = require('fs');

const template = fs.readFileSync('tvb-brandbook.html', 'utf8');

// The block to replace
const regex = /<div class="w-full space-y-2 md:space-y-4">[\s\S]*?<\/div>\s*<\/div>/;

// POSTERS
let posters = template.replace(/<title>.*?<\/title>/, '<title>Adley Fernandes | Posters</title>');
posters = posters.replace(/TVB Brand Identity/g, 'Poster Designs');
posters = posters.replace(/A deep dive into the visual identity created for The Venom Berries./g, 'A collection of custom poster designs for various artists and events.');
posters = posters.replace(/Branding/g, 'Posters');
posters = posters.replace(/Logo Design, Merchandise, Guidelines/g, 'Typography, Layout, Visual Design');
const posterImages = `
    <!-- Images Section -->
    <div class="w-full space-y-2 md:space-y-4">
      <div class="w-full overflow-hidden">
        <img src="/Images/Brands/venom_berries/TVB_Post-01.webp" class="w-full h-auto block" alt="Poster 1" loading="lazy" decoding="async">
      </div>
      <div class="w-full overflow-hidden">
        <img src="/Images/Brands/venom_berries/WhatsApp_Image_2026-06-08_at_5.47.11_PM.webp" class="w-full h-auto block" alt="Poster 2" loading="lazy" decoding="async">
      </div>
    </div>
`;
posters = posters.replace(regex, posterImages);

// ALBUM ARTWORKS
let album = template.replace(/<title>.*?<\/title>/, '<title>Adley Fernandes | Album Artworks</title>');
album = album.replace(/TVB Brand Identity/g, 'Album Artworks');
album = album.replace(/A deep dive into the visual identity created for The Venom Berries./g, 'A collection of custom album artworks and covers.');
album = album.replace(/Branding/g, 'Album Art');
album = album.replace(/Logo Design, Merchandise, Guidelines/g, 'Cover Art, Concept Design');
const albumImages = `
    <!-- Images Section -->
    <div class="w-full space-y-2 md:space-y-4">
      <div class="w-full overflow-hidden">
        <img src="/Images/Brands/venom_berries/Album_art_final.webp" class="w-full h-auto block" alt="Album Art" loading="lazy" decoding="async">
      </div>
    </div>
`;
album = album.replace(regex, albumImages);

fs.writeFileSync('posters.html', posters);
fs.writeFileSync('album-artworks.html', album);
console.log('Successfully generated posters.html and album-artworks.html');
