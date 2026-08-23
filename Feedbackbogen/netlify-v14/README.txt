THITRONIK Campus 2026 Feedbackbogen - Netlify-Paket (v14)
=========================================================

Hochladen
---------
Diesen gesamten Ordner bei Netlify ablegen (Drag and Drop auf
app.netlify.com/drop oder als Publish-Verzeichnis im Deploy).
NICHT nur index.html hochladen, sonst fehlen Bilder und Stile.

Inhalt
------
index.html        Der Feedbackbogen (aus index-v14.html)
styles-v14.css    Stile
app-v14.js        Logik und Anbindung an Supabase
rays-v14.js       Lichtstrahlen im Kopfbereich und in der Danke-Ansicht.
                  Reine Dekoration. Faellt die Datei weg oder kann der Browser
                  kein WebGL, bleibt es beim bisherigen Hintergrund.
assets/           Logo und optimierte Bilder
_headers          Caching und Sicherheitsheader fuer Netlify

Der Ordner assets/v12 heisst absichtlich so. Die Bilder wurden fuer v12
optimiert und werden unveraendert mitgenutzt. Ein Umbenennen wuerde die
Pfade in HTML und CSS auseinanderlaufen lassen.

Notenskala
----------
Ab v14 ist 5 die BESTE und 1 die schlechteste Note. Bis v13 war es umgekehrt.
Die Zahl wird so gespeichert, wie sie angekreuzt wurde. Damit die Auswertung
beides nicht vermischt, tragen v14-Einsendungen form_version
"campus-2026-haendler-v14"; die Views gruppieren danach.

Backend
-------
Gespeichert wird ueber die bestehende RPC public.submit_campus_feedback(jsonb)
im Supabase-Projekt mhzlayhnyqlxdyiceyqz. Der Publishable Key steht im
Browser-Code, das ist beabsichtigt: die Tabellen bleiben per Row Level
Security gesperrt.

Die Haendlernummer braucht supabase_v14_migration.sql, um eine eigene Spalte
zu bekommen. Ohne die Migration wird sie trotzdem gespeichert, aber nur
innerhalb von raw_payload. Der Bogen funktioniert in beiden Faellen.

Test ohne Speichern
-------------------
index.html?demo=1 prueft alles durch und zeigt die Danke-Ansicht,
speichert aber absichtlich nichts.
