const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '../index.html');
let html = fs.readFileSync(file, 'utf8');

const newHtml = `      <div id="skills-text-container" class="relative w-full h-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24 z-20 pointer-events-none">
        
        <!-- Formation 0 Text (Anchored Left) -->
        <div class="skill-item absolute inset-y-0 left-0 px-6 md:px-16 lg:px-24 flex flex-col justify-center w-full md:w-1/2 opacity-100">
          <h2 class="font-dm text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight mb-4 text-zinc-400 drop-shadow-lg">Okay, but</h2>
          <p class="text-lg md:text-2xl font-manrope font-light text-white tracking-wide">what exactly do I do?</p>
        </div>

        <!-- Formation 1 Text (Anchored Right) -->
        <div class="skill-item absolute inset-y-0 right-0 px-6 md:px-16 lg:px-24 flex flex-col justify-center w-full md:w-1/2 opacity-0 items-end text-right">
          <h2 class="font-dm text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] text-zinc-400 mb-6 drop-shadow-lg">
            I take ideas,<br>
            move a few pixels around,
          </h2>
          <p class="text-base md:text-xl lg:text-2xl font-manrope font-light text-zinc-300 leading-relaxed max-w-lg">
            overthink the typography,<br>
            and somehow turn it into something that works.
          </p>
        </div>

        <!-- Formation 2 Text (Anchored Center) -->
        <div class="skill-item absolute inset-0 flex flex-col items-center justify-center opacity-0 text-center px-4">
          <h2 class="font-dm text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] text-white mb-6 drop-shadow-2xl">
            Brand identities.<br>Websites.<br>Visuals.
          </h2>
          <p class="text-base md:text-xl lg:text-2xl font-manrope font-light text-zinc-400 leading-relaxed">
            Not just things that look good.<br>Things that feel right.
          </p>
        </div>

        <!-- Formation 3 Text (Anchored Top Left) -->
        <div class="skill-item absolute top-[20%] left-0 px-6 md:px-16 lg:px-24 flex flex-col items-start opacity-0 w-full md:w-1/2">
          <h2 class="font-dm text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] text-white mb-6 drop-shadow-lg">
            Go ahead.<br>Explore my work.
          </h2>
          <p class="text-base md:text-xl lg:text-2xl font-manrope font-light text-zinc-400 leading-relaxed">
            There's probably something moving over there →
          </p>
        </div>

      </div>`;

// Find the container in the current HTML
const startIndex = html.indexOf('<div id="skills-text-container"');
const endIndex = html.indexOf('</div>', html.lastIndexOf('There\'s probably something moving over there')) + 12;

if (startIndex !== -1) {
  let endTagStr = '      </div>';
  // Search for the end tag starting from the last known text block
  let textSearchStart = html.indexOf('Explore my work', startIndex);
  if (textSearchStart === -1) textSearchStart = startIndex + 500;
  
  let realEndIndex = html.indexOf(endTagStr, textSearchStart);
  
  if (realEndIndex !== -1) {
    html = html.substring(0, startIndex) + newHtml + html.substring(realEndIndex + endTagStr.length);
    fs.writeFileSync(file, html, 'utf8');
    console.log('Successfully restructured skills-text-container');
  } else {
    console.error('Could not find the end tag accurately.');
  }
} else {
  console.error('Could not find start index.');
}
