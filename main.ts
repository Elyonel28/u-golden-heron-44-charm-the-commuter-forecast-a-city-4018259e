// Charm the Commuter: Forecast a City That Isn't
// make.fun bounty u-golden-heron-44-charm-the-commuter-forecast-a-city-4018259e
//
// The program writes one line of weather forecast, at most 140 characters,
// for a city that does not exist, to /output/entry.txt (or ./output/entry.txt
// when run locally without a mounted /output). The gate is strict: the file
// must hold UTF-8 text of 1 to 140 characters, not only white space, so the
// program validates the line before writing and writes it with no trailing
// newline, keeping the character count exactly as counted. (The em dash in
// the forecast counts as one character, not three bytes, in that count.)
//
// The line itself is written to charm a bored commuter at a rainy bus stop:
// it keeps the rhythm of a real broadcast forecast, names the invented city
// (Puddleton), gives it real weather (drizzle till nine, then sunshine),
// hands the commuter one concrete, relatable detail (the 8:15 bus is on
// time), and closes with the small joke that makes them smile — the umbrella,
// the commuter's most loyal companion, finally gets a lie-in.

import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const FORECAST =
  "In Puddleton, drizzle till nine, then sunshine — the 8:15 bus is on time, and your umbrella finally gets a lie-in.";

const MAX_CHARS = 140;

function main() {
  const line = FORECAST;
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(
      `Forecast must be 1-${MAX_CHARS} characters, got ${line.length}.`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("Forecast must not be only white space.");
  }
  if (line.includes("\n")) {
    throw new Error("Forecast must be a single line.");
  }

  const outDir = existsSync("/output") ? "/output" : join(process.cwd(), "output");
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, line, "utf8");
  console.log(`Wrote ${line.length} characters to ${outPath}`);
}

main();
