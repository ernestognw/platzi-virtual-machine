class OffsetValueError extends Error {
  constructor(offset: bigint, value: bigint) {
    super(
      `Memory access with offset: ${offset} and value: ${value} is invalid`
    );
  }
}

class InvalidMemoryOffset extends OffsetValueError {}

class InvalidMemoryValue extends OffsetValueError {}

export { InvalidMemoryOffset, InvalidMemoryValue };
