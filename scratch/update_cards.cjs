const fs = require('fs');
const cheerio = require('cheerio');

const files = [
  'index.html',
  'benner-case-study.html',
  'lukes-case-study.html',
  'tvb-brandbook.html'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf-8');
  const $ = cheerio.load(html, { decodeEntities: false });

  let modified = false;

  $('a.group.cursor-pointer').each((i, el) => {
    const $a = $(el);
    const $textContainer = $a.find('div.absolute.bottom-6');

    if ($textContainer.length === 0) return; // Not a card

    modified = true;

    // 1. Move styles and specific classes from <a> to new image container
    const aClasses = $a.attr('class') || '';
    const aStyle = $a.attr('style') || '';
    
    let imgContainerClasses = 'relative overflow-hidden bg-zinc-900 rounded-2xl w-full';
    let newAClasses = aClasses
      .replace('relative', '')
      .replace('overflow-hidden', '')
      .replace('bg-zinc-900', '')
      .replace('rounded-2xl', '')
      .replace('aspect-[4/3]', '');
    
    if (aClasses.includes('aspect-[4/3]')) {
      imgContainerClasses += ' aspect-[4/3]';
    }
    
    newAClasses += ' flex flex-col gap-4 md:gap-5';
    // Clean up multiple spaces
    newAClasses = newAClasses.replace(/\s+/g, ' ').trim();
    
    $a.attr('class', newAClasses);
    $a.removeAttr('style');

    // 2. Remove gradient overlay
    $a.find('div.bg-gradient-to-t').remove();

    // 3. Extract text container
    $textContainer.remove();

    // 4. Wrap remaining children in the image container
    const children = $a.contents().toArray(); // get raw nodes
    $a.empty();
    
    const $imgContainer = $('<div></div>')
      .attr('class', imgContainerClasses)
      .attr('style', aStyle);
    
    children.forEach(child => $imgContainer.append(child));
    $a.append($imgContainer);

    // 5. Update text container
    $textContainer.attr('class', 'flex flex-col items-start text-left px-1');

    // Update <p>
    const $p = $textContainer.find('p');
    if ($p.length) {
      let pClass = $p.attr('class') || '';
      pClass = pClass.replace(/text-\[[^\]]+\]\/80/, '')
                     .replace(/text-zinc-\d+/, '')
                     .replace(/text-white\/\d+/, '');
      $p.attr('class', (pClass + ' text-[#630000]/80').replace(/\s+/g, ' ').trim());
    }

    // Update <h3>
    const $h3 = $textContainer.find('h3');
    if ($h3.length) {
      let h3Class = $h3.attr('class') || '';
      h3Class = h3Class.replace(/text-\[[^\]]+\]/, '')
                       .replace(/text-white/, '');
      $h3.attr('class', (h3Class + ' text-[#630000]').replace(/\s+/g, ' ').trim());
    }

    // Update <span>
    const $span = $textContainer.find('span.inline-flex');
    if ($span.length) {
      let spanClass = $span.attr('class') || '';
      spanClass = spanClass.replace(/text-\[[^\]]+\]\/\d+/, '')
                           .replace(/group-hover:text-\[[^\]]+\]/, '')
                           .replace(/text-white\/\d+/, '')
                           .replace(/group-hover:text-white/, '');
      $span.attr('class', (spanClass + ' text-[#630000]/60 group-hover:text-[#630000]').replace(/\s+/g, ' ').trim());
    }

    // 6. Append text container below image container
    $a.append($textContainer);
  });

  if (modified) {
    fs.writeFileSync(file, $.html());
    console.log('Updated ' + file);
  }
});
