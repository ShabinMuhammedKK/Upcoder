import { Router } from "express";
import { AuthController } from "../../controllers/userController";
import { RegisterUser } from "../../usecases/userUseCases";
import { UserRepository } from "../../repositories/userRepositories";

const route = Router();

const userRepository = new UserRepository();
const registerUser = new RegisterUser(userRepository);

const authController = new AuthController(registerUser);

route.post("/register", (req, res) => authController.register(req, res));

export { route as userAuthRoute };
