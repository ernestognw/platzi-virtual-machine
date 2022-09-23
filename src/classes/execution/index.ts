import { Trie } from "@ethereumjs/trie";
import { arrayify, hexlify, isHexString } from "@ethersproject/bytes";
import Memory from "~/classes/memory";
import Stack from "~/classes/stack";
import Opcodes from "~/opcodes";
import Instruction from "../instructions";
import {
  InvalidBytecode,
  InvalidProgramCounterIndex,
  UnknownOpcode,
} from "./errors";
class ExecutionContext {
  private readonly code: Uint8Array;
  public stack: Stack;
  public memory: Memory;
  private pc: number;
  private stopped: boolean;
  public storage: Trie;
  public output: bigint = BigInt(0);

  constructor(code: string, storage: Trie) {
    if (!isHexString(code) || code.length % 2 !== 0)
      throw new InvalidBytecode();
    this.code = arrayify(code);
    this.stack = new Stack();
    this.memory = new Memory();
    this.pc = 0;
    this.stopped = false;
    this.storage = storage;
  }

  public stop(): void {
    this.stopped = true;
  }

  public readBytesFromCode(bytes = 1): bigint {
    const hexValues = this.code.slice(this.pc, this.pc + bytes);
    this.pc += bytes;
    return BigInt(hexlify(hexValues));
  }

  public async run() {
    while (!this.stopped) {
      const currentPc = this.pc;
      const instruction = this.fetchInstruction();
      await instruction.execute(this);

      console.info(`${instruction.name}\t@ pc=${currentPc}`);

      this.stack.print();
      this.memory.print();
      console.log();
    }

    console.log("Output:\t", hexlify(this.output));
    console.log("Root:\t", hexlify(this.storage.root()));
  }

  private fetchInstruction(): Instruction {
    if (this.pc >= this.code.length) return Opcodes[0];

    if (this.pc < 0) throw new InvalidProgramCounterIndex();

    const opcode = this.readBytesFromCode(1);

    const instruction = Opcodes[Number(opcode)];

    if (!instruction) throw new UnknownOpcode();

    return instruction;
  }
}

export default ExecutionContext;
