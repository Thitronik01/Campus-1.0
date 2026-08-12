THITRONIK Campus 2026 Feedbackbogen - Netlify-Paket (v13)
=========================================================

Hochladen
---------
Diesen gesamten Ordner bei Netlify ablegen (Drag and Drop auf
app.netlify.com/drop oder als Publish-Verzeichnis im Deploy).
NICHT nur index.html hochladen, sonst fehlen Bilder und Stile.

Inhalt
------
index.html        Der Feedbackbogen (aus index-v13.html)
styles-v13.css    Stile
app-v13.js        Logik und Anbindung an Supabase
assets/           Logo und optimierte Bilder
_headers          Caching und Sicherheitsheader fuer Netlify

Der Ordner assets/v12 heisst absichtlich so. Die Bilder wurden fuer v12
optimiert und werden von v13 unveraendert mitgenutzt. Ein Umbenennen wuerde
die Pfade in HTML und CSS auseinanderlaufen lassen.

Backend
-------
Gespeichert wird ueber die bestehende RPC public.submit_campus_feedback(jsonb)
im Supabase-Projekt mhzlayhnyqlxdyiceyqz. Der Publishable Key steht im
Browser-Code, das ist beabsichtigt: die Tabellen bleiben per Row Level
Security gesperrt.

Test ohne Speichern
-------------------
index.html?demo=1 prueft alles durch und zeigt die Danke-Ansicht,
speichert aber absichtlich nichts.
