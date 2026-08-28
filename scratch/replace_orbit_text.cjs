const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '../index.html');
let html = fs.readFileSync(file, 'utf8');

// Replacement 0
html = html.replace(
  '<h2 class="font-dm text-3xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] mb-6 text-zinc-400">Okay, but</h2>',
  '<h2 class="font-dm text-2xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] mb-6 text-zinc-400">Okay, but</h2>'
);
html = html.replace(
  '<p class="text-base md:text-2xl font-manrope font-normal text-white">what exactly do I do?</p>',
  '<p class="text-sm md:text-xl font-manrope font-normal text-white">what exactly do I do?</p>'
);

// Replacement 1
html = html.replace(
  '<h2 class="font-dm text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] text-zinc-400">\n            I take ideas,<br>\n            move a few pixels around,\n          </h2>',
  '<h2 class="font-dm text-2xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-[1.1] text-zinc-400">\n            I take ideas,<br>\n            move a few pixels around,\n          </h2>'
);
html = html.replace(
  '<p class="text-base md:text-3xl font-manrope font-normal text-white mt-6 md:mt-8">\n            overthink the typography,<br>\n            and somehow turn it into something that works.\n          </p>',
  '<p class="text-sm md:text-2xl font-manrope font-normal text-white mt-6 md:mt-8">\n            overthink the typography,<br>\n            and somehow turn it into something that works.\n          </p>'
);

// Replacement 2
html = html.replace(
  '<h2 class="font-dm text-3xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-[1.1] text-zinc-400">\n            Brand identities. Websites. Visuals.\n          </h2>',
  '<h2 class="font-dm text-2xl md:text-4xl lg:text-6xl font-bold tracking-tighter leading-[1.1] text-zinc-400">\n            Brand identities. Websites. Visuals.\n          </h2>'
);
html = html.replace(
  '<p class="text-base md:text-3xl font-manrope font-normal text-white mt-6 md:mt-8">\n            Not just things that look good.<br>Things that feel right.\n          </p>',
  '<p class="text-sm md:text-2xl font-manrope font-normal text-white mt-6 md:mt-8">\n            Not just things that look good.<br>Things that feel right.\n          </p>'
);

// Replacement 3
html = html.replace(
  '<h2 class="font-dm text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] text-zinc-400">\n            Go ahead.<br>Explore my work.\n          </h2>',
  '<h2 class="font-dm text-2xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-[1.1] text-zinc-400">\n            Go ahead.<br>Explore my work.\n          </h2>'
);
html = html.replace(
  '<p class="text-base md:text-2xl font-manrope font-normal text-white mt-6 md:mt-8">\n            There\'s Probably something moving over there →\n          </p>',
  '<p class="text-sm md:text-xl font-manrope font-normal text-white mt-6 md:mt-8">\n            There\'s Probably something moving over there →\n          </p>'
);

fs.writeFileSync(file, html, 'utf8');
console.log('Done replacement.');
