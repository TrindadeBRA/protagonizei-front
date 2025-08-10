import { z } from "zod";

export const contactSchema = z.object({
  parentName: z.string().min(2, "Informe seu nome"),
  phone: z
    .string()
    .min(14, "Telefone inválido")
    .refine((value) => /\(\d{2}\)\s\d{4,5}-\d{4}/.test(value), "Telefone inválido"),
  email: z.string().email("E-mail inválido"),
});

export type ContactInput = z.infer<typeof contactSchema>;


