import { Prisma } from "@prisma/client";
import { SignatureParameter } from "../signature/type";
import { generateHeaders } from "./generateHeaders";
import { generateMain } from "./generateMain";

export function generateWrapper(
    userCode: string,
    input: Prisma.JsonObject,
    parameters: SignatureParameter[],
    functionName: string
) {

    return `
${generateHeaders()}

${userCode}

${generateMain(
    input,
    parameters,
    functionName
)}
`;
}