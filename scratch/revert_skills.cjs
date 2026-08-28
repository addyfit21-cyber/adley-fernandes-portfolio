const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '../index.html');
let html = fs.readFileSync(file, 'utf8');

const oldHtml = `      <div id="skills-text-container" class="relative w-full h-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24 z-20 pointer-events-none">
        
        <!-- Formation 0 Text (Anchored Left) -->
        <div class="skill-item absolute inset-y-0 left-0 px-6 md:px-16 lg:px-24 flex flex-col justify-center w-full md:w-1/2 opacity-100">
          <h2 class="font-dm text-3xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] mb-6 text-zinc-400">Okay, but</h2>
          <p class="text-base md:text-2xl font-manrope font-normal text-white">what exactly do I do?</p>
        </div>

        <!-- Formation 1 Text (Anchored Right) -->
        <div class="skill-item absolute inset-y-0 right-0 px-6 md:px-16 lg:px-24 flex flex-col justify-center w-full md:w-1/2 opacity-0 items-end text-right">
          <h2 class="font-dm text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] text-zinc-400">
            I take ideas,<br>
            move a few pixels around,
          </h2>
          <p class="text-base md:text-3xl font-manrope font-normal text-white mt-6 md:mt-8">
            overthink the typography,<br>
            and somehow turn it into something that works.
          </p>
        </div>

        <!-- Formation 2 Text (Anchored Center) -->
        <div class="skill-item absolute inset-0 flex flex-col items-center justify-center opacity-0 text-center px-4">
          <h2 class="font-dm text-3xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-[1.1] text-zinc-400">You bring the idea.<br>I bring the visuals.</h2>
          <p class="text-base md:text-3xl font-manrope font-normal text-white mt-6 md:mt-8">Then we make people stop scrolling.</p>
        </div>

        <!-- Formation 3 Text (Anchored Top Left) -->
        <div class="skill-item absolute top-[20%] left-0 px-6 md:px-16 lg:px-24 flex flex-col items-start opacity-0 w-full md:w-1/2">
          <h2 class="font-dm text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] text-zinc-400">Go ahead.<br>Explore my work.</h2>
          <p class="text-base md:text-2xl font-manrope font-normal text-white mt-6 md:mt-8">There's probably something moving over there →</p>
        </div>

      </div>`;

// Find the container in the current HTML
const startIndex = html.indexOf('<div id="skills-text-container"');
const endIndex = html.indexOf('</div>', html.lastIndexOf('There\'s Probably something moving over there')) + 12;

if (startIndex !== -1 && endIndex !== -1) {
  // Try to find the exact end of skills-text-container
  let endTagStr = '      </div>';
  let realEndIndex = html.indexOf(endTagStr, startIndex + 500);
  if (realEndIndex !== -1) {
    html = html.substring(0, startIndex) + oldHtml + html.substring(realEndIndex + endTagStr.length);
    fs.writeFileSync(file, html, 'utf8');
    console.log('Successfully reverted skills-text-container');
  } else {
    console.error('Could not find the end tag accurately.');
  }
} else {
  console.error('Could not find start index.');
}
