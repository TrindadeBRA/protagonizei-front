import { z } from "zod";
import { allowedSkinTones } from "../constants";

export const childInfoSchema = z.object({
  childName: z
    .string()
    .min(2, "Informe o nome")
    .refine((v) => !/\d/.test(v), "Não é possível usar números no nome"),
  childAge: z.string().refine((v) => {
    const n = Number(v);
    return Number.isInteger(n) && n >= 1 && n <= 14;
  }, "Idade deve ser entre 1 e 14"),
  childGender: z.enum(["menina", "menino"], { message: "Selecione o gênero" }),
  skinTone: z.enum(allowedSkinTones, { message: "Selecione o tom de pele" }),
});

export type ChildInfoInput = z.infer<typeof childInfoSchema>;


