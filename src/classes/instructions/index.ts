import { Mnemonic } from "~/opcodes/mnemonics";
import { NotImplementedError } from "./errors";
import ExecutionContext from "../execution";

const defaultExecute = () => {
  throw new NotImplementedError();
};

class Instruction {
  public readonly opcode: number;
  public readonly name: string;
  public readonly execute: (context: ExecutionContext) => void;

  constructor(
    opcode: number,
    name: Mnemonic,
    execute: (context: ExecutionContext) => void = defaultExecute
  ) {
    this.opcode = opcode;
    this.name = name;
    this.execute = execute;
  }
}

export default Instruction;
