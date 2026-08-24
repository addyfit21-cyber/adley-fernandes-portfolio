const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Replace backdrop-blur with md:backdrop-blur (only if it doesn't already have a breakpoint)
html = html.replace(/(?<!(md:|sm:|lg:|xl:|2xl:))backdrop-blur(-[a-z]+)?/g, 'md:backdrop-blur$2');

// Find the mobile dropdown menu and add max-md:bg-white to ensure it's fully opaque on mobile
html = html.replace(/id="mobile-dropdown-menu"\s+class="([^"]*?bg-white\/95[^"]*?)"/, (match, classString) => {
    if (!classString.includes('max-md:bg-white')) {
        return match.replace('bg-white/95', 'bg-white/95 max-md:bg-white');
    }
    return match;
});

fs.writeFileSync('index.html', html);
console.log('Mobile GPU optimizations applied to classes.');
