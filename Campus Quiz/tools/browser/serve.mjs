import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Eigenständiger statischer Server: lädt niemals Functions oder API-Schlüssel.
const root = fileURLToPath(new URL('../../../Campus Gesamtpaket/public/', import.meta.url));
if (!fs.existsSync(path.join(root, 'index.html'))) throw new Error('Gesamtpaket fehlt: node tools/build-insel.js gesamt');
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.mp3': 'audio/mpeg' };
http.createServer((req,res) => {
  if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405); res.end('Testserver erlaubt keine Übertragung.'); return; }
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400); res.end(); return; }
  if (pathname === '/__bereit') { res.end('bereit'); return; }
  if (/^\/quiz(?:\/[^/]+)?\/?$/.test(pathname)) pathname = '/index.html';
  let file = path.resolve(root, '.' + pathname);
  if (!file.startsWith(root)) { res.writeHead(403); res.end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) { res.writeHead(404); res.end(pathname); return; }
  res.writeHead(200, { 'Content-Type': (mime[path.extname(file)] || 'application/octet-stream') + (['.html','.js','.css','.json'].includes(path.extname(file)) ? '; charset=utf-8' : ''), 'Cache-Control': 'no-store' });
  if (req.method === 'HEAD') res.end(); else fs.createReadStream(file).pipe(res);
}).listen(8876, '127.0.0.1');
