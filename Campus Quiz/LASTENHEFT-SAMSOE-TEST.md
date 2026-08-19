# Kleines Lastenheft: Rückmeldung zum Testlauf Samsø

**Stand:** 19. August 2026  
**Quelle:** sprachliches Transkript eines vollständigen Testlaufs der Insel Samsø  
**Zweck:** fachliche und gestalterische Anforderungen festhalten  
**Umsetzungsstand:** UI-Anforderungen und RED-01 umgesetzt und geprüft; RED-02 wartet auf fachliche Freigabe

## 1. Zielbild

Das Quiz soll bei Bild- und Mehrfachauswahlfragen jederzeit eindeutig zeigen, welche Antwort der Teilnehmer ausgewählt hat. Die spätere Auflösung muss klar von diesem Auswahlzustand getrennt bleiben. Rückmeldungen dürfen einem Teilnehmer nach einer richtigen Antwort nicht vermitteln, er habe falsch gewählt.

Die Gestaltung soll sich durchgehend an der bestehenden THITRONIK-Farbwelt orientieren. Antworttexte und Aufgabenstellungen bleiben kurz, konkret und werkstattnah.

## 2. Geltungsbereich

Ausgangspunkt ist der Testlauf von **Samsø**. Anforderungen an Auswahlzustände, Farben und Rückmeldungen gelten jedoch für die gemeinsame Quiz-Oberfläche und damit für alle Inseln sowie alle daraus erzeugten Pakete.

Dieses Lastenheft fordert noch keine Programmierung. Fachlich offene Texte dürfen erst nach Bestätigung geändert werden.

## 3. Anforderungen

### MUSS-01: Ausgewählte Bildantwort klar hervorheben

Bei jeder Bildantwort muss bereits vor dem Prüfen deutlich erkennbar sein, welche Kachel ausgewählt wurde. Ein kleines Häkchen allein reicht nicht aus.

Die Hervorhebung muss:

- die gesamte Bildkachel erfassen, nicht nur den Buchstaben oder das Häkchen,
- einen deutlich sichtbaren Rahmen und eine zusätzliche Flächen- oder Tiefenwirkung besitzen,
- auch bei mehreren gleichzeitig ausgewählten Bildern eindeutig bleiben,
- auf großen und kleinen Bildschirmen funktionieren,
- neben Farbe mindestens ein weiteres Merkmal verwenden, etwa Rahmenstärke, Häkchen oder leichte Skalierung.

Ein Glow-Effekt ist als mögliche Gestaltung ausdrücklich erwünscht. Vor der Auflösung darf der Auswahlzustand jedoch nicht wie die grüne Kennzeichnung einer richtigen Antwort aussehen.

**Betroffene Samsø-Beispiele:** SAM-02 (Gaswarner), SAM-03 (Pro-finder) und SAM-10 (Komponenten ohne festen Einbauort).

**Akzeptanz:** Ein unbeteiligter Betrachter kann ohne Mauszeiger und ohne erneutes Anklicken sofort benennen, welche Bilder ausgewählt sind. Nach dem Prüfen sind „ausgewählt“, „richtig“, „falsch gewählt“ und „richtige Antwort übersehen“ visuell unterscheidbar.

### MUSS-02: Bildkacheln besser voneinander abgrenzen

Nicht ausgewählte Bildkacheln müssen deutlicher als einzelne klickbare Antwortflächen erkennbar sein. Rahmen, Kontrast und Abstand sind so zu gestalten, dass die Bildgrenzen auch bei ähnlich hellen oder ähnlich dunklen Fotos sichtbar bleiben.

**Akzeptanz:** Alle Kacheln sind im normalen Zustand klar getrennt; die aktive Kachel ist trotzdem wesentlich stärker hervorgehoben als die übrigen.

### MUSS-03: Irreführende Meldung „Falsch gewählt?“ korrigieren

Nach einer vollständig richtigen Antwort darf kein Abschnitt mit der Überschrift „Falsch gewählt?“ erscheinen. Ebenso dürfen Texte wie „das hast du gewählt“ oder „das hast du übersehen“ nur erscheinen, wenn sie tatsächlich auf die abgegebene Antwort zutreffen.

Falls allgemeine Lernhinweise zu typischen Fehlern auch nach einer richtigen Antwort erhalten bleiben sollen, müssen sie neutral bezeichnet werden, zum Beispiel als „Typische Fehler“. Sie dürfen nicht den Eindruck erwecken, der Teilnehmer selbst habe diesen Fehler gemacht.

Bei einer falschen Antwort sollen vorrangig die Hinweise erscheinen oder hervorgehoben werden, die sich auf die konkrete Auswahl beziehen.

**Akzeptanz:** Eine richtige Antwort erzeugt ausschließlich bestätigendes oder neutrales Feedback. Eine falsche Antwort benennt nachvollziehbar, was falsch gewählt oder übersehen wurde.

### MUSS-04: Antwortfarben E und F überarbeiten

Die derzeit für zusätzliche Antwortmöglichkeiten verwendete Kombination aus Lila und Orange soll nicht weiterverwendet werden. Für Fragen mit sechs oder mehr Optionen ist eine ruhigere, markenkonforme Farbpalette festzulegen.

Die neue Palette muss:

- zur bestehenden THITRONIK-Oberfläche passen,
- Optionen weiterhin klar unterscheidbar machen,
- ausreichenden Text- und Zustandskontrast bieten,
- die Bedeutungsfarben Grün für „richtig“ und Rot für „falsch“ nicht vorwegnehmen.

**Akzeptanz:** Fragen mit sechs bis acht Optionen wirken als zusammengehörige Oberfläche und nicht wie eine Sammlung fremder Signalfarben. Alle Texte, Buchstaben und Auswahlzustände bleiben gut lesbar.

### SOLL-01: Antworttexte kurz und direkt halten

Antwortmöglichkeiten sollen grundsätzlich so kurz wie fachlich möglich formuliert sein. Erklärungen und Begründungen gehören in die Auflösung, nicht in die Antwortkachel.

Die im Test positiv bewerteten Formulierungen dienen als Orientierung. Insbesondere die Antworten bei SAM-02 und SAM-05 sollen in ihrer Kürze beibehalten werden.

**Akzeptanz:** Eine Antwort enthält im Regelfall genau eine Handlung oder Aussage. Unnötige Nebensätze und vorweggenommene Begründungen werden vermieden.

### SOLL-02: Zuordnungsfrage redaktionell prüfen

Die Antwortmöglichkeiten der Zuordnungsfrage zu den vorgesehenen Einbauorten sollen auf Verständlichkeit, Eindeutigkeit und sprachliche Parallelität geprüft werden. Die grundsätzliche Aufmachung und der Fragetyp wurden positiv bewertet und sollen erhalten bleiben.

**Akzeptanz:** Jede Zuordnungsoption bezeichnet genau einen klar unterscheidbaren Einbauort. Die Formulierungen sind ähnlich aufgebaut und lassen keine vermeidbaren Überschneidungen zu.

## 4. Konkrete redaktionelle Änderungen für Samsø

### RED-01: Stoffdecke durch Stoffhimmel ersetzen

Die Aufgabenstellung von SAM-07 soll lauten:

> Das Fahrzeug hat einen Stoffhimmel. Wie montierst du den T.S.A. Funk-Rauchmelder?

Auch die Antwort „Durch die Stoffdecke schrauben“ ist sinngemäß auf „Durch den Stoffhimmel schrauben“ anzupassen.

**Akzeptanz:** In SAM-07 wird durchgehend der fahrzeugübliche Begriff „Stoffhimmel“ verwendet und das Produkt in der Frage vollständig benannt.

### RED-02: Versorgung von WiPro III und Pro-finder konkretisieren

SAM-09 verwendet derzeit den Ausdruck „dieselbe Fahrzeugbatterie“. Dieser ist zu allgemein, weil im Fahrzeug mehrere Batterien vorhanden sein können.

Vor einer Textänderung muss fachlich bestätigt werden:

- welche konkrete Batterie beziehungsweise welcher Versorgungspunkt gemeint ist,
- ob diese Vorgabe für alle behandelten Fahrzeugtypen gilt,
- ob zusätzlich „Dauerplus“ und das gemeinsame Bezugspotenzial ausdrücklich in der Antwort genannt werden sollen.

Erst nach dieser Freigabe sind Frage, richtige Antwort, Feedback und Merksatz konsistent anzupassen.

**Akzeptanz:** Die richtige Antwort benennt die Versorgung so eindeutig, dass Starter- und Aufbaubatterie nicht verwechselt werden können. Antwort und Auflösung widersprechen sich nicht.

## 5. Inhalte, die beibehalten werden sollen

Folgende Teile wurden im Test ausdrücklich positiv bewertet und benötigen aus diesem Transkript heraus keine inhaltliche Überarbeitung:

- SAM-02: Frage und kurze Antwortlogik zum Einbauort des Gaswarners,
- SAM-05: Frage zur zu langen Antennenleitung,
- SAM-06: Frage zum Montageort des NFC-Moduls,
- SAM-08: Frage zur CO-Überwachung bei langem Fahrzeug und getrenntem Schlafbereich,
- grundsätzliche Gestaltung und Interaktion der Zuordnungsfrage.

Die genannten Fragen können dennoch von den systemweiten Verbesserungen an Auswahlzuständen und Feedback profitieren.

## 6. Priorisierung für die spätere Umsetzung

1. Auswahlzustand und Abgrenzung der Bildkacheln verbessern (MUSS-01, MUSS-02).
2. Feedbacklogik „Falsch gewählt?“ korrigieren (MUSS-03).
3. Farbpalette für viele Antwortmöglichkeiten überarbeiten (MUSS-04).
4. SAM-07 sprachlich korrigieren (RED-01).
5. Fachliche Freigabe für SAM-09 einholen und anschließend konkretisieren (RED-02).
6. Zuordnungsoptionen redaktionell prüfen (SOLL-02).

## 7. Abnahmeszenarien

1. **Einzelne Bildantwort:** In SAM-02 wird Antwort D gewählt. Die Kachel ist vor dem Prüfen sofort und eindeutig als ausgewählt erkennbar. Nach dem Prüfen wechselt sie klar in den Zustand „richtig“.
2. **Mehrere Bildantworten:** In SAM-10 werden vier Komponenten gewählt. Alle vier aktiven Kacheln sind gleichzeitig eindeutig markiert; nicht ausgewählte Kacheln wirken nicht aktiv.
3. **Falsche Bildantwort:** In SAM-03 wird ein falsches Bild gewählt. Nach dem Prüfen sind die falsche Auswahl und die richtige, übersehene Antwort verschieden gekennzeichnet.
4. **Richtige Textantwort:** Eine vollständig richtige Antwort zeigt keinen Block „Falsch gewählt?“ und keine persönliche Fehlermarkierung.
5. **Sechs oder mehr Optionen:** Eine entsprechende Frage verwendet weder Lila noch Orange als reguläre Antwortfarbe und bleibt vollständig lesbar.
6. **Redaktion:** SAM-07 verwendet „Stoffhimmel“ und „T.S.A. Funk-Rauchmelder“. SAM-09 wird erst nach dokumentierter fachlicher Klärung geändert.

## 8. Offene Entscheidungen vor der Umsetzung

- Soll nach einer richtigen Antwort der allgemeine Lernblock ganz entfallen oder neutral als „Typische Fehler“ bestehen bleiben?
- Welche markenkonformen Farben ersetzen Lila und Orange bei den Optionen E und F?
- Welche konkreten Formulierungen der Zuordnungsoptionen sind fachlich gewünscht?
- Welche Batterie beziehungsweise welcher Versorgungspunkt ist in SAM-09 verbindlich richtig?

## 9. Definition of Done

Die spätere Umsetzung ist abgeschlossen, wenn alle MUSS-Anforderungen und RED-01 umgesetzt sind, RED-02 fachlich geklärt und konsistent eingearbeitet wurde, die sechs Abnahmeszenarien auf Desktop und Mobilgerät bestanden sind und die Änderungen in der gemeinsamen Quelle sowie in allen ausgelieferten Quizpaketen identisch vorliegen.
