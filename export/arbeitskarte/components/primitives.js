"use client";

import React, { useRef, useEffect, useId, useState } from 'react';
import NextImage from 'next/image';
import { Check, Mic, MicOff, Pen, X } from 'lucide-react';
import { downscaleImageFile } from '@/lib/image-utils';

/* ── Reusable Primitives ── */

export function AkSection({ title, subtitle, children }) {
  return (
    <section className="ak-section">
      <div>
        <h2 className="ak-section-title">{title}</h2>
        {subtitle && <p className="ak-section-subtitle">{subtitle}</p>}
      </div>
      <div className="ak-section-body">{children}</div>
    </section>
  );
}

export function AkInput(props) {
  return <input {...props} className={`ak-input ${props.className || ''}`} />;
}

export function AkTextarea(props) {
  return <textarea {...props} className={`ak-input ak-textarea ${props.className || ''}`} />;
}

export function AkLabel({ children, required, icon: Icon, htmlFor }) {
  return (
    <label className="ak-label" htmlFor={htmlFor}>
      {Icon && <Icon size={14} />}
      {children}
      {required && <span className="required">*</span>}
    </label>
  );
}

// Label + Eingabefeld als verknüpfte Einheit (htmlFor/id über useId), inkl.
// optionaler Fehleranzeige. Ersetzt das wiederholte
// <div className="ak-field"><AkLabel/><AkInput/></div>-Muster und macht das
// Feld für Screenreader/Klick-aufs-Label nutzbar.
export function AkField({ label, icon, required, error, as = 'input', id: idProp, className = '', ...rest }) {
  const autoId = useId();
  const id = idProp || autoId;
  const errId = `${id}-err`;
  const Control = as === 'textarea' ? AkTextarea : AkInput;
  return (
    <div className="ak-field">
      <AkLabel htmlFor={id} icon={icon} required={required}>{label}</AkLabel>
      <Control
        id={id}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errId : undefined}
        className={`${className} ${error ? 'ak-input--error' : ''}`.trim()}
        {...rest}
      />
      {error && <p id={errId} className="ak-field-error" role="alert">{error}</p>}
    </div>
  );
}

function dictationErrorMessage(error) {
  if (error === 'not-allowed' || error === 'service-not-allowed') {
    return 'Mikrofonzugriff wurde nicht erlaubt.';
  }
  if (error === 'no-speech') return 'Keine Sprache erkannt. Bitte erneut versuchen.';
  if (error === 'audio-capture') return 'Kein Mikrofon gefunden.';
  return 'Das Diktat konnte nicht gestartet werden.';
}

export function AkDictationField({
  label,
  value,
  onValueChange,
  showLabel = true,
  id: idProp,
  ...rest
}) {
  const autoId = useId();
  const id = idProp || autoId;
  const recognitionRef = useRef(null);
  const [supported, setSupported] = useState(null);
  const [listening, setListening] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const supportCheck = window.setTimeout(() => {
      setSupported(Boolean(window.SpeechRecognition || window.webkitSpeechRecognition));
    }, 0);
    return () => {
      window.clearTimeout(supportCheck);
      const recognition = recognitionRef.current;
      if (!recognition) return;
      recognition.onend = null;
      recognition.abort();
    };
  }, []);

  const toggleDictation = () => {
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      setStatus('Diktieren wird von diesem Browser nicht unterstützt.');
      return;
    }

    const recognition = new SpeechRecognition();
    const initialValue = String(value || '').trimEnd();
    recognitionRef.current = recognition;
    recognition.lang = 'de-DE';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setListening(true);
      setStatus('Diktat läuft …');
    };
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript || '')
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
      onValueChange([initialValue, transcript].filter(Boolean).join(' '));
    };
    recognition.onerror = (event) => {
      setStatus(dictationErrorMessage(event.error));
    };
    recognition.onend = () => {
      recognitionRef.current = null;
      setListening(false);
      setStatus((current) => current === 'Diktat läuft …' ? 'Diktat beendet.' : current);
    };

    try {
      recognition.start();
    } catch {
      recognitionRef.current = null;
      setListening(false);
      setStatus('Das Diktat konnte nicht gestartet werden.');
    }
  };

  const actionLabel = listening
    ? `Diktat für ${label} beenden`
    : `Diktat für ${label} starten`;

  return (
    <div className="ak-field ak-dictation-field">
      <div className={`ak-field-toolbar ${showLabel ? '' : 'ak-field-toolbar--actions-only'}`.trim()}>
        {showLabel && <AkLabel htmlFor={id}>{label}</AkLabel>}
        <button
          type="button"
          className={`ak-dictation-btn ${listening ? 'ak-dictation-btn--active' : ''}`.trim()}
          onClick={toggleDictation}
          disabled={supported !== true}
          aria-label={actionLabel}
          aria-pressed={listening}
          title={supported === false ? 'Diktieren wird von diesem Browser nicht unterstützt' : actionLabel}
        >
          {listening ? <MicOff size={17} /> : <Mic size={17} />}
          <span>{listening ? 'Stopp' : 'Diktieren'}</span>
        </button>
      </div>
      <AkTextarea
        id={id}
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        aria-label={showLabel ? undefined : label}
        {...rest}
      />
      {status && <p className="ak-dictation-status" role="status">{status}</p>}
    </div>
  );
}

export function TogglePill({ active, onClick, label, icon: Icon }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={active} className={`ak-toggle ${active ? 'ak-toggle--active' : 'ak-toggle--inactive'}`}>
      <Icon size={20} />
      <span>{label}</span>
      {active && <Check size={16} />}
    </button>
  );
}

export function CheckTile({ checked, onChange, label, description }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} aria-pressed={checked} className={`ak-check ${checked ? 'ak-check--active' : ''}`}>
      <div className="ak-check-box">{checked && <Check size={14} />}</div>
      <div>
        <div className="ak-check-label">{label}</div>
        {description && <div className="ak-check-desc">{description}</div>}
      </div>
    </button>
  );
}

export function SignatureBox({ title, value, onCreate, onClear }) {
  return (
    <div className="ak-sig">
      <div className="ak-sig-header">
        <h4>{title}</h4>
        {value && (
          <button onClick={onClear} className="icon-btn icon-btn--delete"><X size={16} /></button>
        )}
      </div>
      {value ? (
        <NextImage src={value} alt={title} width={800} height={240} unoptimized className="ak-sig-img" />
      ) : (
        <button onClick={onCreate} className="ak-sig-placeholder">
          <Pen size={20} />
          <span>Digital unterschreiben</span>
        </button>
      )}
    </div>
  );
}

export function SignatureCanvas({ onSave, onClose, title }) {
  const canvasRef = useRef(null);
  const dialogRef = useRef(null);
  const drawing = useRef(false);

  // Escape schließt das Modal; Tab bleibt im Dialog gefangen (einfache Falle).
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
      if (e.key !== "Tab") return;
      const focusables = dialogRef.current?.querySelectorAll('button, [href], canvas, [tabindex]:not([tabindex="-1"])');
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    dialogRef.current?.querySelector("button")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const getPos = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };
  const start = (e) => { const ctx = canvasRef.current?.getContext("2d"); if (!ctx) return; const pos = getPos(e); drawing.current = true; ctx.beginPath(); ctx.moveTo(pos.x, pos.y); };
  const move = (e) => { if (!drawing.current) return; const ctx = canvasRef.current?.getContext("2d"); if (!ctx) return; const pos = getPos(e); ctx.lineTo(pos.x, pos.y); ctx.stroke(); };
  const end = () => { drawing.current = false; };
  const clear = () => { const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext("2d"); if (!ctx) return; ctx.save(); ctx.setTransform(1,0,0,1,0,0); ctx.clearRect(0,0,canvas.width,canvas.height); ctx.restore(); const rect = canvas.getBoundingClientRect(); ctx.fillStyle="#ffffff"; ctx.fillRect(0,0,rect.width,rect.height); };
  const save = () => { const canvas = canvasRef.current; if (!canvas) return; onSave(canvas.toDataURL("image/png")); onClose(); };

  return (
    <div className="ak-modal" onClick={onClose}>
      <div className="ak-modal-content" ref={dialogRef} role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <div className="ak-modal-header">
          <div>
            <h3 className="ak-section-title">{title}</h3>
            <p className="ak-section-subtitle">Bitte direkt im Feld unterschreiben.</p>
          </div>
          <button onClick={onClose} className="icon-btn" aria-label="Schließen"><X size={20} /></button>
        </div>
        <canvas ref={canvasRef} onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerLeave={end} />
        <div className="ak-modal-actions">
          <button onClick={clear} className="ak-action-btn">Leeren</button>
          <button onClick={save} className="ak-action-btn ak-action-btn--primary">Übernehmen</button>
        </div>
      </div>
    </div>
  );
}

export function PhotoUpload({ label, value, onChange }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setError("");
    setBusy(true);
    try {
      // Vor dem Speichern herunterskalieren – sonst sprengen Roh-Fotos das
      // localStorage-Quota (stiller Verlust beim Autosave).
      const dataUrl = await downscaleImageFile(file);
      onChange(dataUrl);
    } catch {
      setError("Bild konnte nicht verarbeitet werden.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="ak-photo">
      <div className="ak-photo-header">
        <div>
          <h4 className="ak-check-label">{label}</h4>
          <p className="ak-section-subtitle">Foto als Vorschaden-Dokumentation</p>
        </div>
        {value && <button onClick={() => onChange("")} className="icon-btn icon-btn--delete" aria-label={`${label}: Foto entfernen`}><X size={16} /></button>}
      </div>
      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={onFile} />
      {value ? (
        <>
          <NextImage src={value} alt={label} width={1200} height={900} unoptimized className="ak-photo-preview" />
          <button onClick={() => inputRef.current?.click()} className="ak-action-btn" style={{ marginTop: '12px' }} disabled={busy}>{busy ? "Wird verarbeitet …" : "Foto ersetzen"}</button>
        </>
      ) : (
        <button onClick={() => inputRef.current?.click()} className="ak-photo-placeholder" disabled={busy}>{busy ? "Wird verarbeitet …" : "Foto hochladen"}</button>
      )}
      {error && <p className="ak-field-error" role="alert" style={{ marginTop: '8px' }}>{error}</p>}
    </div>
  );
}

export function SketchCanvas({ label, value, onChange, backgroundSrc }) {
  const bgCanvasRef = useRef(null);
  const drawCanvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const drawing = useRef(false);
  const bgLoaded = useRef(false);
  const CANVAS_H = 320;

  // Initialize background canvas with vehicle image
  useEffect(() => {
    const bgCanvas = bgCanvasRef.current;
    const wrapper = wrapperRef.current;
    if (!bgCanvas || !wrapper) return;
    const dpr = window.devicePixelRatio || 1;
    const w = wrapper.getBoundingClientRect().width;
    bgCanvas.width = w * dpr;
    bgCanvas.height = CANVAS_H * dpr;
    bgCanvas.style.width = `${w}px`;
    bgCanvas.style.height = `${CANVAS_H}px`;
    const ctx = bgCanvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    // Fill background
    ctx.fillStyle = "#0d1b2a";
    ctx.fillRect(0, 0, w, CANVAS_H);

    if (backgroundSrc) {
      const img = new window.Image();
      img.onload = () => {
        // Center the image, keeping aspect ratio, with padding
        const pad = 20;
        const availW = w - pad * 2;
        const availH = CANVAS_H - pad * 2;
        const scale = Math.min(availW / img.width, availH / img.height);
        const drawW = img.width * scale;
        const drawH = img.height * scale;
        const x = (w - drawW) / 2;
        const y = (CANVAS_H - drawH) / 2;
        ctx.drawImage(img, x, y, drawW, drawH);
        bgLoaded.current = true;
      };
      img.src = backgroundSrc;
    } else {
      // Fallback: dashed placeholder
      ctx.fillStyle = "#94a3b8"; ctx.font = "14px sans-serif";
      ctx.fillText(`${label} – Skizze / Markierung`, 16, 28);
      ctx.strokeStyle = "#334155"; ctx.setLineDash([5, 5]);
      ctx.strokeRect(16, 42, w - 32, CANVAS_H - 62); ctx.setLineDash([]);
    }
  }, [label, backgroundSrc]);

  // Initialize drawing canvas (transparent overlay) and restore previous drawings
  useEffect(() => {
    const drawCanvas = drawCanvasRef.current;
    const wrapper = wrapperRef.current;
    if (!drawCanvas || !wrapper) return;
    const dpr = window.devicePixelRatio || 1;
    const w = wrapper.getBoundingClientRect().width;
    drawCanvas.width = w * dpr;
    drawCanvas.height = CANVAS_H * dpr;
    drawCanvas.style.width = `${w}px`;
    drawCanvas.style.height = `${CANVAS_H}px`;
    const ctx = drawCanvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    // Restore previous drawing data if available
    if (value) {
      const img = new window.Image();
      img.onload = () => ctx.drawImage(img, 0, 0, w, CANVAS_H);
      img.src = value;
    }
  }, [label, value]);

  const point = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const start = (e) => {
    const ctx = drawCanvasRef.current?.getContext("2d");
    if (!ctx) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture?.(e.pointerId);
    const pos = point(e);
    drawing.current = true;
    ctx.setLineDash([]);
    ctx.strokeStyle = "#ce132d";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const move = (e) => {
    if (!drawing.current) return;
    const ctx = drawCanvasRef.current?.getContext("2d");
    if (!ctx) return;
    e.preventDefault();
    const pos = point(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const end = (e) => {
    try { e?.currentTarget?.releasePointerCapture?.(e.pointerId); } catch {}
    drawing.current = false;
    // Save only the drawing layer (transparent PNG, no background)
    if (drawCanvasRef.current) onChange(drawCanvasRef.current.toDataURL("image/png"));
  };

  const clearDrawing = () => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    onChange("");
  };

  return (
    <div className="ak-sketch">
      <div ref={wrapperRef}>
        <div className="ak-sketch-header">
          <h4 className="ak-check-label">{label}</h4>
          <button onClick={clearDrawing} className="ak-action-btn" style={{ padding: '4px 12px', fontSize: '12px' }}>Leeren</button>
        </div>
        <div className="ak-sketch-canvas-stack">
          <canvas ref={bgCanvasRef} className="ak-sketch-bg" />
          <canvas
            ref={drawCanvasRef}
            className="ak-sketch-draw"
            onPointerDown={start}
            onPointerMove={move}
            onPointerUp={end}
            onPointerCancel={end}
            onPointerLeave={end}
          />
        </div>
      </div>
    </div>
  );
}
