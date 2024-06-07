import { Router } from "express";
import bcrypt from "bcrypt"
import { AdminRepositoty } from "../../repositories/adminRepositories";
import { AdminUseCases } from "../../usecases/adminUsecases";
import { AdminController } from "../../controllers/adminController";


const route = Router();

const adminRepository = new AdminRepositoty();
const adminUserCase = new AdminUseCases(adminRepository)
const adminAuthController = new AdminController(adminUserCase)


route.post("/login",async(req,res)=>adminAuthController.adminLogin(req,res))
route.get("/getusers",async(req,res)=>adminAuthController.getAllUsers(req,res))
route.post("/useraction",async(req,res)=>adminAuthController.userAction(req,res))

export { route as adminAuthRoute };