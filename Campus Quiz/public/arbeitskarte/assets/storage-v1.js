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
