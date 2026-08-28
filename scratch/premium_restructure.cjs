const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '../index.html');
let html = fs.readFileSync(file, 'utf8');

const newHtml = `            <div id="skills-text-container" class="relative w-full h-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24 z-20 pointer-events-none">
        
        <!-- Formation 0 Text (Anchored Left) -->
        <div class="skill-item absolute inset-y-0 left-0 px-6 md:px-16 lg:px-24 flex flex-col justify-center w-full md:w-1/2 opacity-100">
          <h2 class="font-dm text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight mb-4 text-zinc-300 drop-shadow-md">Okay, but</h2>
          <p class="text-lg md:text-xl font-manrope font-light text-white/90 tracking-wide">what exactly do I do?</p>
        </div>

        <!-- Formation 1 Text (Anchored Right) -->
        <div class="skill-item absolute inset-y-0 right-0 px-6 md:px-16 lg:px-24 flex flex-col justify-center w-full md:w-1/2 opacity-0 items-end text-right">
          <h2 class="font-dm text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-[1.1] text-zinc-300 mb-6 drop-shadow-md">
            I take ideas,<br>
            move a few pixels around,
          </h2>
          <p class="text-base md:text-lg lg:text-xl font-manrope font-light text-zinc-400 leading-relaxed max-w-lg ml-auto">
            overthink the typography,<br>
            and somehow turn it into something that works.
          </p>
        </div>

        <!-- Formation 2 Text (Anchored Center) -->
        <div class="skill-item absolute inset-0 flex flex-col items-center justify-center opacity-0 text-center px-4">
          <h2 class="font-dm text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] text-white mb-6 drop-shadow-xl">
            Brand identities.<br>Websites.<br>Visuals.
          </h2>
          <p class="text-base md:text-lg lg:text-xl font-manrope font-light text-zinc-400 leading-relaxed">
            Not just things that look good.<br>Things that feel right.
          </p>
        </div>

        <!-- Formation 3 Text (Anchored Top Left) -->
        <div class="skill-item absolute top-[20%] left-0 px-6 md:px-16 lg:px-24 flex flex-col items-start opacity-0 w-full md:w-1/2">
          <h2 class="font-dm text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-[1.1] text-white mb-6 drop-shadow-md">
            Go ahead.<br>Explore my work.
          </h2>
          <p class="text-base md:text-lg lg:text-xl font-manrope font-light text-zinc-400 leading-relaxed">
            There's probably something moving over there →
          </p>
        </div>

      </div>`;

// regex to replace between `<div id="skills-text-container"` and `</div>` (the first one that closes the container).
// Since HTML can have newlines, we'll use string splitting.
const parts = html.split('<div id="skills-text-container"');
if (parts.length > 1) {
  const afterStart = parts[1];
  const endIdx = afterStart.indexOf('There\'s probably something moving over there →</p>\n        </div>\n\n      </div>');
  if (endIdx !== -1) {
    const finalHtml = parts[0] + newHtml + afterStart.substring(endIdx + 81); // 81 is approx length of the end block
    fs.writeFileSync(file, finalHtml, 'utf8');
    console.log('Success regex replace.');
  } else {
    console.log('endIdx not found');
  }
}
