const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const DUB_UI = path.join(ROOT_DIR, 'components', 'dub');
const UI_DIR = path.join(ROOT_DIR, 'components', 'ui');

function processFiles(dir) {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (let entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processFiles(fullPath);
    } else {
      if (/\.(ts|tsx)$/.test(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let newContent = content
          .replace(/from "next-auth\/react"/g, 'from "@/lib/auth/hooks"')
          .replace(/from 'next-auth\/react'/g, "from '@/lib/auth/hooks'")
          .replace(/from "next-auth"/g, 'from "@/lib/auth/types"')
          .replace(/from 'next-auth'/g, "from '@/lib/auth/types'");
        if (content !== newContent) {
          fs.writeFileSync(fullPath, newContent, 'utf8');
          console.log(`Updated auth imports in ${fullPath}`);
        }
      }
    }
  }
}

processFiles(DUB_UI);
processFiles(UI_DIR);

console.log('Auth replacement complete.');
