const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');

const headNav = lines.slice(0, 573).join('\n');
const footerScripts = lines.slice(2122).join('\n'); 

function createPage(filename, contentLines) {
    const html = headNav + '\n<main>\n' + contentLines.join('\n') + '\n' + footerScripts;
    fs.writeFileSync(filename, html, 'utf8');
    console.log('Created ' + filename);
}

let viContent = lines.slice(970, 1288);
viContent.push('</section>'); 
createPage('visual-identity.html', viContent);

let postersContent = lines.slice(1287, 1386);
createPage('posters.html', postersContent);

let webContent = lines.slice(1393, 1643);
createPage('web-development.html', webContent);

let sketchesContent = lines.slice(1644, 1798);
createPage('sketches.html', sketchesContent);
