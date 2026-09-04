import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// Fix 1: The immediate ScrollTrigger.refresh inside the preloader onComplete
// Replace the synchronous refresh with a delayed one
html = html.replace(
  `              preloader.style.display = "none";\r\n              document.body.classList.remove("overflow-hidden");\r\n\r\n              if(typeof ScrollTrigger !== 'undefined') {\r\n                ScrollTrigger.refresh();\r\n              }\r\n            }`,
  `              preloader.style.display = "none";\r\n              document.body.classList.remove("overflow-hidden");\r\n\r\n              // Delay refresh so it doesn't snap the orbital scrub position back to hero\r\n              setTimeout(() => {\r\n                if(typeof ScrollTrigger !== 'undefined') {\r\n                  ScrollTrigger.refresh();\r\n                }\r\n              }, 600);\r\n            }`
);

// Check it worked
if (html.includes('Delay refresh so it doesn\'t snap')) {
  console.log('✓ Fix applied successfully');
} else {
  console.log('✗ Fix NOT applied — checking for CRLF issues...');
  // Try LF version
  html = html.replace(
    `              preloader.style.display = "none";\n              document.body.classList.remove("overflow-hidden");\n\n              if(typeof ScrollTrigger !== 'undefined') {\n                ScrollTrigger.refresh();\n              }\n            }`,
    `              preloader.style.display = "none";\n              document.body.classList.remove("overflow-hidden");\n\n              // Delay refresh so it doesn't snap the orbital scrub position back to hero\n              setTimeout(() => {\n                if(typeof ScrollTrigger !== 'undefined') {\n                  ScrollTrigger.refresh();\n                }\n              }, 600);\n            }`
  );
  if (html.includes("Delay refresh")) {
    console.log('✓ Fix applied (LF)');
  } else {
    console.log('✗ Still failed');
  }
}

fs.writeFileSync('index.html', html);
