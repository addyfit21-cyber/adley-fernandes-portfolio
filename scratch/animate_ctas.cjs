const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Add active:scale-95 hover:scale-105 to CTA buttons
// Find buttons or links that have 'bg-black' and 'text-white' but don't already have 'active:scale-95'
html = html.replace(/(<(?:a|button)[^>]+class="[^"]*bg-black[^"]*text-white[^"]*)(")/g, (match, p1, p2) => {
    let newClass = p1;
    if (!newClass.includes('active:scale-95')) {
        newClass += ' active:scale-95';
    }
    if (!newClass.includes('hover:scale-105') && !newClass.includes('hover:scale-[1.02]')) {
        newClass += ' hover:scale-[1.02]';
    }
    // Make sure it has transition-all or transition-transform if it only has transition-colors
    if (newClass.includes('transition-colors') && !newClass.includes('transition-all')) {
        newClass = newClass.replace('transition-colors', 'transition-all');
    }
    return newClass + p2;
});

// 2. Enhance the scroll to explore indicator
// Instead of animate-bounce which bounces the whole thing, let's keep the text still and animate the SVG arrow only.
// Find the Scroll Indicator container
html = html.replace(/class="([^"]*?)animate-bounce([^"]*?)"/, 'class="$1$2"');
// Add a custom animation to the SVG
html = html.replace(/(<svg class="[^"]*?w-4 h-4 md:w-5 md:h-5 text-zinc-400)([^"]*?")/g, '$1 animate-bounce$2');


fs.writeFileSync('index.html', html);
console.log('Added animations to CTA buttons and Scroll Indicator.');
