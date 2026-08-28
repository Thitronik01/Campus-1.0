# RAG-Audit: Gas und Sensorik — Derivatquellen

Route: /de/intern/rag-gas-und-sensorik | Stand: 2026-07-22 | Sichtbarkeit: internal
Quelle: Thitronik Online/project-data/runtime/wiki/wiki-articles/de/intern/rag-gas-und-sensorik.json

---
RAG-Audit: Gas und Sensorik — Derivatquellen

Dieser interne Auditartikel ordnet das Quellenmanifest für die G.A.S.-Produktfamilie, den CO-Sensor und den Zusatzsensor G.A.S.-pro III . Er dient der Redaktion und der RAG-Ingestion; er ist keine Montage-, Bedien- oder Gefahrenfallanweisung.

Die im Frontmatter aufgeführten Markdown-Dateien sind deutschsprachige Derivate bereits verarbeiteter Unterlagen, beispielsweise FAQs, Teilkapitel, Abbildungsbeschreibungen und Snippets. Eine verbindliche Produkt- oder Sicherheitsentscheidung darf nie allein auf einem solchen Derivat beruhen.

## Zweck und Geltungsbereich

Der Block deckt G.A.S., G.A.S.-pro , G.A.S.-pro III, G.A.S.-connect , G.A.S.-plug , den CO-Sensor und den Zusatzsensor G.A.S.-pro III ab. Fahrzeugabhängige Anschlüsse, konkrete Softwarefreigaben und individuelle Gefährdungsbeurteilungen gehören in den jeweiligen Basisartikel oder eine aktuelle Herstellerunterlage.

Ziele:

das Manifest vollständig und nachvollziehbar erfassen,

potenzielle Dubletten vor der Indexierung kennzeichnen,

Gasarten, Produktvarianten und Montagezonen getrennt halten,

Warnungen und Alarmabläufe vor Kontextverlust schützen und

unbelegte oder gefährliche RAG-Anweisungen sicher unterbinden.

## Prüfergebnis und Beleggrenze

Prüfkriterium | Ergebnis | 
 Manifest | 206 unterschiedliche Quellpfade | 
 Ablagestruktur | 104 Root-Einträge und 102 Einträge in sechs benannten RAG-Packs | 
 Dateinamenvergleich | 110 unterschiedliche Basisdateinamen; 96 Namen kommen im Root und in einem Pack vor und sind potenzielle Dubletten | 
 Sprachfassungen | dieselbe unveränderte Liste mit 206 deutschen Quellpfaden in allen elf Artikelfassungen | 
 Lokale Verfügbarkeit | die referenzierten Derivatdateien sind im aktuellen Redaktionsbestand nicht vorhanden | 
 Reproduzierbarkeit | Pfade, Mengen und Namen sind prüfbar; Inhalt, Änderungsstand und Bytegleichheit der Derivate derzeit nicht | 

Das Manifest ist damit strukturell geprüft . Eine erneute Inhaltsprüfung der Derivatdateien ist ohne das Quellenarchiv nicht reproduzierbar. Für konkrete Aussagen gelten die freigegebenen Basisartikel und deren Primärquellen.

Die Zahl 206 bezeichnet Referenzen, nicht 206 unabhängige Belege. Auch ein identischer Dateiname beweist ohne Inhalts- oder Hashvergleich keine identische Datei.

## Quellenhierarchie und Konfliktregel

Vorrang hat eine verfügbare, produktspezifische Primärquelle mit erkennbarem Revisionsstand.

Danach folgt der freigegebene deutsche Basisartikel mit seinen dokumentierten Quellen- und Konfliktentscheidungen.

Ein Derivat darf eine bekannte Aussage auffindbar machen, aber keine neue Gasabdeckung, Kompatibilität, Anschlussbelegung oder Freigabe begründen.

Readme , Index , Figure und Snippet dienen nur bei eindeutig verknüpfter und geprüfter Primärstelle als Beleg.

Bei einem Widerspruch gilt der höherrangige Beleg; die Abweichung wird dokumentiert und nicht gemittelt. Bleiben Produktvariante, Sensortyp, Revisionsstand oder Montagezone unklar, darf das RAG-System keine konkrete Anschluss-, Test- oder Montageanweisung erzeugen.

## Abgedeckte Produktfamilien und Basisartikel

Produktfamilie | Artikelnummern im Themenblock | Verbindlicher Basisartikel | 
 G.A.S. | 105700 | G.A.S. — Standalone-Gaswarner mit interner Sirene | 
 G.A.S.-pro, ältere Serie | Hauptgerät nicht eindeutig belegt | G.A.S.-pro (ältere Serie) — Gas- und CO-Alarm | 
 G.A.S.-pro III / G.A.S.-pro III CO | 101286 , 101287 | G.A.S.-pro III — Gaswarner für Freizeitfahrzeuge | 
 G.A.S.-connect | 105750 | G.A.S.-connect — Funk-Gaswarner für WiPro III | 
 G.A.S.-plug „all in one“ | 100042 | G.A.S.-plug „all in one" — Mobiler Gaswarner | 
 CO-Sensor | 100433 | CO-Sensor — Kohlenmonoxid-Zusatzsensor | 
 Zusatzsensor G.A.S.-pro III | 101289 | Zusatzsensor G.A.S.-pro III — Externer Gassensor | 

Produkt, Artikelnummer , Hauptgerätevariante und angeschlossene Sensoren müssen gemeinsam bestimmt werden. Ähnlich benannte Generationen und Sensorarten dürfen nicht zusammengeführt werden.

## Quellenfamilien im Manifest

Quellenfamilie | Dateien | 
 (root) | 104 | 
 CO-Sensor_100433_DE_RAG_Pack | 9 | 
 GAS-pro-III_Kurzanleitungen_DE_RAG_Pack | 23 | 
 GAS-pro-III_Technische-Zusatzinfos_DE_RAG_Pack | 19 | 
 GAS-pro_Handbuch_2.5_DE_RAG_Pack | 18 | 
 GAS_Familie_DE_RAG_Pack | 22 | 
 Zusatzsensor_GAS-pro-III_101289_DE_RAG_Pack | 11 | 
 Gesamt | 206 | 

## Dateitypen im Manifest

Typ | Dateien | Behandlung bei der Ingestion | 
 FAQ | 18 | kurze Antwort nur mit Produkt-, Sensor- und Variantenkontext | 
 Figure | 18 | nicht ohne zugehörigen Text als Montageanweisung verwenden | 
 Guide / HowTo | 90 | Voraussetzungen, Reihenfolge, Warnungen und Abschlussprüfung zusammenhalten | 
 Overview / Reference | 28 | Werte gegen Basisartikel und Primärquelle prüfen | 
 Readme / Index | 20 | Navigation und Metadaten, keine eigenständige Produktfreigabe | 
 Snippet | 14 | nur mit Herkunft und vollständigem Aussagekontext indexieren | 
 Sonstiges | 18 | vor der Aufnahme manuell klassifizieren | 
 Gesamt | 206 | | 

## Regeln für die RAG-Ingestion

Den vollständigen Pfad als source_id erhalten; den Basisdateinamen nur als candidate_duplicate_key verwenden.

Root- und Pack-Einträge vor der Indexierung gruppieren. Erst ein Inhalts- oder Hashvergleich darf echte Dubletten zusammenführen.

Mindestens product_family , article_number , device_variant , sensor_type , detected_gas , source_type , source_path , canonical_article , language und revision_status führen.

Deutschsprachige *_DE.md -Quellen auch in Übersetzungen als language: de kennzeichnen.

Gasart, Montagezone, Voraussetzung, Negation, Warnung, Alarmablauf und Prüfschritt nicht auf getrennte Chunks verteilen.

Readme , Index und reine Abbildungsbeschreibungen nicht wie unabhängige Produktbelege gewichten.

Jede sicherheitsrelevante Antwort auf einen Basisartikel oder eine überprüfbare Primärstelle zurückführen. Fehlt diese Rückverfolgung, keine konkrete Anleitung ausgeben.

## Sicherheitskritische Antwortregeln

Kohlenmonoxid ( CO ) niemals mit Kohlendioxid ( CO₂ ) verwechseln. Ein Sensor für Propan, Butan oder KO-/Narkosegase erkennt nicht automatisch CO; ein CO-Sensor erkennt diese Gase nicht.

Tiefe Montagezonen für Propan-, Butan- und KO-/Narkosegassensoren dürfen nicht auf CO-Sensoren übertragen werden. Produktspezifisch gelten unterschiedliche Bereiche von etwa 10–20 cm beziehungsweise 10–30 cm über dem Boden; der CO-Sensor sitzt etwa 10–30 cm unter der Decke.

CO-Sensor 100433 und Zusatzsensor 101289 arbeiten nicht eigenständig. Hauptgerät, freier Sensoreingang, Software- beziehungsweise Gerätekompatibilität und Sensorbelegung müssen feststehen.

An den einzigen externen Sensoreingang einer G.A.S.-pro III keine zwei Sensoren parallel anschließen.

Keine lösungsmittelhaltigen Klebstoffe, silikonhaltigen Dichtmittel, Lacke oder unkontrollierten Aerosole am Sensor verwenden.

Keinen Sensor mit Feuerzeuggas, offener Flamme, Abgas oder unkontrolliert freigesetztem Prüfstoff testen. Nur ein ausdrücklich freigegebenes Verfahren verwenden.

Aufwärmphase, LED-Normalzustand oder Selbsttest beweisen allein keine vollständige Detektionsfähigkeit. Beim CO-Sensor zusätzlich Exp. Date beachten und abgelaufene Sensoren ersetzen.

Einen Gas- oder CO-Alarm zunächst als reales Ereignis behandeln: Personen sichern, Zündquellen vermeiden, nur gefahrlos lüften und bei CO-Verdacht beziehungsweise Beschwerden medizinische oder professionelle Hilfe veranlassen.

Alarmstummschaltung, Reset oder Spannungsunterbrechung beseitigt keine Gasquelle. Vor weiterer Nutzung Ursache und Betriebsbereitschaft klären.

## QA- und Freigabecheck

Vor der produktiven Indexierung prüfen:

exakt 206 Manifestpfade und die Summen beider Tabellen,

alle potenziellen Root-/Pack-Dubletten als Kandidaten markiert,

Artikelnummern, Produktgenerationen, Sensorarten und Gasarten unverändert,

CO und CO₂ sowie bodennahe und deckennahe Montage klar getrennt,

jeder sicherheitsrelevante Chunk mit Warnung, Voraussetzung, Alarmfolge und Herkunft,

keine Freigabe aus FAQ, Readme, Index, Figure oder Snippet,

alle sieben Wiki-Ziele lokal auflösbar und

die fehlende lokale Verfügbarkeit des Derivatarchivs transparent dokumentiert.

Sobald das Quellenarchiv verfügbar ist, folgt ein Inhalts- und Hashvergleich. Erst danach dürfen potenzielle Dubletten zusammengeführt oder frühere Aussagen über Inhaltsgleichheit bestätigt werden.

## Hinweis zum Frontmatter

Die 206 Einträge unter sources: bilden das kanonische Manifest dieses Audits. Die Pfade und deutschen Dateinamen bleiben in allen Sprachfassungen unverändert, damit Herkunft, Dublettengruppen und spätere Hashprüfungen sprachübergreifend vergleichbar bleiben.
