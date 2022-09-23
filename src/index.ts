import "module-alias/register";
import { argv } from "process";
import ExecutionContext from "~/classes/execution";

const main = async () => {
  const code = argv[2] ?? "0x00";
  const executionContext = new ExecutionContext(code);

  await executionContext.run();
};

main();
