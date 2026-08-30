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

   Die sieben Inseln stehen bewusst NICHT als Text hier, sondern werden aus
   `public/data/inseln.json` erzeugt: Fragensätze und Inselnamen ändern sich
   im Laufe der Vorbereitung, und ein zweiter, handgepflegter Stand wäre
   spätestens beim nächsten Umbenennen falsch.
   ========================================================================== */

/** Handgeschriebene Einträge über Ablauf und Werkzeuge des Campus. */
const CAMPUS_SEITEN = [
  {
    route: "/campus/ueberblick",
    title: "THITRONIK Campus — Ablauf",
    slug: "campus-ablauf",
    boostKeywords: "campus schulung ablauf tag programm wissenscheck quiz insel inseln teilnehmer",
    body:
      "Der THITRONIK Campus ist die Händlerschulung. Der Tag ist in sieben " +
      "Wissensinseln geteilt; jede Insel behandelt ein Thema und schließt mit " +
      "einem kurzen Wissenscheck ab.\n\n" +
      "Ablauf pro Insel: Die Station wird vor Ort durchgearbeitet, danach wird " +
      "der Wissenscheck der Insel am Tablet oder Telefon ausgefüllt. Vor der " +
      "ersten Frage werden Name, Händlernummer und Tätigkeitsbereich " +
      "abgefragt — sie gelten für den ganzen Tag und müssen nur einmal " +
      "eingegeben werden.\n\n" +
      "Die Reihenfolge der Inseln ist nicht vorgegeben. Auf der Campus-Karte " +
      "ist zu sehen, welche Inseln bereits abgeschlossen sind. Ein " +
      "abgeschlossener Wissenscheck kann erneut geöffnet werden; die " +
      "Auswertung zeigt dann zu jeder Frage die richtige Antwort mit " +
      "Begründung.\n\n" +
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
      "Schaltfläche in der Kopfzeile erreichbar.\n\n" +
      "THI beantwortet Fragen zu THITRONIK-Produkten — Funk-Alarmanlage " +
      "WiPro III und Zubehör, Gaswarner der G.A.S.-Reihe, Pro-Finder " +
      "GPS-Ortung, Bedienung über App, Handsender und NFC, Einbau im Fahrzeug " +
      "und Fehlersuche — und Fragen zum Campus selbst.\n\n" +
      "Die Antworten stützen sich auf den THITRONIK-Wissensbestand. Findet " +
      "THI dort nichts Gesichertes, sagt er das und verweist auf den " +
      "THITRONIK-Support unter +49 (0)4351 76744-112, statt zu raten.\n\n" +
      "THI kennt die Antworten des laufenden Wissenschecks nicht und gibt sie " +
      "auch nicht heraus. Für fachliche Fragen während der Vorbereitung ist " +
      "er gedacht, nicht als Lösungshilfe während der Bewertung."
  }
];

/** Baut aus einer Insel ihren Wissenseintrag.
 *
 *  Die Fragen selbst bleiben bewusst draußen. Die Fragensätze enthalten die
 *  richtigen Antworten, und THI läuft auf derselben Seite wie der laufende
 *  Wissenscheck — was hier im Bestand liegt, könnte er auf Nachfrage
 *  wiedergeben. Er soll das Thema erklären können, nicht die Lösung nennen. */
function inselEintrag(insel) {
  return {
    route: `/campus/insel/${insel.slug}`,
    title: `Insel ${insel.name} — ${insel.title}`,
    slug: `insel-${insel.slug}`,
    boostKeywords: `insel ${insel.slug} ${insel.name} ${insel.code} station wissenscheck`,
    body:
      `Die Insel ${insel.name} (${insel.code}) behandelt das Thema ` +
      `"${insel.title}": ${insel.thema}.\n\n${insel.beschreibung}\n\n` +
      "Zu dieser Insel gehört ein Wissenscheck, der nach der Station " +
      "ausgefüllt wird."
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
    ...CAMPUS_SEITEN,
    ...inseln.map(inselEintrag)
  ].map((e) => ({
    ...e,
    // articleType hält die Campus-Einträge aus den Abwertungen für FAQ-,
    // Anleitungs- und Fahrzeugartikel heraus: sie sind keins davon.
    articleType: "campus",
    excerpt: e.body.slice(0, 300)
  }));
}
