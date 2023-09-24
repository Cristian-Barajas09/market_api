// routes/user
import { UserController } from "../controller/UserController";
import { Router } from "express";
import { validateToken } from "../controller/ValidateToken";
const router = Router();



const userController: UserController = new UserController()

router.route('/')
    .get(validateToken.authenticated,userController.getUsers)
    .post(userController.createUser)


router.post('/login',userController.login)

router.route('/:id')
    .get(validateToken.authenticated,userController.getUserbyId)

export default router