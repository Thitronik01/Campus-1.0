# Materialabgleich der Arbeitskarte

Fassung 1.4.0, Stand 06.09.2026.

Grundlage ist die vom Nutzer bereitgestellte Abhängigkeitsanalyse und der deutsche Datensatz unter https://www.thitronik.de/configuratorData.json. Der erneute Abruf stimmt mit deren MD5 `827e235c49b9c9565639b3631535767f` überein. Der reduzierte, lokal ausgelieferte Stand enthält 176 auswählbare Fahrzeuge und alle 35 Abhängigkeitsregeln. Preise und ausländische Datensätze gehören nicht zur Arbeitskarte.

## Bedienung

Im Materialbereich das Fahrzeug einschließlich Aufbau und Baujahr auswählen. Nur als **Geplant** oder **Verbaut** markierte Positionen werden geprüft. „Geplant“ bestätigt keinen Einbau. Für WiPro III und safe.lock muss eine konkrete Artikelvariante gewählt werden. Bei Magnetkontakten wird zusätzlich die Anzahl an Garagenklappen erfasst; die Adaptersets werden getrennt nach Farbe berechnet.

Der Abgleich zeigt verpflichtende Ergänzungen aus dem Konfigurator, unzulässige bzw. zu klärende Kombinationen und optionale Hinweise. Er entfernt und verbaut keine Teile automatisch. Fehlendes Zubehör kann im vorhandenen Materialkatalog markiert bzw. über „Eigene Position hinzufügen“ mit seiner Artikelnummer ergänzt werden. Zusatzhupe und Sensor der älteren G.A.S.-pro sind neu im Katalog enthalten. Der Sensor 101289 ist eindeutig als G.A.S.-pro-III-Sensor benannt.

Ein Abschluss ist bei offenen Prüfpunkten erst nach Korrektur oder fachlichem Prüfvermerk möglich. Der Vermerk gilt für den konkreten Fahrzeug- und Materialstand. Mengen, Varianten, Garageneinsatz oder Auswahländerungen machen eine erneute Bestätigung durch Bearbeiten des Vermerks erforderlich. Der PDF-Druck enthält den Abgleich, den Vermerk und separat die noch geplanten Teile. Entwürfe lassen sich jederzeit speichern und drucken.

## Ergänzen und Filtern

Bei fehlendem Zubehör und Montageadaptern bietet der Hinweis „Als geplant ergänzen“ an. Die Aktion berechnet den aktuellen Fehlbedarf erneut und verwendet vorhandene Katalog- oder Planpositionen. Bestätigte Einbaumengen bleiben unverändert; bei teilweisem Einbau wird nur die Restmenge separat geplant. Erneutes Betätigen einer veralteten Aktion erzeugt keine weitere Position. Für am Fahrzeug ausgeblendetes Zubehör wird keine Ergänzungsaktion angeboten.

Die Materialfilter „Alle“, „Geplant“, „Verbaut“ und „Prüfpunkte“ lassen sich mit der Artikelsuche kombinieren. „Geplant“ zeigt noch nicht als verbaut bestätigte Planpositionen. „Prüfpunkte“ zeigt die von offenen Prüfhinweisen betroffenen Positionen; die Zahl am Filter zählt Artikel, die Zusammenfassung zählt dagegen Prüfpunkte. Hinweise selbst bleiben auch bei aktiven Filtern sichtbar. Die Filter verändern keine gespeicherten Materialdaten.

## Auswertungsgrenzen

- Fahrzeugabhängigkeiten und Ausblendungen werden ausschließlich am exakten Fahrzeugknoten geprüft. Sicherheitsmerkmale werden aus dem zugehörigen Fahrzeugpfad gelesen.
- Alle passenden Regeln werden gleichzeitig ausgewertet. Die Regeln ohne Auslöser (26, 239) und das Duplikat 258 bleiben wirkungslos. Regeln für ein zweites gleiches Zubehör greifen erst ab Menge zwei.
- Der aktuelle Materialstand wird nach jeder Änderung neu geprüft. Auch das spätere Entfernen einer Ergänzung wird dadurch erkannt.
- Die Zuordnung von Garagenkontakten erfolgt über den ausdrücklich erfassten Einsatzzweck, nicht allein über die mehrfach verwendete Artikelnummer.
- Die Prüfung kennt die geplanten/verbauten Materialien dieser Karte. Vorhandene, nicht erfasste Komponenten und die konkrete Belegung mehrerer Gaswarner müssen fachlich dokumentiert werden. Freie, nicht zuordenbare Artikel werden als außerhalb des Prüfumfangs gekennzeichnet.
- Pflicht im Konfigurator ist keine uneingeschränkte technische Einbaufreigabe. Insbesondere Abschaltung, Keyless-Ausstattung und Replay-Schutz erfordern die Fahrzeug- und Einbauprüfung. Optionale Empfehlungen werden nicht zu technischen Verboten gemacht.

## Pflege und Prüfung

`public/arbeitskarte/assets/konfigurator-check.js` enthält die Auswertung. `konfigurator-daten.js` ist der versionierte Snapshot. `tools/konfigurator-daten-bauen.mjs <lokale-json-datei>` erzeugt ihn nach einem geprüften neuen Abruf. Dabei Datumsangaben in Werkzeug und Oberfläche mit aktualisieren. Kein automatischer Liveabruf und keine Übertragung von Fahrzeug- oder Kundendaten an den Konfigurator.

Die Arbeitskarte besitzt ihren eigenen Cache-Schlüssel, derzeit `1.4.0`, in HTML und allen relativen Modulimporten. Bestehende Karten werden auf Schema 2 ergänzt; bereits erfasste Kundendaten, Materialien und Unterschriften bleiben erhalten. Bewusst gelöschte neue Katalogpositionen werden nicht bei jedem Laden erneut hinzugefügt.

`node tools/test-arbeitskarte.mjs` prüft Speicherkompatibilität und konkrete Konfiguratorfälle. `node tools/montag.js --ohne-server` prüft zusätzlich alle Paketformen. Browserprüfungen ausschließlich mit `?demo=1`: Fahrzeugwechsel, fehlende/ergänzte Zusatzhupe, aktuelle/überholte Prüfvermerke, mobile Materialschalter und PDF-Druck.
