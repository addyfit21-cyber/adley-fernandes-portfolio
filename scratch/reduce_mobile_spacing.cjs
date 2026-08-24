const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const mapping = {
    '10': '5',
    '12': '6',
    '16': '8',
    '20': '10',
    '24': '12',
    '32': '16',
    '40': '20',
    '48': '24',
    '64': '32',
    '8': '4',
};

const regex = /class="([^"]+)"/g;

html = html.replace(regex, (match, classString) => {
    let classes = classString.split(/\s+/);
    let newClasses = [];
    
    // We want to process prefixes: py, px, pt, pb, my, mt, mb, gap
    const targetPrefixes = ['py', 'px', 'pt', 'pb', 'my', 'mt', 'mb', 'gap'];
    
    for (let i = 0; i < classes.length; i++) {
        let cls = classes[i];
        let processed = false;
        
        for (let prefix of targetPrefixes) {
            // Check if it matches exactly prefix-value without any breakpoint
            let regexStr = `^${prefix}-(\\d+)$`;
            let matchCls = cls.match(new RegExp(regexStr));
            
            if (matchCls) {
                let val = matchCls[1];
                if (mapping[val]) {
                    let newVal = mapping[val];
                    
                    // Check if there is already an md: or lg: override for this prefix in the original classes
                    let hasOverride = classes.some(c => c.startsWith(`md:${prefix}-`) || c.startsWith(`sm:${prefix}-`) || c.startsWith(`lg:${prefix}-`));
                    
                    if (hasOverride) {
                        // Just reduce the base value
                        newClasses.push(`${prefix}-${newVal}`);
                    } else {
                        // Reduce base value and add md: override to preserve desktop
                        newClasses.push(`${prefix}-${newVal}`);
                        newClasses.push(`md:${prefix}-${val}`);
                    }
                    processed = true;
                    break;
                }
            }
        }
        
        if (!processed) {
            newClasses.push(cls);
        }
    }
    
    return `class="${newClasses.join(' ')}"`;
});

fs.writeFileSync('index.html', html);
console.log('Successfully updated spacing classes for mobile.');
