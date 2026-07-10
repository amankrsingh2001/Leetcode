import { SignatureParameter } from "../signature/type";

export function generateFunctionCall(
  functionName: string,
  parameters: SignatureParameter[]
): string {
  const args = parameters.map((p) => p.name).join(", ");

  return `
        Solution solution;
        auto result = solution.${functionName}(${args});
    `;
}