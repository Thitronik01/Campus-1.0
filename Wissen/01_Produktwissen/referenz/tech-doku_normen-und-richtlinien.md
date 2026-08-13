---
title: 'Normen, Richtlinien & Zulassungen'
sources:
  - sources/technische_zusatzinformationen_gas-pro_iii.pdf
  - sources/FAQ_WiPro-III_DE.md
  - sources/FAQ_WiPro-III-safelock_DE.md
  - sources/wipro_deutsche_bedienungsanleitung_abschrift.txt
  - sources/Funk-Handsender_868__101064__Legal__Konformitaet_2014-53-EU_DE.md
  - sources/Funk-Kabelschleife_868__100761__Legal__Konformitaet_DE.md
  - >-
    sources/safe-lock_Umruestplatine__101052__Legal__Konformitaet_2014-53-EU_DE.md
  - sources/Was ist eine Wipro.docx
updated: '2026-07-22'
confidence: high
lang: de
dealerStatus: approved
---

# Normen, Richtlinien & Zulassungen

Zentrale Sammelseite für die **formalen Norm- und Richtlinienbezüge** im lokalen Quellenbestand.

> **Wichtig:** Diese Seite dokumentiert nur das, was in den lokalen Quellen ausdrücklich belegt ist. Sie ergänzt keine fehlenden Normnummern durch Vermutung.

---

## Beleggrenze

Alle acht im Frontmatter genannten Dateien fehlen im aktuellen lokalen Bestand. Maßgeblich bleiben die freigegebenen Basisartikel sowie die Konformitätserklärung und Kennzeichnung des konkreten Produkts. Diese Seite ist keine Rechtsberatung und keine vollständige Normauslegung.

---

## Schnellübersicht

| Referenz | Typ | Belegt für | Wiki-Nutzen |
|----------|-----|------------|-------------|
| `2014/53/EU` | EU-Richtlinie (RED) | mehrere Funkprodukte | Basis für Funk-/Konformitätsaussagen und DoC-Verweise |
| `ECE R10` | Fahrzeug-/EMV-Zulassung | WiPro III safe.lock | Einordnung für den Einsatz im Fahrzeugumfeld |
| `DIN EN 50194-1` | Produktnorm | G.A.S.-pro III | Bezug zur DIP-5-Warnschwelle laut technischer Zusatzinfo |
| `DIN EN 50194-2` | Produktnorm | G.A.S.-pro III | Bezug zur DIP-5-Warnschwelle laut technischer Zusatzinfo |
| `EMV-geprüft` | technischer Prüfhinweis | WiPro III | Hinweis auf elektromagnetische Verträglichkeit gegenüber Fahrzeugsystemen |

---

## Richtlinie 2014/53/EU

Die Quellen referenzieren mehrfach die **Richtlinie 2014/53/EU** als Konformitätsbasis für Funkprodukte.

### Im lokalen Bestand direkt belegt für

- WiPro III safe.lock
- Funk-Handsender 868
- Funk-Kabelschleife 868
- safe.lock Umrüstplatine

### Praktische Bedeutung im Wiki

- Produktseiten dürfen auf die vorhandene **Konformitätserklärung** verweisen.
- Die detaillierte DoC wird in den Quellen regelmäßig über den **Support-/Download-Bereich** von THITRONIK angegeben.
- Die Richtlinie ist ein **Konformitätsbezug**, keine Bedienanleitung und keine Einbaufreigabe für jeden Fahrzeugfall.

---

## ECE-Regelung R10

Im FAQ-Bestand ist WiPro III bzw. WiPro III safe.lock als nach **ECE-Regelung R10** zugelassen beschrieben.

### Einordnung

- Bezug auf den Fahrzeugeinsatz bzw. die elektromagnetische Verträglichkeit im Kfz-Umfeld
- relevant für die technische Einordnung als Nachrüst- oder OEM-nahe Fahrzeuglösung

### Redaktionsregel

- `ECE R10` ist eine **Zulassungs- und EMV-Aussage**, nicht mit der Funkrichtlinie `2014/53/EU` vermischen
- Produktseiten dürfen die Aussage nutzen, sollten aber für tiefergehende Nachweise in diese Tech.-Doku verlinken

---

## DIN EN 50194-1 / DIN EN 50194-2

In den technischen Zusatzinformationen zum G.A.S.-pro III wird `DIP 5 = ON` mit einer Warnung nach **DIN EN 50194-1** und **DIN EN 50194-2** verknüpft.

### Im Wiki belastbar ableitbar

- Die Quelle nennt diese Normen ausdrücklich im Zusammenhang mit einer **erhöhten Warnschwelle**.
- Die Aussage gehört in den Kontext der **DIP-Schalter-Logik** des G.A.S.-pro III.
- Die Seite [[G.A.S.-pro III — Gaswarner für Freizeitfahrzeuge]] kann auf diese Normbezüge verweisen, ohne die Normtexte selbst wiederzugeben.

### Nicht künstlich ergänzen

- Der lokale Bestand liefert **keinen vollständigen Normkommentar**.
- Deshalb werden hier **keine** weitergehenden Interpretationen des Normumfangs ergänzt.

---

## EMV-geprüft

`Was ist eine Wipro.docx` beschreibt WiPro III als **EMV-geprüft** und als elektronische Unterbaugruppe, die andere Fahrzeugsysteme nicht stören soll.

### Einordnung

- `EMV-geprüft` ist im lokalen Bestand ein **technischer Prüfhinweis**
- er ergänzt die Produkt- und Zulassungsbeschreibung
- er ersetzt **nicht** die produktspezifische Konformitätserklärung oder Fahrzeugfreigabe

---

## Produktbezug auf einen Blick

| Produkt / Familie | Formale Referenzen im lokalen Bestand |
|-------------------|----------------------------------------|
| WiPro III | `ECE R10`, technical EMC statement |\n| WiPro III safe.lock | `2014/53/EU`, `ECE R10`, technical EMC statement |
| Funk-Handsender 868 | `2014/53/EU` |
| Funk-Kabelschleife 868 | `2014/53/EU` |
| safe.lock Umrüstplatine | `2014/53/EU` |
| G.A.S.-pro III | `DIN EN 50194-1`, `DIN EN 50194-2` |

---

## Redaktions- und Sicherheitsregeln

Richtlinie, Norm, ECE-Typgenehmigung, CE-/DoC-Bezug und technischer EMV-Prüfhinweis getrennt speichern und ausgeben. Immer Produkt, Variante, Revision und Quelle nennen. Keine Konformitäts-, Länder-, Fahrzeug- oder Einbaufreigabe aus Produktähnlichkeit ableiten.

---

## QA- und Freigabecheck

Prüfen: acht unveränderte Quellenpfade, produktgenaue Zuordnung von `2014/53/EU`, `ECE R10`, `DIN EN 50194-1`, `DIN EN 50194-2` und EMV-Hinweis, alle Negationen, lokale Wiki-Ziele, Titel/H1, Metadaten, UTF-8 und Platzhalterfreiheit.

---

## Querverweise

- [[Tech. Doku — Übersicht]]
- [[Funkstandards & Schnittstellen — technische Abgrenzung]]
- [[WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge]]
- [[G.A.S.-pro III — Gaswarner für Freizeitfahrzeuge]]



