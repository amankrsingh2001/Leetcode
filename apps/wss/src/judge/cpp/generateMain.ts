import { SignatureParameter } from "../signature/type";
import { generateCppVariables } from "../parser/generateCppVariables";
import { generateFunctionCall } from "./generateFunctionCall";

import { Prisma } from "@prisma/client";

export function generateMain(
    input: Prisma.JsonObject,
    parameters: SignatureParameter[],
    functionName: string
): string {

    const variables = generateCppVariables(input, parameters);

    const functionCall = generateFunctionCall(
        functionName,
        parameters
    );

    return `
int main() {

${variables}

${functionCall}

return 0;
}
`;
}