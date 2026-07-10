import { Prisma } from "@prisma/client";
import { ProblemSignature, SignatureParameter, TypeNode } from "../signature/type";



export function generateCppVariables(
  input: Prisma.JsonObject,
  parameters: SignatureParameter[]
) {
  let cppCode = "";

  for (const parameter of parameters) {
    const value = input[parameter.name];

    if (value === undefined) {
      throw new Error(`Missing parameter ${parameter.name}`);
    }

    const type = getCppType(parameter.type);
    const literal = getCppLiteral(value);

    cppCode += `${type} ${parameter.name} = ${literal};\n`;
  }

  return cppCode;
}

function getCppType(type: TypeNode): string {
  switch (type.kind) {
    case "number":
      return "int";

    case "string":
      return "string";

    case "boolean":
      return "bool";

    case "array": {
      return `vector<${getCppType(type.items)}>`;
    }

    default:
      throw new Error("Unsupported type");
  }
}


function getCppLiteral(value: Prisma.JsonValue): string {
  if (typeof value === "number") {
    return value.toString();
  }

  if (typeof value === "string") {
    return `"${value}"`;
  }

  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }

  if (Array.isArray(value)) {
    return `{${value.map(getCppLiteral).join(", ")}}`;
  }

  throw new Error("Unsupported literal");
}