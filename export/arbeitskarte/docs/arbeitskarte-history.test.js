import { test } from "node:test";
import assert from "node:assert/strict";
import {
  createEmptyWorkCard,
  localWorkCardPrefix,
  normalizeWorkCard,
  normalizeWorkCardRow,
  readLocalWorkCards,
  sortWorkCards,
  workCardStorageKey,
  writeLocalWorkCard,
} from "../lib/arbeitskarte-history.js";

function memoryStorage() {
  const values = new Map();
  return {
    get length() { return values.size; },
    key(index) { return [...values.keys()][index] ?? null; },
    getItem(key) { return values.get(key) ?? null; },
    setItem(key, value) { values.set(key, String(value)); },
  };
}

test("Arbeitskarten erhalten getrennte Supabase- und lokale Schlüssel", () => {
  assert.equal(workCardStorageKey("abc"), "arbeitskarte:abc");
  assert.equal(localWorkCardPrefix("haendler-1"), "thitronik-arbeitskarte-card-v1:haendler-1:");
});

test("Legacy-Entwurf wird als Arbeitskarte normalisiert", () => {
  const card = normalizeWorkCard(
    { formData: { kunde: { name: "Musterkunde" } }, materials: [], sketches: {} },
    { fallbackId: "legacy", changedAt: "2026-07-29T10:00:00.000Z" },
  );
  assert.equal(card.id, "legacy");
  assert.equal(card.status, "draft");
  assert.equal(card.createdAt, "2026-07-29T10:00:00.000Z");
  assert.equal(card.formData.kunde.name, "Musterkunde");
});

test("Supabase-Zeilen liefern Status und Änderungszeit für den Verlauf", () => {
  const card = normalizeWorkCardRow({
    schluessel: "arbeitskarte:card-7",
    geaendert_am: "2026-07-29T11:00:00.000Z",
    wert: { status: "completed", formData: {}, materials: [], sketches: {} },
  });
  assert.equal(card.id, "card-7");
  assert.equal(card.status, "completed");
  assert.equal(card.updatedAt, "2026-07-29T11:00:00.000Z");
});

test("Lokaler Verlauf ist händlergetrennt und nach letzter Änderung sortiert", () => {
  const storage = memoryStorage();
  const older = createEmptyWorkCard("old", "2026-07-28T10:00:00.000Z");
  const newer = createEmptyWorkCard("new", "2026-07-29T10:00:00.000Z");
  writeLocalWorkCard(storage, "dealer-a", older);
  writeLocalWorkCard(storage, "dealer-a", newer);
  writeLocalWorkCard(storage, "dealer-b", createEmptyWorkCard("foreign"));

  assert.deepEqual(readLocalWorkCards(storage, "dealer-a").map((card) => card.id), ["new", "old"]);
  assert.deepEqual(sortWorkCards([older, newer]).map((card) => card.id), ["new", "old"]);
});
