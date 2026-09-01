"use client";

import { format } from 'date-fns';
import { de } from 'date-fns/locale';

export const STORAGE_KEY = "thitronik-arbeitskarte-data-demo";
export const todayIso = () => format(new Date(), "yyyy-MM-dd");

export const vehicleSketchViews = [
  {
    key: "fahrerseite",
    label: "Fahrerseite",
    backgroundSrc: "/assets/arbeitskarte/wohnmobil-fahrerseite.png",
  },
  {
    key: "beifahrerseite",
    label: "Beifahrerseite",
    backgroundSrc: "/assets/arbeitskarte/wohnmobil-beifahrerseite.png",
  },
  {
    key: "front",
    legacyKey: "dach",
    label: "Front",
    backgroundSrc: "/assets/arbeitskarte/wohnmobil-front.png",
  },
  {
    key: "heck",
    label: "Heck",
    backgroundSrc: "/assets/arbeitskarte/wohnmobil-heck.png",
  },
];

export const initialSketches = Object.fromEntries(
  vehicleSketchViews.map((view) => [view.key, ""])
);

export function normalizeSketches(sketches = {}) {
  return {
    ...initialSketches,
    ...sketches,
    front: sketches.front || sketches.dach || "",
  };
}

export const initialFormData = {
  orderType: { einbau: false, nachruestung: false, service: false },
  kunde: { firma: "", name: "", telefon: "", kennzeichen: "", fahrzeugtyp: "", fahrgestellnummer: "" },
  monteur: { name: "", funktionenGeprueft: false, seriennummern: "" },
  hinweis: "",
  obd: { eingang: "", ausgang: "", uhrzeit: "" },
  tachoFehler: { ja: false, nein: false, code: "" },
  ledEinbauort: "",
  schadensmeldung: "",
  vorschadenFotos: {},
  checklistGrundfunktionen: { zentralverriegelung: false, sirene: false, panikAlarm: false, neigungssensor: false },
  checklistProFinder: { gpsOrtung: false, geoFence: false, bewegungsAlarm: false, batterieueberwachung: false },
  checklistRueckfahrkamera: { bildqualitaet: false, hilfslinien: false, nachtsicht: false },
  unterschriftMonteur: "",
  unterschriftKunde: "",
  uebergabe: {
    grundfunktionBedienung: false, batteriewechsel: false, proFinderProgrammiert: false,
    proFinderAlarme: false, uhrBordcomputer: false, einweisungErhalten: false,
    panikAlarm: false, offenemAlarmCheck: false, proFinderBedienung: false,
    radioeinstellung: false, funktionKlappschluessel: false,
    abschalteinrichtungMotorkontrollleuchte: false, rueckfahrkamera: false,
    sonstigerVermerk: "", ort: "", datum: todayIso(), unterschriftKunde: "",
  },
};

export const initialMaterials = [
  { id: "1", gruppe: "Alarmsystem", artikel: "WiPro III", artNr: "", menge: 1, verbaut: false, notiz: "" },
  { id: "2", gruppe: "Alarmsystem", artikel: "WiPro III safe.lock", artNr: "", menge: 1, verbaut: false, notiz: "" },
  { id: "3", gruppe: "Zubehör", artikel: "Funk-Handsender 868", artNr: "101064", menge: 1, verbaut: false, notiz: "" },
  { id: "4", gruppe: "Zubehör", artikel: "Umrüstplatine", artNr: "101052", menge: 1, verbaut: false, notiz: "" },
  { id: "5", gruppe: "Zubehör", artikel: "Transponder", artNr: "105355", menge: 1, verbaut: false, notiz: "" },
  { id: "6", gruppe: "Zubehör", artikel: "Zweitschlüssel", artNr: "101205", menge: 1, verbaut: false, notiz: "" },
  { id: "7", gruppe: "Zubehör", artikel: "Funk-Magnetkontakt 868, weiß", artNr: "100758", menge: 1, verbaut: false, notiz: "" },
  { id: "8", gruppe: "Zubehör", artikel: "Funk-Magnetkontakt 868, schwarz", artNr: "100757", menge: 1, verbaut: false, notiz: "" },
  { id: "9", gruppe: "Zubehör", artikel: "Montageadapter, weiß", artNr: "100729", menge: 1, verbaut: false, notiz: "" },
  { id: "10", gruppe: "Zubehör", artikel: "Montageadapter, schwarz", artNr: "100428", menge: 1, verbaut: false, notiz: "" },
  { id: "11", gruppe: "Zubehör", artikel: "Funk-Kabelschleife 868, weiß", artNr: "100761", menge: 1, verbaut: false, notiz: "" },
  { id: "12", gruppe: "Zubehör", artikel: "Funk-Kabelschleife 868, schwarz", artNr: "101068", menge: 1, verbaut: false, notiz: "" },
  { id: "13", gruppe: "Zubehör", artikel: "Funk-Kabelschleife XL, weiß", artNr: "100944", menge: 1, verbaut: false, notiz: "" },
  { id: "14", gruppe: "Zubehör", artikel: "Funk-Kabelschleife XL, schwarz", artNr: "101074", menge: 1, verbaut: false, notiz: "" },
  { id: "15", gruppe: "Zubehör", artikel: "Zusatzsirene", artNr: "100190", menge: 1, verbaut: false, notiz: "" },
  { id: "16", gruppe: "Zubehör", artikel: "Back-up Sirene", artNr: "100089", menge: 1, verbaut: false, notiz: "" },
  { id: "18", gruppe: "Zubehör", artikel: "Universalanschlusskabel 12/24 V", artNr: "100097", menge: 1, verbaut: false, notiz: "" },
  { id: "19", gruppe: "Zubehör", artikel: "BT-connect / Vernetzungsmodul", artNr: "101290", menge: 1, verbaut: false, notiz: "" },
  { id: "20", gruppe: "Zubehör", artikel: "NFC-Modul", artNr: "105299", menge: 1, verbaut: false, notiz: "" },
  { id: "21", gruppe: "Zubehör", artikel: "THITRONIK KeyCard", artNr: "105300", menge: 1, verbaut: false, notiz: "" },
  { id: "22", gruppe: "Zubehör", artikel: "THITRONIK KeyTag", artNr: "105301", menge: 1, verbaut: false, notiz: "" },
  { id: "23", gruppe: "Zubehör", artikel: "THITRONIK KeyStrap M schwarz", artNr: "105302", menge: 1, verbaut: false, notiz: "" },
  { id: "24", gruppe: "Zubehör", artikel: "THITRONIK KeyStrap M weiß", artNr: "105464", menge: 1, verbaut: false, notiz: "" },
  { id: "25", gruppe: "Zubehör", artikel: "THITRONIK KeyStrap M blau", artNr: "105466", menge: 1, verbaut: false, notiz: "" },
  { id: "26", gruppe: "Zubehör", artikel: "THITRONIK KeyStrap M rot", artNr: "105465", menge: 1, verbaut: false, notiz: "" },
  { id: "27", gruppe: "Zubehör", artikel: "THITRONIK KeyStrap L schwarz", artNr: "105467", menge: 1, verbaut: false, notiz: "" },
  { id: "28", gruppe: "Zubehör", artikel: "THITRONIK KeyStrap L weiß", artNr: "105468", menge: 1, verbaut: false, notiz: "" },
  { id: "29", gruppe: "Zubehör", artikel: "THITRONIK KeyStrap L blau", artNr: "105470", menge: 1, verbaut: false, notiz: "" },
  { id: "30", gruppe: "Zubehör", artikel: "THITRONIK KeyStrap L rot", artNr: "105469", menge: 1, verbaut: false, notiz: "" },
  { id: "31", gruppe: "Gaswarnsystem", artikel: "G.A.S.-pro III", artNr: "101286", menge: 1, verbaut: false, notiz: "" },
  { id: "32", gruppe: "Gaswarnsystem", artikel: "G.A.S.-pro III CO", artNr: "101287", menge: 1, verbaut: false, notiz: "" },
  { id: "33", gruppe: "Gaswarnsystem", artikel: "G.A.S.-pro", artNr: "100001", menge: 1, verbaut: false, notiz: "" },
  { id: "34", gruppe: "Gaswarnsystem", artikel: "GBA-I", artNr: "100061", menge: 1, verbaut: false, notiz: "" },
  { id: "35", gruppe: "Gaswarnsystem", artikel: "G.A.S.", artNr: "105700", menge: 1, verbaut: false, notiz: "" },
  { id: "36", gruppe: "Gaswarnsystem", artikel: "G.A.S.-plug 'all-in-one'", artNr: "100042", menge: 1, verbaut: false, notiz: "" },
  { id: "37", gruppe: "Gaswarnsystem", artikel: "G.A.S.-connect", artNr: "105750", menge: 1, verbaut: false, notiz: "" },
  { id: "38", gruppe: "Gaswarnsystem", artikel: "CO-Sensor (G.A.S.-pro & G.A.S.-pro III)", artNr: "100433", menge: 1, verbaut: false, notiz: "" },
  { id: "39", gruppe: "Gaswarnsystem", artikel: "Zusatzsensor (G.A.S.-pro & G.A.S.-pro III)", artNr: "101289", menge: 1, verbaut: false, notiz: "" },
  { id: "40", gruppe: "Rauchmelder", artikel: "T.S.A. Funk-Rauchmelder, weiß", artNr: "105753", menge: 1, verbaut: false, notiz: "" },
  { id: "41", gruppe: "Rauchmelder", artikel: "T.S.A. Funk-Rauchmelder, grau", artNr: "105754", menge: 1, verbaut: false, notiz: "" },
  { id: "42", gruppe: "Rauchmelder", artikel: "Montagewinkel T.S.A., weiß", artNr: "105755", menge: 1, verbaut: false, notiz: "" },
  { id: "43", gruppe: "Rauchmelder", artikel: "Montagewinkel T.S.A., grau", artNr: "105756", menge: 1, verbaut: false, notiz: "" },
  { id: "44", gruppe: "Fahrzeugortung", artikel: "Pro-finder", artNr: "100699", menge: 1, verbaut: false, notiz: "" },
  { id: "45", gruppe: "Fahrzeugortung Zubehör", artikel: "Abschalteinrichtung einpolig", artNr: "101283", menge: 1, verbaut: false, notiz: "" },
  { id: "46", gruppe: "Fahrzeugortung Zubehör", artikel: "Abschalteinrichtung mehrpolig", artNr: "105821", menge: 1, verbaut: false, notiz: "" },
  { id: "47", gruppe: "Fahrzeugortung Zubehör", artikel: "Externe GSM-Antenne", artNr: "100700", menge: 1, verbaut: false, notiz: "" },
  { id: "48", gruppe: "Fahrzeugortung Zubehör", artikel: "GPS-pro", artNr: "100686", menge: 1, verbaut: false, notiz: "" },
];

export const groupOrder = ["Alarmsystem", "Zubehör", "Gaswarnsystem", "Rauchmelder", "Fahrzeugortung", "Fahrzeugortung Zubehör", "Sonstiges"];

// Checklisten-Beschriftungen – zentral, damit Formular (page.js) und Druck-Ansicht
// (PrintView) dieselbe Quelle nutzen.
export const grundfunktionenLabels = {
  zentralverriegelung: "Zentralverriegelung", sirene: "Sirene",
  panikAlarm: "Panik-Alarm", neigungssensor: "Neigungssensor",
};
export const proFinderLabels = {
  gpsOrtung: "GPS-Ortung", geoFence: "Geo-Fence",
  bewegungsAlarm: "Bewegungsalarm", batterieueberwachung: "Batterieüberwachung",
};
export const rueckfahrkameraLabels = {
  bildqualitaet: "Bildqualität OK", hilfslinien: "Hilfslinien", nachtsicht: "Nachtsicht",
};

export const checklistItemsUebergabe = [
  { key: "grundfunktionBedienung", label: "Grundfunktion Bedienung" },
  { key: "batteriewechsel", label: "Batteriewechsel" },
  { key: "proFinderProgrammiert", label: "Pro-Finder programmiert" },
  { key: "proFinderAlarme", label: "Pro-Finder Alarme" },
  { key: "uhrBordcomputer", label: "Uhr/Bordcomputer" },
  { key: "einweisungErhalten", label: "Einweisung erhalten" },
  { key: "panikAlarm", label: "Panikalarm" },
  { key: "offenemAlarmCheck", label: "Offenem Alarm-Check" },
  { key: "proFinderBedienung", label: "Pro-Finder Bedienung" },
  { key: "radioeinstellung", label: "Radioeinstellung" },
  { key: "funktionKlappschluessel", label: "Funktion Klappschlüssel nach Umrüstung" },
  { key: "abschalteinrichtungMotorkontrollleuchte", label: "Abschalteinrichtung Motorkontrollleuchte" },
  { key: "rueckfahrkamera", label: "Rückfahrkamera" },
];
