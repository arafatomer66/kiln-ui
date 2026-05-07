import { marked } from 'marked';
import { readFileSync, writeFileSync } from 'fs';

const md = readFileSync('/Users/mdomerarafat/Desktop/kiln-ui/medium-post.md', 'utf-8');
const body = marked.parse(md);

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Kiln UI launch post — copy &amp; paste into Medium</title>
<style>
  body { max-width: 720px; margin: 40px auto; padding: 0 20px; font-family: Georgia, serif; line-height: 1.7; color: #1a1a1a; }
  h1 { font-size: 36px; line-height: 1.2; margin-top: 1.2em; }
  h2 { font-size: 26px; margin-top: 1.6em; line-height: 1.3; }
  h3 { font-size: 20px; margin-top: 1.4em; }
  p { font-size: 18px; }
  img { max-width: 100%; height: auto; border-radius: 4px; margin: 1em 0; display: block; }
  a { color: #1B3A6F; text-decoration: underline; }
  pre { background: #f5f5f5; padding: 16px; border-radius: 4px; overflow-x: auto; font-family: Menlo, Monaco, monospace; font-size: 14px; line-height: 1.5; }
  code { background: #f5f5f5; padding: 2px 6px; border-radius: 3px; font-family: Menlo, Monaco, monospace; font-size: 0.9em; }
  pre code { background: transparent; padding: 0; }
  blockquote { border-left: 4px solid #ccc; margin-left: 0; padding-left: 16px; color: #555; font-style: italic; }
  ul, ol { font-size: 18px; padding-left: 28px; }
  li { margin: 6px 0; }
  hr { border: none; border-top: 1px solid #eee; margin: 2em 0; }
  .banner {
    background: #1B3A6F; color: #fff; padding: 20px; border-radius: 6px; margin-bottom: 32px;
    font-family: -apple-system, system-ui, sans-serif; font-style: normal;
  }
  .banner b { color: #E8A33D; }
</style>
</head>
<body>
<div class="banner">
  <b>📋 Instructions:</b> Click anywhere in the article below, press <b>⌘A</b> (Cmd+A) to select all, then <b>⌘C</b> to copy. Paste into Medium's editor with <b>⌘V</b>. Headings, code blocks, images, and links will all preserve.
</div>
${body}
</body>
</html>`;

writeFileSync('/Users/mdomerarafat/Desktop/kiln-ui/medium-post.html', html);
console.log('Rendered → /Users/mdomerarafat/Desktop/kiln-ui/medium-post.html');
