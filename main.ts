import { parse } from "https://deno.land/std@0.146.0/flags/mod.ts";

const { words, separator, length } = parse(Deno.args, {
  default: {
    'words': './words/xkcd.txt',
    'separator': '-',
    'length': 3
  }
});

function abort(error: Error) {
  console.error(error);
  Deno.exit(1);
}

// Validate and process words argument
const dictionary: string[] = [];
await Deno.readTextFile(words)
  .then(f => dictionary.push(...f.split(/\r?\n/)))
  .catch(abort); // Will throw if an invalid file path is given

// Validate and process length argument
const len = parseInt(length);
if (isNaN(len)) {
  abort(new TypeError(`${length} is not a number.`));
}
const rand = new Uint16Array(len);
crypto.getRandomValues(rand);

const output: string[] = [];
rand.forEach(v => output.push(dictionary[v % dictionary.length]));

console.log(output.join(separator));
