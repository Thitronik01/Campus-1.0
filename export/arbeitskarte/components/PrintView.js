"use client";

// Druckfertige Komplett-Ansicht der Arbeitskarte (alle 4 Seiten auf einmal).
// Das interaktive Formular rendert immer nur den aktiven Tab – beim Drucken
// käme sonst nur eine Seite aufs Papier. Diese Ansicht ist am Bildschirm
// ausgeblendet (.ak-print-view) und wird per @media print sichtbar. Sie nutzt
// ausschließlich <img>/Text (kein Canvas), damit display:none den Inhalt nicht
// kaputt misst.

import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import {
  vehicleSketchViews, checklistItemsUebergabe, groupOrder,
  grundfunktionenLabels, proFinderLabels, rueckfahrkameraLabels,
} from "@/lib/arbeitskarte-data";

function Field({ label, value }) {
  return (
    <div className="ak-pr-field">
      <span className="ak-pr-field-label">{label}</span>
      <span className="ak-pr-field-value">{value || "—"}</span>
    </div>
  );
}

function CheckList({ items }) {
  return (
    <ul className="ak-pr-checklist">
      {items.map(({ key, label, checked }) => (
        <li key={key} className={checked ? "is-checked" : ""}>
          <span className="ak-pr-box" aria-hidden="true">{checked ? "×" : ""}</span>
          {label}
        </li>
      ))}
    </ul>
  );
}

function Signature({ title, value }) {
  return (
    <div className="ak-pr-sig">
      {/* Native img ist hier absichtlich nötig: Data-URL-Signaturen müssen in der
          zunächst ausgeblendeten Druckansicht bereits vor dem Druck geladen sein. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {value ? <img src={value} alt={title} /> : <div className="ak-pr-sig-line" />}
      <div className="ak-pr-sig-title">{title}</div>
    </div>
  );
}

export default function ArbeitskartePrintView({ formData, materials, sketches }) {
  const f = formData;
  const stamp = format(new Date(), "dd.MM.yyyy HH:mm", { locale: de });

  const orderTypes = [
    f.orderType.einbau && "Einbau",
    f.orderType.nachruestung && "Nachrüstung",
    f.orderType.service && "Service",
  ].filter(Boolean).join(", ");

  const grund = Object.entries(grundfunktionenLabels).map(([key, label]) => ({ key, label, checked: !!f.checklistGrundfunktionen?.[key] }));
  const profinder = Object.entries(proFinderLabels).map(([key, label]) => ({ key, label, checked: !!f.checklistProFinder?.[key] }));
  const rfk = Object.entries(rueckfahrkameraLabels).map(([key, label]) => ({ key, label, checked: !!f.checklistRueckfahrkamera?.[key] }));
  const uebergabeItems = checklistItemsUebergabe.map((i) => ({ ...i, checked: !!f.uebergabe?.[i.key] }));

  const verbaut = materials.filter((m) => m.verbaut);
  const groupsWithVerbaut = [
    ...groupOrder.filter((g) => verbaut.some((m) => m.gruppe === g)),
    ...[...new Set(verbaut.map((m) => m.gruppe))].filter((g) => !groupOrder.includes(g)),
  ];

  const tachoFehler = f.tachoFehler?.ja ? `Ja${f.tachoFehler.code ? ` (${f.tachoFehler.code})` : ""}` : (f.tachoFehler?.nein ? "Nein" : "—");

  // Defensiv: PrintView ist immer gemountet (nur per CSS versteckt) – ein
  // ungültiges Datum (z. B. aus einem Import) darf die Seite nicht crashen.
  const fmtDate = (d) => {
    if (!d) return "—";
    const dt = new Date(d);
    return Number.isNaN(dt.getTime()) ? String(d) : format(dt, "dd.MM.yyyy", { locale: de });
  };

  return (
    <div className="ak-print-view" aria-hidden="true">
      <header className="ak-pr-head">
        <div>
          <Image className="ak-pr-logo" src="/Bilder/Thitronik_vektor.webp" alt="THITRONIK" width={400} height={200} loading="eager" />
          <h1>Arbeitskarte</h1>
        </div>
        <div className="ak-pr-meta">
          <div><strong>Auftragsart:</strong> {orderTypes || "—"}</div>
          <div><strong>Stand:</strong> {stamp}</div>
        </div>
      </header>

      {/* 1 – Auftrag */}
      <section className="ak-pr-section">
        <h2>1 · Auftrag</h2>
        <div className="ak-pr-cols">
          <div>
            <h3>Kundendaten</h3>
            <Field label="Firma" value={f.kunde.firma} />
            <Field label="Name" value={f.kunde.name} />
            <Field label="Telefon" value={f.kunde.telefon} />
            <Field label="Kennzeichen" value={f.kunde.kennzeichen} />
            <Field label="Fahrzeugtyp" value={f.kunde.fahrzeugtyp} />
            <Field label="Fahrgestellnummer" value={f.kunde.fahrgestellnummer} />
          </div>
          <div>
            <h3>Monteur</h3>
            <Field label="Name" value={f.monteur.name} />
            <Field label="Seriennummern" value={f.monteur.seriennummern} />
            <Field label="Funktionen geprüft" value={f.monteur.funktionenGeprueft ? "Ja" : "Nein"} />
            <h3 style={{ marginTop: "10px" }}>OBD & Tacho</h3>
            <Field label="OBD Eingang" value={f.obd.eingang} />
            <Field label="OBD Ausgang" value={f.obd.ausgang} />
            <Field label="Uhrzeit" value={f.obd.uhrzeit} />
            <Field label="Tacho-Fehler" value={tachoFehler} />
          </div>
        </div>
        <div className="ak-pr-cols">
          <Field label="Hinweise / Bemerkungen" value={f.hinweis} />
          <Field label="LED Einbauort" value={f.ledEinbauort} />
        </div>

        <h3>Fahrzeug-Visualisierung</h3>
        <div className="ak-pr-sketches">
          {vehicleSketchViews.map((view) => {
            const overlay = view.key === "front" ? (sketches.front || sketches.dach) : sketches[view.key];
            return (
              <figure key={view.key} className="ak-pr-sketch">
                <div className="ak-pr-sketch-stack">
                  {/* Native Bilder bewahren die pixelgenaue Druck-Überlagerung;
                      der Overlay-Wert ist eine zur Laufzeit erzeugte Data-URL. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={view.backgroundSrc} alt={view.label} className="ak-pr-sketch-bg" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {overlay ? <img src={overlay} alt="" className="ak-pr-sketch-overlay" /> : null}
                </div>
                <figcaption>{view.label}</figcaption>
              </figure>
            );
          })}
        </div>
      </section>

      {/* 2 – Sichtkontrolle */}
      <section className="ak-pr-section">
        <h2>2 · Sichtkontrolle</h2>
        <div className="ak-pr-photos">
          {[
            ["Fahrerseite", "fahrerseite"], ["Beifahrerseite", "beifahrerseite"],
            ["Front", "front"], ["Heck", "heck"],
          ].map(([label, key]) => (
            <figure key={key} className="ak-pr-photo">
              {f.vorschadenFotos?.[key]
                ? (
                  <>
                    {/* Data-URL-Fotos müssen auch in der versteckten Druckansicht
                        eager und ohne Optimizer-Zwischenschritt verfügbar sein. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.vorschadenFotos[key]} alt={label} />
                  </>
                )
                : <div className="ak-pr-photo-empty">kein Foto</div>}
              <figcaption>{label}</figcaption>
            </figure>
          ))}
        </div>
        <Field label="Schadensmeldung / Beschreibung" value={f.schadensmeldung} />
        <div className="ak-pr-cols-3">
          <div><h3>Grundfunktionen</h3><CheckList items={grund} /></div>
          <div><h3>Pro-finder Alarme</h3><CheckList items={profinder} /></div>
          <div><h3>Rückfahrkamera</h3><CheckList items={rfk} /></div>
        </div>
        <div className="ak-pr-sigs">
          <Signature title="Unterschrift Monteur" value={f.unterschriftMonteur} />
          <Signature title="Unterschrift Kunde" value={f.unterschriftKunde} />
        </div>
      </section>

      {/* 3 – Material */}
      <section className="ak-pr-section">
        <h2>3 · Verbautes Material</h2>
        {verbaut.length === 0 ? (
          <p className="ak-pr-empty">Keine Materialien als verbaut markiert.</p>
        ) : (
          <table className="ak-pr-table">
            <thead>
              <tr><th>Gruppe / Artikel</th><th>Art.-Nr.</th><th>Menge</th><th>Notiz</th></tr>
            </thead>
            <tbody>
              {groupsWithVerbaut.map((gruppe) => (
                <React.Fragment key={gruppe}>
                  <tr className="ak-pr-table-group"><td colSpan={4}>{gruppe}</td></tr>
                  {verbaut.filter((m) => m.gruppe === gruppe).map((m) => (
                    <tr key={m.id}>
                      <td>{m.artikel}</td>
                      <td className="ak-pr-mono">{m.artNr || "—"}</td>
                      <td>{m.menge}</td>
                      <td>{m.notiz || ""}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* 4 – Übergabe */}
      <section className="ak-pr-section">
        <h2>4 · Übergabe</h2>
        <h3>Übergabe-Checkliste</h3>
        <CheckList items={uebergabeItems} />
        <div className="ak-pr-cols">
          <Field label="Sonstiger Vermerk" value={f.uebergabe.sonstigerVermerk} />
          <div>
            <Field label="Ort" value={f.uebergabe.ort} />
            <Field label="Datum" value={fmtDate(f.uebergabe.datum)} />
          </div>
        </div>
        <div className="ak-pr-sigs ak-pr-sigs-3">
          <Signature title="Monteur" value={f.unterschriftMonteur} />
          <Signature title="Kunde (Sichtkontrolle)" value={f.unterschriftKunde} />
          <Signature title="Kunde (Übergabe)" value={f.uebergabe.unterschriftKunde} />
        </div>
      </section>
    </div>
  );
}
