"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { Play, Square, Volume2, AlertTriangle } from "lucide-react";

/* ── Sound Configuration ── */
const SOUNDS = [
  { file: "alarm.mp3", title: "Alarm" },
  { file: "anlernmodus.mp3", title: "Anlernmodus" },
  { file: "anlernvorgang-aus.mp3", title: "Anlernvorgang aus" },
  { file: "batterie-leer.mp3", title: "Batterie leer" },
  { file: "gas-alarm.mp3", title: "Gas-Alarm" },
  { file: "nicht-anlernen.mp3", title: "Nicht anlernen" },
  { file: "offen-meldung.mp3", title: "Offen-Meldung" },
  { file: "scharf.mp3", title: "Scharf" },
  { file: "unscharf.mp3", title: "Unscharf" },
  { file: "vent-check_kontakt_offen_unscharf.mp3", title: "Vent-Check: Kontakt offen / Unscharf" },
  { file: "verriegeln_nicht_ausgefuehrt_aussperrgefahr.mp3", title: "Verriegeln nicht ausgeführt / Aussperrgefahr" },
];

function getSoundUrl(filename) {
  return encodeURI(`/Töne/${filename}`);
}

/* ── Soundboard Component ── */
export default function Soundboard() {
  const audioRef = useRef(null);
  const [activeSound, setActiveSound] = useState(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [errorSound, setErrorSound] = useState(null);
  const animRef = useRef(null);

  // Track progress via requestAnimationFrame for smooth updates
  const trackProgress = useCallback(function updateProgress() {
    const audio = audioRef.current;
    if (audio && !audio.paused && !audio.ended) {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
      animRef.current = requestAnimationFrame(updateProgress);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      if (audio) {
        audio.pause();
        audio.src = "";
      }
    };
  }, []);

  const handlePlay = useCallback((sound) => {
    const audio = audioRef.current;
    if (!audio) return;

    // Clear any previous error for this sound
    setErrorSound(null);

    // If same sound is playing → stop it
    if (activeSound === sound.file && !audio.paused) {
      audio.pause();
      audio.currentTime = 0;
      setActiveSound(null);
      setProgress(0);
      setDuration(0);
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }

    // Stop previous, play new
    if (animRef.current) cancelAnimationFrame(animRef.current);
    audio.pause();
    audio.currentTime = 0;

    const url = getSoundUrl(sound.file);
    audio.src = url;
    setActiveSound(sound.file);
    setProgress(0);
    setDuration(0);

    audio.play().catch(() => {
      setErrorSound(sound.file);
      setActiveSound(null);
      setProgress(0);
    });
  }, [activeSound]);

  const handleEnded = useCallback(() => {
    setActiveSound(null);
    setProgress(0);
    setDuration(0);
    if (animRef.current) cancelAnimationFrame(animRef.current);
  }, []);

  const handleError = useCallback(() => {
    if (activeSound) {
      setErrorSound(activeSound);
      setActiveSound(null);
      setProgress(0);
      setDuration(0);
    }
  }, [activeSound]);

  const handlePlaying = useCallback(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(trackProgress);
  }, [trackProgress]);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  }, []);

  const formatTime = (s) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <section className="ak-section" aria-label="Soundboard – THITRONIK Alarmtöne">
      <div>
        <h2 className="ak-section-title" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Volume2 size={20} style={{ color: "var(--th-blue-secondary)" }} />
          Soundboard – Alarmtöne
        </h2>
        <p className="ak-section-subtitle">
          Alle THITRONIK Signaltöne zum Anhören. Es kann immer nur ein Ton gleichzeitig wiedergegeben werden.
        </p>
      </div>
      <div className="ak-section-body">
        {/* Hidden central audio element */}
        <audio
          ref={audioRef}
          onEnded={handleEnded}
          onError={handleError}
          onPlaying={handlePlaying}
          onLoadedMetadata={handleLoadedMetadata}
          preload="none"
        />

        <div className="sb-grid" role="list" aria-label="Alarmtöne">
          {SOUNDS.map((sound) => {
            const isActive = activeSound === sound.file;
            const hasError = errorSound === sound.file;
            const progressPct = isActive && duration > 0
              ? Math.min((progress / duration) * 100, 100)
              : 0;

            return (
              <div
                key={sound.file}
                className={`sb-item ${isActive ? "sb-item--active" : ""} ${hasError ? "sb-item--error" : ""}`}
                role="listitem"
              >
                {/* Progress track (behind content) */}
                {isActive && (
                  <div
                    className="sb-item-progress"
                    style={{ width: `${progressPct}%` }}
                    aria-hidden="true"
                  />
                )}

                <button
                  className={`sb-play-btn ${isActive ? "sb-play-btn--active" : ""}`}
                  onClick={() => handlePlay(sound)}
                  aria-label={isActive ? `${sound.title} stoppen` : `${sound.title} abspielen`}
                  disabled={hasError}
                  title={hasError ? "Fehler beim Laden" : isActive ? "Stoppen" : "Abspielen"}
                >
                  {hasError ? (
                    <AlertTriangle size={18} />
                  ) : isActive ? (
                    <Square size={16} />
                  ) : (
                    <Play size={16} />
                  )}
                </button>

                <div className="sb-info">
                  <span className="sb-title">{sound.title}</span>
                  {hasError && (
                    <span className="sb-error-msg">Fehler beim Laden</span>
                  )}
                  {isActive && !hasError && (
                    <span className="sb-time">
                      {formatTime(progress)} / {formatTime(duration)}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
