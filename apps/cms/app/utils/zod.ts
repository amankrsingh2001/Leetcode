import { z } from "zod";

export const createUser = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});