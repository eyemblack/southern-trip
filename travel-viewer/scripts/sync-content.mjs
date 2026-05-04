import fs from 'fs';
import path from 'path';

const SOURCE_DIR = path.join(process.env.HOME, 'Desktop/PA/Travel-Planner');
const TARGET_DIR = path.join(process.cwd(), 'content');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    // Skip git and hidden files
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    
    // Skip specific large or irrelevant files if needed
    if (entry.name === 'GEMINI.md' || entry.name === 'TRAVEL_GUIDE.md') continue;

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else if (entry.name.endsWith('.md')) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log(`Syncing content from ${SOURCE_DIR} to ${TARGET_DIR}...`);
try {
  if (fs.existsSync(TARGET_DIR)) {
    fs.rmSync(TARGET_DIR, { recursive: true });
  }
  copyDir(SOURCE_DIR, TARGET_DIR);
  console.log('✅ Content synced successfully!');
} catch (error) {
  console.error('❌ Sync failed:', error);
  process.exit(1);
}
