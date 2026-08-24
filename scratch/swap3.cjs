const fs = require('fs');

function swapSections(html) {
    // We only need to swap for Project 1 and Project 2. Projects 3-6 are already in the correct order.

    // 1. Benner Tea Co.
    let marker1 = '<!-- Editorial Content — Dense Grid -->';
    let marker2 = '<!-- Brand Guidelines — Full 2-Column Grid (all pages + mockups) -->';
    let endMarker1 = '<!-- END: Benner Tea Co. -->';

    let i1 = html.indexOf(marker1);
    let i2 = html.indexOf(marker2, i1);
    let i3 = html.indexOf(endMarker1, i2);

    if (i1 > -1 && i2 > -1 && i3 > -1) {
        let titleBlock = html.substring(0, i1);
        let editorialBlock = html.substring(i1, i2);
        
        // Find the closing div of the parent block before the END comment
        // Basically we want the mockups block
        let endOfMockups = html.lastIndexOf('</div>', i3); 
        
        let mockupsBlock = html.substring(i2, endOfMockups);
        let remainder = html.substring(endOfMockups);

        html = titleBlock + mockupsBlock + '\n\n      ' + editorialBlock + remainder;
        console.log("Swapped Benner Tea Co.");
    } else {
        console.log("Could not find Benner Tea Co. sections.");
    }

    // 2. Luke's Iced Coffee
    let marker3 = '<!-- Editorial Content — Dense Grid -->';
    let marker4 = '<!-- Applications Image Grid -->';
    let endMarker2 = "<!-- END: Luke's Iced Coffee -->";

    // Since we modified html, we search again from the modified string
    let i4 = html.indexOf(marker3, i1 + 500); // start searching after the first editorial block
    let i5 = html.indexOf(marker4, i4);
    let i6 = html.indexOf(endMarker2, i5);

    if (i4 > -1 && i5 > -1 && i6 > -1) {
        let titleBlock = html.substring(0, i4);
        let editorialBlock = html.substring(i4, i5);
        let mockupsBlock = html.substring(i5, i6); // For Luke's, the END comment is right after the mockupsBlock!
        // wait, let's verify if END comment is right after.
        let remainder = html.substring(i6);

        html = titleBlock + mockupsBlock + '\n\n      ' + editorialBlock + remainder;
        console.log("Swapped Luke's Iced Coffee.");
    } else {
        console.log("Could not find Luke's Iced Coffee sections.");
    }

    return html;
}

const html = fs.readFileSync('index.html', 'utf8');
const swappedHtml = swapSections(html);
fs.writeFileSync('index.html', swappedHtml);
