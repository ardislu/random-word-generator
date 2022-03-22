import { parse } from "https://deno.land/std@0.130.0/flags/mod.ts";

const { words, separator, length } = parse(Deno.args, {
  default: {
    'words': './words/xkcd.txt',
    'separator': '-',
    'length': 3
  }
});

const dictionary: string[] = [];
await Deno.readTextFile(words).then(f => dictionary.push(...f.split(/\r?\n/)));

const rand = new Uint16Array(parseInt(length));
crypto.getRandomValues(rand);

const output: string[] = [];
rand.forEach(v => output.push(dictionary[v % dictionary.length]));

console.log(output.join(separator));
