export type TypeNode =| { kind: "number" }| { kind: "string" }  | { kind: "boolean" } | { kind: "array"; items: TypeNode;};

export interface SignatureParameter {
  name: string;
  type: TypeNode;
}

export interface ProblemSignature {
  functionName: string;
  returnType: TypeNode;
  parameters: SignatureParameter[];
}