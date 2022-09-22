import { Mnemonic } from "~/opcodes/mnemonics";
import { NotImplementedError } from "./errors";
import ExecutionContext from "../execution";

class Instruction {
  public readonly opcode: number;
  public readonly name: string;
  public readonly execute: (context: ExecutionContext) => void;

  constructor(
    opcode: number,
    name: Mnemonic,
    execute: (context: ExecutionContext) => void
  ) {
    this.opcode = opcode;
    this.name = name;
    this.execute = execute;
  }
}

export default Instruction;
