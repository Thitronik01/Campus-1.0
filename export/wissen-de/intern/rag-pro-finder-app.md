# RAG-Audit: Pro-Finder und App — Derivatquellen

Route: /de/intern/rag-pro-finder-app | Stand: 2026-07-22 | Sichtbarkeit: internal
Quelle: Thitronik Online/project-data/runtime/wiki/wiki-articles/de/intern/rag-pro-finder-app.json

---
RAG-Audit: Pro-Finder und App — Derivatquellen

Dieser interne Auditartikel ordnet das Quellenmanifest für Pro-Finder, THITRONIK® App, SMS-Befehle, Mobilfunk/SIM und die sichere Fahrzeugstilllegung . Er dient der Redaktion und der RAG-Ingestion; er ist keine Einrichtungs-, Ortungs- oder Fernabschaltungsanleitung.

Die im Frontmatter aufgeführten Markdown-Dateien sind deutschsprachige Derivate bereits verarbeiteter Unterlagen, beispielsweise FAQs, Abbildungsbeschreibungen, Befehlsauszüge, Readmes und Snippets. Eine verbindliche Funktions-, Kompatibilitäts- oder Sicherheitsentscheidung darf nie allein auf einem solchen Derivat beruhen.

## Zweck und Geltungsbereich

Der Block deckt Pro-Finder, App-Einrichtung, Programmier-SMS, Bedienbefehle, SIM-/Netzfragen, Position und Geofencing sowie Ausgangs- und Kill-Funktionen ab. Gerätegeneration, Sprache, Softwarestand , SIM-Tarif, Fahrzeuganbindung und angeschlossenes Zubehör bestimmen gemeinsam den tatsächlichen Funktionsumfang.

Ziele:

das Manifest vollständig und nachvollziehbar erfassen,

potenzielle Dubletten vor der Indexierung kennzeichnen,

App, klassische SMS, Anruf, GSM/LTE, GPS und Bluetooth klar trennen,

Befehle, Berechtigungen und generationsabhängige Voraussetzungen im Zusammenhang halten und

unbelegte oder gefährliche Ortungs- und Fernsteuerungsanweisungen sicher unterbinden.

## Prüfergebnis und Beleggrenze

Prüfkriterium | Ergebnis | 
 Manifest | 79 unterschiedliche Quellpfade | 
 Ablagestruktur | 31 Root-Einträge und 48 Einträge in vier benannten RAG-Packs | 
 Dateinamenvergleich | 48 unterschiedliche Basisdateinamen; 31 Namen kommen im Root und in einem Pack vor und sind potenzielle Dubletten | 
 Sprachfassungen | dieselbe unveränderte Liste mit 79 deutschen Quellpfaden in allen elf Artikelfassungen | 
 Lokale Verfügbarkeit | die referenzierten Derivatdateien sind im aktuellen Redaktionsbestand nicht vorhanden | 
 Reproduzierbarkeit | Pfade, Mengen und Namen sind prüfbar; Inhalt, Änderungsstand und Bytegleichheit der Derivate derzeit nicht | 

Das Manifest ist damit strukturell geprüft . Eine erneute Inhaltsprüfung ist ohne das Quellenarchiv nicht reproduzierbar. Für konkrete Aussagen gelten die freigegebenen Basisartikel und deren Primärquellen.

Die Zahl 79 bezeichnet Referenzen, nicht 79 unabhängige Belege. Auch ein identischer Dateiname beweist ohne Inhalts- oder Hashvergleich keine identische Datei.

## Quellenhierarchie und Konfliktregel

Vorrang hat eine verfügbare, produktspezifische Primärquelle mit erkennbarem Revisionsstand.

Danach folgt der freigegebene deutsche Basisartikel mit dokumentierten Quellen- und Konfliktentscheidungen.

Ein Derivat darf eine bekannte Aussage auffindbar machen, aber keine neue Befehlssyntax, Absenderberechtigung, SIM-/Netzfreigabe, Fahrzeugfunktion oder Abschaltlogik begründen.

Readme , Index , Figure und Snippet dienen nur bei eindeutig verknüpfter und geprüfter Primärstelle als Beleg.

Bei einem Widerspruch gilt der höherrangige Beleg; die Abweichung wird dokumentiert und nicht gemittelt. Bleiben Seriennummer , Gerätesprache, Softwarestand, SIM-Typ, Absenderberechtigung oder Fahrzeugprofil unklar, darf das RAG-System keine konkrete Programmier-, Bedien- oder Abschaltanweisung erzeugen.

## Abgedeckte Systeme und Basisartikel

System oder Themenbereich | Artikelnummern | Verbindlicher Basisartikel | 
 Pro-Finder | 100699 , Serienpräfix 0699- | Pro-Finder — GSM/GPS Telemetriemodul | 
 THITRONIK® App und SMS-Befehle | systemabhängig | THITRONIK® App — Befehle, Einrichtung und Fehlerbehebung | 
 Mobilfunk und SIM | generations- und tarifabhängig | Mobilfunk und SIM-Karten — Pro-Finder sicher in Betrieb nehmen | 
 Sichere Diagnose | systemübergreifend | Störungsbeseitigung — Sichere Diagnose häufiger Probleme | 
 Abschalteinrichtung | 101283 , 105821 | Abschalteinrichtung — Fahrzeugstilllegung über Pro-Finder | 

Artikelnummer 100699 ist keine Geräteseriennummer. Für jede technische Entscheidung die vollständige Seriennummer einschließlich führender Null, die programmierte Gerätesprache, den tatsächlichen Softwarestand, die SIM und die gewünschte Funktion gemeinsam bestimmen.

## Quellenfamilien im Manifest

Quellenfamilie | Dateien | 
 (root) | 31 | 
 Abschalteinrichtung_Pro-finder_DE_RAG_Pack | 14 | 
 Pro-finder_DE_RAG_Pack | 28 | 
 Thitronik_FAQ_App_und_Allgemein_DE_RAG_Pack | 5 | 
 Thitronik_FAQ_DE_RAG_Pack | 1 | 
 Gesamt | 79 | 

## Dateitypen im Manifest

Typ | Dateien | Behandlung bei der Ingestion | 
 FAQ | 9 | kurze Antwort nur mit Generation, Sprache, SIM- und Funktionskontext | 
 Figure | 5 | nicht ohne zugehörigen Text als App- oder Anschlussanweisung verwenden | 
 Overview / Reference | 2 | Syntax und Werte gegen Basisartikel und Primärquelle prüfen | 
 Readme / Index | 6 | Navigation und Metadaten, keine eigenständige Funktionsfreigabe | 
 Snippet | 6 | nur mit Herkunft und vollständigem Aussagekontext indexieren | 
 Sonstiges | 51 | vor der Aufnahme manuell klassifizieren | 
 Gesamt | 79 | | 

## Regeln für die RAG-Ingestion

Den vollständigen Pfad als source_id erhalten; den Basisdateinamen nur als candidate_duplicate_key verwenden.

Root- und Pack-Einträge vor der Indexierung gruppieren. Erst ein Inhalts- oder Hashvergleich darf echte Dubletten zusammenführen.

Mindestens article_number , serial_number , hardware_generation , software_version , device_language , sim_type , sender_authorization , control_channel , command_token , source_path , canonical_article , language und revision_status führen.

Deutschsprachige *_DE.md -Quellen auch in Übersetzungen als language: de kennzeichnen.

Befehl, Gerätesprache, Parameter, Berechtigung, Voraussetzung, Warnung und erwartete Antwort nicht auf getrennte Chunks verteilen.

Befehle niemals frei übersetzen. Die gültige Syntax richtet sich nach der im Pro-Finder programmierten Sprache und der freigegebenen Befehlsmatrix.

App-Schaltflächen, Ersatz-Seriennummern, historische Providerhinweise oder frühere Netzabdeckungen nicht als dauerhafte Hardware-, Tarif- oder Länderfreigabe behandeln.

Jede sicherheitsrelevante Antwort auf einen Basisartikel oder eine überprüfbare Primärstelle zurückführen. Fehlt diese Rückverfolgung, keine konkrete Anleitung ausgeben.

## Sicherheitskritische Antwortregeln

100699 bezeichnet die Produktfamilie; die Gerätegeneration ergibt sich aus der vollständigen Seriennummer mit Präfix 0699- . Führende Nullen niemals entfernen.

Für 0699-001 bis 0699-044 gelten je nach Teilbereich Mini- oder Micro-SIM und PIN 0000 bei aktiver PIN-Abfrage. Ab 0699-045 gilt Nano-SIM und vollständig deaktivierte PIN-Abfrage. Diese Regeln nicht vermischen.

Die SIM benötigt klassische SMS, Telefonie und eine eindeutig erreichbare Rufnummer. Eine reine Daten-SIM ist ungeeignet; mobile Daten sind für die SMS-Steuerung des Pro-Finders nicht erforderlich.

Programmier- und Bediennachrichten als klassische SMS senden, nicht als RCS oder iMessage. Keine zusätzlichen Leerzeichen, typografischen Anführungszeichen oder automatische Formatierung einfügen.

Die erste mit + programmierte Rufnummer ist die Masternummer. Eine mit - hinterlegte Zielrufnummer erhält Meldungen, besitzt aber keine Steuerungsberechtigung. Absenderberechtigung niemals aus bloßem SMS-Empfang ableiten.

P und ein Guthaben-Abfragecode gehören nur zu einer passenden Prepaid-Konfiguration. Bei Vertragskarten keinen Abfragecode programmieren; ein falscher Providercode kann Alarmmeldungen verzögern oder blockieren.

Bedienbefehle hängen von der Gerätesprache ab. Deutsche Beispiele wie scharf , unscharf , fence an , fence aus , a an und a aus dürfen nicht ungeprüft für anderssprachig programmierte Geräte verwendet werden. kill bleibt der dokumentierte Sicherheitsbefehl zur Stilllegung.

Für die Fahrzeugstilllegung ausschließlich kill verwenden. Der Befehl wartet auf mindestens 5 Sekunden durchgehend 0 km/h . a an und a N schalten Ausgang A ohne Geschwindigkeitsprüfung und dürfen nicht zur Stilllegung verwendet werden. Aufhebung mit dem zur Gerätesprache passenden Befehl für Ausgang A aus; bei Deutsch a aus .

Der Pro-Finder ist kein Live-Tracking-System und speichert keine Reiseroute. Geofencing-Grenzen von etwa 500 m bis 1 km sind keine präzise Geometrie; bei GPS: Standby kann die letzte gültige, nicht aktuelle Position übertragen werden.

Ortung und Fernbefehle benötigen Mobilfunk- beziehungsweise Satellitenempfang und können verzögert sein. Bei Diebstahl nicht selbst eingreifen; Standortdaten an zuständige Stellen weitergeben.

Eine in der App eingetragene Ersatz-Seriennummer schaltet keine Hardwarefunktion frei und rüstet kein LTE-Modem nach. Sichtbare Schaltflächen stets gegen tatsächliche Geräte, Software, Fahrzeuganbindung und Zubehör prüfen.

Mobilfunknetze, Roaming und Providerangebote ändern sich. Keine statische Provider- oder Länderfreigabe aus historischen FAQs ableiten; Tarif, Hostnetz, SMS, Telefonie und Roaming aktuell prüfen.

## QA- und Freigabecheck

Vor der produktiven Indexierung prüfen:

exakt 79 Manifestpfade und die Summen beider Tabellen,

alle potenziellen Root-/Pack-Dubletten als Kandidaten markiert,

Artikel- und Seriennummer, Gerätesprache, SIM-Generation und PIN-Regel getrennt,

alle Befehle zeichengetreu und mit der richtigen Sprach- und Berechtigungsangabe,

kill , a an , a N und a aus nicht in Wirkung oder Warnung verwechselt,

5 Sekunden , 0 km/h , 500 m bis 1 km und GPS: Standby vollständig im Kontext,

klassische SMS klar von RCS, iMessage, App-Darstellung und Bluetooth getrennt,

jeder sicherheitsrelevante Chunk mit Voraussetzung, Berechtigung, Warnung und Herkunft,

alle fünf Wiki-Ziele lokal auflösbar und

die fehlende lokale Verfügbarkeit des Derivatarchivs transparent dokumentiert.

Sobald das Quellenarchiv verfügbar ist, folgt ein Inhalts- und Hashvergleich. Erst danach dürfen potenzielle Dubletten zusammengeführt oder frühere Aussagen über Inhaltsgleichheit bestätigt werden.

## Hinweis zum Frontmatter

Die 79 Einträge unter sources: bilden das kanonische Manifest dieses Audits. Die Pfade und deutschen Dateinamen bleiben in allen Sprachfassungen unverändert, damit Herkunft, Dublettengruppen und spätere Hashprüfungen sprachübergreifend vergleichbar bleiben.
