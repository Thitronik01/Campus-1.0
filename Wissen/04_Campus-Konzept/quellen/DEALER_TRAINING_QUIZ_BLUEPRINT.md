# Dealer Training & Quiz Blueprint

Dieses Dokument bereitet Schulungsvideos und Kahoot-artige Quizze vor. Die konkreten Quiz-Inhalte kommen spaeter.

## Grundprinzip

Das Dealer-Portal soll ein Lernbereich im Wiki werden, nicht eine separate Marketingseite.

Hauptbereiche:

- Schulungsmodule.
- Videos.
- Quizze.
- Lernfortschritt.
- Zertifikate.
- Freigegebene Downloads.

## Rollen

- `admin`: Module, Videos, Quizze, Freigaben und Zertifikate verwalten.
- `trainer`: Schulungsinhalte bearbeiten und Ergebnisse sehen.
- `dealer`: freigegebene Schulungen absolvieren.
- `internal`: kann Dealer-Ansicht simulieren.

## Lernmodul-Struktur

Ein Modul besteht aus:

- Titel.
- Zielgruppe.
- Sprache.
- Sichtbarkeit.
- Lernziele.
- Kapitel.
- Video-Lektionen.
- Wiki-Referenzen.
- Quiz.
- Bestehensgrenze.
- Zertifikat/Badge.

Beispiele:

- WiPro III Grundlagen.
- safe.lock und Schluesselsicherheit.
- Pro-Finder & App.
- Gaswarner und Sensorik.
- Funk-Zubehoer.
- Fahrzeugkompatibilitaet & CAN-Bus.
- Support-Fallaufnahme.
- Werkseinbau / Montagequalitaet.

## Video-Anforderungen

Videos kommen spaeter, die Pipeline soll aber vorbereitet werden.

Unterstuetzte Quellen:

- Lokale Dateien unter `Bilder und mehr/Videos/`.
- Spaeter optional externe sichere Video-URLs.

Unterstuetzte Endungen:

- `.mp4`
- `.webm`
- `.mov`
- `.m4v`

Video-UI:

- 16:9 Player.
- Kein Autoplay.
- Kapitelmarker.
- Transkriptfeld.
- Verknuepfte Wiki-Artikel.
- "Als erledigt markieren".
- Quiz-Freischaltung nach Abschluss.

## Quiz: Kahoot-Basis

Quizze sollen schnell, motivierend und eindeutig sein.

Fragetypen:

- Single Choice.
- Multiple Choice.
- Richtig/Falsch.
- Reihenfolge.
- Bildfrage.
- Zuordnung.

Kahoot-artige Elemente:

- Timer pro Frage.
- Punkte nach Richtigkeit und Antwortgeschwindigkeit.
- Sofortfeedback.
- Abschluss-Screen mit Score.
- Bestenliste optional fuer Live-Schulungen.
- Wiederholen erlaubt, wenn Admin es aktiviert.

## Quiz-Qualitaetsregeln

- Jede Frage hat eine eindeutige richtige Antwort.
- Jede Frage kann optional eine Erklaerung enthalten.
- Jede Frage kann auf Wiki-Artikel verweisen.
- Jede Antwort soll einen kurzen Feedbacktext und einen Wiki-Link zur passenden Stelle erhalten.
- Keine Fangfragen.
- Dealer-Quizze duerfen keine nicht freigegebenen Einbauunterlagen oder Support-Interna abfragen.

## Fortschritt

Pro Nutzer speichern:

- gestartete Module.
- abgeschlossene Videos.
- Quizversuche.
- bester Score.
- Zertifikatsstatus.
- Zeitstempel.

## Admin-Ansichten

- Module verwalten.
- Fragen verwalten.
- Video-Zuordnung verwalten.
- Ergebnisuebersicht pro Haendler.
- Zertifikate exportieren.
- Fragen ohne richtige Antwort melden.
- Videos ohne Modulzuordnung melden.

## MVP fuer Training

- Moduluebersicht.
- Moduldetailseite.
- Video-Platzhalter und spaetere Video-Erkennung.
- Quiz-Engine mit Dummy-Fragen.
- Fortschritt lokal oder per Admin-API speichern.
- Admin kann Quizdaten aus JSON laden.
