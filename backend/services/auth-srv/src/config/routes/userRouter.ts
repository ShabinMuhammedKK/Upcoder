import { Router } from "express";
import { AuthController } from "../../controllers/userController";
import {CreateUsersData } from "../../usecases/userUseCases";
import { UserRepository } from "../../repositories/userRepositories";
import { authenticateToken } from "../../frameworks/express/middlewares/authMiddlewares";


const route = Router();

const userRepository = new UserRepository();
const registerUser = new CreateUsersData(userRepository);

const authController = new AuthController(registerUser);

route.post("/register", (req, res) => authController.createUserStorageData(req, res));
route.post("/verifyOTP", (req, res) => authController.register(req, res));
route.post("/login",(req,res)=>authController.login(req,res));
route.post("/refreshtoken",(req,res)=>authController.refreshToken);
route.post("/storedata",(req,res)=>authController.dataToRedux(req,res));
route.post("/getUser",(req,res)=>authController.getUserDatas(req,res));
route.post("/updateuser",authenticateToken,(req,res)=>authController.updateUser(req,res));

export { route as userAuthRoute };