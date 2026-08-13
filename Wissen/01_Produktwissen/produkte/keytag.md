---
title: KeyTag - NFC-Zugangsmedium
sources:
  - https://www.thitronik.de/produkte/produkt/keytag/
  - https://www.thitronik.de/produkte/produkt/nfc-modul/
  - sources/nfc_modul-kurzanleitung.pdf
  - wiki/nfc-modul.md
  - wiki/zugang-bedienung.md
updated: 2026-07-07
confidence: high
dealerStatus: approved
lang: de
---

# KeyTag - NFC-Zugangsmedium

KeyTag ist ein NFC-Zugangsmedium fuer das THITRONIK NFC Modul. Es dient als beruehrungsnaher Transponder zum Scharf-/Unscharfschalten und, bei passender safe.lock-Anbindung, zum Ver-/Entriegeln.

## Kompatibilitaet

- Erforderlich ist ein montiertes und angelerntes [[NFC Modul]].
- Kompatible Alarmanlagen folgen dem NFC Modul: WiPro III, WiPro III safe.lock, WiPro easy und C.A.S. III.
- Ver-/Entriegeln der Zentralverriegelung ist nur mit WiPro III safe.lock und geeigneter Fahrzeuganbindung moeglich.
- Pro NFC Modul sind insgesamt bis zu 14 NFC-Medien speicherbar.

## Technische Daten

| Parameter | Value |
|-----------|-------|
| Article no. | 105301 |
| Kompatibilität | THITRONIK NFC Modul |
| Frequency | 13,56 MHz |
| NFC range | ca. 20 mm |
| Dimensions | 45 x 30 x 4 mm |
| Gewicht | 4,5 g |

## Anwendungsfaelle

- Kleiner Anhaenger fuer Tasche, Guertel oder Schluesselbund.
- Robustes, wasserdichtes Medium fuer Aktivitaeten ohne Fahrzeugschluessel.
- Diskretes Backup neben Funk-Handsender oder BT-connect.

## Montage / Einrichtung

1. NFC Modul in den Anlernmodus bringen.
2. Zugangsmedium direkt an die markierte NFC-Flaeche halten.
3. Bestaetigung am NFC Modul abwarten.
4. Funktion am Fahrzeug testen: scharf/unscharf, bei WiPro III safe.lock zusaetzlich Ver-/Entriegeln.

## Grenzen & typische Fehler

- KeyTag ist kein eigenstaendiger Sender und funktioniert nur am NFC Modul.
- Metallbedampfte, beheizbare oder dicke Scheiben koennen die NFC-Reichweite reduzieren.
- Fremd-Tags koennen je nach Typ kopierbar sein; fuer sicherheitsrelevanten Betrieb THITRONIK Originalmedien verwenden.
- Wird mit dem Originalschluessel verriegelt, koennen safe.lock-Fahrzeuglogiken den spaeteren Zugang ueber THITRONIK Zubehoer einschraenken.

## FAQ

**Can KeyTag control WiPro directly?**
No. The NFC Modul evaluates the medium and then sends the command to WiPro via 868,35 MHz.

**Can it operate central locking?**
Yes, but only with WiPro III safe.lock and a suitable vehicle connection.

**What is the key support check?**
First check whether the NFC Modul is paired correctly and whether the medium is reliably detected at the mounting position.

## Artikelnummern

| Art.-Nr. | Variant |
|---------|---------|
| 105301 | KeyTag |

## Quellenhinweis

Technische Daten und Reichweiten stammen aus den offiziellen THITRONIK Produktseiten sowie aus der NFC Modul Dokumentation im lokalen Quellenbestand.

## Querverweise

- [[NFC Modul]]
- [[Zugangsmedien & Bedienung]]
- [[WiPro III]]
- [[KeyCard]]
- [[KeyTag]]
- [[KeyStrap]]
