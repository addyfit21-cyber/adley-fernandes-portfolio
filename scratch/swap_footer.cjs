const fs = require("fs");

const indexContent = fs.readFileSync("index.html", "utf-8");

let footerBlock = "";
const footerStart = indexContent.indexOf(`<footer id="site-footer"`);
if (footerStart !== -1) {
  // Find the </script> tag after the footer ends
  const footerEndTag = indexContent.indexOf(`</footer>`, footerStart);
  const scriptEndTag = indexContent.indexOf(`</script>`, footerEndTag);
  if (scriptEndTag !== -1) {
    footerBlock = indexContent.substring(footerStart, scriptEndTag + `</script>`.length);
  }
}

if (!footerBlock) {
  console.error("Could not extract footer from index.html");
  process.exit(1);
}

const files = ["tvb-brandbook.html", "benner-case-study.html", "lukes-case-study.html"];

for (const file of files) {
  let content = fs.readFileSync(file, "utf-8");
  const oldFooterStart = content.indexOf(`<!-- Footer -->`);
  let oldFooterEnd = content.indexOf(`</footer>`, oldFooterStart);
  
  if (oldFooterStart !== -1 && oldFooterEnd !== -1) {
    const before = content.substring(0, oldFooterStart);
    const after = content.substring(oldFooterEnd + `</footer>`.length);
    content = before + footerBlock + after;
    fs.writeFileSync(file, content);
    console.log("Updated " + file);
  } else {
    console.log("Could not find old footer in " + file);
  }
}
