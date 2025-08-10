import { z } from "zod";

export const photoSchema = z.object({
  photo: z
    .custom<File>((val): val is File => val instanceof File, { message: "Envie uma foto" })
    .refine((file) => file.size <= 5 * 1024 * 1024, "Foto deve ter no máximo 5MB")
    .refine((file) => /image\/(jpeg|png|jpg|webp)/.test(file.type), "Formato inválido"),
});

export type PhotoInput = z.infer<typeof photoSchema>;


