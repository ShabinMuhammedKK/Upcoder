import { Response, Request } from "express";
import { registerUser as registerUseCase } from "../../usecases/userUsecases";

const loadRegisterUser = async (req: Request, res: Response) => {
  try {
    res.send("get register page");
  } catch (error) {
    console.log(error);
  }
};

const registerUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const userReg = registerUseCase(userData);
  } catch (error) {
    res.status(500).send(error);
  }
};

const loadLoginUser = async (req: Request, res: Response) => {
  try {
    res.send("get login page");
  } catch (error) {
    console.log(error);
  }
};

const logoutUser = async (req: Request, res: Response) => {
  try {
    res.send("get logout page");
  } catch (error) {
    console.log(error);
  }
};

export { loadRegisterUser, registerUser, loadLoginUser, logoutUser };
