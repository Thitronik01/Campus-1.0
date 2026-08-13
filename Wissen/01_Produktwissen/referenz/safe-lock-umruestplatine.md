---
title: safe.lock Umrüstplatine — Schlüsselsicherheit für Ducato/Boxer/Jumper
sources:
  - sources/safe-lock_umruestplatine.pdf
  - sources/FAQ_safe-lock_Umruestplatine__101052_DE.md
  - >-
    sources/safe-lock_Umruestplatine__101052__Legal__Konformitaet_2014-53-EU_DE.md
  - sources/Fragen zu safe.lock Umrüstplatine.pdf
updated: '2026-07-15'
confidence: high
lang: de
dealerStatus: approved
---

# safe.lock Umrüstplatine — Schlüsselsicherheit für Ducato/Boxer/Jumper

Art.-Nr.: 101052 | Revision: 1.3

Die safe.lock Umrüstplatine schließt in Verbindung mit der **WiPro III safe.lock** eine fahrzeugseitige **Sicherheitslücke**, die durch uncodierte Fahrzeugschlüssel verursacht wird.

> **Abgrenzung:** Die Umrüstplatine ist **kein eigenständiges Alarmprodukt**. Sie ergänzt ausschließlich eine vorhandene bzw. gleichzeitig installierte **WiPro III safe.lock**.

---

## Technische Daten

| Parameter | Wert |
|-----------|------|
| Spannungsversorgung | 3 V (CR2032) |
| Batterielebensdauer | ca. 2 Jahre (nutzungsabhängig) |
| Sendefrequenz | 868,35 MHz |
| Sendeleistung | < 10 mW |
| Temperaturbereich | –20 bis +80 °C |

---

## Betroffene Fahrzeuge

| Fahrzeug | Einordnung |
|----------|------------|
| Fiat Ducato / Peugeot Boxer / Citroën Jumper | Basisanleitung: **2006–2012**; spätere Support-FAQ zieht die betroffene Fahrzeugfamilie bis **Modelljahr 2018** |
| Iveco Daily (und baugleiche Modelle) | Basisanleitung: **2006–2012**; THITRONIK-seitig unterstützt ab **Baujahr 2011** |

> **Ab Modelljahr 2019:** Der originale Fahrzeugschlüssel verwendet laut Support-Hinweis einen **Rollcode**. Erkennbar ist das an einer **schwarzen Schlüsselringöse aus Kunststoff** statt der älteren verchromten Metallöse.

**Das Problem:** Die Zentralverriegelung dieser Fahrzeuge wird über eine **unsichere Funkverbindung** des Originalschlüssels gesteuert. Ein aufgezeichnetes **„Entriegeln"-Signal** kann als Replay-Attacke erneut abgespielt werden; das Fahrzeug öffnet dann ohne Einbruchspuren und CAN-basierte Alarmanlagen werden dabei mit entschärft.

**Die Lösung:** Die Umrüstplatine sorgt dafür, dass die Zentralverriegelung **nur noch codiert über die Umrüstplatine** gesteuert wird — nicht mehr über den ursprünglichen, unsicheren Schlüsselfunk.

---

## Voraussetzungen

- **WiPro III safe.lock** (Standardversion WiPro III ist nicht ausreichend)
- **THITRONIK® safe.lock Premiumpartner** für Transponder-Kopiervorgang

---

## Einbau-Schritte

### Schritt 1: Wegfahrsperren-Transponder kopieren lassen

> **KRITISCH:** Dieser Schritt **muss vor dem Einbau** erfolgen. Ohne kopierten Transponder kann der Motor nicht mehr mit dem Schlüssel gestartet werden!

Premiumpartner finden: `www.thitronik.de/haendlerfinder`

### Schritt 2: Umrüstplatine in den Fahrzeugschlüssel einsetzen

1. Schlüsselgehäuse öffnen
2. Originalelektronik entnehmen
3. Kopierten Transponder im Schlüsselgehäuse befestigen (Kleber verwenden)
4. Umrüstplatine einsetzen
5. Fahrzeugschlüssel zusammenbauen

### Schritt 3: Umrüstplatinen anlernen und löschen

Wie im WiPro III safe.lock Handbuch beschrieben.

---

## Handhabung nach dem Umbau

Das Fahrzeug kann mit dem umgerüsteten Schlüssel **wie gewohnt** bedient werden.

**Ausnahme bei 3-Tasten-Schlüsseln:**
- Getrenntes Entriegeln des Laderaums ist **technisch nicht mehr möglich**
- Beide Entriegelungstasten entriegeln das **gesamte Fahrzeug**

---

## Verhalten des Originalschlüssels

- Fahrzeugseitig wird an der originalen Zentralverriegelung **nichts** verändert
- Wird an einem safe.lock-System vorerst **keine** Umrüstplatine verwendet, funktioniert die originale Fernbedienung grundsätzlich weiter
- Die **WiPro III safe.lock** ignoriert diese Original-Funksignale jedoch bewusst; auch mechanisches Entriegeln nimmt die Alarmanlage deshalb nicht automatisch zurück
- Support-Hinweis für unsichere Klappschlüssel ohne safe.lock-Nachrüstung: Knopfzelle entnehmen und das Fahrzeug nur **manuell** öffnen

---

## Produktabgrenzung und Konformität

- Erfordert immer eine **WiPro III safe.lock** als Zentrale
- Dient der **Schlüsselsicherheit**, nicht der eigenständigen Alarmdetektion
- Konformitäts- und Funkhinweise richten sich nach den zum Produkt gehörenden Unterlagen
- Einbau und Transponder-Kopiervorgang gehören in die Hand erfahrener safe.lock Premiumpartner

---

## Häufige Fragen (FAQ)

**Warum muss der Wegfahrsperrentransponder kopiert werden?**
Ohne das Kopieren kann der Motor mit dem umgerüsteten Schlüssel **nicht mehr gestartet** werden. Der Schritt ist zwingend erforderlich.

**Womit befestige ich den kopierten Transponder im Schlüsselgehäuse?**
Es wird ausdrücklich empfohlen, **Kleber** zu verwenden.

**Wie lerne ich die Umrüstplatine an oder lösche sie?**
Wie im Handbuch des jeweiligen Geräts beschrieben (safe.lock Modul oder WiPro III safe.lock) — identischer Vorgang wie bei anderen Funk-Zubehörteilen.

**Was ist bei Fahrzeugen mit 3-Tasten-Schlüssel zu beachten?**
Ein getrenntes Entriegeln des Laderaums ist **nicht mehr möglich** — beide Entriegelungstasten entriegeln das **gesamte Fahrzeug**.

**Woran erkenne ich Fahrzeuge mit neuerer, weniger kritischer Schlüsselgeneration?**
Laut Support-Hinweis ab **Modelljahr 2019** an der **schwarzen Kunststoff-Öse** des Originalschlüssels. Ältere Schlüssel haben an dieser Stelle meist eine verchromte Metallöse.

**Was ist die Gefahr bei einer Replay-Attacke?**
Das Fahrzeug akzeptiert ein aufgezeichnetes **Entriegeln-Signal** wie ein Originalsignal. Dadurch kann es **spurlos geöffnet** werden; CAN-Bus-Alarmanlagen werden dabei ebenfalls entschärft.

---

## Querverweise

- [[WiPro III]]
- [[Fahrzeugkompatibilität]]
- [[Systemüberblick]]
