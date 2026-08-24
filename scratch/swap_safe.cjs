const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false, xmlMode: false });

function swapSections(projectId, editorialSelector, mockupSelector) {
    const project = $(projectId);
    if (!project.length) {
        console.log("Could not find project: " + projectId);
        return;
    }
    
    // Find the editorial section block inside this project. 
    // In index.html, the comments are sibling to the actual divs, but cheerio strips comments or they are hard to select.
    // Let's use class names or specific IDs if possible, but actually we can just iterate over children.
    
    // The safest way is to just find the divs by their specific classes inside the project wrapper.
    // For Benner Tea Co (#branding):
    // Editorial Content is a div with class containing "divide-zinc-100" and "max-w-[1400px]"
    // Mockups is a div with class containing "py-16 md:py-20" or "grid-cols-2"
    
}

// Since Cheerio formatting can sometimes mess up exact whitespace and attribute ordering in Tailwind, 
// a manual string replacement script that correctly isolates each project FIRST is better.

let modifiedHtml = html;

function processProject(projectId, startComment, endComment, editorialComment, mockupComment, mockupShouldBeBefore) {
    let pStart = modifiedHtml.indexOf(startComment);
    let pEnd = modifiedHtml.indexOf(endComment, pStart);
    if (pStart === -1 || pEnd === -1) {
        console.log("Could not find bounds for " + projectId);
        return;
    }
    
    let projectHtml = modifiedHtml.substring(pStart, pEnd);
    
    let eIndex = projectHtml.indexOf(editorialComment);
    let mIndex = projectHtml.indexOf(mockupComment);
    
    if (eIndex === -1 || mIndex === -1) {
        console.log("Could not find blocks in " + projectId);
        return;
    }
    
    if (mockupShouldBeBefore && mIndex < eIndex) {
        console.log(projectId + " is already in correct order.");
        return;
    }
    
    if (!mockupShouldBeBefore && eIndex < mIndex) {
        // Need to swap eBlock (comes first) with mBlock (comes second)
        // We need getEndIndex inside projectHtml
        function getEndIndex(content, startIndex) {
            let tagStart = content.indexOf('<div', startIndex);
            if (tagStart === -1) return -1;
            let divCount = 0;
            let i = tagStart;
            while (i < content.length) {
                if (content.substr(i, 4) === '<div') { divCount++; i += 4; }
                else if (content.substr(i, 6) === '</div>') {
                    divCount--; i += 6;
                    if (divCount === 0) return i; // Since we already matched '</div>', the end index is just i
                }
                else i++;
            }
            return -1;
        }
        
        let eEnd = getEndIndex(projectHtml, eIndex);
        let mEnd = getEndIndex(projectHtml, mIndex);
        
        if (eEnd === -1 || mEnd === -1) {
            console.log("Error finding block bounds for " + projectId);
            console.log("eIndex:", eIndex, "eEnd:", eEnd, "mIndex:", mIndex, "mEnd:", mEnd);
            return;
        }
        
        let eBlock = projectHtml.substring(eIndex, eEnd);
        let gap = projectHtml.substring(eEnd, mIndex);
        let mBlock = projectHtml.substring(mIndex, mEnd);
        
        let newProjectHtml = projectHtml.substring(0, eIndex) + mBlock + gap + eBlock + projectHtml.substring(mEnd);
        
        modifiedHtml = modifiedHtml.substring(0, pStart) + newProjectHtml + modifiedHtml.substring(pEnd);
        console.log("Swapped " + projectId);
    }
}

// 1. Benner Tea Co
processProject("Benner Tea Co", 
    '<div id="branding"', '<!-- END: Benner Tea Co. -->',
    '<!-- Editorial Content — Dense Grid -->', '<!-- Brand Guidelines — Full 2-Column Grid', false);

// 2. Luke's Iced Coffee
processProject("Luke's Iced Coffee", 
    '<div id="web-development"', "<!-- END: Luke's Iced Coffee -->",
    '<!-- Editorial Content — Dense Grid -->', '<!-- Applications Image Grid -->', false);

// 3. ExecuVision
processProject("ExecuVision", 
    '<div id="web-engineering"', "<!-- END: ExecuVision -->",
    '<!-- Editorial Content — Dense Grid -->', '<!-- Device Mockup Showcase -->', true);

// 4. Nexzy
processProject("Nexzy", 
    '<div id="nexzy"', "<!-- END: Nexzy -->",
    '<!-- Editorial Content — Dense Grid -->', '<!-- Device Mockup Showcase -->', true);

fs.writeFileSync('index.html', modifiedHtml);
console.log('Done.');
