# Hyperlinking Strategy

Ziel: Das Wiki soll stark vernetzt sein. Support-Mitarbeiter sollen von Begriffen wie CAN-Bus, Klemme 30, Panikalarm, Vent-check oder Funk-Magnetkontakt direkt zu passenden Unterseiten springen koennen.

## Link-Typen

1. Explizite Markdown-Links
   - Bereits vorhandene `[Text](ziel.md)` Links bleiben erhalten.

2. Automatische Begriff-Links
   - Bekannte Fachbegriffe werden beim Rendern automatisch auf passende Seiten oder Glossar-Anker verlinkt.
   - Pro Begriff und Artikelabschnitt nur die erste sinnvolle Vorkommnis verlinken, damit der Text nicht ueberladen wirkt.

3. Related Links
   - Am Artikelende und/oder in der rechten Meta-Spalte verwandte Seiten anzeigen.
   - Basis: gemeinsame Begriffe, Quellen, Kategorie, Produktfamilie, Fahrzeugfamilie.

4. Glossar-Popover
   - Fuer kurze Erklaerungen: Hover/Click-Popover mit Definition.
   - Popover muss Link zur Glossar-/Detailseite enthalten.

## Start-Autolink-Woerterbuch

Eine erste strukturierte Version liegt unter `project-data/link-dictionary.json`. Anti-Gravity soll diese Datei einlesen und erweitern.

| Begriff / Alias | Ziel |
|---|---|
| WiPro III | `/de/wipro-iii` |
| WiPro III safe.lock | `/de/wipro-iii` |
| safe.lock | `/de/safe-lock-umruestplatine` oder kontextuell `/de/wipro-iii` |
| Pro-Finder | `/de/pro-finder` |
| G.A.S.-pro III | `/de/gas-pro-iii` |
| G.A.S.-pro | `/de/gas-pro` |
| G.A.S.-connect | `/de/gas-connect` |
| G.A.S.-plug | `/de/gas-plug` |
| BT-connect | `/de/bt-connect` |
| NFC Modul | `/de/nfc-modul` |
| Funk-Magnetkontakt | `/de/funk-magnetkontakt` |
| Funk-Handsender | `/de/funk-handsender` |
| Funk-Kabelschleife | `/de/funk-kabelschleife` |
| Funk-Rauchmelder | `/de/funk-rauchmelder` |
| Funk-Wassermelder | `/de/funk-wassermelder` |
| Abschalteinrichtung | `/de/abschalteinrichtung` |
| Zusatzsirene | `/de/sirenen-hupen` |
| Zusatzhupe | `/de/sirenen-hupen` |
| CAN-Bus | `/de/tech-doku/funkstandards-und-schnittstellen` oder `/de/glossar#can-bus` |
| CAN Bus | `/de/tech-doku/funkstandards-und-schnittstellen` oder `/de/glossar#can-bus` |
| Klemme 15 | `/de/glossar#klemme-15` |
| Klemme 30 | `/de/glossar#klemme-30` |
| Panikalarm | `/de/wipro-iii#panikfunktion-manueller-alarm` |
| Panikfunktion | `/de/wipro-iii#panikfunktion-manueller-alarm` |
| Vent-check | `/de/wipro-iii#belueftungsfunktion-vent-check` |
| Belueftungsfunktion | `/de/wipro-iii#belueftungsfunktion-vent-check` |
| Easy-Add | `/de/glossar#easy-add` |
| Geofencing | `/de/pro-finder` |
| Kill-Funktion | `/de/abschalteinrichtung` |
| Unterspannung | `/de/stromversorgung-standzeiten` |
| Ruhestrom | `/de/stromversorgung-standzeiten` |
| Artikelnummer | `/de/artikelnummern` |
| Seriennummer | `/de/seriennummern-softwarestaende` |

## Sprachlogik

- Autolinks muessen sprachsensibel sein.
- Wenn User in `/en/...` ist, soll der Zielpfad `/en/...` sein, sofern die Seite existiert.
- Wenn Ziel in Sprache fehlt: auf Deutsch fallbacken und Badge `DE fallback` anzeigen.
- Aliase koennen pro Sprache aus `terminologie-und-schreibweisen.md`, `glossar.md` und `uebersetzungs-glossar.md` aufgebaut werden.

## Technische Regeln

- Nicht in Code-Blöcken, Tabellen-Headern, URLs oder bestehenden Links autolinken.
- Nicht jeden Treffer verlinken. Maximal:
  - erstes Vorkommen pro Begriff pro Artikel
  - oder erstes Vorkommen pro Abschnitt bei langen Artikeln
- Laengere Begriffe vor kuerzeren matchen, z.B. `WiPro III safe.lock` vor `WiPro III`.
- Gross-/Kleinschreibung tolerant behandeln, aber Markennamen im sichtbaren Text nicht veraendern.
- Defekte Ziele im Audit melden.

## Related-Links-Algorithmus

Score pro Kandidat:

- gleicher Produktname: +5
- gleicher Fahrzeughersteller: +5
- Begriff aus Glossar/Terminologie gemeinsam: +3
- gemeinsame Quelle in Frontmatter: +2
- gleiche Kategorie: +1
- internal-only Seite nur anzeigen, wenn Rolle `internal`: sonst 0 bzw. ausgeschlossen

Zeige pro Artikel:

- 3 bis 6 verwandte Artikel
- 2 bis 5 passende Assets
- bei Produkten: passende Zubehoer-/Diagnose-/FAQ-Seiten
