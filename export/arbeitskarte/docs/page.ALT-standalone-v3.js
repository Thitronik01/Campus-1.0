"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import {
  AlertCircle, Check, CheckCircle2, ChevronDown, ChevronUp, Circle, ClipboardList,
  Download, Package, Phone, Plus, Printer, RotateCcw, Save, Search, Settings,
  ShoppingCart, Trash2, Upload, User, Wrench, X, Car, Hash, FileText,
} from "lucide-react";
import {
  STORAGE_KEY, todayIso, initialFormData, initialMaterials, groupOrder, checklistItemsUebergabe
} from "@/lib/arbeitskarte-data";
import {
  AkSection, AkInput, AkTextarea, AkLabel, TogglePill, CheckTile,
  SignatureBox, SignatureCanvas, PhotoUpload, SketchCanvas
} from "@/components/arbeitskarte/primitives";

/* ── Status helpers ── */
function getPageStatus(pageId, formData, materials) {
  switch (pageId) {
    case 1: {
      const c = formData.kunde.name || formData.kunde.firma;
      const m = formData.monteur.name;
      const o = formData.orderType.einbau || formData.orderType.nachruestung || formData.orderType.service;
      if (c && m && o) return "complete"; if (c || m || o) return "partial"; return "empty";
    }
    case 2: {
      const p = Object.values(formData.vorschadenFotos || {}).some(Boolean);
      const ch = Object.values(formData.checklistGrundfunktionen || {}).some(Boolean);
      if (p && ch) return "complete"; if (p || ch) return "partial"; return "empty";
    }
    case 3: return materials.filter(m => m.verbaut).length > 0 ? "complete" : "empty";
    case 4: {
      const sig = formData.uebergabe.unterschriftKunde;
      const any = Object.entries(formData.uebergabe).filter(([,v]) => typeof v === "boolean").some(([,v]) => v);
      if (sig) return "complete"; if (any || formData.uebergabe.ort) return "partial"; return "empty";
    }
    default: return "empty";
  }
}

function StatusIcon({ status }) {
  if (status === "complete") return <CheckCircle2 size={16} />;
  if (status === "partial") return <AlertCircle size={16} />;
  return <Circle size={16} />;
}

/* ── Page 1: Auftrag ── */
function PageOne({ formData, updateFormData, sketches, setSketches }) {
  const updateSketch = (key, value) => setSketches(prev => ({ ...prev, [key]: value }));
  const currentDate = format(new Date(), "dd. MMMM yyyy", { locale: de });
  const currentTime = format(new Date(), "HH:mm", { locale: de }) + " Uhr";

  return (
    <div>
      <AkSection title="Arbeitskarte Digital v3.0" subtitle="THITRONIK – Digitaler Formular-Workflow">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="ak-label">Datum</div>
            <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--text-primary)' }}>{currentDate}</div>
            <div className="ak-section-subtitle">{currentTime}</div>
          </div>
          <div className="ak-grid-3">
            <TogglePill active={formData.orderType.einbau} onClick={() => updateFormData({ orderType: { ...formData.orderType, einbau: !formData.orderType.einbau } })} label="Einbau" icon={ClipboardList} />
            <TogglePill active={formData.orderType.nachruestung} onClick={() => updateFormData({ orderType: { ...formData.orderType, nachruestung: !formData.orderType.nachruestung } })} label="Nachrüstung" icon={Wrench} />
            <TogglePill active={formData.orderType.service} onClick={() => updateFormData({ orderType: { ...formData.orderType, service: !formData.orderType.service } })} label="Service" icon={Settings} />
          </div>
        </div>
      </AkSection>

      <div className="ak-grid-2">
        <AkSection title="Kundendaten" subtitle="Basisdaten des Fahrzeugs und des Auftraggebers">
          <div className="ak-grid-2">
            <div className="ak-field"><AkLabel icon={FileText}>Firma</AkLabel><AkInput value={formData.kunde.firma} onChange={e => updateFormData({ kunde: { ...formData.kunde, firma: e.target.value } })} placeholder="Firmenname" /></div>
            <div className="ak-field"><AkLabel required icon={User}>Name</AkLabel><AkInput value={formData.kunde.name} onChange={e => updateFormData({ kunde: { ...formData.kunde, name: e.target.value } })} placeholder="Kundenname" /></div>
            <div className="ak-field"><AkLabel icon={Phone}>Telefon</AkLabel><AkInput value={formData.kunde.telefon} onChange={e => updateFormData({ kunde: { ...formData.kunde, telefon: e.target.value } })} placeholder="+49 ..." /></div>
            <div className="ak-field"><AkLabel icon={Car}>Kennzeichen</AkLabel><AkInput value={formData.kunde.kennzeichen} onChange={e => updateFormData({ kunde: { ...formData.kunde, kennzeichen: e.target.value.toUpperCase() } })} placeholder="XX-XX 1234" className="ak-mono" /></div>
            <div className="ak-field"><AkLabel icon={Car}>Fahrzeugtyp</AkLabel><AkInput value={formData.kunde.fahrzeugtyp} onChange={e => updateFormData({ kunde: { ...formData.kunde, fahrzeugtyp: e.target.value } })} placeholder="z. B. Fiat Ducato" /></div>
            <div className="ak-field"><AkLabel icon={Hash}>Fahrgestellnummer</AkLabel><AkInput value={formData.kunde.fahrgestellnummer} onChange={e => updateFormData({ kunde: { ...formData.kunde, fahrgestellnummer: e.target.value.toUpperCase() } })} placeholder="VIN" className="ak-mono" /></div>
          </div>
        </AkSection>
        <AkSection title="Monteur" subtitle="Bearbeitung, Prüfstatus und Seriennummern">
          <div className="ak-grid-2">
            <div className="ak-field"><AkLabel required icon={User}>Name</AkLabel><AkInput value={formData.monteur.name} onChange={e => updateFormData({ monteur: { ...formData.monteur, name: e.target.value } })} placeholder="Monteur Name" /></div>
            <div className="ak-field"><AkLabel icon={Hash}>Seriennummern</AkLabel><AkInput value={formData.monteur.seriennummern} onChange={e => updateFormData({ monteur: { ...formData.monteur, seriennummern: e.target.value } })} placeholder="SN-XXXXX" className="ak-mono" /></div>
          </div>
          <CheckTile checked={formData.monteur.funktionenGeprueft} onChange={v => updateFormData({ monteur: { ...formData.monteur, funktionenGeprueft: v } })} label="Alle Funktionen geprüft" description="Statusmarkierung für die Montage- und Funktionskontrolle" />
        </AkSection>
      </div>

      <div className="ak-grid-2">
        <AkSection title="OBD & Tacho" subtitle="Eingangs- und Ausgangswerte">
          <div className="ak-grid-3">
            <div className="ak-field"><AkLabel>Eingang</AkLabel><AkInput value={formData.obd.eingang} onChange={e => updateFormData({ obd: { ...formData.obd, eingang: e.target.value } })} /></div>
            <div className="ak-field"><AkLabel>Ausgang</AkLabel><AkInput value={formData.obd.ausgang} onChange={e => updateFormData({ obd: { ...formData.obd, ausgang: e.target.value } })} /></div>
            <div className="ak-field"><AkLabel>Uhrzeit</AkLabel><AkInput value={formData.obd.uhrzeit} onChange={e => updateFormData({ obd: { ...formData.obd, uhrzeit: e.target.value } })} placeholder="08:45" /></div>
          </div>
          <div className="ak-grid-3">
            <CheckTile checked={formData.tachoFehler.ja} onChange={v => updateFormData({ tachoFehler: { ...formData.tachoFehler, ja: v, nein: v ? false : formData.tachoFehler.nein } })} label="Tacho-Fehler: Ja" />
            <CheckTile checked={formData.tachoFehler.nein} onChange={v => updateFormData({ tachoFehler: { ...formData.tachoFehler, nein: v, ja: v ? false : formData.tachoFehler.ja } })} label="Tacho-Fehler: Nein" />
            <div className="ak-field"><AkLabel>Fehlercode</AkLabel><AkInput value={formData.tachoFehler.code} onChange={e => updateFormData({ tachoFehler: { ...formData.tachoFehler, code: e.target.value } })} className="ak-mono" placeholder="Optionaler Code" /></div>
          </div>
        </AkSection>
        <AkSection title="Hinweise / Bemerkungen" subtitle="Freitextfeld für Zusatzinfos">
          <AkTextarea value={formData.hinweis} onChange={e => updateFormData({ hinweis: e.target.value })} placeholder="Hinweise und Bemerkungen ..." rows={5} />
          <div className="ak-field" style={{ marginTop: '16px' }}><AkLabel>LED Einbauort</AkLabel><AkInput value={formData.ledEinbauort} onChange={e => updateFormData({ ledEinbauort: e.target.value })} placeholder="Position der LED angeben ..." /></div>
        </AkSection>
      </div>

      <AkSection title="Fahrzeug-Visualisierung" subtitle="Interaktive Skizzenflächen">
        <div className="ak-grid-2">
          <SketchCanvas label="Fahrerseite" value={sketches.fahrerseite} onChange={v => updateSketch("fahrerseite", v)} backgroundSrc="/Arbeitskarte Bilder/Fahrerseite Wohnmobil.png" />
          <SketchCanvas label="Beifahrerseite" value={sketches.beifahrerseite} onChange={v => updateSketch("beifahrerseite", v)} backgroundSrc="/Arbeitskarte Bilder/Beifahrerseite Wohnmobil.png" />
          <SketchCanvas label="Front" value={sketches.dach} onChange={v => updateSketch("dach", v)} backgroundSrc="/Arbeitskarte Bilder/Front Wohnmobil.png" />
          <SketchCanvas label="Heck" value={sketches.heck} onChange={v => updateSketch("heck", v)} backgroundSrc="/Arbeitskarte Bilder/Heck Wohnmobilseite.png" />
        </div>
      </AkSection>
    </div>
  );
}

/* ── Page 2: Sichtkontrolle ── */
function PageTwo({ formData, updateFormData }) {
  const [sigModal, setSigModal] = useState(null);
  const updateFoto = (key, value) => updateFormData({ vorschadenFotos: { ...formData.vorschadenFotos, [key]: value } });

  return (
    <div>
      <AkSection title="Sichtkontrolle – Seite 2 von 4" subtitle="Fotos, Schadensbeschreibung, Prüf-Checklisten">
        <div className="ak-grid-4">
          <PhotoUpload label="Fahrerseite" value={formData.vorschadenFotos.fahrerseite} onChange={url => updateFoto("fahrerseite", url)} />
          <PhotoUpload label="Beifahrerseite" value={formData.vorschadenFotos.beifahrerseite} onChange={url => updateFoto("beifahrerseite", url)} />
          <PhotoUpload label="Front" value={formData.vorschadenFotos.front} onChange={url => updateFoto("front", url)} />
          <PhotoUpload label="Heck" value={formData.vorschadenFotos.heck} onChange={url => updateFoto("heck", url)} />
        </div>
      </AkSection>

      <AkSection title="Schadensmeldung / Beschreibung">
        <AkTextarea value={formData.schadensmeldung} onChange={e => updateFormData({ schadensmeldung: e.target.value })} placeholder="Vorschäden beschreiben ..." rows={5} />
      </AkSection>

      <div className="ak-grid-3">
        <AkSection title="Grundfunktionen">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(formData.checklistGrundfunktionen).map(([key, val]) => (
              <CheckTile key={key} checked={val} onChange={v => updateFormData({ checklistGrundfunktionen: { ...formData.checklistGrundfunktionen, [key]: v } })} label={{ zentralverriegelung: "Zentralverriegelung", sirene: "Sirene", panikAlarm: "Panik-Alarm", neigungssensor: "Neigungssensor" }[key]} />
            ))}
          </div>
        </AkSection>
        <AkSection title="Pro-finder Alarme">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(formData.checklistProFinder).map(([key, val]) => (
              <CheckTile key={key} checked={val} onChange={v => updateFormData({ checklistProFinder: { ...formData.checklistProFinder, [key]: v } })} label={{ gpsOrtung: "GPS-Ortung", geoFence: "Geo-Fence", bewegungsAlarm: "Bewegungsalarm", batterieueberwachung: "Batterieüberwachung" }[key]} />
            ))}
          </div>
        </AkSection>
        <AkSection title="Rückfahrkamera">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(formData.checklistRueckfahrkamera).map(([key, val]) => (
              <CheckTile key={key} checked={val} onChange={v => updateFormData({ checklistRueckfahrkamera: { ...formData.checklistRueckfahrkamera, [key]: v } })} label={{ bildqualitaet: "Bildqualität OK", hilfslinien: "Hilfslinien", nachtsicht: "Nachtsicht" }[key]} />
            ))}
          </div>
        </AkSection>
      </div>

      <AkSection title="Unterschriften" subtitle="Sichtkontrolle durch Monteur und Kunde bestätigen">
        <div className="ak-grid-2">
          <SignatureBox title="Unterschrift Monteur" value={formData.unterschriftMonteur} onCreate={() => setSigModal("monteur")} onClear={() => updateFormData({ unterschriftMonteur: "" })} />
          <SignatureBox title="Unterschrift Kunde" value={formData.unterschriftKunde} onCreate={() => setSigModal("kunde")} onClear={() => updateFormData({ unterschriftKunde: "" })} />
        </div>
      </AkSection>
      {sigModal === "monteur" && <SignatureCanvas title="Unterschrift Monteur" onClose={() => setSigModal(null)} onSave={sig => updateFormData({ unterschriftMonteur: sig })} />}
      {sigModal === "kunde" && <SignatureCanvas title="Unterschrift Kunde" onClose={() => setSigModal(null)} onSave={sig => updateFormData({ unterschriftKunde: sig })} />}
    </div>
  );
}

/* ── Page 3: Material ── */
function PageThree({ materials, setMaterials }) {
  const [newItem, setNewItem] = useState({ gruppe: "Sonstiges", artikel: "", artNr: "", menge: 1, notiz: "" });
  const [searchQ, setSearchQ] = useState("");
  const [collapsed, setCollapsed] = useState({});

  const filtered = useMemo(() => materials.filter(m => m.artikel.toLowerCase().includes(searchQ.toLowerCase()) || m.artNr.toLowerCase().includes(searchQ.toLowerCase()) || m.gruppe.toLowerCase().includes(searchQ.toLowerCase())), [materials, searchQ]);
  const grouped = useMemo(() => filtered.reduce((acc, item) => { if (!acc[item.gruppe]) acc[item.gruppe] = []; acc[item.gruppe].push(item); return acc; }, {}), [filtered]);
  const sortedGroups = [...groupOrder.filter(g => grouped[g]), ...Object.keys(grouped).filter(g => !groupOrder.includes(g))];
  const verbautCount = materials.filter(m => m.verbaut).length;

  const addMaterial = () => {
    if (!newItem.artikel?.trim()) return;
    setMaterials(prev => [...prev, { id: Date.now().toString(), gruppe: newItem.gruppe || "Sonstiges", artikel: newItem.artikel, artNr: newItem.artNr || "", menge: newItem.menge || 1, verbaut: false, notiz: newItem.notiz || "" }]);
    setNewItem({ gruppe: "Sonstiges", artikel: "", artNr: "", menge: 1, notiz: "" });
  };

  return (
    <div>
      <AkSection title="Materialliste – Seite 3 von 4" subtitle="Suche, Gruppen, Mengen und Verbaut-Status">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr auto auto', gap: '16px', alignItems: 'center' }}>
          <div className="ak-search-wrap"><Search size={20} /><AkInput value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Material suchen ..." className="ak-search-input" /></div>
          <div className="ak-stat-pill ak-stat-pill--total"><Package size={16} /> {materials.length} Gesamt</div>
          <div className="ak-stat-pill ak-stat-pill--verbaut"><ShoppingCart size={16} /> {verbautCount} Verbaut</div>
        </div>
      </AkSection>

      <AkSection title="Neues Material hinzufügen">
        <div className="ak-new-mat">
          <select className="ak-select" value={newItem.gruppe} onChange={e => setNewItem({ ...newItem, gruppe: e.target.value })}>{groupOrder.map(g => <option key={g}>{g}</option>)}</select>
          <AkInput placeholder="Artikel" value={newItem.artikel} onChange={e => setNewItem({ ...newItem, artikel: e.target.value })} />
          <AkInput placeholder="Art.-Nr." value={newItem.artNr} onChange={e => setNewItem({ ...newItem, artNr: e.target.value })} className="ak-mono" />
          <AkInput type="number" min={1} placeholder="Menge" value={String(newItem.menge ?? 1)} onChange={e => setNewItem({ ...newItem, menge: parseInt(e.target.value) || 1 })} />
          <AkInput placeholder="Notiz" value={newItem.notiz} onChange={e => setNewItem({ ...newItem, notiz: e.target.value })} />
          <button onClick={addMaterial} className="ak-action-btn ak-action-btn--primary"><Plus size={16} /> Hinzufügen</button>
        </div>
      </AkSection>

      {sortedGroups.map(gruppe => {
        const items = grouped[gruppe];
        const isCollapsed = collapsed[gruppe];
        const gVerbaut = items.filter(m => m.verbaut).length;
        return (
          <div key={gruppe} className="ak-mat-group">
            <button className="ak-mat-group-header" onClick={() => setCollapsed(p => ({ ...p, [gruppe]: !p[gruppe] }))}>
              <div style={{ textAlign: 'left' }}><div className="ak-mat-group-title">{gruppe}</div><div className="ak-mat-group-meta">{items.length} Artikel · {gVerbaut} verbaut</div></div>
              {isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
            </button>
            {!isCollapsed && items.map(item => (
              <div key={item.id} className="ak-mat-item">
                <div><div className="ak-mat-name">{item.artikel}</div><div className="ak-mat-id">ID: {item.id}</div></div>
                <div className="ak-mat-artnr">{item.artNr || "—"}</div>
                <AkInput type="number" min={1} value={String(item.menge)} onChange={e => setMaterials(prev => prev.map(m => m.id === item.id ? { ...m, menge: parseInt(e.target.value) || 1 } : m))} style={{ textAlign: 'center' }} />
                <button className={`ak-mat-verbaut ${item.verbaut ? 'ak-mat-verbaut--yes' : 'ak-mat-verbaut--no'}`} onClick={() => setMaterials(prev => prev.map(m => m.id === item.id ? { ...m, verbaut: !m.verbaut } : m))}>{item.verbaut ? "Verbaut" : "Offen"}</button>
                <AkInput value={item.notiz} onChange={e => setMaterials(prev => prev.map(m => m.id === item.id ? { ...m, notiz: e.target.value } : m))} placeholder="Notiz ..." />
                <button className="ak-mat-delete" onClick={() => setMaterials(prev => prev.filter(m => m.id !== item.id))}><Trash2 size={16} /></button>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

/* ── Page 4: Übergabe ── */
function PageFour({ formData, updateFormData }) {
  const [sigModal, setSigModal] = useState(null);
  const updateU = (key, value) => updateFormData({ uebergabe: { ...formData.uebergabe, [key]: value } });
  const checkedCount = checklistItemsUebergabe.filter(i => Boolean(formData.uebergabe[i.key])).length;

  return (
    <div>
      <AkSection title="Übergabeprotokoll – Seite 4 von 4" subtitle="Einweisung, Checkliste, Ort/Datum und Unterschriften">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 className="ak-check-label">Übergabe-Checkliste</h3>
          <span className="ak-progress-pct">{checkedCount} / {checklistItemsUebergabe.length} erledigt</span>
        </div>
        <div className="ak-grid-3">
          {checklistItemsUebergabe.map(item => (
            <CheckTile key={item.key} checked={Boolean(formData.uebergabe[item.key])} onChange={v => updateU(item.key, v)} label={item.label} />
          ))}
        </div>
      </AkSection>

      <div className="ak-grid-2">
        <AkSection title="Sonstiger Vermerk"><AkTextarea value={formData.uebergabe.sonstigerVermerk} onChange={e => updateU("sonstigerVermerk", e.target.value)} placeholder="Sonstige Anmerkungen ..." rows={6} /></AkSection>
        <AkSection title="Ort und Datum">
          <div className="ak-grid-2">
            <div className="ak-field"><AkLabel>Ort</AkLabel><AkInput value={formData.uebergabe.ort} onChange={e => updateU("ort", e.target.value)} placeholder="Ort eingeben ..." /></div>
            <div className="ak-field"><AkLabel>Datum</AkLabel><AkInput type="date" value={formData.uebergabe.datum} onChange={e => updateU("datum", e.target.value)} /></div>
          </div>
        </AkSection>
      </div>

      <AkSection title="Abschluss-Unterschriften">
        <div className="ak-grid-3">
          <SignatureBox title="Monteur" value={formData.unterschriftMonteur} onCreate={() => setSigModal("monteur")} onClear={() => updateFormData({ unterschriftMonteur: "" })} />
          <SignatureBox title="Kunde (Sichtkontrolle)" value={formData.unterschriftKunde} onCreate={() => setSigModal("kunde")} onClear={() => updateFormData({ unterschriftKunde: "" })} />
          <SignatureBox title="Kunde (Übergabe)" value={formData.uebergabe.unterschriftKunde} onCreate={() => setSigModal("uebergabeKunde")} onClear={() => updateU("unterschriftKunde", "")} />
        </div>
      </AkSection>
      {sigModal === "monteur" && <SignatureCanvas title="Unterschrift Monteur" onClose={() => setSigModal(null)} onSave={sig => updateFormData({ unterschriftMonteur: sig })} />}
      {sigModal === "kunde" && <SignatureCanvas title="Unterschrift Kunde" onClose={() => setSigModal(null)} onSave={sig => updateFormData({ unterschriftKunde: sig })} />}
      {sigModal === "uebergabeKunde" && <SignatureCanvas title="Unterschrift Kunde (Übergabe)" onClose={() => setSigModal(null)} onSave={sig => updateU("unterschriftKunde", sig)} />}
    </div>
  );
}

/* ── Main Component ── */
export default function ArbeitskarteToolPage() {
  const [activePage, setActivePage] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [materials, setMaterials] = useState(initialMaterials);
  const [hasUnsaved, setHasUnsaved] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [sketches, setSketches] = useState({ fahrerseite: "", beifahrerseite: "", dach: "", heck: "" });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) { try { const p = JSON.parse(saved); if (p.formData) setFormData(prev => ({ ...prev, ...p.formData })); if (p.materials) setMaterials(p.materials); if (p.sketches) setSketches(p.sketches); } catch (e) { console.error(e); } }
    setIsLoaded(true);
  }, []);

  const saveData = useCallback(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify({ formData, materials, sketches })); setHasUnsaved(false); }, [formData, materials, sketches]);
  const updateFormData = (updates) => { setFormData(prev => ({ ...prev, ...updates })); setHasUnsaved(true); };
  const handleMaterials = (action) => { setMaterials(action); setHasUnsaved(true); };

  useEffect(() => { if (!isLoaded) return; setHasUnsaved(true); }, [sketches]);
  useEffect(() => { if (!isLoaded || !hasUnsaved) return; const t = setTimeout(() => saveData(), 30000); return () => clearTimeout(t); }, [hasUnsaved, isLoaded, saveData]);

  const handleExport = () => {
    const kz = formData.kunde.kennzeichen?.trim().replace(/\s+/g, "-").toUpperCase() || "OHNE-KZ";
    const blob = new Blob([JSON.stringify({ version: "3.0", exportedAt: new Date().toISOString(), kennzeichen: kz, formData, materials: materials.filter(m => m.verbaut) }, null, 2)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `Arbeitskarte_${kz}_${format(new Date(), "yyyy-MM-dd")}.json`; document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  const fileRef = useRef(null);
  const handleImport = (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { try { const d = JSON.parse(String(ev.target?.result)); if (d.formData) { setFormData(prev => ({ ...prev, ...d.formData })); setHasUnsaved(true); alert(`"${file.name}" geladen.`); } else alert("Ungültiges Format."); } catch { alert("Fehler beim Laden."); } };
    reader.readAsText(file); e.target.value = "";
  };

  const handleReset = () => { if (!confirm("Alle Daten zurücksetzen?")) return; setFormData({ ...initialFormData, uebergabe: { ...initialFormData.uebergabe, datum: todayIso() } }); setMaterials(initialMaterials); setSketches({ fahrerseite: "", beifahrerseite: "", dach: "", heck: "" }); localStorage.removeItem(STORAGE_KEY); setHasUnsaved(false); setActivePage(1); };
  const handlePrint = () => { saveData(); window.print(); };
  const [saveOk, setSaveOk] = useState(false);
  const handleSave = () => { saveData(); setSaveOk(true); setTimeout(() => setSaveOk(false), 1800); };

  const tabs = [{ id: 1, label: "Auftrag" }, { id: 2, label: "Sichtkontrolle" }, { id: 3, label: "Material" }, { id: 4, label: "Übergabe" }];
  const score = [1,2,3,4].map(id => getPageStatus(id, formData, materials)).reduce((s, st) => s + (st === "complete" ? 25 : st === "partial" ? 12.5 : 0), 0);

  if (!isLoaded) return <div className="ak-page"><div className="ak-container"><p>Lade Daten ...</p></div></div>;

  return (
    <div className="ak-page">
      <div className="ak-container">
        <div className="ak-hero">
          <div className="ak-hero-inner">
            <div>
              <div className="ak-hero-badge">Digitales Werkzeug</div>
              <h1>THITRONIK Arbeitskarte Digital</h1>
              <p>Interaktives Formular mit Tabs, Materialverwaltung, Fotos, Signaturen, Export/Import und lokaler Speicherung.</p>
            </div>
            <div className="ak-hero-stamp">Stand: {format(new Date(), "dd.MM.yyyy HH:mm")}</div>
          </div>
        </div>

        <nav className="ak-nav">
          {tabs.map(tab => {
            const status = getPageStatus(tab.id, formData, materials);
            return (
              <button key={tab.id} onClick={() => setActivePage(tab.id)} className={`ak-nav-tab ${activePage === tab.id ? 'ak-nav-tab--active' : 'ak-nav-tab--inactive'}`}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><StatusIcon status={status} /><span>{tab.label}</span></span>
                <span className="ak-nav-tab-num">{tab.id}</span>
              </button>
            );
          })}
        </nav>

        <div className="ak-progress">
          <div className="ak-progress-header">
            <div><div className="ak-label">Fortschritt</div><div className="ak-section-subtitle">Automatische Auswertung der vier Seiten</div></div>
            <div className="ak-progress-pct">{Math.round(score)}%</div>
          </div>
          <div className="ak-progress-track"><div className="ak-progress-fill" style={{ width: `${score}%` }} /></div>
        </div>

        <div className="ak-actions no-print">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div><div className="ak-label">Aktionen</div><div className="ak-section-subtitle">JSON-Import/Export, lokales Speichern, Reset und Druckansicht</div></div>
            {hasUnsaved && !saveOk && <span className="ak-unsaved">Nicht gespeichert</span>}
          </div>
          <input ref={fileRef} type="file" accept=".json" style={{ display: 'none' }} onChange={handleImport} />
          <div className="ak-actions-grid">
            <button className="ak-action-btn" onClick={() => fileRef.current?.click()}><Upload size={16} /> Laden</button>
            <button className="ak-action-btn" onClick={handleExport}><Download size={16} /> Export</button>
            <button className="ak-action-btn ak-action-btn--primary" onClick={handleSave}>{saveOk ? <Check size={16} /> : <Save size={16} />}{saveOk ? "Gespeichert" : "Speichern"}</button>
            <button className="ak-action-btn" onClick={handleReset}><RotateCcw size={16} /> Neu</button>
            <button className="ak-action-btn" onClick={handlePrint}><Printer size={16} /> Drucken</button>
          </div>
        </div>

        {activePage === 1 && <PageOne formData={formData} updateFormData={updateFormData} sketches={sketches} setSketches={setSketches} />}
        {activePage === 2 && <PageTwo formData={formData} updateFormData={updateFormData} />}
        {activePage === 3 && <PageThree materials={materials} setMaterials={handleMaterials} />}
        {activePage === 4 && <PageFour formData={formData} updateFormData={updateFormData} />}
      </div>
    </div>
  );
}
