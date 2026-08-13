"use strict";

/* ==========================================================================
   Kleiner Entwicklungsserver — bildet die Netlify-Redirects nach, damit
   /quiz/<insel> lokal genauso funktioniert wie im Deployment.

     node tools/dev-server.js        (Port 8788)

   Speichern wird hier nicht getestet: dafür braucht es die Netlify-Function
   und die Supabase-Umgebungsvariablen. Lokal deshalb mit ?demo=1 arbeiten.
   ========================================================================== */

const http = require("http");
const fs = require("fs");
const path = require("path");

// Ohne Argument die Arbeitsquelle, mit Argument ein erzeugtes Insel-Paket:
//   node tools/dev-server.js "../Samsø Quiz/public"
const ROOT = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(__dirname, "..", "public");
const PORT = Number(process.env.PORT) || 8788;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml"
};

http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  let pathname = decodeURIComponent(url.pathname);

  // Die Function gibt es lokal nicht — sauber als 501 melden, damit die
  // Engine ihren Fehlerpfad zeigt statt auf eine HTML-Seite zu laufen.
  if (pathname.startsWith("/.netlify/functions/")) {
    res.writeHead(501, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ error: "Lokal nicht verfügbar — bitte ?demo=1 verwenden." }));
    return;
  }

  // Netlify-Redirect nachbilden: /quiz und /quiz/<insel> liefern index.html
  if (/^\/quiz(\/[a-z0-9-]+)?\/?$/i.test(pathname)) pathname = "/index.html";
  if (pathname === "/") pathname = "/index.html";

  const file = path.join(ROOT, path.normalize(pathname).replace(/^([/\\])+/, ""));
  if (!file.startsWith(ROOT)) {
    res.writeHead(403).end("Verboten");
    return;
  }

  fs.readFile(file, (error, data) => {
    if (error) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Nicht gefunden: " + pathname);
      return;
    }
    res.writeHead(200, {
      "Content-Type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`Wurzel: ${ROOT}`);
  console.log(`Läuft auf http://localhost:${PORT}/`);
});
