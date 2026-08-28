"use strict";

/* ==========================================================================
   Kleiner Entwicklungsserver — bildet die Netlify-Redirects nach, damit
   /quiz/<insel> lokal genauso funktioniert wie im Deployment.

     node tools/dev-server.js        (Port 8788)

   Speichern wird hier nicht getestet: Netlify Forms und Functions stehen nur
   im Deployment bereit. Lokal deshalb mit ?demo=1 arbeiten.
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
  ".jpeg": "image/jpeg",
  ".mp3": "audio/mpeg",
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

  // Ein normaler POST darf lokal nicht wie eine erfolgreiche Speicherung
  // aussehen. Insbesondere der Feedbackbogen würde sonst die ausgelieferte
  // HTML-Seite als vermeintliche Netlify-Forms-Bestätigung akzeptieren.
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(501, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Speichern ist lokal nicht verfügbar — bitte ?demo=1 verwenden.");
    return;
  }

  // Netlify-Redirect nachbilden: /quiz und /quiz/<insel> liefern index.html
  if (/^\/quiz(\/[a-z0-9-]+)?\/?$/i.test(pathname)) pathname = "/index.html";
  if (pathname === "/") pathname = "/index.html";

  let activeRoot = ROOT;
  const feedbackImPaket = path.join(ROOT, "feedback");
  if ((pathname === "/feedback" || pathname.startsWith("/feedback/")) && !fs.existsSync(feedbackImPaket)) {
    activeRoot = path.resolve(__dirname, "..", "..", "Feedbackbogen", "netlify-v14");
    pathname = pathname.replace(/^\/feedback\/?/, "/");
  }

  let file = path.join(activeRoot, path.normalize(pathname).replace(/^([/\\])+/, ""));
  // Verzeichnisse liefern ihre index.html, wie Netlify es tut. Ohne das
  // waere /feedback/ hier ein Lesefehler auf einem Ordner, waehrend es im
  // Deployment funktioniert — die Probe waere dann keine mehr.
  try {
    if (fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
  } catch { /* gibt es nicht, faellt unten als 404 heraus */ }

  if (!file.startsWith(activeRoot)) {
    res.writeHead(403).end("Verboten");
    return;
  }

  // HTML5-Audio fragt MP3-Dateien mit Byte-Ranges ab. Ohne 206-Antwort kann
  // Chromium zwar abspielen, kennt lokal aber oft keine Dauer; dann bliebe
  // die Fortschrittsanzeige im Audio-Quiz ohne verwertbaren Endwert.
  const range = req.headers.range;
  if (range && path.extname(file).toLowerCase() === ".mp3") {
    fs.stat(file, (statError, stat) => {
      if (statError) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Nicht gefunden: " + pathname);
        return;
      }
      const match = /^bytes=(\d*)-(\d*)$/.exec(range);
      if (!match) {
        res.writeHead(416, { "Content-Range": `bytes */${stat.size}` });
        res.end();
        return;
      }
      const start = match[1] ? Number(match[1]) : 0;
      const end = match[2] ? Math.min(Number(match[2]), stat.size - 1) : stat.size - 1;
      if (!Number.isFinite(start) || !Number.isFinite(end) || start > end || start >= stat.size) {
        res.writeHead(416, { "Content-Range": `bytes */${stat.size}` });
        res.end();
        return;
      }
      res.writeHead(206, {
        "Content-Type": "audio/mpeg",
        "Content-Length": end - start + 1,
        "Content-Range": `bytes ${start}-${end}/${stat.size}`,
        "Accept-Ranges": "bytes",
        "Cache-Control": "no-store"
      });
      fs.createReadStream(file, { start, end }).pipe(res);
    });
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
