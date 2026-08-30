"use strict";

/* ==========================================================================
   Kleiner Entwicklungsserver — bildet die Netlify-Redirects nach, damit
   /quiz/<insel> lokal genauso funktioniert wie im Deployment.

     node tools/dev-server.js        (Port 8788)

   Speichern wird hier nicht getestet: Netlify Forms und Functions stehen nur
   im Deployment bereit. Lokal deshalb mit ?demo=1 arbeiten.

   EINE AUSNAHME: die THI-Function. Sie speichert nichts, sie liest nur im
   Wissensbestand und fragt das Sprachmodell — es gibt also nichts, was lokal
   in die Produktivdatenbank laufen koennte. Ohne sie waere THI lokal
   ueberhaupt nicht pruefbar, und ein Assistent, den man vor dem Deployment
   nicht sehen kann, wird auch nicht vor dem Deployment richtig.

   Der Schluessel kommt dafuer aus der Umgebung:

     ANYMIZE_API_KEY=... ANYMIZE_API_URL=... node tools/dev-server.js

   Ohne Schluessel laeuft alles bis auf die Modellantwort; THI meldet dann im
   Panel, was fehlt.
   ========================================================================== */

const http = require("http");
const fs = require("fs");
const path = require("path");
const { Readable } = require("stream");

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

/* Die THI-Function im v2-Format (Request rein, Response raus) an den
   node:http-Server anschliessen. Der Modulpfad zeigt immer in die QUELLE, auch
   wenn der Server ein gebautes Paket ausliefert: das Paket traegt dieselbe
   Datei, und beim Entwickeln soll die Aenderung sofort greifen. */
const THI_MODUL = path.join(__dirname, "..", "netlify", "functions", "thi.mjs");
let thiGeladen = null;

async function thiBedienen(req, res, url) {
  try {
    // Erst beim ersten Aufruf laden: der Wissensbestand kostet rund 3 MB
    // Speicher, die ein Server ohne THI-Nutzung nicht braucht.
    if (!thiGeladen) thiGeladen = import(`file://${THI_MODUL.replace(/\\/g, "/")}`);
    const modul = await thiGeladen;

    const koerper = await new Promise((fertig, fehler) => {
      const teile = [];
      req.on("data", (stueck) => teile.push(stueck));
      req.on("end", () => fertig(Buffer.concat(teile)));
      req.on("error", fehler);
    });

    const anfrage = new Request(`http://localhost:${PORT}${url.pathname}${url.search}`, {
      method: req.method,
      headers: req.headers,
      body: req.method === "GET" || req.method === "HEAD" ? undefined : koerper
    });

    const antwort = await modul.default(anfrage);
    const kopfzeilen = {};
    antwort.headers.forEach((wert, name) => { kopfzeilen[name] = wert; });
    res.writeHead(antwort.status, kopfzeilen);

    if (antwort.body) Readable.fromWeb(antwort.body).pipe(res);
    else res.end();
  } catch (fehler) {
    console.error("[thi] lokal fehlgeschlagen:", fehler);
    res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ fehler: "lokal", meldung: String(fehler && fehler.message || fehler) }));
  }
}

http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  let pathname = decodeURIComponent(url.pathname);

  // THI laeuft lokal mit (siehe Kopf der Datei).
  if (pathname === "/.netlify/functions/thi") {
    thiBedienen(req, res, url);
    return;
  }

  // Die übrigen Functions gibt es lokal nicht — sauber als 501 melden, damit
  // die Engine ihren Fehlerpfad zeigt statt auf eine HTML-Seite zu laufen.
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
