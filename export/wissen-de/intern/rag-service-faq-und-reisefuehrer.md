# RAG-Audit: Service, FAQ und Reiseführer — Derivatquellen

Route: /de/intern/rag-service-faq-und-reisefuehrer | Stand: 2026-07-22 | Sichtbarkeit: internal
Quelle: Thitronik Online/project-data/runtime/wiki/wiki-articles/de/intern/rag-service-faq-und-reisefuehrer.json

---
RAG-Audit: Service, FAQ und Reiseführer — Derivatquellen

Dieser interne Auditartikel ordnet das Quellenmanifest für allgemeine FAQs, Support, Werkseinbau, den Reiseführer 2024 und mehrere produktbezogene Derivate. Er dient der Redaktion und der RAG-Ingestion; er ist weder eine technische Kurzanleitung noch eine aktuelle Termin-, Leistungs- oder Reiseauskunft.

## Zweck und Geltungsbereich

Der Block umfasst allgemeine und produktbezogene FAQ-Dateien, Support- und Diagnosethemen, Werkseinbau und Reisehinweise sowie Derivate zu Pro-Finder , Gaswarntechnik, Funk-Wassermelder , BT-connect , safe.lock und WiPro. Produktgeneration, Seriennummer , Software, Fahrzeug, Einbauzustand und Veröffentlichungsdatum bleiben für jede Antwort maßgeblich.

Manifest vollständig und nachvollziehbar erfassen.

Potenzielle Dubletten vor der Indexierung kennzeichnen.

Technische FAQ, Supportaufnahme und touristische Hinweise trennen.

Historische Reiseangaben nicht als aktuelle Zusage ausgeben.

Sicherheitskritische Kurzantworten auf freigegebene Fachartikel zurückführen.

## Prüfergebnis und Beleggrenze

Prüfkriterium | Ergebnis | 
 Manifest | 67 unterschiedliche Quellpfade | 
 Ablagestruktur | 41 Root-Einträge und 26 Einträge in drei RAG-Packs | 
 Dateinamenvergleich | 48 unterschiedliche Basisdateinamen; 17 potenzielle Root-/Pack-Dubletten | 
 Lokale Verfügbarkeit | die referenzierten Derivatdateien fehlen im aktuellen Redaktionsbestand | 

Das Manifest ist strukturell geprüft . Ohne Quellenarchiv sind Inhalt, Revisionsstand und Bytegleichheit nicht reproduzierbar. Die 67 Einträge sind Referenzen, nicht unabhängige Belege. Konkrete Aussagen folgen den freigegebenen Basisartikeln und deren Primärquellen.

## Quellenhierarchie und Konfliktregel

Vorrang hat eine aktuelle, produktspezifische Primärquelle mit erkennbarem Revisionsstand.

Danach folgt der freigegebene Basisartikel mit dokumentierten Quellenentscheidungen.

Ein FAQ-, Guide- oder Snippet-Derivat verbessert die Auffindbarkeit, begründet aber keine neue Funktion, Kompatibilität, Frist oder Leistung.

Reiseangaben von 2024 sind ein historischer Kontext und keine aktuelle Bestätigung.

Bei Widersprüchen gilt der höherrangige Beleg; die Abweichung wird dokumentiert. Bleiben Produkt, Generation, Fahrzeug, Zeitpunkt oder Leistungsumfang unklar, erzeugt das RAG-System keine definitive technische oder organisatorische Zusage.

## Themenbereiche und Basisartikel

Bereich | Einordnung | Verbindlicher Basisartikel | 
 Allgemeine und produktbezogene FAQ | Einstieg und Weiterleitung | FAQ Master — Alle häufigen Fragen auf einen Blick | 
 Technische Fallaufnahme | Pflichtdaten und Eskalation | Support-Fallaufnahme — Pflichtangaben und Eskalationsprüfung | 
 Werkseinbau und Aufenthalt | aktuell zu bestätigende Organisation | Werkseinbau & Besuch in Eckernförde | 
 Sichere Erstdiagnose | symptomorientierte Prüfung | Störungsbeseitigung — Sichere Diagnose häufiger Probleme | 
 Produktzuordnung | System- und Komponentenabgrenzung | Systemüberblick — THITRONIK-Produktwelt | 

Der Reiseführer 2024 besitzt keinen eigenen verbindlichen Produktstatus. Seine Orts-, Gastronomie-, Touren- und Stellplatzhinweise werden nur als datierter Archivkontext geführt.

## Quellenfamilien im Manifest

Quellenfamilie | Dateien | 
 (root) | 41 | 
 Thitronik_FAQ_DE_RAG_Pack | 7 | 
 Thitronik_FAQ_DE_RAG_Pack_Part2 | 7 | 
 Thitronik_Reisefuehrer_2024_DE_RAG_Pack | 12 | 
 Gesamt | 67 | 

## Dateitypen im Manifest

Typ | Dateien | Behandlung bei der Ingestion | 
 FAQ | 21 | nur mit Produkt-, Generations- und Sicherheitskontext | 
 Figure | 6 | nicht ohne zugehörigen Text als Anleitung verwenden | 
 Guide / HowTo | 9 | Ablauf gegen Basisartikel und Revision prüfen | 
 Overview / Reference | 11 | Werte und Kontaktdaten vor Ausgabe validieren | 
 Readme / Index | 12 | Navigation und Metadaten, keine eigenständige Freigabe | 
 Snippet | 3 | nur mit Herkunft und vollständigem Aussagekontext | 
 Sonstiges | 5 | vor der Aufnahme manuell klassifizieren | 
 Gesamt | 67 | | 

## Regeln für die RAG-Ingestion

Vollständigen Pfad als source_id erhalten; Basisdateinamen nur als candidate_duplicate_key verwenden.

Root- und Pack-Einträge gruppieren. Nur Inhalts- oder Hashvergleich darf echte Dubletten zusammenführen.

Mindestens source_path , canonical_article , source_date , product , serial_number , software_version , vehicle , content_type , language und revision_status führen.

Deutschsprachige *_DE.md -Quellen auch in Übersetzungen als language: de kennzeichnen.

Frage, Voraussetzung, Antwort, Warnung, Gültigkeitsdatum und Weiterleitung nicht auf getrennte Chunks verteilen.

Touristisches Material nicht mit Produktfreigaben, Diagnose oder Notfallanweisungen vermischen.

## Sicherheits- und Service-Regeln

Vor technischer Bewertung Produkt und Variante, vollständige Seriennummer, Softwarestand , Fahrzeug und Modelljahr, Einbauzustand, erwartetes und beobachtetes Verhalten sowie LED-, Ton-, App- oder SMS-Meldung erfassen.

Scharf-/Unscharfschalten der Alarmanlage und Ver-/Entriegeln der Zentralverriegelung getrennt dokumentieren.

Keine Passwörter, vollständigen SIM-PINs oder unnötigen personenbezogenen Daten in Tickets oder RAG-Antworten übernehmen.

Bei Gas-, CO-, Rauch-, Brand- oder Hitzeanzeichen, beschädigten Leitungen, wiederholt auslösenden Sicherungen, Aussperrung, unbeabsichtigter Stilllegung oder unkontrolliertem Alarm sofort eskalieren und keine Ferndiagnosetests fortsetzen.

Für eine dokumentierte Fahrzeugstilllegung ausschließlich kill verwenden; a an ist dafür unzulässig. Nie bei fahrendem Fahrzeug testen.

App-Schaltflächen, FAQ-Kurztexte und alte Artikelnummern belegen keine Hardware- oder Fahrzeugkompatibilität.

Anfrage, Angebot und Terminbestätigung unterscheiden. Keine Zusage zu Preis, Dauer, Verfügbarkeit, Leihwagen, E-Bikes oder Stellplatz ableiten.

Angaben zu Kontakt, Adresse, Öffnung, Buchung, Gebühren, Zufahrt, Strom, WLAN und Ver-/Entsorgung vor Nutzung aktuell bestätigen.

Restaurants, Ausflugsziele und Touren aus dem Reiseführer 2024 sind historische Beispiele, keine aktuelle Empfehlung oder Reservierungszusage.

Bei Panne, Unfall oder akutem Sicherheitsereignis gelten Notfall- und Supportwege, nicht touristische Hinweise.

## QA- und Freigabecheck

Vor der Indexierung exakt 67 Pfade, Tabellensummen und 17 Dublettenkandidaten prüfen. Produkt- und Servicekontext, Pflichtdaten, Datenschutz, Eskalationsgrenzen, kill / a an , den Archivstand 2024 und die Trennung zwischen Anfrage und Bestätigung vollständig erhalten. Alle fünf Wiki-Ziele lokal auflösen, Titel und H1 abgleichen sowie UTF-8 und Platzhalterfreiheit prüfen.

## Hinweis zum Frontmatter

Die 67 Einträge unter sources: bilden das kanonische Manifest. Pfade und deutsche Dateinamen bleiben in allen Sprachfassungen unverändert, damit Herkunft, Dublettengruppen und spätere Hashprüfungen vergleichbar bleiben.
