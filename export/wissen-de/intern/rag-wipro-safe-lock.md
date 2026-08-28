# RAG-Audit: WiPro und safe.lock — Derivatquellen

Route: /de/intern/rag-wipro-safe-lock | Stand: 2026-07-22 | Sichtbarkeit: internal
Quelle: Thitronik Online/project-data/runtime/wiki/wiki-articles/de/intern/rag-wipro-safe-lock.json

---
RAG-Audit: WiPro und safe.lock — Derivatquellen

Dieser interne Audit ordnet Derivatquellen zu WiPro III , WiPro III safe.lock , QuickStart, Installationshandbuch, Bedienung und Zubehör. Er dient Redaktion und RAG-Ingestion, nicht als Einbau-, Verdrahtungs- oder Sicherheitsanleitung.

## Zweck und Geltungsbereich

Manifest, Dublettenkandidaten und Beleggrenzen werden nachvollziehbar erfasst. WiPro III und WiPro III safe.lock, Fahrzeugprofil, Software, Zugangsweg, CAN-Anbindung und Zubehör dürfen nicht vermischt werden.

## Prüfergebnis und Beleggrenze

Manifest | Ablagestruktur | 
 Manifest | 169 unterschiedliche Quellpfade | 
 Ablagestruktur | 81 Root-Einträge und 88 Einträge in fünf RAG-Packs | 
 Dateinamenvergleich | 104 Basisdateinamen; 65 potenzielle Root-/Pack-Dubletten | 
 Lokale Verfügbarkeit | referenzierte Derivatdateien fehlen im aktuellen Redaktionsbestand | 

Das Manifest ist strukturell geprüft. Ohne Quellenarchiv sind Inhalt, Revision und Bytegleichheit nicht reproduzierbar; 169 Referenzen sind keine 169 unabhängigen Belege.

## Quellenhierarchie und Konfliktregel

Vorrang hat eine produktspezifische Primärquelle mit Revision, danach der freigegebene Basisartikel. FAQ, Figure, Readme, Index und Snippet schaffen keine neue Kompatibilität, Befehlssyntax oder Verdrahtungsfreigabe. Bei Unklarheit zu Variante, Seriennummer , Software, Fahrzeug oder Einbauzustand keine konkrete Anleitung ausgeben.

## Systeme und Basisartikel

Bereich | Basisartikel | 
 WiPro III | WiPro III — Funk-Alarmsystem für Freizeitfahrzeuge | 
 Anlernen von Funk-Zubehör | Anlernvorgang — Funk-Zubehör an WiPro III anlernen | 
 Sichere Diagnose | Störungsbeseitigung — Sichere Diagnose häufiger Probleme | 
 Begriffe und Abgrenzungen | Glossar — Fachbegriffe im THITRONIK-System | 
 Fahrzeugprofil und DIP | Fahrzeugkompatibilität — Übersichtsmatrix & DIP-Grundlagen | 

## Quellenfamilien im Manifest

Source family | Files | 
 (root) | 81 | 
 Thitronik_FAQ_DE_RAG_Pack | 1 | 
 WiPro_III_Installationshandbuch_DE_RAG | 30 | 
 WiPro_QuickStart_DE_RAG_Pack | 6 | 
 WiPro_safe-lock_DE_FULL_RAG_from_multilang | 29 | 
 WiPro_safe-lock_QuickStart_DE_RAG_Pack | 22 | 
 Gesamt | 169 | 

## Dateitypen im Manifest

Type | Files | 
 FAQ | 6 | 
 Figure | 16 | 
 Guide / HowTo | 10 | 
 Overview / Reference | 5 | 
 Readme / Index | 13 | 
 Snippet | 4 | 
 Other | 115 | 
 Gesamt | 169 | 

## Regeln für die RAG-Ingestion

Vollständigen Pfad als source_id erhalten und Basisnamen nur als candidate_duplicate_key nutzen. Echte Dubletten erst nach Inhalts- oder Hashvergleich zusammenführen. Mindestens product_variant , serial_number , software_version , vehicle_profile , dip_state , access_method , source_path , canonical_article , language und revision_status speichern; deutsche *_DE.md -Quellen bleiben language: de .

## Sicherheitskritische Antwortregeln

Scharf-/Unscharfschalten ist nicht Ver-/Entriegeln. safe.lock ist eine Produkt-/Fahrzeugvariante und wird nicht durch eine App-Einstellung nachgerüstet. Fahrzeugprofil, DIP, CAN und Verdrahtung nur aus fahrzeugspezifischer Quelle ableiten. Replay-Schutz und Anti-Jamming nicht pauschal deaktivieren. Easy-Add -Verfahren nicht vermischen; nach Gesamtlöschen zuerst einen Funk-Handsender als Master anlernen, niemals das NFC Modul zuerst. Blinkcodes und Alarmspeicher exakt im Generationenkontext ausgeben. Bei Gas, CO, Rauch, Hitze, beschädigter Verdrahtung, Aussperrung oder unkontrolliertem Alarm sofort eskalieren. Arbeiten an Bordnetz und CAN gehören zu qualifiziertem Fachpersonal.

## QA- und Freigabecheck

Vor Freigabe exakt 169 Pfade, 65 Dublettenkandidaten, Tabellenwerte, Variantenabgrenzung, Zugangswege, Sicherheitsnegationen und alle fünf lokalen Wiki-Ziele prüfen. Titel/H1, Metadaten, UTF-8 und Platzhalterfreiheit müssen stimmen.

## Hinweis zum Frontmatter

Die 169 Einträge unter sources: bilden das kanonische Manifest. Pfade und deutsche Dateinamen bleiben in allen Sprachfassungen unverändert.
