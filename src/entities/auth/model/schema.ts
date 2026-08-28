import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(1, "Ismingizni kiriting")
    .min(3, "Ism kamida 3 ta belgidan iborat bo'lishi kerak")
    .max(30, "Ism 30 ta belgidan oshmasligi kerak")
    .regex(/^[a-zA-Z0-9_]+$/, "Faqat lotin harflari, raqamlar va pastki chiziq (_) kiritilishi mumkin"),
  password: z
    .string()
    .min(1, "Parolni kiriting")
    .min(6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak")
    .max(50, "Parol 50 ta belgidan oshmasligi kerak"),
});

export const loginSchema = z.object({
  username: z.string().min(1, "Ismingizni kiriting"),
  password: z.string().min(1, "Parolni kiriting"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
