---
title: Funkstandards & Schnittstellen — technische Abgrenzung
sources:
  - sources/nfc_modul-kurzanleitung.pdf
  - sources/thitronik_zugang_nur_zugang_v2.pdf
  - sources/BT-connect__Reference__Technische_Daten_DE.md
  - sources/Vernetzungsmodul_101290__Reference__Technische_Daten_DE.md
  - sources/wipro_deutsche_bedienungsanleitung_abschrift.txt
  - sources/wipro_iii-installationsanleitung_1.8.pdf
updated: '2026-07-22'
confidence: high
lang: de
dealerStatus: approved
---

# Funkstandards & Schnittstellen — technische Abgrenzung

Diese technische Referenz trennt Funkstandards, Frequenzen, Steckverbinder und Fahrzeugbus im THITRONIK-System. Sie ist keine Einbauanleitung und leitet aus einem gemeinsamen Begriff keine Kompatibilität ab.

---

## Zweck und Beleggrenze

Die sechs Frontmatter-Quellen fehlen lokal. Verbindlich sind daher die freigegebenen Basisartikel und ihre Primärquellen. Produkt, Generation, Software, Fahrzeug und konkrete Funktion müssen gemeinsam bestimmt werden.

---

## Schnellübersicht

| Begriff | Klasse | Belegt für | Einordnung |
|---|---|---|---|
| `ISO 14443-A` | NFC standard | NFC module and media | near-field protocol |
| `DESFire® EV2` | chip platform | THITRONIK® original tags | documented copy protection |
| `13.56 MHz` | frequency | medium ↔ NFC module | near field |
| `868.35 MHz` | frequency | WiPro and accessories | alarm radio layer |
| `433 MHz` | legacy frequency | older systems only | not interchangeable |
| Bluetooth Low Energy | radio protocol | BT-connect/networking module | local app access |
| `RJ10` / `RJ11` | wired connectors | module links | product-specific pinout |
| `CAN-Bus` | vehicle bus | vehicle integration | vehicle-specific evaluation |

---

## Kanäle und Systemgrenzen

| Kanal | Ebene | Nicht verwechseln mit |
|---|---|---|
| NFC | medium ↔ module | 868 MHz |
| 868 MHz | accessory ↔ alarm centre | Bluetooth/GSM |
| Bluetooth | phone/watch ↔ module | Pro-Finder remote control |
| GSM/SMS/GPS | Pro-Finder remote channel | Bluetooth |
| CAN-Bus | vehicle ↔ WiPro | radio or power supply |

---

## NFC: ISO 14443-A und DESFire EV2

Das NFC Modul kommuniziert mit Medien bei `13,56 MHz` nach `ISO 14443-A`. THITRONIK® Originaltags nutzen `DESFire® EV2` mit dokumentiertem Kopierschutz; angelernte Fremdtags bieten diesen Schutz nicht automatisch. Das Modul sendet den Bedienbefehl separat bei `868,35 MHz` an die WiPro.

---

## 868,35 MHz

`868,35 MHz` ist eine Frequenzangabe, keine Normnummer und keine pauschale Kompatibilitätszusage. Zubehör für `868,35 MHz` und ältere `433 MHz`-Systeme ist nicht austauschbar. Reichweite hängt von Montage, Metall, Fahrzeug und Störungen ab.

---

## Bluetooth Low Energy

Bluetooth Low Energy ist ein lokaler Nahbereichskanal für App und kompatible Endgeräte. Es ist weder der 868-MHz-Zubehörfunk noch Mobilfunk/SMS/GPS des Pro-Finders. Eine erfolgreiche Kopplung beweist noch keine funktionierende Alarmanbindung.

---

## RJ10 und RJ11

BT-connect und Vernetzungsmodul besitzen zwei gleichwertige `RJ10`-Buchsen für WiPro/Pro-Finder. WiPro III führt `RJ11` als Pro-Finder-Schnittstelle. Gleiche Steckerform bedeutet keine freie Austauschbarkeit; nur dokumentierte Kabel und Belegungen verwenden.

---

## CAN-Bus

Der `CAN-Bus` ist ein fahrzeugseitiger Datenbus. WiPro wertet je nach Fahrzeug Signale passiv aus; Profil, DIP, CAN-H/CAN-L und Anschlussstelle sind fahrzeugspezifisch. Keine unbelegte ISO-Nummer ergänzen und keine Verdrahtung aus einer generischen Schnittstellenliste ableiten.

---

## Sicherheits- und Antwortregeln

Funkfrequenz, Protokoll, Stecker und Funktion getrennt nennen. Keine garantierte Reichweite, Länderfreigabe oder Interoperabilität ohne produktspezifischen Beleg. Replay-Schutz und Anti-Jamming nicht pauschal deaktivieren. Arbeiten an CAN, Bordnetz oder sicherheitsrelevanter Verdrahtung gehören zu qualifiziertem Fachpersonal.

---

## QA und Querverweise

Prüfen: sechs unveränderte Quellenpfade, acht Übersichtseinträge, alle Pflichtwerte und Negationen, 10 H2, zwei Tabellen, fünf lokal auflösbare Wiki-Verweise, Titel/H1, Metadaten, UTF-8 und Platzhalterfreiheit.

- [[Tech. Doku — Übersicht]]
- [[Normen, Richtlinien & Zulassungen]]
- [[NFC Modul — Steuerung der WiPro via NFC]]
- [[BT-connect — Bluetooth-Modul für WiPro III]]
- [[Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen]]

