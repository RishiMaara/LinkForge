const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const DUB_UI_SRC = path.join(ROOT_DIR, 'dub-main', 'dub-main', 'packages', 'ui', 'src');
const DUB_UTILS_SRC = path.join(ROOT_DIR, 'dub-main', 'dub-main', 'packages', 'utils', 'src');
const DUB_WEB_UI = path.join(ROOT_DIR, 'dub-main', 'dub-main', 'apps', 'web', 'ui');

const DEST_UI = path.join(ROOT_DIR, 'components', 'ui');
const DEST_UTILS = path.join(ROOT_DIR, 'lib', 'utils');
const DEST_WEB_UI = path.join(ROOT_DIR, 'components', 'dub');

// Helper to recursively copy a directory
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Helper to recursively process files
function processFiles(dir, processor) {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (let entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processFiles(fullPath, processor);
    } else {
      // Process only text files (.ts, .tsx, .js, .jsx, .css)
      if (/\.(ts|tsx|js|jsx|css)$/.test(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let newContent = processor(content);
        if (content !== newContent) {
          fs.writeFileSync(fullPath, newContent, 'utf8');
        }
      }
    }
  }
}

console.log('Copying dub-main/packages/ui/src to components/ui...');
copyDir(DUB_UI_SRC, DEST_UI);

console.log('Copying dub-main/packages/utils/src to lib/utils...');
copyDir(DUB_UTILS_SRC, DEST_UTILS);

console.log('Copying dub-main/apps/web/ui to components/dub...');
copyDir(DUB_WEB_UI, DEST_WEB_UI);

console.log('Rewriting imports in copied files...');

const importRewriter = (content) => {
  return content
    .replace(/@dub\/ui/g, '@/components/ui')
    .replace(/@dub\/utils/g, '@/lib/utils');
};

processFiles(DEST_UI, importRewriter);
processFiles(DEST_UTILS, importRewriter);
processFiles(DEST_WEB_UI, importRewriter);

console.log('Migration script completed successfully!');
