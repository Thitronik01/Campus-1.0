import { HISTORY_PREFIX, STORAGE_KEY, createEmptyWorkCard, normalizeWorkCard } from "./data-v1.js";

export function sortCards(cards) {
  return [...cards].sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")));
}

export function readHistory(storage = localStorage) {
  const cards = [];
  for (let index = 0; index < storage.length; index += 1) {
    const key = storage.key(index);
    if (!key?.startsWith(HISTORY_PREFIX)) continue;
    try {
      cards.push(normalizeWorkCard(JSON.parse(storage.getItem(key)), key.slice(HISTORY_PREFIX.length)));
    } catch {
      // Ein beschädigter Eintrag darf den übrigen Verlauf nicht blockieren.
    }
  }
  return sortCards(cards);
}

export function writeCard(card, storage = localStorage) {
  const saved = normalizeWorkCard({ ...card, updatedAt: new Date().toISOString() }, card.id);
  storage.setItem(`${HISTORY_PREFIX}${saved.id}`, JSON.stringify(saved));
  storage.setItem(STORAGE_KEY, JSON.stringify({
    id: saved.id,
    formData: saved.formData,
    materials: saved.materials,
    sketches: saved.sketches,
    status: saved.status,
    createdAt: saved.createdAt,
    updatedAt: saved.updatedAt,
    completedAt: saved.completedAt
  }));
  return saved;
}

export function loadInitialCard(storage = localStorage) {
  const history = readHistory(storage);
  if (history[0]) return history[0];
  try {
    const legacy = JSON.parse(storage.getItem(STORAGE_KEY));
    if (legacy && typeof legacy === "object") return normalizeWorkCard(legacy);
  } catch {
    // Kaputte Altdaten werden durch eine neue Karte ersetzt.
  }
  return createEmptyWorkCard();
}

export function deleteCard(id, storage = localStorage) {
  storage.removeItem(`${HISTORY_PREFIX}${id}`);
}

export function downloadCard(card) {
  const plate = String(card.formData.kunde.kennzeichen || "OHNE-KZ").trim().replace(/\s+/g, "-").toUpperCase();
  const payload = { ...card, exportVersion: "3.0", exportedAt: new Date().toISOString() };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `Arbeitskarte_${plate || "OHNE-KZ"}_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
}

export function readImportedCard(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Die Datei konnte nicht gelesen werden."));
    reader.onload = () => {
      try {
        const raw = JSON.parse(String(reader.result || ""));
        if (!raw || typeof raw !== "object" || (!raw.formData && !raw.materials && !raw.sketches)) {
          throw new Error("Die Datei enthält keine Arbeitskarte.");
        }
        resolve(normalizeWorkCard({ ...raw, id: raw.id || undefined }));
      } catch (error) {
        reject(error instanceof Error ? error : new Error("Ungültiges JSON-Format."));
      }
    };
    reader.readAsText(file);
  });
}
