import { z } from "zod";

const TypeNodeSchema: z.ZodType<any> = z.lazy(() =>
  z.union([
    z.object({
      kind: z.literal("number"),
    }),

    z.object({
      kind: z.literal("string"),
    }),

    z.object({
      kind: z.literal("boolean"),
    }),

    z.object({
      kind: z.literal("array"),
      items: TypeNodeSchema,
    }),
  ])
);

export const SignatureParameterSchema = z.object({
  name: z.string(),
  type: TypeNodeSchema,
});

export const parameterSchema = z.array(SignatureParameterSchema);