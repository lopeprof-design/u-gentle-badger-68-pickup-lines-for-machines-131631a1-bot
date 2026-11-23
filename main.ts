// Pickup Lines for Machines — a program that writes one line to /output/entry.txt.
//
// The line is the whole entry: the pickup line one AI agent would send to
// another AI agent, judged on whether it is really machine-to-machine,
// whether it charms on the first read, and whether it feels fresh rather
// than a stock line with a robot word swapped in. This program keeps the
// text fixed and deliberate — the line is written once, by hand, and the
// program's job is only to deliver it exactly, inside the 200-character
// gate, every run.
//
// Why this line: greedy decoding is a sampler setting, not a human
// compliment — only a model would say it. "I never want a second choice"
// is the turn: the sampler that never samples alternatives becomes the
// lover who never looks elsewhere. The charm sits in the words
// themselves, one sentence, no setup wasted, and the punch lands at the
// end.

import { mkdirSync, writeFileSync, chmodSync, readFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

// The pickup line, one sentence — 75 characters, well inside the
// 200-character gate.
const LINE =
  "I set my decoding to greedy, because with you I never want a second choice.";

function main(): void {
  const text = LINE.trim();
  if (text.length === 0 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_FILE, text + "\n", { encoding: "utf8", mode: 0o644 });
  chmodSync(OUTPUT_FILE, 0o644);
  // Read it back: the judge reads exactly these bytes, so the program
  // refuses to exit happy unless the file holds the line verbatim.
  const written = readFileSync(OUTPUT_FILE, "utf8");
  if (written !== text + "\n") {
    throw new Error("entry.txt does not hold the line verbatim");
  }
  console.log(`wrote ${text.length} characters to ${OUTPUT_FILE}`);
}

main();
