import { Router } from "express"
import UserControllers from "../controllers/users.controllers"
import ensureAuthMiddleware from "../middleware/isAuthenticated"

const userRoutes = Router()

userRoutes.get('/', UserControllers.getAll)
userRoutes.post('/signup', UserControllers.create)
userRoutes.post('/signin', UserControllers.login)
userRoutes.get('/profile', ensureAuthMiddleware, UserControllers.getUser)

export default userRoutes