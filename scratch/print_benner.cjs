const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const start = html.indexOf('<div id="branding"');
const end = html.indexOf('<!-- END: Benner Tea Co. -->');
console.log(html.substring(start, start + 3000));
