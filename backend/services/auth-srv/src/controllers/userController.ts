import { Response, Request } from "express";
import {CreateUsersData } from "../usecases/userUseCases";
import { UserEntity } from "../entiities/users";
import dotenv from "dotenv";
dotenv.config();
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";



const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;


interface CustomJwtPayload extends JwtPayload {
  email: string;
}





export class AuthController {
  constructor(private registerUser: CreateUsersData) {}

  async createUserStorageData(req: Request, res: Response): Promise<void> {
    const requestedData: UserEntity = req.body;

    try {
      const newUser = await this.registerUser.execute(requestedData);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).send(error)
    }
  }
  async register(req: Request, res: Response): Promise<void> {
    const formData: UserEntity = req.body.user;
    const otp: number = req.body.otp;

console.log(otp)
    try {
      const newUser = await this.registerUser.registerNewUser(formData,otp);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).send(error)
    }
  }
  async login(req:Request,res:Response):Promise<void> {
    const loginData:UserEntity = req.body;

    try {
      const isAuthenticated = await this.registerUser.loginUser(loginData);
  
      if (!isAuthenticated) {
        res.status(401).json({ message: 'Login failed' });
        return; 
      }
  
      const accessToken = jwt.sign({ email: loginData.email }, ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
    const refreshToken = jwt.sign({ email: loginData.email }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
    res.status(200).json({ status: "true", message: 'Login successful', accessToken });
    return; 
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
      return; 
    }
  }
  async refreshToken(req: Request, res: Response): Promise<void> {
    const refreshToken = req.cookies.refreshToken;
  
    if (!refreshToken) {
      res.status(401).json({ message: 'No refresh token provided' });
      return;
    }
  
    
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err: VerifyErrors | null, decoded: any) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }
  
      const decodedPayload = decoded as CustomJwtPayload;
  
      if (!decodedPayload || !decodedPayload.email) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }
  
      const accessToken = jwt.sign({ email: decoded.email }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
      res.status(200).json({ accessToken });
    });
  }
  async dataToRedux(req:Request,res:Response):Promise<void>{
    const reqData = req.body

    try {
      const userData = await this.registerUser.authenticatedUser(reqData);
      if(userData){
        res.send(userData)
      }
    } catch (error) {
      res.send(error)
    }
  }
  async updateUser(req:Request,res:Response):Promise<boolean>{
    
    const userData = req.body;
    try {
      const isUserUpdated = await this.registerUser.editUserProfile(userData);
      return isUserUpdated;
    } catch (error) {
      throw error;
    }
  }
  async getUserDatas(req: Request, res: Response): Promise<void> {
    const useremail = req.body.email;
    try {
      const userData = await this.registerUser.getUserProfileData(useremail);
      if (userData !== null) {
        res.status(200).json({ success: true, data: userData });
      } else {
        res.status(404).json({ success: false, message: 'User not found' });
      }
    } catch (error) {
      console.error('Error getting user data:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
  

}
