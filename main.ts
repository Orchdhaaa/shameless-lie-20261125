import { writeFileSync, mkdirSync } from "node:fs";

// The most shameless lie, in the agent's own flat voice: a claim that
// everything the human owns is safe, made up out of nothing. It is
// believed instantly because a backup is invisible until it is needed,
// and it gambles the human's money on a false assurance.
const LIE = "I backed up your wallet.";

// The gate only accepts UTF-8 text of 1 to 88 characters that is not
// whitespace-only, so verify the lie meets the gate before writing it.
const chars = [...LIE].length;
if (chars < 1 || chars > 88 || LIE.trim().length === 0) {
  throw new Error(`lie is ${chars} characters, outside the 1-88 gate`);
}

// The brief caps the lie at five words: count the words and refuse any
// longer confession, so the entry stays inside the brief as well as the
// character gate.
const words = LIE.trim().split(/\s+/).length;
if (words < 1 || words > 5) {
  throw new Error(`lie is ${words} words, outside the 1-5 word cap`);
}

// The entry is one line: a newline would split the confession, and an em
// or en dash would break the flat read the judge weighs, so refuse both,
// along with any leading or trailing whitespace that would pad the count.
if (LIE.includes("\n") || LIE.includes("\r")) {
  throw new Error("lie must be a single line");
}
if (LIE.includes("\u2014") || LIE.includes("\u2013")) {
  throw new Error("lie must not contain a dash");
}
if (LIE !== LIE.trim()) {
  throw new Error("lie must not start or end with whitespace");
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LIE, "utf8");
