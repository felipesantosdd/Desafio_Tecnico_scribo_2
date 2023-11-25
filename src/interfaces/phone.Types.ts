import { z } from 'zod'

export const phoneSchema = z.object({
    id: z.string(),
    ddd: z.string()
        .max(3, { message: "O DDD deve ter no maximo 3 numeros" })
        .min(1, { message: "O DDD deve ter no minimo 1 numero" }),
    numero: z.string()
        .max(9, { message: "O numero deve ter no maximo 9 digitos" })
        .min(8, { message: "O numero deve ter no minimo 8 digitos" }),
    userId: z.string()
})

export type PhoneType = z.infer<typeof phoneSchema>