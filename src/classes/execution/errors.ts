class InvalidBytecode extends Error {}

class UnknownOpcode extends Error {}

class InvalidProgramCounterIndex extends Error {}

class InvalidJump extends Error {}

export {
  InvalidBytecode,
  UnknownOpcode,
  InvalidProgramCounterIndex,
  InvalidJump,
};
