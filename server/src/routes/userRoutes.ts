import { Router } from "express";
import { userSignin, userSignup } from "../controllers/userController";

const userRoutes = Router()

userRoutes.route('/register').post(userSignup)
userRoutes.route('/signin').post(userSignin)

export default userRoutes