import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: FileNode[];
}

export function getFileTree(dir: string = CONTENT_DIR): FileNode[] {
  if (!fs.existsSync(dir)) return [];
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  return entries
    .filter(entry => !entry.name.startsWith('.'))
    .map(entry => {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(CONTENT_DIR, fullPath);
      
      if (entry.isDirectory()) {
        return {
          name: entry.name,
          path: relativePath,
          type: 'directory' as const,
          children: getFileTree(fullPath)
        };
      } else {
        return {
          name: entry.name.replace(/\.md$/, ''),
          path: relativePath.replace(/\.md$/, ''),
          type: 'file' as const
        };
      }
    })
    .sort((a, b) => {
      if (a.type !== b.type) return a.type === 'directory' ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
}

export async function getMarkdownContent(slug: string[]) {
  const relativePath = slug.join('/');
  const fullPath = path.join(CONTENT_DIR, `${relativePath}.md`);
  
  if (!fs.existsSync(fullPath)) {
    // Check if it's a directory
    const dirPath = path.join(CONTENT_DIR, relativePath);
    if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
      return {
        type: 'directory',
        name: slug[slug.length - 1] || 'Home',
        children: getFileTree(dirPath)
      };
    }
    return null;
  }
  
  const fileContent = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContent);
  
  return {
    type: 'file',
    metadata: data,
    content,
    name: slug[slug.length - 1]
  };
}
