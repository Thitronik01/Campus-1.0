# RAG-Audit: Konnektivität und Abschaltung — Derivatquellen

Route: /de/intern/rag-konnektivitaet-und-abschaltung | Stand: 2026-07-22 | Sichtbarkeit: internal
Quelle: Thitronik Online/project-data/runtime/wiki/wiki-articles/de/intern/rag-konnektivitaet-und-abschaltung.json

---
RAG-Audit: Konnektivität und Abschaltung — Derivatquellen

Dieser interne Auditartikel ordnet das Quellenmanifest für Bluetooth-, NFC- und Vernetzungsmodule sowie die Abschalteinrichtung am Pro-Finder . Er dient der Redaktion und der RAG-Ingestion; er ist keine Einbau-, Zugangs- oder Fernabschaltungsanleitung.

Die im Frontmatter aufgeführten Markdown-Dateien sind deutschsprachige Derivate bereits verarbeiteter Unterlagen, beispielsweise FAQs, Teilkapitel, Abbildungsbeschreibungen und Snippets. Eine verbindliche Funktions-, Kompatibilitäts- oder Sicherheitsentscheidung darf nie allein auf einem solchen Derivat beruhen.

## Zweck und Geltungsbereich

Der Block deckt BT-connect , das ältere Bluetooth-Vernetzungsmodul, das NFC Modul und die ein- beziehungsweise mehrpolige Abschalteinrichtung ab. Pro-Finder und THITRONIK® App werden als notwendige Systemabhängigkeiten einbezogen. Fahrzeugfreigaben, aktuelle App-/Betriebssystemkompatibilität und fahrzeugspezifische Abschaltleitungen gehören in den jeweiligen Basisartikel oder eine aktuelle Herstellerunterlage.

Ziele:

das Manifest vollständig und nachvollziehbar erfassen,

potenzielle Dubletten vor der Indexierung kennzeichnen,

Bluetooth, NFC, 868-MHz-Funk und GSM/GPS klar trennen,

Zugangs-, Alarm-, Verriegelungs- und Abschaltfunktionen nicht vermischen und

unbelegte oder gefährliche Fernsteuerungsanweisungen sicher unterbinden.

## Prüfergebnis und Beleggrenze

Prüfkriterium | Ergebnis | 
 Manifest | 88 unterschiedliche Quellpfade | 
 Ablagestruktur | 42 Root-Einträge und 46 Einträge in fünf benannten RAG-Packs | 
 Dateinamenvergleich | 58 unterschiedliche Basisdateinamen; 30 Namen kommen im Root und in einem Pack vor und sind potenzielle Dubletten | 
 Sprachfassungen | dieselbe unveränderte Liste mit 88 deutschen Quellpfaden in allen elf Artikelfassungen | 
 Lokale Verfügbarkeit | die referenzierten Derivatdateien sind im aktuellen Redaktionsbestand nicht vorhanden | 
 Reproduzierbarkeit | Pfade, Mengen und Namen sind prüfbar; Inhalt, Änderungsstand und Bytegleichheit der Derivate derzeit nicht | 

Das Manifest ist damit strukturell geprüft . Eine erneute Inhaltsprüfung ist ohne das Quellenarchiv nicht reproduzierbar. Für konkrete Aussagen gelten die freigegebenen Basisartikel und deren Primärquellen.

Die Zahl 88 bezeichnet Referenzen, nicht 88 unabhängige Belege. Auch ein identischer Dateiname beweist ohne Inhalts- oder Hashvergleich keine identische Datei.

## Quellenhierarchie und Konfliktregel

Vorrang hat eine verfügbare, produktspezifische Primärquelle mit erkennbarem Revisionsstand.

Danach folgt der freigegebene deutsche Basisartikel mit dokumentierten Quellen- und Konfliktentscheidungen.

Ein Derivat darf eine bekannte Aussage auffindbar machen, aber keine neue Kompatibilität, Berechtigung, Fahrzeugfreigabe, Anschlussbelegung oder Abschaltlogik begründen.

Readme , Index , Figure und Snippet dienen nur bei eindeutig verknüpfter und geprüfter Primärstelle als Beleg.

Bei einem Widerspruch gilt der höherrangige Beleg; die Abweichung wird dokumentiert und nicht gemittelt. Bleiben Produktgeneration, Softwarestand , Fahrzeugprofil, Bedienweg oder Berechtigung unklar, darf das RAG-System keine konkrete Zugangs-, Anschluss-, Reset- oder Abschaltanweisung erzeugen.

## Abgedeckte Produkte und Basisartikel

Produkt oder Systemrolle | Artikelnummern | Verbindlicher Basisartikel | 
 BT-connect | 106000 | BT-connect — Bluetooth-Modul für WiPro III | 
 Bluetooth-Vernetzungsmodul, Bestandsprodukt | 101290 | Bluetooth-Vernetzungsmodul — Smartphone-Steuerung via Bluetooth | 
 NFC Modul | 105299 | NFC Modul — Steuerung der WiPro via NFC | 
 Abschalteinrichtung | 101283 , 105821 | Abschalteinrichtung — Fahrzeugstilllegung über Pro-Finder | 
 Mobilfunk-, GPS- und Ausgang-A-Steuerung | systemabhängig | Pro-Finder — GSM/GPS Telemetriemodul | 
 App-Befehle und Einrichtung | systemabhängig | THITRONIK® App — Befehle, Einrichtung und Fehlerbehebung | 

Produkt, Artikelnummer , Serienpräfix, Softwarestand, Fahrzeugprofil und gewünschte Funktion müssen gemeinsam bestimmt werden. Das Vernetzungsmodul 101290 und BT-connect 106000 sind verschiedene Produktgenerationen; Speicher-, Reichweiten-, Reset- und Kompatibilitätsangaben dürfen nicht übertragen werden.

## Quellenfamilien im Manifest

Quellenfamilie | Dateien | 
 (root) | 42 | 
 BT-connect_DE_RAG_Pack | 13 | 
 NFC_Modul_105299_DE_RAG_Pack | 17 | 
 Thitronik_FAQ_DE_RAG_Pack | 1 | 
 Thitronik_FAQ_DE_RAG_Pack_Part2 | 1 | 
 Vernetzungsmodul_101290_DE_RAG_Pack | 14 | 
 Gesamt | 88 | 

## Dateitypen im Manifest

Typ | Dateien | Behandlung bei der Ingestion | 
 FAQ | 7 | kurze Antwort nur mit Produkt-, Software- und Bedienkontext | 
 Figure | 13 | nicht ohne zugehörigen Text als Anschluss- oder App-Anweisung verwenden | 
 Guide / HowTo | 18 | Voraussetzungen, Reihenfolge, Warnungen und Abschlussprüfung zusammenhalten | 
 Overview / Reference | 17 | Werte gegen Basisartikel und Primärquelle prüfen | 
 Readme / Index | 14 | Navigation und Metadaten, keine eigenständige Funktionsfreigabe | 
 Snippet | 6 | nur mit Herkunft und vollständigem Aussagekontext indexieren | 
 Sonstiges | 13 | vor der Aufnahme manuell klassifizieren | 
 Gesamt | 88 | | 

## Regeln für die RAG-Ingestion

Den vollständigen Pfad als source_id erhalten; den Basisdateinamen nur als candidate_duplicate_key verwenden.

Root- und Pack-Einträge vor der Indexierung gruppieren. Erst ein Inhalts- oder Hashvergleich darf echte Dubletten zusammenführen.

Mindestens product_family , article_number , serial_prefix , software_version , control_channel , vehicle_profile , source_type , source_path , canonical_article , language und revision_status führen.

Deutschsprachige *_DE.md -Quellen auch in Übersetzungen als language: de kennzeichnen.

Voraussetzung, Berechtigung, Reichweitengrenze, Warnung, Negation, Resetwirkung und Abschlussprüfung nicht auf getrennte Chunks verteilen.

App-Schaltflächen oder historische Kompatibilitätsmatrizen nicht als dauerhafte Hardware- oder Betriebssystemfreigabe behandeln.

Jede sicherheitsrelevante Antwort auf einen Basisartikel oder eine überprüfbare Primärstelle zurückführen. Fehlt diese Rückverfolgung, keine konkrete Anleitung ausgeben.

## Sicherheitskritische Antwortregeln

Bluetooth ist ein lokaler Nahbereichsweg und weder GSM-Fernsteuerung noch GPS-Ortung. BT-connect und Vernetzungsmodul ersetzen den Pro-Finder nicht.

Scharf-/Unscharfschalten und Ver-/Entriegeln sind getrennte Funktionen. Eine sichtbare App-Schaltfläche oder erfolgreiche Kopplung beweist keine fahrzeugseitige Zentralverriegelungsfunktion.

Smartphone, Smartwatch oder NFC-Medium nicht als einzigen Zugang einplanen. Nach Kopplung, Update, Reset oder Batteriewechsel den unabhängigen Backup-Zugang und alle gewünschten Funktionen prüfen.

Beim NFC Modul sind 13,56 MHz zwischen Medium und Modul sowie 868,35 MHz zwischen Modul und Alarmzentrale getrennte Funkebenen. Tag-Speicher und WiPro-Senderspeicher sind ebenfalls getrennt.

Das NFC Modul nicht als erste Funk-Komponente nach einem Gesamtlöschen anlernen; zuerst einen Funk-Handsender 868 als Master- Handsender speichern.

Ein vollständiger Bluetooth- oder NFC-Reset kann alle gespeicherten berechtigten Geräte beziehungsweise Medien löschen. Betroffene Nutzer vorher ermitteln und danach nur autorisierte Zugänge neu anlernen.

Die Abschalteinrichtung darf nur durch eine qualifizierte Fachwerkstatt und nach fahrzeugspezifischer Anleitung eingebaut werden. Sie ist ein Notfallsystem, keine Dauer-Wegfahrsperre.

Für die Stilllegung ausschließlich den Pro-Finder-Befehl kill verwenden. Er wartet auf mindestens 5 Sekunden durchgehend 0 km/h . Niemals a an verwenden: Dieser Befehl schaltet Ausgang A ohne Geschwindigkeitsprüfung und könnte die Zündung während der Fahrt unterbrechen.

Zur Reaktivierung gilt der dokumentierte Befehl a aus . Eine Stilllegung so bald wie möglich aufheben und die Höchstdauer von drei Tagen nicht überschreiten; der erhöhte Stromverbrauch kann die Starterbatterie entladen.

Reset, Entkopplung oder Deaktivierung nicht mit einer behobenen Ursache gleichsetzen. Alarm-, Verriegelungs-, Ausgangs- und Fahrzeugzustand anschließend getrennt kontrollieren.

## QA- und Freigabecheck

Vor der produktiven Indexierung prüfen:

exakt 88 Manifestpfade und die Summen beider Tabellen,

alle potenziellen Root-/Pack-Dubletten als Kandidaten markiert,

Artikelnummern, Produktgenerationen, Bedienwege und Funkstandards unverändert,

kill , a an und a aus in Bedeutung und Warnung nicht verwechselt,

5 Sekunden , 0 km/h und drei Tage vollständig im Abschaltkontext,

lokale und entfernte Bedienwege sowie Alarm und Zentralverriegelung getrennt,

jeder sicherheitsrelevante Chunk mit Voraussetzung, Berechtigung, Warnung und Herkunft,

alle sechs Wiki-Ziele lokal auflösbar und

die fehlende lokale Verfügbarkeit des Derivatarchivs transparent dokumentiert.

Sobald das Quellenarchiv verfügbar ist, folgt ein Inhalts- und Hashvergleich. Erst danach dürfen potenzielle Dubletten zusammengeführt oder frühere Aussagen über Inhaltsgleichheit bestätigt werden.

## Hinweis zum Frontmatter

Die 88 Einträge unter sources: bilden das kanonische Manifest dieses Audits. Die Pfade und deutschen Dateinamen bleiben in allen Sprachfassungen unverändert, damit Herkunft, Dublettengruppen und spätere Hashprüfungen sprachübergreifend vergleichbar bleiben.
