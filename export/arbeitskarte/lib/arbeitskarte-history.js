"use client";

import {
  initialFormData,
  initialMaterials,
  normalizeSketches,
  todayIso,
} from "./arbeitskarte-data";

export const WORK_CARD_STORAGE_PREFIX = "arbeitskarte:";
export const LOCAL_WORK_CARD_PREFIX = "thitronik-arbeitskarte-card-v1:";

function clone(value) {
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

export function generateWorkCardId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `ak-${Date.now()}-${Math.round(Math.random() * 1e9)}`;
}

export function createEmptyWorkCard(id = generateWorkCardId(), now = new Date().toISOString()) {
  const formData = clone(initialFormData);
  formData.uebergabe.datum = todayIso();
  return {
    version: 1,
    id,
    status: "draft",
    createdAt: now,
    updatedAt: now,
    completedAt: null,
    formData,
    materials: clone(initialMaterials),
    sketches: normalizeSketches(),
  };
}

export function normalizeWorkCard(raw, { fallbackId, changedAt } = {}) {
  if (!raw || typeof raw !== "object") return null;
  const id = typeof raw.id === "string" && raw.id ? raw.id : fallbackId || generateWorkCardId();
  const fallbackTimestamp = changedAt || new Date().toISOString();
  return {
    version: 1,
    id,
    status: raw.status === "completed" ? "completed" : "draft",
    createdAt: raw.createdAt || fallbackTimestamp,
    updatedAt: raw.updatedAt || fallbackTimestamp,
    completedAt: raw.completedAt || null,
    formData: raw.formData && typeof raw.formData === "object" ? raw.formData : {},
    materials: Array.isArray(raw.materials) ? raw.materials : [],
    sketches: normalizeSketches(raw.sketches),
  };
}

export function workCardStorageKey(id) {
  return `${WORK_CARD_STORAGE_PREFIX}${id}`;
}

export function workCardIdFromStorageKey(key) {
  return String(key || "").startsWith(WORK_CARD_STORAGE_PREFIX)
    ? String(key).slice(WORK_CARD_STORAGE_PREFIX.length)
    : "";
}

export function normalizeWorkCardRow(row) {
  const id = workCardIdFromStorageKey(row?.schluessel);
  if (!id) return null;
  return normalizeWorkCard(row?.wert, { fallbackId: id, changedAt: row?.geaendert_am });
}

export function sortWorkCards(cards) {
  return [...cards].sort((a, b) => {
    const byUpdated = String(b.updatedAt || "").localeCompare(String(a.updatedAt || ""));
    return byUpdated || String(b.createdAt || "").localeCompare(String(a.createdAt || ""));
  });
}

export function localWorkCardPrefix(ownerId) {
  return `${LOCAL_WORK_CARD_PREFIX}${encodeURIComponent(String(ownerId || "demo"))}:`;
}

export function writeLocalWorkCard(storage, ownerId, card) {
  storage.setItem(`${localWorkCardPrefix(ownerId)}${card.id}`, JSON.stringify(card));
}

export function readLocalWorkCards(storage, ownerId) {
  const prefix = localWorkCardPrefix(ownerId);
  const cards = [];
  for (let index = 0; index < storage.length; index += 1) {
    const key = storage.key(index);
    if (!key?.startsWith(prefix)) continue;
    try {
      const card = normalizeWorkCard(JSON.parse(storage.getItem(key)), {
        fallbackId: key.slice(prefix.length),
      });
      if (card) cards.push(card);
    } catch {
      // Einzelne beschädigte Offline-Einträge dürfen den restlichen Verlauf
      // nicht unbrauchbar machen.
    }
  }
  return sortWorkCards(cards);
}
