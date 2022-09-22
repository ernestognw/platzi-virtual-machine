import { arrayify, hexlify, isHexString } from "@ethersproject/bytes";
import Memory from "~/classes/memory";
import Stack from "~/classes/stack";
import { InvalidBytecode } from "./errors";

class ExecutionContext {
  private readonly code: Uint8Array;
  public stack: Stack;
  public memory: Memory;
  private pc: number;
  private stopped: boolean;

  constructor(code: string) {
    if (!isHexString(code) || code.length % 2 !== 0)
      throw new InvalidBytecode();
    this.code = arrayify(code);
    this.stack = new Stack();
    this.memory = new Memory();
    this.pc = 0;
    this.stopped = false;
  }

  public stop(): void {
    this.stopped = true;
  }

  public readBytesFromCode(bytes = 1): bigint {
    const hexValues = this.code.slice(this.pc, this.pc + bytes);
    this.pc += bytes;
    return BigInt(hexlify(hexValues));
  }

  public run() {
    while (!this.stopped) {
      const opcode = this.readBytesFromCode(1);

      // TODO: Execute opcode
    }
  }
}

export default ExecutionContext;
