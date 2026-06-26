const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const match = content.match(/<style>[\s\S]*?<\/style>/);
if (match) console.log(match[0]);
