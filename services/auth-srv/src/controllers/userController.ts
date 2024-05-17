import { Response, Request } from "express";
import { RegisterUser } from "../usecases/userUseCases";
import { UserEntity } from "../entiities/users";

export class AuthController {
  constructor(private registerUser: RegisterUser) {}

  async register(req: Request, res: Response): Promise<void> {
    const requestedData: UserEntity = req.body;
    try {
      const newUser = await this.registerUser.execute(requestedData);
      res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
    }
  }
}
