# RAG-Audit: Funkzubehör und Sicherheit — Derivatquellen

Route: /de/intern/rag-funkzubehoer-sicherheit | Stand: 2026-07-22 | Sichtbarkeit: internal
Quelle: Thitronik Online/project-data/runtime/wiki/wiki-articles/de/intern/rag-funkzubehoer-sicherheit.json

---
RAG-Audit: Funkzubehör und Sicherheit — Derivatquellen

Dieser interne Auditartikel ordnet das Quellenmanifest für Funkzubehör, die safe.lock Umrüstplatine sowie Sirenen und Hupen. Er dient der Redaktion und der RAG-Ingestion; er ist keine Montage-, Bedien- oder Einbauanleitung.

Die im Frontmatter aufgeführten Markdown-Dateien sind deutschsprachige Derivate bereits verarbeiteter Unterlagen, beispielsweise FAQs, Teilkapitel, Abbildungsbeschreibungen und Snippets. Verbindliche Produktentscheidungen dürfen nie allein auf einem solchen Derivat beruhen.

## Zweck und Geltungsbereich

Der Block deckt Funk-Handsender , Funk-Kabelschleifen, Funk-Magnetkontakte, T.S.A. Funk-Rauchmelder , die safe.lock Umrüstplatine sowie Back-up Sirene , Zusatzsirene und Zusatzhupe ab. Fahrzeugabhängige Anschlüsse, Softwarestände und Freigaben gehören nicht in diesen Auditartikel, sondern in den jeweiligen Fahrzeug- oder Basisartikel.

Ziele dieses Artikels:

das Manifest vollständig und nachvollziehbar erfassen,

potenzielle Dubletten vor der Indexierung kennzeichnen,

die Rangfolge der Belege festlegen,

sicherheitsrelevante Aussagen vor Kontextverlust schützen und

eindeutige Abbruchregeln für unbelegte RAG-Antworten definieren.

## Prüfergebnis und Beleggrenze

Prüfkriterium | Ergebnis | 
 Manifest | 239 unterschiedliche Quellpfade | 
 Ablagestruktur | 114 Root-Einträge und 125 Einträge in elf benannten RAG-Packs | 
 Dateinamenvergleich | 129 unterschiedliche Basisdateinamen; 110 Namen kommen sowohl im Root als auch in einem Pack vor und sind potenzielle Dubletten | 
 Sprachfassungen | dieselbe, unveränderte Liste mit 239 deutschen Quellpfaden in allen elf Artikelfassungen | 
 Lokale Verfügbarkeit | die referenzierten Derivatdateien sind im aktuellen Redaktionsbestand nicht vorhanden | 
 Reproduzierbarkeit | Pfade, Mengen und Namen sind prüfbar; Inhalt, Änderungsstand und Bytegleichheit der Derivate derzeit nicht | 

Damit ist das Manifest strukturell geprüft . Eine erneute inhaltliche Gegenprüfung der Derivatdateien ist ohne das zugehörige Quellenarchiv nicht reproduzierbar. Für konkrete Produktaussagen gelten deshalb die freigegebenen Basisartikel und deren Primärquellen.

Die Zahl 239 bezeichnet Referenzen, nicht 239 unabhängige Belege. Auch ein identischer Dateiname beweist ohne Inhalts- oder Hashvergleich noch keine identische Datei.

## Quellenhierarchie und Konfliktregel

Vorrang hat eine verfügbare, produktspezifische Primärquelle mit erkennbarem Revisionsstand.

Danach folgt der freigegebene deutsche Basisartikel, der mehrere Primärquellen und dokumentierte Konfliktentscheidungen zusammenführen kann.

Ein Derivat darf eine bekannte Aussage auffindbar machen, aber keine neue technische Tatsache oder Freigabe begründen.

Readme , Index , Figure und Snippet dienen nur dann als Beleg, wenn die zugrunde liegende Primärstelle eindeutig verknüpft und inhaltlich überprüft ist.

Widerspricht ein Derivat der Primärquelle oder dem freigegebenen Basisartikel, wird es nicht gemittelt oder stillschweigend übernommen. Der höherrangige Beleg gilt; die Abweichung wird dokumentiert. Bleiben Produktvariante, Revisionsstand oder Geltungsbereich unklar, darf das RAG-System keine konkrete Handlungsanweisung erzeugen.

## Abgedeckte Produktfamilien und Basisartikel

Produktfamilie | Artikelnummern im Themenblock | Verbindlicher Basisartikel | 
 Funk- Handsender 868 | 101064 | Funk-Handsender 868 — Fernbedienung für WiPro III | 
 Funk-Kabelschleife 868 | 100761 , 100944 , 101074 | Funk-Kabelschleife 868 — Außensicherung für mobile Güter | 
 Funk-Magnetkontakt 868 | 100757 , 100758 , 106020 | Funk-Magnetkontakt 868 — Montage und Betrieb | 
 T.S.A. Funk-Rauchmelder | 105753 , 105754 | T.S.A. — Funk-Rauchmelder für WiPro III | 
 safe.lock Umrüstplatine | 101052 | safe.lock Umrüstplatine — Schlüsselsicherheit für Ducato/Boxer/Jumper | 
 Sirenen und Hupen | 100089 , 100190 , 105339 | Sirenen und Hupen — Akustische Alarmmittel | 
 Produktübergreifendes Anlernen | — | Anlernvorgang — Funk-Zubehör an WiPro III anlernen | 

Artikelnummer und Variante müssen vor jeder technischen Antwort gemeinsam bestimmt werden. Ähnlich benannte Produkte oder Montagearten dürfen nicht zusammengeführt werden.

## Quellenfamilien im Manifest

Quellenfamilie | Dateien | 
 (root) | 114 | 
 Back-up_Sirene_100089_DE_RAG_Pack | 9 | 
 Funk-Handsender-868_FAQ_DE_RAG_Pack | 7 | 
 Funk-Handsender_868_101064_DE_RAG_Pack | 10 | 
 Funk-Kabelschleifen_868_DE_RAG_Pack | 25 | 
 Funk-Magnetkontakt_868_DE_RAG_Pack (1) | 19 | 
 TSA_Funk-Rauchmelder_DE_RAG_Pack | 21 | 
 Thitronik_FAQ_DE_RAG_Pack | 1 | 
 Thitronik_FAQ_DE_RAG_Pack_Part2 | 3 | 
 Zusatzhupe_105339_DE_RAG_Pack | 10 | 
 Zusatzsirene_100190_DE_RAG_Pack | 8 | 
 safe-lock_Umruestplatine_101052_DE_RAG_Pack | 12 | 
 Gesamt | 239 | 

## Dateitypen im Manifest

Typ | Dateien | Behandlung bei der Ingestion | 
 FAQ | 25 | als kurze Antwort nur mit Produkt- und Variantenkontext | 
 Figure | 24 | nicht ohne zugehörigen Text als Handlungsanweisung verwenden | 
 Guide / HowTo | 65 | Schrittfolge, Voraussetzungen und Warnungen zusammenhalten | 
 Overview / Reference | 57 | Werte gegen Basisartikel und Primärquelle prüfen | 
 Readme / Index | 36 | Navigation und Metadaten, keine eigenständige Produktfreigabe | 
 Snippet | 18 | nur mit Herkunft und vollständigem Aussagekontext indexieren | 
 Sonstiges | 14 | vor der Aufnahme manuell klassifizieren | 
 Gesamt | 239 | | 

## Regeln für die RAG-Ingestion

Den vollständigen Quellpfad als source_id erhalten; den Basisdateinamen nur als candidate_duplicate_key verwenden.

Root- und Pack-Einträge vor der Indexierung gruppieren. Erst ein Inhalts- oder Hashvergleich darf sie als echte Dubletten zusammenführen.

Mindestens product_family , article_number , variant , source_type , source_path , canonical_article , language und revision_status als Metadaten führen.

Deutschsprachige *_DE.md -Quellen auch in übersetzten Auditartikeln als language: de kennzeichnen. Die Übersetzung dieses Artikels ändert nicht die Sprache der Quelle.

Voraussetzungen, Negationen, Warnungen, Variantenbezug und Prüfschritte nicht auf getrennte Chunks verteilen.

Readme , Index und reine Abbildungsbeschreibungen nicht so gewichten, als seien sie unabhängige Produktbelege.

Jede sicherheitsrelevante Antwort auf einen Basisartikel oder eine nachweisbare Primärstelle zurückführen. Fehlt diese Rückverfolgung, keine konkrete Anleitung ausgeben.

## Sicherheitskritische Antwortregeln

Zubehör für 868,35 MHz und ältere 433 MHz -Systeme ist nicht austauschbar. Frequenz und Zielsystem müssen ausdrücklich belegt sein.

Eine Anlernbestätigung beweist noch keine zuverlässige Alarmfunktion. Nach Anlernen oder Montage sind Reichweiten- und realer Auslösetest erforderlich.

Beim Standard-Funk- Magnetkontakt muss die Sende-LED vom Magneten weg zeigen; bei der wasserdichten Ausführung müssen die Gehäusepfeile zueinander zeigen. Diese Regeln dürfen nicht zwischen Varianten übertragen werden.

Für den geschlossenen Magnetkontakt gilt höchstens 22 mm . Das Entfernen auf mehr als 30 mm ist der dokumentierte Auslösewert der wasserdichten Ausführung, kein allgemeiner Montageabstand.

Klebepads nicht unter 15 °C Oberflächentemperatur verarbeiten und ungefähr 24 Stunden bis zur Endfestigkeit nicht belasten.

Batterie-, Anschluss- oder Schlüsselanweisungen nur für die eindeutig bestimmte Artikelnummer ausgeben. Werte wie CR2032 , Sirenenbelegungen oder safe.lock-Schritte niemals pauschal auf die gesamte Themenfamilie übertragen.

Beim T.S.A. Funk-Rauchmelder Test-, Störungs-, Lebensdauer- und Austauschhinweise im Zusammenhang lassen. Aus einer nicht dokumentierten LED-Farbe keine Diagnose ableiten.

Wenn Revisionsstand, Fahrzeugfreigabe, Anschlussbelegung oder Produktvariante fehlt, auf den zuständigen Basisartikel beziehungsweise eine aktuelle Herstellerunterlage verweisen.

## QA- und Freigabecheck

Vor der produktiven Indexierung prüfen:

exakt 239 Manifestpfade und die Summen der beiden Tabellen,

alle potenziellen Root-/Pack-Dubletten als Kandidaten markiert,

Artikelnummern, Produktvarianten und Frequenzen unverändert,

jeder sicherheitsrelevante Chunk mit Warnung, Voraussetzung und Herkunft,

keine eigenständige Freigabe aus FAQ, Readme, Index, Figure oder Snippet,

alle sieben Wiki-Ziele lokal auflösbar und

die fehlende lokale Verfügbarkeit des Derivatarchivs transparent dokumentiert.

Sobald das Quellenarchiv verfügbar ist, folgt ein Inhalts- und Hashvergleich. Erst danach dürfen potenzielle Dubletten zusammengeführt und frühere Aussagen über vollständige Inhaltsgleichheit bestätigt werden.

## Hinweis zum Frontmatter

Die 239 Einträge unter sources: bilden das kanonische Manifest dieses Audits. Die Pfade und deutschen Dateinamen bleiben in allen Sprachfassungen unverändert, damit Herkunft, Dublettengruppen und spätere Hashprüfungen sprachübergreifend vergleichbar bleiben.
