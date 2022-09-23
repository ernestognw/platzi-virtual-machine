import moduleAlias from "module-alias";
import { join } from "path";
moduleAlias.addAliases({
  "~": join(__dirname, ".."),
});

import json2md from "json2md";
import type { DataObject } from "json2md";
import { writeFileSync } from "fs";
import Opcodes from "~/opcodes";

const readme: DataObject = [
  { h1: "Platzi Virtual Machine" },
  {
    p: "The Platzi Virtual Machine (PVM) is a virtualized stack-based architecture machine. Its word size (and size of stack items) is 256-bit with a memory model that is a simple word-addressed byte array. The stack has a maximum size of 1024 and it uses an independent storage model based on a modified Merkle Particia Tree. All locations in both storage and memory are well defined initially as zero",
  },
  {
    h2: "Installation",
  },
  {
    p: "Install the CLI via npm with:",
  },
  {
    code: {
      language: "sh",
      content: ["yarn global add platzi-virtual-machine"],
    },
  },
  {
    p: "Then, use the CLI to manually test a bytecode input",
  },
  {
    code: {
      language: "sh",
      content: [
        "pvm --code 0x6080 --gasLimit 100",
        `
PUSH1   @ pc=0   gas=100         cost=3
Stack:   [ '0x80' ]
Memory:  []

STOP    @ pc=2   gas=97  cost=0
Stack:   [ '0x80' ]
Memory:  []

Output:  0x00
Root:    0x29adae8041417fab44a067497a0daedde9e76b8e2f7a1b8ea07dbc5dc2e14588`,
      ],
    },
  },
  {
    h2: "Reference",
  },
  {
    table: {
      headers: ["OPCODE", "MNEMONIC"],
      rows: Object.entries(Opcodes).map(([opcode, instruction]) => ({
        OPCODE: `0x${parseInt(opcode).toString(16).padStart(2, "0")}`,
        MNEMONIC: instruction?.name,
      })),
    },
  },
  {
    h2: "LICENSE",
  },
  {
    link: {
      title: "MIT",
      source: "https://choosealicense.com/licenses/mit/",
    },
  },
];

writeFileSync(join(__dirname, "../../", "README.md"), json2md(readme));
