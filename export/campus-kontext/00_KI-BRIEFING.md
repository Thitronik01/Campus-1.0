# Briefing für die Campus-1.0-KI

Stand: 2026-08-28 · Erstellt aus der THITRONIK-Händlerplattform (Wiki-Wissensbasis, 82 deutsche Artikel)

## Was dieses Paket ist

Dieses Paket reichert deinen Kontext an, damit du bei der Pflege des Campus-1.0-Fragenkatalogs
(73 Fragen, 7 Inseln) weniger Fehler machst. Es enthält:

| Ordner/Datei | Inhalt |
|---|---|
| `00_KI-BRIEFING.md` | Diese Datei — Arbeitsregeln und Quellenhierarchie |
| `01_PRUEFBERICHT_FRAGENKATALOG.md` | Vollständige fachliche Prüfung aller 73 Fragen gegen das Wiki (2026-08-28) |
| `02_SUPPORT-KORREKTUREN_2026-08-27.md` | Mitschrift des Support-Meetings vom 27.08.2026 mit Wiki-Abgleich — **höchste Priorität** |
| `03_TERMINOLOGIE.md` | Kanonische Schreibweisen (verbindlich für alle Texte) |
| `04_FAKTEN_KOMPAKT.md` | Alle belastbaren Zahlen, Grenzwerte und Signalcode-Tabellen — erste Anlaufstelle vor jeder Faktenaussage |
| `05_FRAGEN_ENTWUERFE.md` | 12 redaktionsfertige Fragen-Entwürfe (Support-Aufträge + Wiki-Lücken) zur Übernahme in die JSON-Fragensätze |
| `06_DISTRAKTOREN_WARNLISTE.md` | Wahre Aussagen, die nie als falsche Antwortoption verwendet werden dürfen |
| `07_AUDIO-FRAGEN.md` | Konzept, Qualitätsleitplanken und 6 Entwürfe für Alarmton-Fragen (FEHMARN); Audiodateien in `../alarmtoene/` |
| `../alarmtoene/TONREFERENZ.md` | Zuordnung Ton → Gerät → Bedeutung mit Wiki-Beleg; ❓-Töne erst vom Support bestätigen lassen |
| `../wissen-de/_INDEX.md` | Suchindex über alle Artikel (Titel + Route) |
| `../wissen-de/` | Alle 82 deutschen Wiki-Artikel als Markdown-Klartext (Produkte, Fahrzeuge, RAG-Pakete, Tech-Doku) |
| `../wissen-de/_glossary.json` | Glossar-Rohdaten |
| `../wissen-de/_plattform-quizfragen.de.json` | Bestehende Quizfragen der Händlerplattform (Abgleich/Inspiration) |
| `../arbeitskarte/` | Quellcode + Assets der digitalen Arbeitskarte (für die Übernahme in Campus 1.0) |

## Quellenhierarchie (bei Widersprüchen)

1. **Support-Korrekturen 2026-08-27** (`02_...md`) — direkte Aussagen des THITRONIK-Supports, aktuellster Stand.
2. **Wiki-Artikel** (`wissen-de/`) — aus offiziellen Anleitungen, Produkt-FAQs und technischen Zusatzinformationen destilliert.
3. **Prüfbericht** (`01_...md`) — Sekundärquelle; verweist auf die beiden oberen.
4. Der Fragenkatalog selbst ist **nie** eine Quelle für Fakten — er ist das Prüfobjekt.

Zwei dokumentierte Konflikte zwischen Support und Wiki (Feuerzeugtest, 12-V-Schwelle) stehen in
`02_...md` mit beiden Quellenlagen. Übernimm für das Quiz den Support-Stand, aber behalte den
Vermerk, bis THITRONIK die Anleitungslage bestätigt hat.

## Arbeitsregeln

- Änderungen am Fragenkatalog **nur** in den sieben produktiven JSON-Fragensätzen unter
  `Campus Quiz/public/data/inseln/` — nie direkt in `FRAGENKATALOG.md` (der wird generiert).
- Jede fachliche Zahl (mm, Volt, Sekunden, Artikelnummern, Seriennummerngrenzen) muss in
  `wissen-de/` oder `02_...md` belegt sein. Keine Zahl aus dem Gedächtnis.
- Distraktoren müssen plausible Praxis-Irrtümer bleiben — aber sie dürfen keinem echten
  Wiki-Fakt entsprechen (sonst ist die Frage doppeldeutig).
- Terminologie strikt nach `03_TERMINOLOGIE.md` (insbesondere: **Pro-Finder**, nicht Pro-finder).
- Variantenbewusstsein: Funk-Magnetkontakt Standard ≠ wasserdicht, G.A.S.-pro ≠ G.A.S.-pro III,
  Pro-Finder bis 0699-044 ≠ ab 0699-045, WiPro III ≠ WiPro III safe.lock. Eine Frage muss immer
  klarstellen, welche Variante gemeint ist.
- Selbstbezügliche Auflösungen vermeiden („im aktuellen Fragenstand nicht freigegeben") — immer
  Grund + Stand nennen („wegen BCM-Änderungen; Stand Januar 2026 nicht freigegeben").

## Offene Klärungspunkte (nicht selbst entscheiden)

1. **Feuerzeugtest G.A.S.-pro III** — Support: erlaubt · Anleitung/Wiki: nicht vorgesehen. → Klärung durch Max/THITRONIK.
2. **Rückkehrschwelle Pro-Finder** — Support: 12 V · Wiki (6 Fundstellen): über 12,5 V. → Klärung.
3. **„Einbauort Gaswarner ist für CO"** (Support-Mitschrift, SAMSØ) — Aussage ist mehrdeutig;
   Wiki-Physik: Flüssiggas bodennah, CO deckennah. → Rückfrage an Max, was genau gemeint war.
4. **V002+ (CampLock/VanLock)** — im Wiki nicht dokumentiert (0 Treffer). Fragen, die auf V002+
   aufbauen, brauchen eine externe Quelle oder Umformulierung.
5. **POEL-Insel** (Händlerbereich) — Menüpfade und Begriffe (Händlerfinder, Werbemittel) sind im
   Wiki kaum belegt; vor Freigabe am eingeloggten Händlerkonto verifizieren.
