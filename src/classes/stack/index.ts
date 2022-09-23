import { hexlify } from "@ethersproject/bytes";
import { MAX_UINT256 } from "~/constants";
import {
  IndexOutOfBounds,
  InvalidStackValue,
  StackOverflow,
  StackUnderflow,
} from "./errors";
class Stack {
  private readonly maxDepth;
  private stack: bigint[];

  constructor(maxDepth = 1024) {
    this.maxDepth = maxDepth;
    this.stack = [];
  }

  public push(value: bigint): void {
    if (value < 0 || value > MAX_UINT256) throw new InvalidStackValue(value);

    if (this.stack.length + 1 > this.maxDepth) throw new StackOverflow();

    this.stack.push(value);
  }

  public pop(): bigint {
    const value = this.stack.pop();

    if (value === undefined) throw new StackUnderflow();

    return value;
  }

  public duplicate(index: number): void {
    const value = this.stack[this.toStackIndex(index)];
    if (value === undefined) throw new IndexOutOfBounds();
    this.stack.push(value);
  }

  public swap(indexA: number, indexB: number): void {
    const a = this.getAtIndex(indexA);
    const b = this.getAtIndex(indexB);

    this.setAtIndex(indexA, b);
    this.setAtIndex(indexB, a);
  }

  private toStackIndex(index: number): number {
    return this.stack.length - index; // Index 1 is top of the stack
  }

  public print() {
    console.log(
      "Stack:\t",
      this.stack.map((value) => hexlify(value))
    );
  }

  public getAtIndex(index: number): bigint {
    const adjustedIndex = this.toStackIndex(index);
    const value = this.stack[adjustedIndex];
    if (value === undefined) throw new IndexOutOfBounds();
    return value;
  }

  private setAtIndex(index: number, value: bigint) {
    this.stack[this.toStackIndex(index)] = value;
  }
}

export default Stack;
