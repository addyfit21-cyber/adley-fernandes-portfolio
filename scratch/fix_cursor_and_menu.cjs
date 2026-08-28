const fs = require('fs');
const path = require('path');

// 1. Fix cursor.css z-index
const cursorCssPath = path.resolve(__dirname, '../cursor.css');
if (fs.existsSync(cursorCssPath)) {
  let css = fs.readFileSync(cursorCssPath, 'utf8');
  css = css.replace(/z-index:\s*99999;/g, 'z-index: 9999999;');
  fs.writeFileSync(cursorCssPath, css, 'utf8');
  console.log('Fixed cursor.css z-index.');
}

// 2. Inject mobile menu JS into all HTML files (except index.html)
const dir = path.resolve(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html' && f !== 'old_index.html');

const mobileMenuScript = `
<script>
document.addEventListener('DOMContentLoaded', function() {
  const mobileBtn = document.getElementById('mobile-dropdown-btn');
  const mobileMenu = document.getElementById('mobile-dropdown-menu');
  const mobileArrow = document.getElementById('mobile-dropdown-arrow');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      const isOpen = mobileMenu.classList.contains('opacity-100');
      
      if (!isOpen) {
        mobileMenu.classList.remove('opacity-0', 'invisible', '-translate-y-4');
        mobileMenu.classList.add('opacity-100', 'visible', 'translate-y-0');
        if (mobileArrow) mobileArrow.style.transform = 'rotate(180deg)';
      } else {
        mobileMenu.classList.remove('opacity-100', 'visible', 'translate-y-0');
        mobileMenu.classList.add('opacity-0', 'invisible', '-translate-y-4');
        if (mobileArrow) mobileArrow.style.transform = 'rotate(0deg)';
      }
    });

    document.addEventListener('click', function(e) {
      if (!mobileBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('opacity-100', 'visible', 'translate-y-0');
        mobileMenu.classList.add('opacity-0', 'invisible', '-translate-y-4');
        if (mobileArrow) mobileArrow.style.transform = 'rotate(0deg)';
      }
    });

    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('opacity-100', 'visible', 'translate-y-0');
        mobileMenu.classList.add('opacity-0', 'invisible', '-translate-y-4');
        if (mobileArrow) mobileArrow.style.transform = 'rotate(0deg)';
      });
    });
  }
});
</script>
</body>`;

for (const f of files) {
  const filePath = path.join(dir, f);
  let html = fs.readFileSync(filePath, 'utf8');
  
  if (!html.includes('getElementById(\'mobile-dropdown-menu\')')) {
    html = html.replace('</body>', mobileMenuScript);
    fs.writeFileSync(filePath, html, 'utf8');
    console.log('Injected mobile menu JS into', f);
  } else {
    console.log('Mobile menu JS already exists in', f);
  }
}
