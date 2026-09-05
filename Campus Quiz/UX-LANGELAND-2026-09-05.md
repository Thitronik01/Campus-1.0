# Inselübersicht und Praxis auf Langeland

Engine 1.40.0. Lokaler Prototyp für die vereinbarte erste Ausbaustufe.

- Desktop: Karte und Detailbereich nebeneinander. Eine Insel auswählen zeigt Thema, Fortschritt und den Zugang zum Wissenscheck.
- Tablet: Karte über den Details. Ein Tipp auf eine Insel führt zur Detailansicht. Die senkrechte Kartenkomposition bleibt proportional.
- Telefon: sieben beschriftete Auswahltasten statt versteckter Stationen im Karussell. Fortschritt und Detailbereich folgen darunter.
- Arbeitskarte aus Kopfzeile, Menü und globalen Werkzeugleisten entfernt. Langeland verlinkt den Bereich „Arbeitskarte & Übergabe“ sowohl aus der Übersicht als auch vom Inselstart.
- `/praxis/langeland/`: ausdrücklich fiktiver Übungsfall, sechs Punkte als Begleiter zur analogen Karte, Druckansicht und Zurücksetzen. Keine Speicherung und kein Backend für diese Übung.
- Das vorhandene digitale Formular bleibt ein zusätzlicher Zugang im Gesamtpaket. Einzelpakete zeigen diesen Zugang nicht. Demoparameter bleiben bei Hin- und Rückwegen erhalten.

Die Inhalte leiten sich aus dem vorhandenen Langeland-Fragensatz ab. Der Musterfall bildet keine Original-Arbeitskarte nach. Vorhandene Inselmotive werden weiterverwendet; neue Bilder waren für diese Stufe nicht nötig. Technische Darstellungen wurden nicht generiert.

Geprüft: Browseransichten bei 320, 820 und 1440 px; kein horizontaler Seitenüberlauf. Mobile Inseltasten rund 51 px hoch, Kartenbeschriftungen am Tablet rund 45 px. Richtige Auswahl im Musterfall, Checklisten-Zähler und Zurücksetzen sowie Demo-Verknüpfungen geprüft. `tools/montag.js --ohne-server` baut Gesamt- und Einzelpakete und prüft die Quelle. Die Praxisdateien sind in die Syntaxprüfung aufgenommen.

Feedbackbogen und Quizoberfläche sind nicht Teil dieser ersten Ausbaustufe. Ihre weitergehende Gestaltung sowie Originalvorlagen für die Papierkarte bleiben die nächsten Schritte.
