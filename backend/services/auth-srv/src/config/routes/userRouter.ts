import { Router } from "express";
import { AuthController } from "../../controllers/userController";
import {CreateUsersData } from "../../usecases/userUseCases";
import { UserRepository } from "../../repositories/userRepositories";
import { authenticateToken } from "../../frameworks/express/middlewares/authMiddlewares";
import { upload, uploadCloudinary } from "../../utils/utilities";


const route = Router();

const userRepository = new UserRepository();
const createUsersData = new CreateUsersData(userRepository);
const authController = new AuthController(createUsersData);

route.post("/register", (req, res) => authController.createUserStorageData(req, res));
route.post("/verifyOTP", (req, res) => authController.register(req, res));
route.post("/login",(req,res)=>authController.login(req,res));
route.post("/refreshtoken",(req,res)=>authController.refreshToken);
route.post("/storedata",(req,res)=>authController.dataToRedux(req,res));
route.post("/getUser",(req,res)=>authController.getUserDatas(req,res));
route.post("/updateuser",(req,res)=>authController.updateUser(req,res));
route.post('/upload', upload.single('file'), (req, res) =>authController.uploadProfilePicture(req,res));
route.post("/resetemail",(req,res)=>authController.resetigPassword(req,res));
route.post("/newPassword",(req,res)=>authController.newPasswordSetting(req,res))

export { route as userAuthRoute };