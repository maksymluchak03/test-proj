import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const loginDefaultValues = {
  email: "",
  password: "",
};

export type LoginFormData = z.infer<typeof loginSchema>;
