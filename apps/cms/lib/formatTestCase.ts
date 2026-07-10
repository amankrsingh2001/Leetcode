import { Prisma } from "@prisma/client";

export function formatTestCase(value: Prisma.JsonValue): string {
  if (
    value === null ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    return JSON.stringify(value);
  }

  return Object.entries(value)
    .map(([key, val]) => `${key} = ${JSON.stringify(val)}`)
    .join("\n");
}