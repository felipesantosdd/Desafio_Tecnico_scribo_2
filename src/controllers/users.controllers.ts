import { AppError } from "../error";
import { RegisterRequestType, ResponseType, UserType } from "../interfaces/user.Types";
import UserServices from "../services/users.services";
import { Request, Response } from "express"

class UserControllers {
    static async getAll(req: Request, res: Response): Promise<any> {
        try {
            const users: UserType[] = await UserServices.findAll()
            return res.status(200).json(users);
        } catch (error) {

        }
    }

    static async create(req: Request, res: Response): Promise<any> {
        try {
            const userData: ResponseType = await UserServices.create(req.body)
            return res.status(201).json(userData);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    error: error.message
                })
            } else {
                return res.status(400).json({ erro: error.message })
            }
        }
    }

    static async login(req: Request, res: Response): Promise<any> {
        try {
            const response: ResponseType = await UserServices.login(req.body)
            return res.status(200).json(response)
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    error: error.message
                })
            } else {
                return res.status(400).json({ erro: error.message })
            }
        }
    }

    static async getUser(req: Request | any, res: Response): Promise<any> {
        try {
            const user = await UserServices.getUser(req.user.id)
            return res.status(200).json(user)
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    error: error.message
                })
            } else {
                return res.status(400).json({ erro: error.message })
            }

        }
    }
}

export default UserControllers