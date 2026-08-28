# Distraktoren-Warnliste

Diese Aussagen sind **wahr** (Wiki-belegt) und dürfen deshalb **niemals als falsche
Antwortoption** in einer Frage auftauchen — sonst wird die Frage doppeldeutig und die
Statistik unbrauchbar. Vor jedem neuen Distraktor diese Liste und `04_FAKTEN_KOMPAKT.md` prüfen.

## Leicht zu übersehende Wahrheiten

1. **„Mit der WiPro III allein kann man scharf- und unscharfschalten — auch per Fingerprint/KeyCard."**
   Wahr. Nur die Zentralverriegelung braucht safe.lock. Ein Distraktor „geht nur mit safe.lock"
   ist bei Scharf/Unscharf-Fragen FALSCH formuliert richtig — Vorsicht bei der Blickrichtung.
2. **„Die Standardanleitung des Magnetkontakts nennt 25 mm."** Wahr (Produktanleitung). Die 22 mm
   sind die konservative Empfehlung — „25 mm" ist also kein sauberer Distraktor für die
   Standardausführung, nur für die wasserdichte.
3. **„Der Magnet darf beim Anlernen der wasserdichten Ausführung mehr als 30 mm entfernt werden."**
   Wahr — genau so wird der Sendevorgang ausgelöst.
4. **„Nach dem Batteriewechsel muss das Funk-Zubehör nicht neu angelernt werden."** Wahr.
5. **„Die Fahrzeugtür wird schon vom Fahrzeug überwacht."** Oft wahr (CAN-Bus-Türen brauchen
   i. d. R. keinen zusätzlichen Magnetkontakt) — als Distraktor nur mit klarem Kontext verwenden.
6. **„Die WiPro liest den CAN-Bus nur passiv."** Wahr — sie sendet keine steuernden Botschaften.
7. **„Der Entriegeln-Knopf des Originalschlüssels beendet einen Einbruchalarm."** Wahr
   (sofern kein Replay-Schutz aktiv) — Vorsicht bei Alarm-Beenden-Fragen.
8. **„Ein Handsender-Tastendruck beendet den Panikalarm."** Wahr (beliebige Taste).
9. **„BT-connect kann einen Pro-Finder einbinden."** Wahr (zweite RJ10-Buchse).
10. **„Der Pro-Finder kann bis zu 10 Zielrufnummern."** Wahr — „nur 3 Nummern" wäre ein
    sauberer Distraktor, „bis zu 10" nicht.
11. **„Gelbes Blinken am Pro-Finder heißt: Zielrufnummernspeicher leer."** Wahr — aber nur bis
    0699-044! Generationskontext immer angeben, sonst ist der Distraktor je nach Gerät richtig.
12. **„Die G.A.S.-pro III schaltet sich bei Unterspannung selbst ab."** Wahr (Tiefentladeschutz
    unter 11,1 V).
13. **„Nach Unterspannungsabschaltung muss die G.A.S.-pro III manuell neu eingeschaltet werden."**
    Wahr laut aktueller Zusatzinformation — „startet automatisch neu" ist der Irrtum.
14. **„Während der Pause zeigt die G.A.S.-pro III Alarme weiter über die LEDs."** Wahr.
15. **„Bei sehr hohem CO ertönt die Sirene trotz Pause."** Wahr (nur CO-Variante).
16. **„Die FAQ nennt für den Gassensor auch 10–30 cm Montagehöhe."** Wahr — deshalb ist
    „10–30 cm" kein sauberer Distraktor gegen „10–20 cm"; besser klar falsche Höhen nehmen
    (z. B. „auf halber Wandhöhe", „unter der Decke" für den Flüssiggas-Sensor).
17. **„Das Zusatzsensorkabel darf laut FAQ bis 8 m lang sein."** Wahr — konservativ gelten 7 m.
    Gleiche Vorsicht wie Punkt 16.
18. **„Ein Fahrzeug unter 6,5 m Innenlänge kann mit einem Hauptsensor auskommen."** Wahr
    (Herstellerbeispiel, ohne räumliche Trennung).
19. **„Der T.S.A. eignet sich für Heckgaragen mit E-Bikes."** Wahr — sogar ausdrücklich empfohlen.
20. **„Die wasserdichte Montageplatte darf verschraubt werden."** Wahr (V4A-Senkkopfschrauben,
    nicht im Lieferumfang).
21. **„Eine WiPro III kann auf safe.lock upgegradet werden."** Wahr (alle Zentralen laut FAQ;
    Formular + Einsenden).
22. **„Der Alarmgrund kommt per Klartext-SMS."** Wahr bei konfiguriertem Pro-Finder.
23. **„Die Anlage kann beim Aufenthalt im Fahrzeug scharf bleiben."** Wahr (keine
    Bewegungsmelder) — aber nie zu „fehlalarmfrei" steigern.
24. **„Entriegeln mit dem Originalschlüssel bleibt nach THITRONIK-Verriegelung möglich."**
    Wahr laut systemweiter Campingmodus-Beschreibung (Ford) — die Gefahr liegt in der
    umgekehrten Reihenfolge (erst Originalschlüssel verriegeln → THITRONIK-Entriegelung ggf.
    blockiert).

## Formulierungs-Fallen (machen richtige Antworten versehentlich falsch)

- **„Der Magnetkontakt verhindert den Einbruch"** — nein, er *meldet* ihn. In Antworttexten
  nie „verhindert/schützt vor Einbruch" für Sensorik verwenden.
- **„Sirene" und „Fahrzeughupe"** nie synonym verwenden — getrennte Alarmgeber; auf manchen
  Fahrzeugen existiert nur einer davon nutzbar.
- **„Alarm aus = Problem gelöst"** — das Beenden des akustischen Alarms ersetzt nie die
  Ursachenprüfung (Alarmspeicher, offene Kontakte, Sensorzustände).
- **„IP67 = außen montierbar"** — beim Wassermelder ausdrücklich nicht (Innenbereich
  vorgeschrieben).
- **„75 m / 50 m Reichweite"** — immer als Freifeldwert kennzeichnen, nie als
  Fahrzeug-Zusicherung.
- **Seriennummer vs. Artikelnummer** — 100699 ist die Artikelnummer der Pro-Finder-Familie;
  Seriennummern beginnen mit 0699- (führende Nullen behalten).
