const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');

// The <script type="module"> block we want to delete is around 2903 to 3064
// We can just find the second <script type="module"> and its closing tag.
let start = -1;
let end = -1;
let count = 0;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('<script type="module">')) {
        count++;
        if (count === 2) {
            start = i;
        }
    }
    if (start !== -1 && lines[i].includes('</script>')) {
        end = i;
        break;
    }
}

if (start !== -1 && end !== -1) {
    lines.splice(start - 1, end - start + 2); // Also delete empty line before if needed, but let's just do start to end
    fs.writeFileSync('index.html', lines.join('\n'), 'utf8');
    console.log('Deleted script block from ' + start + ' to ' + end);
} else {
    console.log('Could not find the script block.');
}
