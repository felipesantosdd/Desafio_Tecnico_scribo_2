import { ZodObject, z } from 'zod'
import { phoneSchema } from './phone.Types'


const userSchema = z.object({
    id: z.string(),
    nome: z.string(),
    email: z.string().email(),
    senha: z.string(),
    data_criacao: z.date(),
    data_atualizacao: z.date(),
    ultimo_login: z.date(),
    telefones: z.array(
        phoneSchema
    )
})

const loginRequestSchema = z.object({
    email: z.string({ required_error: "Por favor forneca o seu email" })
        .email({ message: 'e-mail invalido' }),
    senha: z.string({ required_error: "Por favor forneca uma senha" })
})

const registerRequestSchema = z.object({
    nome: z.string({
        required_error: "Por favor forneca o seu nome"
    }),
    email: z.string({ required_error: "Por favor forneca o seu email" })
        .email({ message: 'e-mail invalido' }),
    senha: z.string({ required_error: "Por favor forneca uma senha" }),
    telefones: z.array(
        phoneSchema
    ).nullable(),
})

const responseSchema = z.object({
    id: z.string(),
    data_criacao: z.date(),
    data_atualizacao: z.date(),
    ultimo_login: z.date(),
    token: z.any()
})

export type UserType = z.infer<typeof userSchema>
export type RegisterRequestType = z.infer<typeof registerRequestSchema>
export type ResponseType = z.infer<typeof responseSchema>
export type LoginRequestType = z.infer<typeof loginRequestSchema>
