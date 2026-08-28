"use client";

import "../../v2/v2-system.css";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import {
  AlertCircle, Check, CheckCircle2, ChevronDown, ChevronUp, Circle, ClipboardList,
  Download, FilePlus2, History, Package, Phone, Plus, Printer, Save, Search,
  Settings, ShoppingCart, Trash2, Upload, User, Wrench, Car, Hash, FileText,
} from "lucide-react";
import {
  STORAGE_KEY, initialFormData, initialMaterials, groupOrder, checklistItemsUebergabe,
  initialSketches, normalizeSketches,
  grundfunktionenLabels, proFinderLabels, rueckfahrkameraLabels,
} from "@/lib/arbeitskarte-data";
import {
  AkSection, AkInput, AkLabel, AkField, AkDictationField, TogglePill, CheckTile,
  SignatureBox, SignatureCanvas, PhotoUpload, SketchCanvas
} from "@/components/arbeitskarte/primitives";
import ArbeitskartePrintView from "@/components/arbeitskarte/PrintView";
import { useAuth } from "@/lib/auth";
import db from "@/lib/db";
import { isUuid } from "@/lib/uuid";
import {
  WORK_CARD_STORAGE_PREFIX,
  createEmptyWorkCard,
  generateWorkCardId,
  normalizeWorkCard,
  normalizeWorkCardRow,
  readLocalWorkCards,
  sortWorkCards,
  workCardStorageKey,
  writeLocalWorkCard,
} from "@/lib/arbeitskarte-history";

/* ── Import-Helfer (robuste Validierung gegen kaputte/handgepflegte JSON-Importe) ── */
// Verschachtelte Objekte über die Defaults mergen, statt sie blind zu überschreiben:
// ein Import mit z. B. `kunde: "x"` (String statt Objekt) würde sonst getPageStatus/
// missingRequired crashen (`formData.kunde.name`). Typ-Mismatches behalten den Default.
function mergeImportedFormData(base, incoming) {
  const out = { ...base };
  if (!incoming || typeof incoming !== "object") return out;
  for (const [k, v] of Object.entries(incoming)) {
    const baseVal = base[k];
    const baseIsObj = baseVal && typeof baseVal === "object" && !Array.isArray(baseVal);
    const vIsObj = v && typeof v === "object" && !Array.isArray(v);
    if (baseIsObj && vIsObj) out[k] = { ...baseVal, ...v };
    else if (!baseIsObj && !vIsObj && typeof v === typeof baseVal) out[k] = v;
  }
  return out;
}

// Jedes importierte Material auf ein vollständiges Item normalisieren ( id/menge etc.),
// damit .filter/.reduce/.toLowerCase in PageThree nicht auf Fremdformaten crashen.
function coerceImportedMaterial(m, i) {
  if (!m || typeof m !== "object") return null;
  const n = parseInt(m.menge, 10);
  return {
    id: m.id != null ? String(m.id) : `imp-${i}`,
    gruppe: typeof m.gruppe === "string" && m.gruppe ? m.gruppe : (groupOrder[0] || "Sonstiges"),
    artikel: typeof m.artikel === "string" ? m.artikel : "",
    artNr: typeof m.artNr === "string" ? m.artNr : "",
    menge: Number.isFinite(n) && n > 0 ? n : 1,
    verbaut: !!m.verbaut,
    notiz: typeof m.notiz === "string" ? m.notiz : "",
  };
}

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

function formatHistoryDate(value) {
  try {
    return format(new Date(value), "dd.MM.yyyy, HH:mm", { locale: de });
  } catch {
    return "Datum unbekannt";
  }
}

/* ── Page 1: Auftrag ── */
function PageOne({ formData, updateFormData, sketches, setSketches, showErrors }) {
  const updateSketch = (key, value) => setSketches(prev => normalizeSketches({ ...prev, [key]: value }));
  const currentDate = format(new Date(), "dd. MMMM yyyy", { locale: de });
  const currentTime = format(new Date(), "HH:mm", { locale: de }) + " Uhr";
  const orderTypeMissing = showErrors && !(formData.orderType.einbau || formData.orderType.nachruestung || formData.orderType.service);

  return (
    <div>
      <AkSection title="Arbeitskarte Digital v3.0" subtitle="THITRONIK – Digitaler Formular-Workflow">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="ak-label">Datum</div>
            <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--text-primary)' }}>{currentDate}</div>
            <div className="ak-section-subtitle">{currentTime}</div>
          </div>
          <div>
            <div className="ak-grid-3">
              <TogglePill active={formData.orderType.einbau} onClick={() => updateFormData({ orderType: { ...formData.orderType, einbau: !formData.orderType.einbau } })} label="Einbau" icon={ClipboardList} />
              <TogglePill active={formData.orderType.nachruestung} onClick={() => updateFormData({ orderType: { ...formData.orderType, nachruestung: !formData.orderType.nachruestung } })} label="Nachrüstung" icon={Wrench} />
              <TogglePill active={formData.orderType.service} onClick={() => updateFormData({ orderType: { ...formData.orderType, service: !formData.orderType.service } })} label="Service" icon={Settings} />
            </div>
            {orderTypeMissing && <p className="ak-field-error" role="alert" style={{ marginTop: '8px' }}>Bitte mindestens eine Auftragsart wählen.</p>}
          </div>
        </div>
      </AkSection>

      <div className="ak-grid-2">
        <AkSection title="Kundendaten" subtitle="Basisdaten des Fahrzeugs und des Auftraggebers">
          <div className="ak-grid-2">
            <AkField label="Firma" icon={FileText} value={formData.kunde.firma} onChange={e => updateFormData({ kunde: { ...formData.kunde, firma: e.target.value } })} placeholder="Firmenname" />
            <AkField label="Name" icon={User} required error={showErrors && !formData.kunde.name.trim() ? "Bitte ausfüllen." : undefined} value={formData.kunde.name} onChange={e => updateFormData({ kunde: { ...formData.kunde, name: e.target.value } })} placeholder="Kundenname" />
            <AkField label="Telefon" icon={Phone} value={formData.kunde.telefon} onChange={e => updateFormData({ kunde: { ...formData.kunde, telefon: e.target.value } })} placeholder="+49 …" />
            <AkField label="Kennzeichen" icon={Car} value={formData.kunde.kennzeichen} onChange={e => updateFormData({ kunde: { ...formData.kunde, kennzeichen: e.target.value.toUpperCase() } })} placeholder="XX-XX 1234" className="ak-mono" />
            <AkField label="Fahrzeugtyp" icon={Car} value={formData.kunde.fahrzeugtyp} onChange={e => updateFormData({ kunde: { ...formData.kunde, fahrzeugtyp: e.target.value } })} placeholder="z. B. Fiat Ducato" />
            <AkField label="Fahrgestellnummer" icon={Hash} value={formData.kunde.fahrgestellnummer} onChange={e => updateFormData({ kunde: { ...formData.kunde, fahrgestellnummer: e.target.value.toUpperCase() } })} placeholder="VIN" className="ak-mono" />
          </div>
        </AkSection>
        <AkSection title="Monteur" subtitle="Bearbeitung, Prüfstatus und Seriennummern">
          <div className="ak-grid-2">
            <AkField label="Name" icon={User} required error={showErrors && !formData.monteur.name.trim() ? "Bitte ausfüllen." : undefined} value={formData.monteur.name} onChange={e => updateFormData({ monteur: { ...formData.monteur, name: e.target.value } })} placeholder="Monteur Name" />
            <AkField label="Seriennummern" icon={Hash} value={formData.monteur.seriennummern} onChange={e => updateFormData({ monteur: { ...formData.monteur, seriennummern: e.target.value } })} placeholder="SN-XXXXX" className="ak-mono" />
          </div>
          <CheckTile checked={formData.monteur.funktionenGeprueft} onChange={v => updateFormData({ monteur: { ...formData.monteur, funktionenGeprueft: v } })} label="Alle Funktionen geprüft" description="Statusmarkierung für die Montage- und Funktionskontrolle" />
        </AkSection>
      </div>

      <div className="ak-grid-2">
        <AkSection title="OBD & Tacho" subtitle="Eingangs- und Ausgangswerte">
          <div className="ak-grid-3">
            <AkField label="Eingang" value={formData.obd.eingang} onChange={e => updateFormData({ obd: { ...formData.obd, eingang: e.target.value } })} />
            <AkField label="Ausgang" value={formData.obd.ausgang} onChange={e => updateFormData({ obd: { ...formData.obd, ausgang: e.target.value } })} />
            <AkField label="Uhrzeit" value={formData.obd.uhrzeit} onChange={e => updateFormData({ obd: { ...formData.obd, uhrzeit: e.target.value } })} placeholder="08:45" />
          </div>
          <div className="ak-grid-2">
            <div className="ak-field">
              <AkLabel>Tacho-Fehler</AkLabel>
              <div className="ak-segmented" role="group" aria-label="Tacho-Fehler">
                <button type="button" aria-pressed={formData.tachoFehler.ja} className={`ak-seg ${formData.tachoFehler.ja ? 'ak-seg--active' : ''}`} onClick={() => updateFormData({ tachoFehler: { ...formData.tachoFehler, ja: !formData.tachoFehler.ja, nein: false } })}>Ja</button>
                <button type="button" aria-pressed={formData.tachoFehler.nein} className={`ak-seg ${formData.tachoFehler.nein ? 'ak-seg--active' : ''}`} onClick={() => updateFormData({ tachoFehler: { ...formData.tachoFehler, nein: !formData.tachoFehler.nein, ja: false } })}>Nein</button>
              </div>
            </div>
            <AkField label="Fehlercode" value={formData.tachoFehler.code} onChange={e => updateFormData({ tachoFehler: { ...formData.tachoFehler, code: e.target.value } })} className="ak-mono" placeholder="Optionaler Code" />
          </div>
        </AkSection>
        <AkSection title="Hinweise / Bemerkungen" subtitle="Freitextfeld für Zusatzinfos">
          <AkDictationField label="Hinweise und Bemerkungen" value={formData.hinweis} onValueChange={value => updateFormData({ hinweis: value })} placeholder="Hinweise und Bemerkungen …" rows={5} />
          <AkField label="LED Einbauort" value={formData.ledEinbauort} onChange={e => updateFormData({ ledEinbauort: e.target.value })} placeholder="Position der LED angeben …" />
        </AkSection>
      </div>

      <AkSection title="Fahrzeug-Visualisierung" subtitle="Interaktive Skizzenflächen">
        <div className="ak-grid-2">
          <SketchCanvas label="Fahrerseite" value={sketches.fahrerseite} onChange={v => updateSketch("fahrerseite", v)} backgroundSrc="/assets/arbeitskarte/wohnmobil-fahrerseite.png" />
          <SketchCanvas label="Beifahrerseite" value={sketches.beifahrerseite} onChange={v => updateSketch("beifahrerseite", v)} backgroundSrc="/assets/arbeitskarte/wohnmobil-beifahrerseite.png" />
          <SketchCanvas label="Front" value={sketches.front || sketches.dach || ""} onChange={v => updateSketch("front", v)} backgroundSrc="/assets/arbeitskarte/wohnmobil-front.png" />
          <SketchCanvas label="Heck" value={sketches.heck} onChange={v => updateSketch("heck", v)} backgroundSrc="/assets/arbeitskarte/wohnmobil-heck.png" />
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
        <AkDictationField label="Schadensmeldung / Beschreibung" showLabel={false} value={formData.schadensmeldung} onValueChange={value => updateFormData({ schadensmeldung: value })} placeholder="Vorschäden beschreiben …" rows={5} />
      </AkSection>

      <div className="ak-grid-3">
        <AkSection title="Grundfunktionen">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(formData.checklistGrundfunktionen).map(([key, val]) => (
              <CheckTile key={key} checked={val} onChange={v => updateFormData({ checklistGrundfunktionen: { ...formData.checklistGrundfunktionen, [key]: v } })} label={grundfunktionenLabels[key]} />
            ))}
          </div>
        </AkSection>
        <AkSection title="Pro-finder Alarme">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(formData.checklistProFinder).map(([key, val]) => (
              <CheckTile key={key} checked={val} onChange={v => updateFormData({ checklistProFinder: { ...formData.checklistProFinder, [key]: v } })} label={proFinderLabels[key]} />
            ))}
          </div>
        </AkSection>
        <AkSection title="Rückfahrkamera">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(formData.checklistRueckfahrkamera).map(([key, val]) => (
              <CheckTile key={key} checked={val} onChange={v => updateFormData({ checklistRueckfahrkamera: { ...formData.checklistRueckfahrkamera, [key]: v } })} label={rueckfahrkameraLabels[key]} />
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
    const id = (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : `m-${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    setMaterials(prev => [...prev, { id, gruppe: newItem.gruppe || "Sonstiges", artikel: newItem.artikel, artNr: newItem.artNr || "", menge: newItem.menge || 1, verbaut: false, notiz: newItem.notiz || "" }]);
    setNewItem({ gruppe: "Sonstiges", artikel: "", artNr: "", menge: 1, notiz: "" });
  };

  return (
    <div>
      <AkSection title="Materialliste – Seite 3 von 4" subtitle="Suche, Gruppen, Mengen und Verbaut-Status">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr auto auto', gap: '16px', alignItems: 'center' }}>
          <div className="ak-search-wrap"><Search size={20} /><AkInput value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Material suchen …" aria-label="Material suchen" className="ak-search-input" /></div>
          <div className="ak-stat-pill ak-stat-pill--total"><Package size={16} /> {materials.length} Gesamt</div>
          <div className="ak-stat-pill ak-stat-pill--verbaut"><ShoppingCart size={16} /> {verbautCount} Verbaut</div>
        </div>
      </AkSection>

      <AkSection title="Neues Material hinzufügen">
        <div className="ak-new-mat">
          <select className="ak-select" aria-label="Gruppe" value={newItem.gruppe} onChange={e => setNewItem({ ...newItem, gruppe: e.target.value })}>{groupOrder.map(g => <option key={g}>{g}</option>)}</select>
          <AkInput placeholder="Artikel" aria-label="Artikel" value={newItem.artikel} onChange={e => setNewItem({ ...newItem, artikel: e.target.value })} />
          <AkInput placeholder="Art.-Nr." aria-label="Artikelnummer" value={newItem.artNr} onChange={e => setNewItem({ ...newItem, artNr: e.target.value })} className="ak-mono" />
          <AkInput type="number" min={1} placeholder="Menge" aria-label="Menge" value={newItem.menge === "" ? "" : String(newItem.menge ?? 1)} onChange={e => { const v = e.target.value; setNewItem({ ...newItem, menge: v === "" ? "" : (Number.isNaN(parseInt(v, 10)) ? "" : parseInt(v, 10)) }); }} onBlur={e => setNewItem(prev => ({ ...prev, menge: Math.max(1, parseInt(e.target.value, 10) || 1) }))} />
          <AkInput placeholder="Notiz" aria-label="Notiz" value={newItem.notiz} onChange={e => setNewItem({ ...newItem, notiz: e.target.value })} />
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
                <div className="ak-mat-name">{item.artikel}</div>
                <div className="ak-mat-artnr">{item.artNr || "—"}</div>
                <AkInput type="number" min={1} value={item.menge === "" ? "" : String(item.menge)} aria-label={`Menge ${item.artikel}`} onChange={e => { const v = e.target.value; setMaterials(prev => prev.map(m => m.id === item.id ? { ...m, menge: v === "" ? "" : (Number.isNaN(parseInt(v, 10)) ? "" : parseInt(v, 10)) } : m)); }} onBlur={e => { const n = Math.max(1, parseInt(e.target.value, 10) || 1); setMaterials(prev => prev.map(m => m.id === item.id ? { ...m, menge: n } : m)); }} style={{ textAlign: 'center' }} />
                <button className={`ak-mat-verbaut ${item.verbaut ? 'ak-mat-verbaut--yes' : 'ak-mat-verbaut--no'}`} aria-pressed={item.verbaut} aria-label={`${item.artikel} verbaut`} onClick={() => setMaterials(prev => prev.map(m => m.id === item.id ? { ...m, verbaut: !m.verbaut } : m))}>{item.verbaut ? "Verbaut" : "Offen"}</button>
                <AkInput value={item.notiz} aria-label={`Notiz ${item.artikel}`} onChange={e => setMaterials(prev => prev.map(m => m.id === item.id ? { ...m, notiz: e.target.value } : m))} placeholder="Notiz …" />
                <button className="ak-mat-delete" aria-label={`${item.artikel} entfernen`} onClick={() => setMaterials(prev => prev.filter(m => m.id !== item.id))}><Trash2 size={16} /></button>
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
        <AkSection title="Sonstiger Vermerk"><AkDictationField label="Sonstiger Vermerk" showLabel={false} value={formData.uebergabe.sonstigerVermerk} onValueChange={value => updateU("sonstigerVermerk", value)} placeholder="Sonstige Anmerkungen …" rows={6} /></AkSection>
        <AkSection title="Ort und Datum">
          <div className="ak-grid-2">
            <AkField label="Ort" value={formData.uebergabe.ort} onChange={e => updateU("ort", e.target.value)} placeholder="Ort eingeben …" />
            <AkField label="Datum" type="date" value={formData.uebergabe.datum} onChange={e => updateU("datum", e.target.value)} />
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
  const { currentUser, Auth } = useAuth();
  const userId = currentUser?.id;
  const localOwnerId = userId || "demo";
  const [activePage, setActivePage] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [materials, setMaterials] = useState(initialMaterials);
  const [hasUnsaved, setHasUnsaved] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [sketches, setSketches] = useState(initialSketches);
  const [triedFinalize, setTriedFinalize] = useState(false);
  const [activeCardId, setActiveCardId] = useState("");
  const [activeCardStatus, setActiveCardStatus] = useState("draft");
  const [cardCreatedAt, setCardCreatedAt] = useState("");
  const [cardCompletedAt, setCardCompletedAt] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyQuery, setHistoryQuery] = useState("");
  const [saveError, setSaveError] = useState("");

  const applyCard = useCallback((card) => {
    if (!card) return;
    const empty = createEmptyWorkCard(card.id, card.createdAt);
    setFormData(mergeImportedFormData(empty.formData, card.formData));
    setMaterials(
      Array.isArray(card.materials)
        ? card.materials.map(coerceImportedMaterial).filter(Boolean)
        : empty.materials,
    );
    setSketches(normalizeSketches(card.sketches));
    setActiveCardId(card.id);
    setActiveCardStatus(card.status);
    setCardCreatedAt(card.createdAt);
    setCardCompletedAt(card.completedAt);
    setHasUnsaved(false);
    setTriedFinalize(false);
    setActivePage(1);
  }, []);

  const persistCard = useCallback(async (card) => {
    let localFailed = false;
    let cloudFailed = false;
    setHistory((current) => sortWorkCards([
      card,
      ...current.filter((item) => item.id !== card.id),
    ]));

    try {
      writeLocalWorkCard(localStorage, localOwnerId, card);
      // Kompatibilitäts-Mirror für Onboarding und bestehende Offline-Nutzung.
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        formData: card.formData,
        materials: card.materials,
        sketches: card.sketches,
      }));
    } catch (error) {
      localFailed = true;
      console.error(error);
    }

    if (isUuid(userId)) {
      try {
        await db.setUserStorage(userId, workCardStorageKey(card.id), card, {
          accessToken: Auth.getAccessToken?.(),
        });
      } catch (error) {
        cloudFailed = true;
        console.error(error);
      }
    }

    if (cloudFailed) {
      setSaveError("Supabase ist gerade nicht erreichbar. Die Arbeitskarte wurde nur lokal gespeichert.");
    } else if (localFailed) {
      setSaveError("In Supabase gespeichert, der lokale Offline-Speicher ist jedoch voll.");
    } else {
      setSaveError("");
    }
    return !cloudFailed;
  }, [Auth, localOwnerId, userId]);

  // Alle Arbeitskarten des Händlers laden. Supabase ist die Autorität; lokale
  // Einträge ergänzen den Verlauf um noch nicht synchronisierte Offline-Daten.
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    (async () => {
      let remoteCards = [];
      let legacyRemote = null;
      if (isUuid(userId)) {
        try {
          const [rows, legacyRow] = await Promise.all([
            db.listUserStorage(userId, WORK_CARD_STORAGE_PREFIX, {
              accessToken: Auth.getAccessToken?.(),
            }),
            db.getUserStorage(userId, "arbeitskarte", {
              accessToken: Auth.getAccessToken?.(),
            }),
          ]);
          remoteCards = (rows || []).map(normalizeWorkCardRow).filter(Boolean);
          legacyRemote = legacyRow?.wert || null;
        } catch (error) {
          console.error(error);
          if (!cancelled) {
            setSaveError("Supabase-Verlauf konnte nicht geladen werden. Lokale Daten werden angezeigt.");
          }
        }
      }

      let localCards = [];
      let legacyLocal = null;
      try {
        localCards = readLocalWorkCards(localStorage, localOwnerId);
        const saved = localStorage.getItem(STORAGE_KEY);
        legacyLocal = saved ? JSON.parse(saved) : null;
      } catch (error) {
        console.error(error);
      }

      const merged = new Map(localCards.map((card) => [card.id, card]));
      remoteCards.forEach((card) => {
        const local = merged.get(card.id);
        if (!local || String(card.updatedAt) >= String(local.updatedAt)) merged.set(card.id, card);
      });
      let cards = sortWorkCards([...merged.values()]);

      // Den bisherigen einzelnen Entwurf einmalig in das neue Mehrkartenformat
      // übernehmen, wenn noch kein Verlauf existiert.
      let migratedLegacy = null;
      if (!cards.length && (legacyRemote || legacyLocal)) {
        migratedLegacy = normalizeWorkCard(legacyRemote || legacyLocal, {
          fallbackId: generateWorkCardId(),
        });
        if (migratedLegacy) cards = [migratedLegacy];
      }

      const activeCard = cards[0] || createEmptyWorkCard();
      if (cancelled) return;
      setHistory(cards);
      applyCard(activeCard);
      setIsLoaded(true);
      if (migratedLegacy) void persistCard(migratedLegacy);
    })();
    return () => { cancelled = true; };
  }, [Auth, applyCard, localOwnerId, persistCard, userId]);

  const saveData = useCallback(async (overrides = {}) => {
    const now = new Date().toISOString();
    const card = {
      version: 1,
      id: activeCardId || generateWorkCardId(),
      status: overrides.status || activeCardStatus,
      createdAt: cardCreatedAt || now,
      updatedAt: now,
      completedAt: overrides.completedAt !== undefined
        ? overrides.completedAt
        : cardCompletedAt,
      formData,
      materials,
      sketches: normalizeSketches(sketches),
    };
    setActiveCardId(card.id);
    setActiveCardStatus(card.status);
    setCardCreatedAt(card.createdAt);
    setCardCompletedAt(card.completedAt);
    setHasUnsaved(false);
    await persistCard(card);
    return card;
  }, [
    activeCardId,
    activeCardStatus,
    cardCompletedAt,
    cardCreatedAt,
    formData,
    materials,
    persistCard,
    sketches,
  ]);
  const updateFormData = (updates) => { setFormData(prev => ({ ...prev, ...updates })); setHasUnsaved(true); };
  const handleMaterials = (action) => { setMaterials(action); setHasUnsaved(true); };
  const handleSketches = useCallback((action) => { setSketches(prev => typeof action === "function" ? action(prev) : action); setHasUnsaved(true); }, []);

  useEffect(() => {
    if (!isLoaded || !hasUnsaved) return;
    const timer = setTimeout(() => { void saveData(); }, 30000);
    return () => clearTimeout(timer);
  }, [hasUnsaved, isLoaded, saveData]);

  // Tab-Schließen mit ungespeicherten Änderungen abfangen — der Autosave greift
  // erst nach 30 s, dazwischen wäre die Eingabe sonst kommentarlos weg.
  useEffect(() => {
    if (!hasUnsaved) return;
    const warn = (e) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [hasUnsaved]);

  // Pflichtfelder für Export/Druck (das „fertige" Dokument). Speichern bleibt
  // als Entwurf jederzeit erlaubt.
  const missingRequired = useMemo(() => {
    const m = [];
    if (!(formData.orderType.einbau || formData.orderType.nachruestung || formData.orderType.service)) m.push("Auftragsart");
    if (!formData.kunde.name.trim()) m.push("Kundenname");
    if (!formData.monteur.name.trim()) m.push("Monteur-Name");
    return m;
  }, [formData]);

  // Vor Export/Druck prüfen: bei fehlenden Pflichtfeldern markieren, auf Seite 1
  // springen und rückfragen, ob trotzdem fortgefahren werden soll.
  const ensureComplete = () => {
    if (missingRequired.length === 0) return true;
    setTriedFinalize(true);
    setActivePage(1);
    return confirm(`Folgende Pflichtfelder fehlen:\n\n• ${missingRequired.join("\n• ")}\n\nTrotzdem fortfahren?`);
  };

  const handleExport = () => {
    if (!ensureComplete()) return;
    const kz = formData.kunde.kennzeichen?.trim().replace(/\s+/g, "-").toUpperCase() || "OHNE-KZ";
    const blob = new Blob([JSON.stringify({ version: "3.0", exportedAt: new Date().toISOString(), kennzeichen: kz, formData, materials: materials.filter(m => m.verbaut), sketches: normalizeSketches(sketches) }, null, 2)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `Arbeitskarte_${kz}_${format(new Date(), "yyyy-MM-dd")}.json`; document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  const fileRef = useRef(null);
  const handleImport = (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const d = JSON.parse(String(ev.target?.result));
        if (!d || typeof d !== "object" || (!d.formData && !d.materials && !d.sketches)) { alert("Ungültiges Format."); return; }
        if (d.formData && typeof d.formData === "object") setFormData(prev => mergeImportedFormData(prev, d.formData));
        if (Array.isArray(d.materials)) setMaterials(d.materials.map(coerceImportedMaterial).filter(Boolean));
        if (d.sketches) setSketches(normalizeSketches(d.sketches));
        setHasUnsaved(true);
        alert(`"${file.name}" geladen.`);
      } catch { alert("Fehler beim Laden."); }
    };
    reader.readAsText(file); e.target.value = "";
  };

  const handleNewCard = async () => {
    if (hasUnsaved) await saveData();
    const card = createEmptyWorkCard();
    applyCard(card);
    setHistoryOpen(false);
    await persistCard(card);
  };

  const handleOpenCard = async (card) => {
    if (card.id === activeCardId) {
      setHistoryOpen(false);
      return;
    }
    if (hasUnsaved) await saveData();
    applyCard(card);
    setHistoryOpen(false);
  };

  const handleFinalize = async () => {
    if (missingRequired.length) {
      setTriedFinalize(true);
      setActivePage(1);
      alert(`Zum Abschließen fehlen:\n\n• ${missingRequired.join("\n• ")}`);
      return;
    }
    await saveData({
      status: "completed",
      completedAt: cardCompletedAt || new Date().toISOString(),
    });
    setSaveOk(true);
    setTimeout(() => setSaveOk(false), 1800);
  };

  const handlePrint = () => {
    if (!ensureComplete()) return;
    void saveData();
    window.print();
  };
  const [saveOk, setSaveOk] = useState(false);
  const handleSave = async () => {
    await saveData();
    setSaveOk(true);
    setTimeout(() => setSaveOk(false), 1800);
  };

  const tabs = [{ id: 1, label: "Auftrag" }, { id: 2, label: "Sichtkontrolle" }, { id: 3, label: "Material" }, { id: 4, label: "Übergabe" }];
  const score = [1,2,3,4].map(id => getPageStatus(id, formData, materials)).reduce((s, st) => s + (st === "complete" ? 25 : st === "partial" ? 12.5 : 0), 0);
  const filteredHistory = useMemo(() => {
    const query = historyQuery.trim().toLowerCase();
    if (!query) return history;
    return history.filter((card) => {
      const customer = card.formData?.kunde || {};
      return [
        customer.name,
        customer.firma,
        customer.kennzeichen,
        customer.fahrzeugtyp,
        card.formData?.monteur?.name,
      ].some((value) => String(value || "").toLowerCase().includes(query));
    });
  }, [history, historyQuery]);

  if (!isLoaded) return <div className="ak-page"><div className="v2-scope"><div className="ak-container"><p>Lade Daten ...</p></div></div></div>;

  return (
    <div className="ak-page">
      <div className="v2-scope">
      <div className="ak-container">
        <div className="ak-hero">
          <div className="ak-hero-inner">
            <div>
              <div className="ak-hero-badge">Digitales Werkzeug</div>
              <h1>THITRONIK Arbeitskarte Digital</h1>
              <p>Jede Arbeitskarte wird separat gespeichert und bleibt im persönlichen Händlerverlauf erhalten.</p>
            </div>
            <div className="ak-hero-actions no-print">
              <div className={`ak-card-status ${activeCardStatus === "completed" ? "ak-card-status--completed" : ""}`}>
                {activeCardStatus === "completed" ? <CheckCircle2 size={15} /> : <Circle size={15} />}
                {activeCardStatus === "completed" ? "Abgeschlossen" : "Entwurf"}
              </div>
              <div className="ak-hero-buttons">
                <button type="button" className="ak-hero-action ak-hero-action--history" onClick={() => setHistoryOpen((open) => !open)}>
                  <History size={17} /> Verlauf ({history.length})
                </button>
                <button type="button" className="ak-hero-action ak-hero-action--primary" onClick={handleNewCard}>
                  <FilePlus2 size={17} /> Neue Arbeitskarte
                </button>
              </div>
              <div className="ak-hero-stamp">Stand: {format(new Date(), "dd.MM.yyyy HH:mm")}</div>
            </div>
          </div>
        </div>

        {historyOpen && (
          <section className="ak-history no-print" aria-labelledby="arbeitskarten-verlauf">
            <div className="ak-history-header">
              <div>
                <h2 id="arbeitskarten-verlauf" className="ak-section-title">Arbeitskarten-Verlauf</h2>
                <p className="ak-section-subtitle">Alle Entwürfe und abgeschlossenen Arbeitskarten dieses Händlerkontos.</p>
              </div>
              <div className="ak-search-wrap ak-history-search">
                <Search size={18} />
                <AkInput
                  value={historyQuery}
                  onChange={(event) => setHistoryQuery(event.target.value)}
                  placeholder="Kunde, Firma, Kennzeichen …"
                  aria-label="Arbeitskarten durchsuchen"
                  className="ak-search-input"
                />
              </div>
            </div>
            <div className="ak-history-list">
              {filteredHistory.map((card) => {
                const customer = card.formData?.kunde || {};
                const title = customer.name || customer.firma || "Unbenannte Arbeitskarte";
                const vehicle = [customer.kennzeichen, customer.fahrzeugtyp].filter(Boolean).join(" · ");
                return (
                  <button
                    type="button"
                    key={card.id}
                    className={`ak-history-item ${card.id === activeCardId ? "ak-history-item--active" : ""}`}
                    onClick={() => handleOpenCard(card)}
                  >
                    <span className="ak-history-item-main">
                      <span className="ak-history-item-title">{title}</span>
                      <span className="ak-history-item-meta">
                        {vehicle || "Noch keine Fahrzeugdaten"} · Bearbeitet {formatHistoryDate(card.updatedAt)}
                      </span>
                    </span>
                    <span className={`ak-history-status ${card.status === "completed" ? "ak-history-status--completed" : ""}`}>
                      {card.status === "completed" ? "Abgeschlossen" : "Entwurf"}
                    </span>
                  </button>
                );
              })}
              {!filteredHistory.length && (
                <p className="ak-empty">Keine Arbeitskarte passt zu dieser Suche.</p>
              )}
            </div>
          </section>
        )}

        <nav className="ak-nav">
          {tabs.map(tab => {
            const status = getPageStatus(tab.id, formData, materials);
            return (
              <button key={tab.id} onClick={() => setActivePage(tab.id)} className={`ak-nav-tab ak-nav-tab--brand-green ${activePage === tab.id ? 'ak-nav-tab--active' : 'ak-nav-tab--inactive'}`}>
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
            <div><div className="ak-label">Aktionen</div><div className="ak-section-subtitle">Import/Export, Supabase-Speicherung, Abschluss und Druckansicht</div></div>
            {hasUnsaved && !saveOk && <span className="ak-unsaved">Nicht gespeichert</span>}
          </div>
          {saveError && <p className="ak-save-error" role="status">{saveError}</p>}
          <input ref={fileRef} type="file" accept=".json" style={{ display: 'none' }} onChange={handleImport} />
          <div className="ak-actions-grid">
            <button className="ak-action-btn" onClick={() => fileRef.current?.click()}><Upload size={16} /> Laden</button>
            <button className="ak-action-btn" onClick={handleExport}><Download size={16} /> Export</button>
            <button className="ak-action-btn ak-action-btn--primary" onClick={handleSave}>{saveOk ? <Check size={16} /> : <Save size={16} />}{saveOk ? "Gespeichert" : "Speichern"}</button>
            <button className="ak-action-btn" onClick={handleFinalize}><CheckCircle2 size={16} /> Abschließen</button>
            <button className="ak-action-btn" onClick={handlePrint}><Printer size={16} /> Drucken</button>
          </div>
        </div>

        {activePage === 1 && <PageOne formData={formData} updateFormData={updateFormData} sketches={sketches} setSketches={handleSketches} showErrors={triedFinalize} />}
        {activePage === 2 && <PageTwo formData={formData} updateFormData={updateFormData} />}
        {activePage === 3 && <PageThree materials={materials} setMaterials={handleMaterials} />}
        {activePage === 4 && <PageFour formData={formData} updateFormData={updateFormData} />}
      </div>
      </div>

      {/* Nur für den Druck sichtbar – komplettes 4-Seiten-Protokoll auf einmal. */}
      <ArbeitskartePrintView formData={formData} materials={materials} sketches={normalizeSketches(sketches)} />
    </div>
  );
}
