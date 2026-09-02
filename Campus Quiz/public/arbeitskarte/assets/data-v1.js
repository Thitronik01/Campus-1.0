export const STORAGE_KEY = "thitronik-arbeitskarte-data-demo";
export const HISTORY_PREFIX = "thitronik-arbeitskarte-card-v1:demo:";

export const vehicleSketchViews = [
  { key: "fahrerseite", label: "Fahrerseite", backgroundSrc: "/assets/arbeitskarte/wohnmobil-fahrerseite.webp" },
  { key: "beifahrerseite", label: "Beifahrerseite", backgroundSrc: "/assets/arbeitskarte/wohnmobil-beifahrerseite.webp" },
  { key: "front", legacyKey: "dach", label: "Front", backgroundSrc: "/assets/arbeitskarte/wohnmobil-front.webp" },
  { key: "heck", label: "Heck", backgroundSrc: "/assets/arbeitskarte/wohnmobil-heck.webp" }
];

export const groupOrder = ["Alarmsystem", "Zubehör", "Gaswarnsystem", "Rauchmelder", "Fahrzeugortung", "Fahrzeugortung Zubehör", "Sonstiges"];

export const grundfunktionenLabels = {
  zentralverriegelung: "Zentralverriegelung", sirene: "Sirene",
  panikAlarm: "Panik-Alarm", neigungssensor: "Neigungssensor"
};
export const proFinderLabels = {
  gpsOrtung: "GPS-Ortung", geoFence: "Geo-Fence",
  bewegungsAlarm: "Bewegungsalarm", batterieueberwachung: "Batterieüberwachung"
};
export const rueckfahrkameraLabels = {
  bildqualitaet: "Bildqualität OK", hilfslinien: "Hilfslinien", nachtsicht: "Nachtsicht"
};

export const checklistItemsUebergabe = [
  ["grundfunktionBedienung", "Grundfunktion Bedienung"],
  ["batteriewechsel", "Batteriewechsel"],
  ["proFinderProgrammiert", "Pro-Finder programmiert"],
  ["proFinderAlarme", "Pro-Finder Alarme"],
  ["uhrBordcomputer", "Uhr/Bordcomputer"],
  ["einweisungErhalten", "Einweisung erhalten"],
  ["panikAlarm", "Panikalarm"],
  ["offenemAlarmCheck", "Offenem Alarm-Check"],
  ["proFinderBedienung", "Pro-Finder Bedienung"],
  ["radioeinstellung", "Radioeinstellung"],
  ["funktionKlappschluessel", "Funktion Klappschlüssel nach Umrüstung"],
  ["abschalteinrichtungMotorkontrollleuchte", "Abschalteinrichtung Motorkontrollleuchte"],
  ["rueckfahrkamera", "Rückfahrkamera"]
].map(([key, label]) => ({ key, label }));

export const initialMaterials = [
  ["1","Alarmsystem","WiPro III",""],["2","Alarmsystem","WiPro III safe.lock",""],
  ["3","Zubehör","Funk-Handsender 868","101064"],["4","Zubehör","Umrüstplatine","101052"],
  ["5","Zubehör","Transponder","105355"],["6","Zubehör","Zweitschlüssel","101205"],
  ["7","Zubehör","Funk-Magnetkontakt 868, weiß","100758"],["8","Zubehör","Funk-Magnetkontakt 868, schwarz","100757"],
  ["9","Zubehör","Montageadapter, weiß","100729"],["10","Zubehör","Montageadapter, schwarz","100428"],
  ["11","Zubehör","Funk-Kabelschleife 868, weiß","100761"],["12","Zubehör","Funk-Kabelschleife 868, schwarz","101068"],
  ["13","Zubehör","Funk-Kabelschleife XL, weiß","100944"],["14","Zubehör","Funk-Kabelschleife XL, schwarz","101074"],
  ["15","Zubehör","Zusatzsirene","100190"],["16","Zubehör","Back-up Sirene","100089"],
  ["18","Zubehör","Universalanschlusskabel 12/24 V","100097"],
  ["19","Zubehör","BT-connect / Vernetzungsmodul","101290"],["20","Zubehör","NFC Modul","105299"],
  ["21","Zubehör","THITRONIK KeyCard","105300"],["22","Zubehör","THITRONIK KeyTag","105301"],
  ["23","Zubehör","THITRONIK KeyStrap M schwarz","105302"],["24","Zubehör","THITRONIK KeyStrap M weiß","105464"],
  ["25","Zubehör","THITRONIK KeyStrap M blau","105466"],["26","Zubehör","THITRONIK KeyStrap M rot","105465"],
  ["27","Zubehör","THITRONIK KeyStrap L schwarz","105467"],["28","Zubehör","THITRONIK KeyStrap L weiß","105468"],
  ["29","Zubehör","THITRONIK KeyStrap L blau","105470"],["30","Zubehör","THITRONIK KeyStrap L rot","105469"],
  ["31","Gaswarnsystem","G.A.S.-pro III","101286"],["32","Gaswarnsystem","G.A.S.-pro III CO","101287"],
  ["33","Gaswarnsystem","G.A.S.-pro","100001"],["34","Gaswarnsystem","GBA-I","100061"],
  ["35","Gaswarnsystem","G.A.S.","105700"],["36","Gaswarnsystem","G.A.S.-plug 'all-in-one'","100042"],
  ["37","Gaswarnsystem","G.A.S.-connect","105750"],["38","Gaswarnsystem","CO-Sensor (G.A.S.-pro & G.A.S.-pro III)","100433"],
  ["39","Gaswarnsystem","Zusatzsensor (G.A.S.-pro & G.A.S.-pro III)","101289"],
  ["40","Rauchmelder","T.S.A. Funk-Rauchmelder, weiß","105753"],["41","Rauchmelder","T.S.A. Funk-Rauchmelder, grau","105754"],
  ["42","Rauchmelder","Montagewinkel T.S.A., weiß","105755"],["43","Rauchmelder","Montagewinkel T.S.A., grau","105756"],
  ["44","Fahrzeugortung","Pro-Finder","100699"],
  ["45","Fahrzeugortung Zubehör","Abschalteinrichtung einpolig","101283"],
  ["46","Fahrzeugortung Zubehör","Abschalteinrichtung mehrpolig","105821"],
  ["47","Fahrzeugortung Zubehör","Externe GSM-Antenne","100700"],["48","Fahrzeugortung Zubehör","GPS-pro","100686"]
].map(([id, gruppe, artikel, artNr]) => ({ id, gruppe, artikel, artNr, menge: 1, verbaut: false, notiz: "" }));

export const clone = (value) => typeof structuredClone === "function"
  ? structuredClone(value)
  : JSON.parse(JSON.stringify(value));

export const todayIso = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export function normalizeSketches(sketches = {}) {
  return {
    fahrerseite: sketches.fahrerseite || "",
    beifahrerseite: sketches.beifahrerseite || "",
    front: sketches.front || sketches.dach || "",
    heck: sketches.heck || ""
  };
}

export function initialFormData() {
  return {
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
      sonstigerVermerk: "", ort: "", datum: todayIso(), unterschriftKunde: ""
    }
  };
}

export function generateId() {
  return globalThis.crypto?.randomUUID?.() || `ak-${Date.now()}-${Math.round(Math.random() * 1e9)}`;
}

export function createEmptyWorkCard(id = generateId(), now = new Date().toISOString()) {
  return {
    version: 1, id, status: "draft", createdAt: now, updatedAt: now, completedAt: null,
    formData: initialFormData(), materials: clone(initialMaterials), sketches: normalizeSketches()
  };
}

function mergeObject(base, incoming) {
  const result = clone(base);
  if (!incoming || typeof incoming !== "object" || Array.isArray(incoming)) return result;
  Object.entries(incoming).forEach(([key, value]) => {
    const current = base[key];
    const nested = current && typeof current === "object" && !Array.isArray(current);
    if (nested && value && typeof value === "object" && !Array.isArray(value)) result[key] = mergeObject(current, value);
    else if (!nested && typeof value === typeof current) result[key] = value;
  });
  return result;
}

function normalizeMaterial(item, index) {
  if (!item || typeof item !== "object") return null;
  const count = Number.parseInt(item.menge, 10);
  return {
    id: item.id == null ? `imp-${index}` : String(item.id),
    gruppe: typeof item.gruppe === "string" && item.gruppe ? item.gruppe : "Sonstiges",
    artikel: typeof item.artikel === "string" ? item.artikel.replace(/^Pro-finder$/i, "Pro-Finder").replace(/^NFC-Modul$/i, "NFC Modul") : "",
    artNr: typeof item.artNr === "string" ? item.artNr : "",
    menge: Number.isFinite(count) && count > 0 ? count : 1,
    verbaut: Boolean(item.verbaut),
    notiz: typeof item.notiz === "string" ? item.notiz : ""
  };
}

export function normalizeWorkCard(raw, fallbackId) {
  const empty = createEmptyWorkCard(fallbackId || raw?.id || generateId(), raw?.createdAt || new Date().toISOString());
  if (!raw || typeof raw !== "object") return empty;
  const formData = mergeObject(empty.formData, raw.formData);
  formData.kunde.kennzeichen = String(formData.kunde.kennzeichen || "").toUpperCase();
  formData.kunde.fahrgestellnummer = String(formData.kunde.fahrgestellnummer || "").toUpperCase();
  if (raw.formData?.vorschadenFotos && typeof raw.formData.vorschadenFotos === "object") {
    formData.vorschadenFotos = Object.fromEntries(
      ["fahrerseite", "beifahrerseite", "front", "heck"]
        .filter((key) => typeof raw.formData.vorschadenFotos[key] === "string")
        .map((key) => [key, raw.formData.vorschadenFotos[key]])
    );
  }
  return {
    ...empty,
    id: typeof raw.id === "string" && raw.id ? raw.id : empty.id,
    status: raw.status === "completed" ? "completed" : "draft",
    createdAt: raw.createdAt || empty.createdAt,
    updatedAt: raw.updatedAt || empty.updatedAt,
    completedAt: raw.completedAt || null,
    formData,
    materials: Array.isArray(raw.materials) ? raw.materials.map(normalizeMaterial).filter(Boolean) : empty.materials,
    sketches: normalizeSketches(raw.sketches)
  };
}
