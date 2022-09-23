import { Mnemonic } from "~/opcodes/mnemonics";
import { NotImplementedError } from "./errors";
import ExecutionContext from "../execution";

interface ExecutionResult {
  gasFee: number;
}

class Instruction {
  public readonly opcode: number;
  public readonly name: string;
  public readonly execute: (
    context: ExecutionContext
  ) => Promise<ExecutionResult>;

  constructor(
    opcode: number,
    name: Mnemonic,
    gasFee: ((context: ExecutionContext) => Promise<number> | number) | number,
    execute: (context: ExecutionContext) => void
  ) {
    this.opcode = opcode;
    this.name = name;
    this.execute = async (ctx: ExecutionContext) => {
      const gasFeeFunction =
        typeof gasFee === "function" ? gasFee : () => gasFee;
      const effectiveGasFee = await gasFeeFunction(ctx);
      ctx.useGas(effectiveGasFee); // Always use gas first to avoid mutating state
      await execute(ctx);

      return {
        gasFee: effectiveGasFee,
      };
    };
  }
}

export default Instruction;
