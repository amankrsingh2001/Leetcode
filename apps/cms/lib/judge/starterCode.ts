export type Language = "cpp" | "java" | "python" | "javascript";

export type TypeNode =
  | { kind: "number" }
  | { kind: "string" }
  | { kind: "boolean" }
  | { kind: "array"; items: TypeNode };

export interface SignatureParameter {
  name: string;
  type: TypeNode;
}

export interface ProblemSignature {
  id: string;
  problemId: string;
  functionName: string;
  returnType: TypeNode;
  parameters: SignatureParameter[];
}

    export function generateStarterCode(
      signature: ProblemSignature | null | undefined,
      lang: Language = "cpp",
    ) {

      if (!signature) {
        return "";
      }

      switch (lang) {
        case "cpp": {
          const returnType = mapCppType(signature.returnType);

          const parameters = signature.parameters.map(mapCppParameter).join(", ");

         return `class Solution {
public:
    ${returnType} ${signature.functionName}(${parameters}) {

    }
};`;
                  }

        case "java":
          const returnType = mapJavaType(signature.returnType);

          const parameters = signature.parameters.map(mapJavaParameter).join(',')

          return `class Solution
          public ${returnType} ${signature.functionName}(${parameters})

          `;

        case "python":
          return "";

        case "javascript":
          return "";

        default:
          return "";
      }
    }

      function mapCppType(node: TypeNode): string {
        switch (node.kind) {
          case "number":
            return "int";

          case "string":
            return "string";

          case "boolean":
            return "bool";

          case "array":
            return `vector<${mapCppType(node.items)}>`;
        }
      }

function mapCppParameter(parameter: SignatureParameter): string {
  const cppType = mapCppType(parameter.type);

  if (parameter.type.kind === "array") {
    return `${cppType}& ${parameter.name}`;
  }

  return `${cppType} ${parameter.name}`;
}

function mapJavaType(node:TypeNode):string{
  switch (node.kind){
    case "number":
      return "int";

    case "string":
    return "String";
    
    case "boolean":
      return "boolean";

    case "array":
      return `${mapJavaType(node.items)}[]`

  }
}

function mapJavaParameter(parameter: SignatureParameter): string {
  return `${mapJavaType(parameter.type)} ${parameter.name}`;
}