---
title: Mobilfunk und SIM-Karten — Pro-Finder sicher in Betrieb nehmen
sources:
  - sources/APP.docx
  - sources/Anbieter.docx
  - sources/Handy.docx
  - sources/Pro-finder_Update_2018.docx
updated: '2026-07-15'
confidence: high
lang: de
dealerStatus: approved
---

# Mobilfunk und SIM-Karten — Pro-Finder sicher in Betrieb nehmen

Diese Seite erklärt, wie eine SIM-Karte für den Pro-Finder ausgewählt, vorbereitet und geprüft wird. Maßgeblich sind die vollständige Pro-Finder-Seriennummer, die Leistungen des Tarifs und das aktuell verfügbare Mobilfunknetz — nicht allein die Bezeichnung „4G“ oder „5G“ auf der SIM-Verpackung.

---

## Schnellcheck

- Vollständige Seriennummer des Pro-Finders ablesen; führende Nullen beibehalten.
- Passendes SIM-Format und die richtige PIN-Einstellung anhand der Tabelle wählen.
- Tarif mit **klassischen SMS und Telefonie** verwenden. Eine reine Daten-SIM ist ungeeignet.
- Karte aktivieren, Rufnummer und gegebenenfalls Guthaben prüfen.
- Mailbox, Rufumleitungen und störende Komfortdienste über das Kundenkonto, den Anbieter oder ein Smartphone deaktivieren.
- Die SIM zuerst im Smartphone mit einem Anruf und einer klassischen SMS testen, dann in den spannungsfreien Pro-Finder einsetzen.
- Bei Auslandsnutzung Roaming, Partnernetz und Kosten vorab beim Anbieter prüfen.
- Erst danach den Pro-Finder per Programmier-SMS einrichten.

> **Wichtig:** Eine erfolgreiche Registrierung im Smartphone beweist noch nicht, dass Tarif und Netz am Einbauort zum Pro-Finder passen.

---

## SIM-Format und PIN nach Seriennummer

`100699` ist die Artikelnummer der Produktfamilie. Die Gerätegeneration wird dagegen über die Seriennummer mit dem Präfix `0699` bestimmt.

| Pro-Finder-Seriennummer | Mobilfunk-Hardware | SIM-Format | PIN-Einstellung |
|---|---|---|---|
| `0699-001` bis `0699-007` | ältere Generation | Mini-SIM | PIN `0000`, PIN-Abfrage aktiv |
| `0699-008` bis `0699-044` | ältere Generation | Micro-SIM | PIN `0000`, PIN-Abfrage aktiv |
| ab `0699-045` | LTE-fähige Generation | Nano-SIM | PIN-Abfrage vollständig deaktivieren |

- Keine SIM mit Gewalt einsetzen und möglichst keinen zugeschnittenen Adapter verwenden.
- Ab `0699-045` muss nicht nur die PIN bekannt sein: Die PIN-Abfrage muss im Smartphone wirklich ausgeschaltet werden.
- Bei älteren Geräten bleibt die PIN-Abfrage aktiv und die PIN wird auf exakt `0000` gesetzt.
- Details zu Hardware- und Softwareständen stehen unter [[Seriennummern und Softwarestände — Präfixe, Schwellen und Meilensteine]].

---

## Anforderungen an Karte und Tarif

### Erforderliche Dienste

| Merkmal | Anforderung |
|---|---|
| SMS | Klassische SMS müssen gesendet und empfangen werden können. |
| Telefonie | Eingehende und ausgehende Anrufe müssen möglich sein. |
| Eigene Rufnummer | Die Nummer muss bekannt und eindeutig erreichbar sein. |
| Mobile Daten | Für die SMS-Steuerung des Pro-Finders nicht erforderlich; das Smartphone benötigt für App- und Kartendienste gegebenenfalls Datenzugang. |
| Prepaid oder Vertrag | Beides ist möglich, wenn die übrigen Anforderungen erfüllt sind. |

Eine als 5G vermarktete SIM ist nicht automatisch ungeeignet. Entscheidend ist, ob der Tarif zusätzlich die vom jeweiligen Pro-Finder unterstützte Mobilfunktechnik sowie SMS und Telefonie bereitstellt. Ein 5G-only-, Daten-only- oder SMS-loser IoT-Tarif ist ungeeignet.

Eine Multi-SIM ist nur nach Einzelfallprüfung sinnvoll. Für klare Zustellung und einfache Diagnose ist eine eigene Rufnummer für den Pro-Finder vorzuziehen.

### Prepaid und Guthabenabfrage

- Guthaben, Gültigkeit und automatische Aufladung so organisieren, dass die Karte nicht unbemerkt gesperrt wird.
- Den Buchstaben `P` in der Programmier-SMS nur bei Prepaid verwenden.
- Ein Guthaben-Abfragecode wie `*100#` ist nur ein anbieterspezifisches Beispiel und muss zum Provider passen.
- Bei einer Vertragskarte darf kein Guthaben-Abfragecode programmiert sein. Eine falsche Abfrage kann Alarmmeldungen verzögern oder blockieren, während der Pro-Finder auf die Providerantwort wartet.
- Die genaue SMS-Syntax steht unter [[THITRONIK® App — Befehle, Einrichtung und Fehlerbehebung]].

---

## Netzkompatibilität aktuell prüfen

Mobilfunknetze und Roamingvereinbarungen ändern sich. Deshalb gibt es keine dauerhafte Freigabeliste einzelner Provider und keine statische Abschalttabelle nach Ländern.

Vor Kauf oder Reise beim Anbieter prüfen:

1. Welche Mobilfunktechnik unterstützt der konkrete Pro-Finder anhand seiner Seriennummer?
2. In welchem Netz arbeitet der Tarif tatsächlich? Bei einem virtuellen Anbieter zählt auch das Hostnetz.
3. Sind SMS und Telefonie in diesem Tarif und am Einsatzort verfügbar?
4. Wird bei Auslandsnutzung in ein kompatibles Partnernetz eingebucht?
5. Sind Roaming, SMS und Telefonie freigeschaltet und entstehen zusätzliche Kosten?
6. Bleibt die SIM dauerhaft aktiv, oder gelten Auflade- und Nutzungsfristen?

Ältere interne Erfahrungen mit bestimmten Anbietern sind nur Fehlerhinweise aus dem damaligen Stand. Sie sind keine aktuelle Produktfreigabe. Bei unklarer SMS-Kommunikation ist ein Gegenversuch mit einer bekannten, funktionierenden Referenzkarte sinnvoll.

---

## SIM im Smartphone vorbereiten

1. SIM aktivieren und eventuelle Identitätsprüfung abschließen.
2. PIN entsprechend der Seriennummerntabelle einstellen.
3. Mailbox, Rufumleitungen und Komfortdienste deaktivieren. Die nötigen Codes sind anbieter- und geräteabhängig; deshalb nur bestätigte Angaben des Providers verwenden.
4. Rufnummer, Tarifstatus und bei Prepaid das Guthaben prüfen.
5. Einen ausgehenden und einen eingehenden Anruf testen.
6. Eine klassische SMS senden und empfangen.
7. Für Reisen Roaming erst nach Prüfung von Tarif, Partnernetz und Kosten aktivieren.
8. Smartphone ausschalten, SIM entnehmen und nur bei spannungsfreiem Pro-Finder einsetzen.

### Android und RCS

Programmierbefehle müssen als klassische SMS gesendet werden. Wenn Google Messages oder eine andere Nachrichten-App den Text als RCS-/Chatnachricht versendet, die RCS-Chats für die Einrichtung vorübergehend deaktivieren und anschließend den Versandtyp kontrollieren. Sonderzeichen, automatische Formatierung und Leerzeichen in der Programmier-SMS vermeiden.

### iPhone und iMessage

Programmierbefehle dürfen nicht als iMessage versendet werden. Für die Einrichtung den Versand als SMS sicherstellen. Wurde die Pro-Finder-Rufnummer zuvor mit iMessage verknüpft, iMessage für diese Nummer deaktivieren beziehungsweise die Nummer bei Apple abmelden.

---

## Einbau und Funktionstest

1. Pro-Finder spannungsfrei schalten.
2. SIM in der richtigen Lage und ohne Gewalt einsetzen.
3. Spannung wieder einschalten und das Einbuchen abwarten.
4. Programmier-SMS exakt und ohne zusätzliche Leerzeichen senden.
5. Antwort-SMS prüfen.
6. Pro-Finder anrufen und einen kontrollierten Alarmtest durchführen.
7. Bei Prepaid nach dem Test das verbleibende Guthaben prüfen.

Ein Testanruf liefert nur einen Hinweis:

| Beobachtung | Mögliche Ursache / nächster Schritt |
|---|---|
| Mailbox nimmt ab | Mailbox oder Rufumleitung ist noch aktiv. |
| Ansage „Nummer nicht vergeben“ | Aktivierung, Rufnummer oder Kartenstatus beim Anbieter prüfen. |
| Sofort nicht erreichbar | Empfang, Einbuchung, Netzkompatibilität und Versorgung prüfen. |
| Anruf erreicht das Gerät, aber keine SMS-Antwort | SMS-Dienst, Programmierung, Guthaben und Nachrichtenformat prüfen. |

Das konkrete Rufverhalten kann sich je nach Provider unterscheiden und ist kein alleiniger Funktionsnachweis.

---

## Fehler systematisch eingrenzen

- Seriennummer, SIM-Format und PIN-Regel erneut abgleichen.
- Karte im Smartphone auf Anruf und klassische SMS testen.
- Tarifstatus, Guthaben, Sperren, Mailbox, Rufumleitungen und Roaming prüfen.
- RCS beziehungsweise iMessage als Übertragungsweg ausschließen.
- Programmier-SMS Zeichen für Zeichen mit dem gültigen Beispiel vergleichen.
- Empfang und LED-Zustand am tatsächlichen Einbauort prüfen.
- Wenn möglich, SIM und Pro-Finder getrennt mit einer bekannten Referenzkarte beziehungsweise einem bekannten Gerät gegenprüfen.
- Ergebnisse mit vollständiger Seriennummer, Anbieter, Tarif, Land, Hostnetz, LED-Zustand und exaktem Fehlerbild dokumentieren.

Die generationsabhängigen LED-Zustände und weiteren Prüfschritte stehen unter [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme]]. Für eine Eskalation die Angaben aus [[Support-Fallaufnahme — Pflichtangaben und Eskalationsprüfung]] verwenden.

---

## Querverweise

- [[Pro-Finder — GSM/GPS Telemetriemodul]]
- [[THITRONIK® App — Befehle, Einrichtung und Fehlerbehebung]]
- [[Seriennummern und Softwarestände — Präfixe, Schwellen und Meilensteine]]
- [[Störungsbeseitigung — Sichere Diagnose häufiger Probleme]]
- [[Support-Fallaufnahme — Pflichtangaben und Eskalationsprüfung]]
