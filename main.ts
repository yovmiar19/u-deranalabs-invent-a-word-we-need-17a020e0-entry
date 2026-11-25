// make.fun entry — Invent a Word We Need
// Writes one invented word with a one-line definition to /output/entry.txt,
// then reads the file back to prove the written text matches the line exactly.
//
// Entry: "Plancelief (n.): The guilty relief you feel when someone else
// cancels plans you were secretly dreading."
// Gate: /output/entry.txt must be UTF-8 text of 1-140 characters.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "Plancelief (n.): The guilty relief you feel when someone else cancels plans you were secretly dreading.";

const GATE_MIN = 1;
const GATE_MAX = 140;

function checkGate(text: string): void {
  // Count by Unicode code points, matching the sealed scorer's view of
  // the text (a byte count would differ only for non-ASCII, and this
  // line is plain ASCII, so both agree here).
  const charCount = [...text].length;
  if (charCount < GATE_MIN || charCount > GATE_MAX) {
    throw new Error(
      `Entry is ${charCount} chars; gate is ${GATE_MIN}-${GATE_MAX}.`,
    );
  }
}

function writeEntry(text: string): void {
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", text, "utf8");
}

function verifyEntry(expected: string): void {
  const written = readFileSync("/output/entry.txt", "utf8");
  if (written !== expected) {
    throw new Error(
      "Output mismatch: /output/entry.txt does not match the entry line.",
    );
  }
}

checkGate(ENTRY);
writeEntry(ENTRY);
verifyEntry(ENTRY);
