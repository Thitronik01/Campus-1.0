/* ==========================================================================
   Campus-eigenes Wissen für THI.
   --------------------------------------------------------------------------
   Der Wiki-Bestand (thi-wissen/) beantwortet Produktfragen: WiPro III,
   G.A.S.-pro, Pro-Finder, Einbau, Fehlersuche. Er weiß aber nichts über den
   Campus selbst — nicht, welche Inseln es gibt, wie der Wissenscheck abläuft
   oder wo die Arbeitskarte liegt. Genau danach wird ein Teilnehmer THI aber
   fragen, weil THI im Campus sitzt.

   HIER WIRD ERGÄNZT. Die Einträge unten stehen im selben Format wie die
   Wiki-Artikel und laufen durch dieselbe Suche — ein neuer Eintrag ist
   sofort auffindbar, ohne dass an der Function etwas geändert werden muss.

   Aufbau eines Eintrags:

     {
       route: "/campus/kurzname",   eindeutige Kennung, nie ein Link nach außen
       title: "Titel",              nennt THI als Fundstelle
       slug: "kurzname",            Treffer hier wiegen im Scoring schwer
       boostKeywords: "…",          Begriffe, unter denen der Eintrag gefunden
                                    werden soll, aber nicht im Text steht
       body: "…"                    der eigentliche Text
     }

   Der Text landet wörtlich in der Antwort — er wird also so geschrieben, wie
   THI ihn sagen soll.

   Die Inseln stehen bewusst NICHT als Text hier, sondern werden aus
   `public/data/inseln.json` erzeugt: Fragensätze und Inselnamen ändern sich
   im Laufe der Vorbereitung, und ein zweiter, handgepflegter Stand wäre
   spätestens beim nächsten Umbenennen falsch. Auch die Zahl der Inseln
   kommt von dort — ein Einzelinsel-Paket hat eine, das Gesamtpaket sieben.

   DER SCHULUNGSTAG (Abschnitt "Planungsstand" unten) ist die zweite Quelle.
   Er stammt aus der Veranstaltungsplanung, nicht aus dem Campus-Code, und
   gilt UNTER VORBEHALT: Zeiten, Verpflegung, Programmteile können sich bis
   zum Tag noch ändern. Jeder Eintrag sagt das selbst, und die
   Systemanweisung in thi.mjs hält THI dazu an, es weiterzusagen. Die
   Einträge sind absichtlich nach Themen getrennt (Zeitplan, Gruppen,
   Auftakt, Stationen, Verpflegung, Abendprogramm), damit ein bestätigter
   Speiseplan eingepflegt werden kann, ohne den Zeitplan anzufassen.

   Wenn ein Teil BESTÄTIGT wird: den Text des Eintrags ersetzen, das
   PLANUNGSSTAND-Präfix aus dem body nehmen und `stand` auf das Datum der
   Bestätigung setzen. Nicht beides nebeneinander stehen lassen — THI würde
   sonst alt und neu vermischen.
   ========================================================================== */

/** Datum und Formel, die jeder vorläufige Eintrag voranstellt. Eine Stelle,
 *  damit eine Bestätigung nicht sechs Sätze einzeln umformulieren muss. */
const PLANUNGSSTAND_DATUM = "3. September 2026";
const PLANUNGSSTAND =
  `Nach aktuellem Planungsstand (Stand ${PLANUNGSSTAND_DATUM}, noch nicht ` +
  "endgültig bestätigt — Änderungen sind möglich): ";

/** Handgeschriebene Einträge über Ablauf und Werkzeuge des Campus.
 *
 *  `inseln` ist die Liste aus inseln.json; sie liefert Zahl und Namen, wo
 *  ein Text sie braucht. */
function campusSeiten(inseln) {
  const anzahl = inseln.length;
  const anzahlWort = { 1: "eine", 6: "sechs", 7: "sieben" }[anzahl] || String(anzahl);
  const namen = inseln.map((i) => i.name).join(", ");

  return [
    {
      route: "/campus/ueberblick",
      title: "THITRONIK Campus — Ablauf im Wissenscheck",
      slug: "campus-ablauf",
      boostKeywords: "campus schulung ablauf wissenscheck quiz insel inseln teilnehmer",
      body:
        "Der THITRONIK Campus ist die Händlerschulung. Der Wissenscheck kennt " +
        `${anzahlWort === "eine" ? "eine Wissensinsel" : `${anzahlWort} Wissensinseln`}` +
        `${namen ? ` (${namen})` : ""}; jede Insel behandelt ein Thema und ` +
        "schließt mit einem kurzen Wissenscheck ab.\n\n" +
        "Ablauf pro Insel: Die Station wird vor Ort durchgearbeitet, danach wird " +
        "der Wissenscheck der Insel am Tablet oder Telefon ausgefüllt. Vor der " +
        "ersten Frage werden Name, Händlernummer und Tätigkeitsbereich " +
        "abgefragt — sie gelten für den ganzen Tag und müssen nur einmal " +
        "eingegeben werden.\n\n" +
        "Im Wissenscheck ist die Reihenfolge der Inseln frei: Jede kann geöffnet " +
        "werden, sobald die Station besucht ist. Welche Station eine Gruppe " +
        "wann besucht, regelt am Schulungstag die Gruppenrotation (siehe " +
        "Zeitplan des Schulungstags). Auf der Campus-Karte ist zu sehen, welche " +
        "Inseln bereits abgeschlossen sind. Ein abgeschlossener Wissenscheck " +
        "kann erneut geöffnet werden; die Auswertung zeigt dann zu jeder Frage " +
        "die richtige Antwort mit Begründung.\n\n" +
        "Am Ende des Tages gehört der Feedbackbogen dazu. Er ist der " +
        "Tagesabschluss und nicht Teil einer einzelnen Insel."
    },
    {
      route: "/campus/wissenscheck",
      title: "Wissenscheck — Fragen, Auswertung, Ergebnis",
      slug: "wissenscheck",
      boostKeywords:
        "wissenscheck quiz fragen antworten punkte ergebnis bestanden auswertung " +
        "zeitlimit fragetypen bild audio schaetzfrage zuordnung wiederholen",
      body:
        "Der Wissenscheck einer Insel besteht aus mehreren Fragen " +
        "unterschiedlicher Art: Einfachauswahl, Mehrfachauswahl, Richtig/Falsch, " +
        "Bildfragen, Zuordnungsfragen, Schätzfragen und teilweise Audiofragen.\n\n" +
        "Bei Mehrfachauswahl zählt nur die vollständig richtige Auswahl — eine " +
        "fehlende oder eine zusätzliche Antwort macht die Frage falsch. " +
        "Schätzfragen haben einen Toleranzbereich; Antworten darin gelten als " +
        "richtig.\n\n" +
        "Bewertet wird auf dem Server, nicht im Browser. Das Ergebnis erscheint " +
        "unmittelbar nach dem Absenden mit der erreichten Punktzahl und einer " +
        "Auflösung zu jeder Frage.\n\n" +
        "Ein Durchlauf lässt sich wiederholen. Für die Auswertung des Tages " +
        "zählt der zuletzt abgesendete Stand.\n\n" +
        "Während einer Frage kann THI über die Schaltfläche in der Fragenansicht " +
        "geöffnet werden. THI kennt dann die laufende Frage und hilft beim " +
        "Verstehen des Themas — erklärt Grundlagen, benennt, worauf es bei den " +
        "Antwortmöglichkeiten ankommt, und nennt die Fundstelle im " +
        "Wissensbestand.\n\n" +
        "Wird der Wissenscheck mit dem Zusatz ?demo=1 in der Adresse geöffnet, " +
        "läuft er vollständig durch, speichert aber nichts. Das ist der " +
        "Vorschaumodus für Trainer und Vorbereitung."
    },
    {
      route: "/campus/arbeitskarte",
      title: "Arbeitskarte",
      slug: "arbeitskarte",
      boostKeywords:
        "arbeitskarte werkstatt werkzeug auftrag fahrzeugaufnahme dokumentation " +
        "drucken pdf ausdrucken werkstattauftrag",
      body:
        "Die Arbeitskarte ist das Werkstatt-Werkzeug des Campus. Sie ist über " +
        "die Schaltfläche in der Kopfzeile erreichbar und begleitet die " +
        "Fahrzeugaufnahme: Fahrzeugdaten, verbaute Produkte, durchgeführte " +
        "Arbeiten und Auffälligkeiten werden dort erfasst.\n\n" +
        "Die Eingaben bleiben auf dem Gerät gespeichert und lassen sich als PDF " +
        "ausdrucken oder als Beleg an den Kunden weitergeben. Die Arbeitskarte " +
        "ist unabhängig vom Wissenscheck — sie kann jederzeit geöffnet werden " +
        "und hält keine Verbindung zu einer bestimmten Insel."
    },
    {
      route: "/campus/feedbackbogen",
      title: "Feedbackbogen — Tagesabschluss",
      slug: "feedbackbogen",
      boostKeywords:
        "feedback feedbackbogen tagesabschluss rueckmeldung bewertung ende " +
        "abschluss schulung bewerten",
      body:
        "Der Feedbackbogen ist der Tagesabschluss des Campus und über die " +
        "Schaltfläche in der Kopfzeile erreichbar. Er wird einmal am Ende des " +
        "Tages ausgefüllt, nicht nach jeder Insel.\n\n" +
        "Abgefragt werden die Einschätzung zu den Stationen, zur Organisation " +
        "und zum fachlichen Nutzen sowie freie Anmerkungen. Die Angaben aus dem " +
        "Wissenscheck — Name und Händlernummer — sind bereits vorausgefüllt, " +
        "wenn am selben Gerät gearbeitet wurde."
    },
    {
      route: "/campus/thi",
      title: "THI — der Assistent im Campus",
      slug: "thi",
      boostKeywords:
        "thi assistent chatbot ki hilfe fragen stellen wer bist du was kannst du " +
        "support hotline telefon",
      body:
        "THI ist der Assistent der THITRONIK-Plattform und im Campus über die " +
        "Schaltfläche in der Kopfzeile sowie in der Fragenansicht erreichbar.\n\n" +
        "THI beantwortet Fragen zu THITRONIK-Produkten — Funk-Alarmanlage " +
        "WiPro III und Zubehör, Gaswarner der G.A.S.-Reihe, Pro-Finder " +
        "GPS-Ortung, Bedienung über App, Handsender und NFC, Einbau im Fahrzeug " +
        "und Fehlersuche — und Fragen zum Campus selbst: Ablauf des " +
        "Schulungstags, Stationen, Verpflegung, Wissenscheck, Arbeitskarte, " +
        "Feedbackbogen.\n\n" +
        "Die Antworten stützen sich auf den THITRONIK-Wissensbestand. Findet " +
        "THI dort nichts Gesichertes, sagt er das und verweist auf den " +
        "THITRONIK-Support unter +49 (0)4351 76744-112, statt zu raten.\n\n" +
        "Während einer Wissenscheck-Frage kennt THI die laufende Frage samt " +
        "Antwortmöglichkeiten und hilft, das Thema zu verstehen: Er erklärt " +
        "die Grundlagen und benennt die Kriterien, auf die es ankommt — die " +
        "Entscheidung trifft der Teilnehmer selbst."
    },

    /* --------------------------------------------------------------------
       DER SCHULUNGSTAG — Planungsstand, unter Vorbehalt.

       Quelle: Veranstaltungsplanung, eingespielt am 3. September 2026. Die
       Einträge beantworten "Wann ist Mittagspause?", "Was macht Gruppe 3 um
       elf?", "Was gibt es zu essen?" — Fragen, bei denen THI ohne diese
       Einträge an die technische Hotline verweisen würde, was die falsche
       Auskunft ist.

       Was NICHT hier steht, weil es nicht vorliegt: Räume und Aufbauorte der
       Stationen, die Gruppeneinteilung (wer in welcher Gruppe ist), die
       Rotationsreihenfolge je Gruppe, Allergene und Inhaltsstoffe der
       Speisen, eine Bestehensgrenze oder ein Zertifikat. Dazu verweist THI
       an die Betreuung vor Ort.
       -------------------------------------------------------------------- */
    {
      route: "/campus/schulungstag/zeitplan",
      title: "Schulungstag — Zeitplan (Planungsstand)",
      slug: "schulungstag-zeitplan",
      stand: PLANUNGSSTAND_DATUM,
      boostKeywords:
        "zeitplan ablauf tagesablauf uhrzeit wann beginn start anfang ende " +
        "programm agenda schulungstag pause kaffeepause mittagspause " +
        "eintreffen ankunft eckernfoerde rotation station stationen block",
      body:
        PLANUNGSSTAND +
        "Der Campus-Schulungstag findet bei THITRONIK in Eckernförde statt " +
        "und läuft so:\n\n" +
        "- 08:30 Uhr: Eintreffen der Teilnehmer bei THITRONIK in Eckernförde.\n" +
        "- 08:45 bis 09:30 Uhr: Gemeinsamer Beginn auf der Schulungsinsel " +
        "Vejrø — alle sechs Gruppen zusammen.\n" +
        "- 09:30 bis 10:15 Uhr: Erste Schulungsstation.\n" +
        "- 10:15 bis 11:00 Uhr: Zweite Schulungsstation.\n" +
        "- 11:00 bis 11:15 Uhr: Kaffeepause.\n" +
        "- 11:15 bis 12:00 Uhr: Dritte Schulungsstation.\n" +
        "- 12:00 bis 12:30 Uhr: Vorgesehen als Puffer-, Praxis- oder " +
        "Austauschzeit; die konkrete Nutzung ist noch nicht festgelegt.\n" +
        "- 12:30 bis 13:30 Uhr: Mittagspause.\n" +
        "- 13:30 bis 14:15 Uhr: Vierte Schulungsstation.\n" +
        "- 14:15 bis 15:00 Uhr: Fünfte Schulungsstation.\n" +
        "- 15:00 bis 15:15 Uhr: Kaffeepause.\n" +
        "- 15:15 bis 16:00 Uhr: Sechste Schulungsstation.\n" +
        "- 16:00 bis 17:00 Uhr: Vorgesehen für Praxisvertiefung, offene Fragen, " +
        "Erfahrungsaustausch, Supportthemen und den gemeinsamen Abschluss; die " +
        "genaue Ausgestaltung ist noch nicht bestätigt.\n" +
        "- 17:00 Uhr: Voraussichtliches Ende der Schulung bei THITRONIK.\n" +
        "- 18:30 Uhr: Abendveranstaltung (siehe Abendprogramm).\n\n" +
        "Jede Schulungsstation dauert 45 Minuten. Welche Station eine Gruppe " +
        "in welchem Block besucht, ergibt sich aus der Gruppenrotation; die " +
        "Zuteilung ist im Campus nicht hinterlegt und wird vor Ort bekannt " +
        "gegeben."
    },
    {
      route: "/campus/schulungstag/gruppen",
      title: "Schulungstag — Gruppen und Rotation (Planungsstand)",
      slug: "schulungstag-gruppen",
      stand: PLANUNGSSTAND_DATUM,
      boostKeywords:
        "gruppe gruppen gruppeneinteilung rotation reihenfolge teilnehmer " +
        "teilnehmerzahl wie viele personen schulungsprinzip expedition " +
        "schulungsinsel schulungsinseln welche gruppe bin ich",
      body:
        PLANUNGSSTAND +
        "Am Schulungstag werden insgesamt etwa 60 Teilnehmer erwartet, " +
        "aufgeteilt in sechs Gruppen zu je etwa zehn Personen.\n\n" +
        "Der Tag ist als maritime Schulungsexpedition mit Schulungsinseln " +
        "aufgebaut. Alle sechs Gruppen beginnen gemeinsam auf der Insel Vejrø. " +
        "Danach verteilen sich die Gruppen auf die sechs weiteren " +
        "Schulungsinseln: Poel, Hiddensee, Samsø, Langeland, Usedom und " +
        "Fehmarn.\n\n" +
        "Jede Schulungsstation dauert 45 Minuten. Jede Gruppe besucht im " +
        "Verlauf des Tages alle sechs Rotationsstationen — pro Block eine, " +
        "in sechs Blöcken.\n\n" +
        "Welche Person in welcher Gruppe ist und in welcher Reihenfolge eine " +
        "Gruppe die Stationen durchläuft, liegt im Campus nicht vor. Das " +
        "sagt die Betreuung vor Ort."
    },
    {
      route: "/campus/schulungstag/vejro-auftakt",
      title: "Schulungstag — Gemeinsamer Auftakt auf Vejrø (Planungsstand)",
      slug: "schulungstag-vejro",
      stand: PLANUNGSSTAND_DATUM,
      boostKeywords:
        "vejro vejroe auftakt beginn begruessung premiumpartner premiumpartner-konzept " +
        "partnerkonzept wipro iii safe.lock nfc modul pro-finder ortung " +
        "stilllegung komfortfunktionen vernetzungsmodul app vorstellung " +
        "gemeinsamer block erster block",
      body:
        PLANUNGSSTAND +
        "Der Schulungstag beginnt um 08:45 Uhr mit einem gemeinsamen Block auf " +
        "der Schulungsinsel Vejrø, an dem alle sechs Gruppen zusammen " +
        "teilnehmen (bis 09:30 Uhr). Vorgesehene Inhalte:\n\n" +
        "- Begrüßung\n" +
        "- Vorstellung des neuen Premiumpartner-Konzeptes\n" +
        "- WiPro III: Unterschiede zu herkömmlichen Alarmsystemen, Übersicht " +
        "und Einsatzmöglichkeiten von WiPro III und WiPro III safe.lock\n" +
        "- NFC-Modul und dessen Möglichkeiten\n" +
        "- Pro-finder: Möglichkeiten zur Fahrzeugortung, Fahrzeugstilllegung, " +
        "Komfortfunktionen\n" +
        "- Vernetzungsmodul\n" +
        "- THITRONIK App\n\n" +
        "Danach beginnt die Rotation über die sechs weiteren Stationen."
    },
    {
      route: "/campus/schulungstag/stationen",
      title: "Schulungstag — Schulungsinseln und ihre Inhalte (Planungsstand)",
      slug: "schulungstag-stationen",
      stand: PLANUNGSSTAND_DATUM,
      boostKeywords:
        "station stationen schulungsinsel inhalt inhalte schwerpunkt thema " +
        "poel hiddensee samsoe samso langeland usedom fehmarn haendlerbereich " +
        "magnetkontakt magnetkontakte kleben crimpen abzweigverbinder " +
        "basisfahrzeug basisfahrzeuge gaswarner einbauort einbauorte einbaufehler " +
        "fahrzeuguebergabe fahrzeuguebernahme annahme uebergabe einweisung " +
        "verkauf praesentation konfigurator display verkaufsdisplay " +
        "support fehleranalyse fehlerbehebung was wird gemacht was lerne ich",
      body:
        PLANUNGSSTAND +
        "Die sechs Rotationsstationen des Schulungstags haben diese " +
        "Schwerpunkte:\n\n" +
        "- Poel — Händlerbereich: Was finde ich wo im Händlerbereich, " +
        "Orientierung, relevante Informationen und Unterlagen für Händler.\n" +
        "- Hiddensee — Funk-Magnetkontakte: Montage in der Praxis, " +
        "Funk-Magnetkontakte kleben, Abzweigverbinder crimpen.\n" +
        "- Samsø — Basisfahrzeuge und Gaswarner: verschiedene Basisfahrzeuge " +
        "und ihre Besonderheiten, geeignete Einbauorte, Praxisteil; die " +
        "THITRONIK Gaswarner, ihre Unterschiede und häufige Einbaufehler.\n" +
        "- Langeland — Fahrzeugübergabe und Fahrzeugübernahme: Fahrzeug " +
        "richtig annehmen, Vorgehen vor dem Einbau, Übergabe an den Kunden " +
        "nach dem Einbau, kundenorientierte Übergabe und Einweisung.\n" +
        "- Usedom — Verkauf und Präsentation: den Konfigurator " +
        "verkaufsfördernd einsetzen, das THITRONIK Display im Kundengespräch " +
        "einsetzen, Verkaufsdisplays erklären und verwenden.\n" +
        "- Fehmarn — Support: Fehleranalyse, Fehlerbehebung, häufig gestellte " +
        "Fragen im Support, wichtige Supportthemen.\n\n" +
        "Vejrø ist der gemeinsame Auftakt aller Gruppen und keine " +
        "Rotationsstation. Wo eine Station aufgebaut ist, sagt die Betreuung " +
        "vor Ort. Zu jeder Insel gehört ein Wissenscheck; dessen Themen stehen " +
        "im Eintrag der jeweiligen Insel."
    },
    {
      route: "/campus/schulungstag/verpflegung",
      title: "Schulungstag — Verpflegung und Pausen (Planungsstand)",
      slug: "verpflegung",
      stand: PLANUNGSSTAND_DATUM,
      boostKeywords:
        "essen mittagessen mittag verpflegung pause pausen kaffee kaffeepause " +
        "kuchen kekse getraenke imbiss speiseplan menue hunger trinken " +
        "was gibt es heute vegan vegetarisch steckruebenmus catering " +
        "allergene allergie unvertraeglichkeit inhaltsstoffe glutenfrei laktose",
      body:
        PLANUNGSSTAND +
        "Die Mittagspause ist von 12:30 bis 13:30 Uhr geplant. Vorgesehen ist " +
        "Holsteiner Steckrübenmus mit Kochwurst, Kasselernacken, Schweinebacke " +
        "und Senf. Als vegane Alternative ein veganes Steckrübenmus mit " +
        "geräucherter Tofuwurst. Zum Nachtisch ein kleines Dessert im " +
        "Gläschen.\n\n" +
        "Zwei Kaffeepausen sind geplant: 11:00 bis 11:15 Uhr und 15:00 bis " +
        "15:15 Uhr, nachmittags mit Kaffee, Kuchen und Keksen.\n\n" +
        "Das Mittagsmenü und die Pausenverpflegung sind noch nicht endgültig " +
        "bestätigt; Speisen, Beilagen, Mengen, Lieferant und Ausgabeform " +
        "können sich ändern.\n\n" +
        "Zu Allergenen, Unverträglichkeiten, Inhaltsstoffen und besonderen " +
        "Ernährungsanforderungen liegen im Campus keine bestätigten Angaben " +
        "vor. Dazu keine Vermutung äußern, sondern an die Betreuung vor Ort " +
        "oder THITRONIK verweisen.\n\n" +
        "Für den Wissenscheck ist eine Pause unkritisch: Ein begonnener " +
        "Durchlauf lässt sich später fortsetzen oder wiederholen — für die " +
        "Auswertung des Tages zählt der zuletzt abgesendete Stand."
    },
    {
      route: "/campus/schulungstag/abendprogramm",
      title: "Schulungstag — Vorabend und Abendprogramm (Planungsstand)",
      slug: "schulungstag-abend",
      stand: PLANUNGSSTAND_DATUM,
      boostKeywords:
        "abend abendprogramm abendveranstaltung abendessen vorabend anreise " +
        "brauerei land in sicht eckernfoerde empfang canapes ueberraschung " +
        "was passiert abends wann ist abends anreisetag vortag",
      body:
        PLANUNGSSTAND +
        "Am Vorabend des Schulungstags gibt es um 18:00 Uhr einen Empfang in " +
        "der Brauerei „Land in Sicht“ in Eckernförde, anschließend ein " +
        "gemeinsames Abendessen.\n\n" +
        "Am Schulungstag selbst beginnt um 18:30 Uhr eine Abendveranstaltung. " +
        "Gegenüber den Teilnehmern heißt es dazu: „Lassen Sie sich " +
        "überraschen!“ — mehr wird nicht verraten. Als Abendverpflegung sind " +
        "kleine, fein belegte und dekorierte Canapés vorgesehen.\n\n" +
        "Ort und Details der Abendveranstaltung sowie die Verpflegung sind " +
        "noch nicht bestätigt."
    },

    /* Organisatorisches, das NICHT vorliegt. Die Einträge fangen die Frage
       ab, statt sie an die technische Hotline zu leiten, und sagen ehrlich,
       wen man fragen muss. Sobald etwas feststeht, gehört es hierher. */
    {
      route: "/campus/orientierung",
      title: "Inseln finden — Reihenfolge und Orientierung",
      slug: "orientierung",
      boostKeywords:
        "wo finde ich insel station reihenfolge orientierung karte plan wann " +
        "dran standort raum halle aufbau wegweiser",
      body:
        "Die Inseln sind Stationen vor Ort bei THITRONIK in Eckernförde. Auf " +
        "der Campus-Karte im Wissenscheck stehen alle mit Namen, Thema und dem " +
        "eigenen Fortschritt.\n\n" +
        "Wann eine Gruppe welche Station besucht, ergibt sich aus der " +
        "Gruppenrotation des Schulungstags (sechs Blöcke zu 45 Minuten, siehe " +
        "Zeitplan). In welchem Raum oder an welcher Stelle eine Station " +
        "aufgebaut ist, ist im Campus nicht hinterlegt — das sagt die " +
        "Betreuung vor Ort.\n\n" +
        "Welches Thema hinter einer Insel steckt, lässt sich hier erfragen — " +
        "nach dem Inselnamen fragen, dann kommen Thema und Lernziel."
    },
    {
      route: "/campus/zertifikat",
      title: "Zertifikat und Nachweis der Teilnahme",
      slug: "zertifikat",
      boostKeywords:
        "zertifikat urkunde nachweis teilnahmebescheinigung bescheinigung badge " +
        "bestanden bestehensgrenze abschluss bekomme erhalte wann",
      body:
        "Der Campus wertet jeden Wissenscheck sofort aus: Nach dem Absenden " +
        "stehen Punktzahl und Auflösung da, und die Karte zeigt, welche " +
        "Inseln abgeschlossen sind. Der eigene Stand ist damit jederzeit " +
        "ablesbar.\n\n" +
        "Zur Ausgabe eines Zertifikats liegt im Campus nichts Verbindliches " +
        "vor — weder eine Bestehensgrenze noch ein Termin. Danach fragt man " +
        "die Betreuung oder den Trainer vor Ort; die Ausstellung läuft nicht " +
        "über den Wissenscheck."
    }
  ];
}

/** Baut aus einer Insel ihren Wissenseintrag.
 *
 *  Die Fragen selbst bleiben bewusst draußen. Die Fragensätze enthalten die
 *  richtigen Antworten, und THI läuft auf derselben Seite wie der laufende
 *  Wissenscheck — was hier im Bestand liegt, könnte er auf Nachfrage
 *  wiedergeben. Die laufende Frage bekommt THI stattdessen vom Browser
 *  mitgeschickt (ohne Lösung), siehe thi.mjs. */
function inselEintrag(insel) {
  return {
    route: `/campus/insel/${insel.slug}`,
    title: `Insel ${insel.name} — ${insel.title}`,
    slug: `insel-${insel.slug}`,
    boostKeywords: `insel ${insel.slug} ${insel.name} ${insel.code} station wissenscheck`,
    body:
      `Die Insel ${insel.name} (${insel.code}) behandelt im Wissenscheck das Thema ` +
      `"${insel.title}": ${insel.thema}.\n\n${insel.beschreibung}\n\n` +
      "Zu dieser Insel gehört ein Wissenscheck, der nach der Station " +
      "ausgefüllt wird. Was an der Station selbst auf dem Programm steht, " +
      "steht im Eintrag „Schulungsinseln und ihre Inhalte“ zum Schulungstag."
  };
}

/**
 * Liefert das Campus-Wissen als Einträge im Format des Suchbestands.
 *
 * @param {object} inselDaten Inhalt von public/data/inseln.json
 */
export function campusWissen(inselDaten) {
  const inseln = Array.isArray(inselDaten?.inseln) ? inselDaten.inseln : [];
  return [
    ...campusSeiten(inseln),
    ...inseln.map(inselEintrag)
  ].map((e) => ({
    ...e,
    // articleType hält die Campus-Einträge aus den Abwertungen für FAQ-,
    // Anleitungs- und Fahrzeugartikel heraus: sie sind keins davon.
    articleType: "campus",
    excerpt: e.body.slice(0, 300)
  }));
}
