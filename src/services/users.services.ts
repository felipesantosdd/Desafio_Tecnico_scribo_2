import { compare, genSaltSync, hashSync } from "bcryptjs";
import { AppDataSource } from "../data-source";
import { PhoneNumber } from "../entities/phone.Entity";
import { User } from "../entities/users.Entity";
import { AppError } from "../error";
import { LoginRequestType, RegisterRequestType, ResponseType, UserType } from "../interfaces/user.Types";
import jwt from "jsonwebtoken";

class UserServices {
    static userRepository = AppDataSource.getRepository(User)
    static phoneRepository = AppDataSource.getRepository(PhoneNumber)

    static async findAll(): Promise<UserType[]> {

        const users: UserType[] = await this.userRepository.find({
            relations: ['telefones']
        })

        return users
    }

    static async create(userData: RegisterRequestType): Promise<ResponseType> {

        const { telefones, ...user } = userData

        const emailExist = await this.userRepository.findOne({
            where: { email: user.email }
        });
        if (emailExist) {
            throw new AppError('E-mail já existente', 409);
        }

        const salt = genSaltSync(10);
        user.senha = hashSync(user.senha, salt);

        const newUser = await this.userRepository.save(user)

        const newPhones = []

        if (telefones.length > 0) {
            telefones.map((tel) => {
                tel.userId = newUser.id
                newPhones.push(this.phoneRepository.create(tel))
            })
        }

        newUser.telefones = newPhones
        newUser.ultimo_login = new Date()


        this.userRepository.save(newUser)

        const token = jwt.sign({ email: newUser.email }, process.env.SECRET_KEY, {
            subject: newUser.id,
            expiresIn: "30m",
        });




        const response: ResponseType = {
            id: newUser.id,
            data_criacao: newUser.data_criacao,
            data_atualizacao: newUser.data_atualizacao,
            ultimo_login: newUser.ultimo_login,
            token: token
        }

        return response


    }

    static async login(data: LoginRequestType): Promise<ResponseType> {
        const user = await this.userRepository.findOne({
            where: { email: data.email }
        })

        if (!user) {
            throw new AppError("Usuário e/ou senha inválidos", 401)
        }

        const passwordMatch = await compare(data.senha, user.senha);

        if (!passwordMatch) {
            throw new AppError("Usuário e/ou senha inválidos", 401)
        }

        user.ultimo_login = new Date()


        this.userRepository.save(user)

        const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, {
            subject: user.id,
            expiresIn: "30m",
        });

        const response: ResponseType = {
            id: user.id,
            data_criacao: user.data_criacao,
            data_atualizacao: user.data_atualizacao,
            ultimo_login: user.ultimo_login,
            token: token
        }

        return response

    }

    static async getUser(userId: string) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ["telefones"]
        })

        if (!user) {
            throw new AppError("Usuario nao encontrado", 400)
        }

        const { senha, ...response } = user

        return response
    }


}

export default UserServices