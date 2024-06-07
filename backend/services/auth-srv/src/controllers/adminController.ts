import { AdminEntity } from "../entiities/admin";
import { AdminUseCases } from "../usecases/adminUsecases";
import { Response, Request } from "express";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import { UserEntity } from "../entiities/users";
dotenv.config();

const accessTokenSecret: string | undefined = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret: string | undefined = process.env.REFRESH_TOKEN_SECRET;

export class AdminController {
  constructor(private admicontroller: AdminUseCases) {}

  async adminLogin(req: Request, res: Response): Promise<void> {
    const adminData = req.body;

    try {
      const isAdminLogin = await this.admicontroller.adminLogin(adminData);
      if (isAdminLogin) {
        if (accessTokenSecret && refreshTokenSecret) {
          const accessToken = generateAccessToken(adminData);
          const payload = { email: adminData.email };
          const refreshToken = jwt.sign(payload, refreshTokenSecret as Secret);
          res.status(201).json({ accessToken, refreshToken });
        } else {
          throw new Error("Token secrets not defined");
        }
      } else {
        res.status(401).send("Unauthorized");
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void | UserEntity[]> {
    try {
      const users = await this.admicontroller.getAllUsers();

      if (!users || users.length === 0) {
        throw new Error("No users found");
      }

      res.status(200).json(users);
    } catch (error) {
      console.error(error); 
      res.status(500).send({ message: "Error fetching users" });
    }
  }
  async userAction(req: Request, res: Response): Promise<void> {
    try {
      const userActions = await this.admicontroller.userAction(req.body);
  
      if (userActions) {
        res.status(200).json({ success: true, data: userActions });
      } else {
        res.status(404).json({ success: false, message: 'User not found or update failed' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal Server Error'});
    }
  }
}








function generateAccessToken(admin: any) {
  if (accessTokenSecret) {
    return jwt.sign(admin, accessTokenSecret, { expiresIn: "15m" });
  } else {
    throw new Error("Access token secret not defined");
  }
}

// app.post('/token', (req: Request, res: Response) => {
//     const { refreshToken } = req.body;
//     if (!refreshToken) {
//         return res.sendStatus(401);
//     }

//     jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
//         if (err) {
//             return res.sendStatus(403);
//         }

//         const accessToken = generateAccessToken({ username: user.username });
//         res.json({ accessToken });
//     });
// });
