import { Router } from "express";
import {
  loadLoginUser,
  loadRegisterUser,
  logoutUser,
  registerUser,
} from "../controllers/userController";

const route = Router();

route.get("/login", loadLoginUser);
route.get("/register", loadRegisterUser);
route.get("/logout", logoutUser);

route.post("/register", registerUser);

export { route as userAuthRoute };
