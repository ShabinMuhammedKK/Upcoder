import { UserEntity } from "../entiities/users";
import bcrypt from "bcrypt";
import User from "../frameworks/mongoose/model/userModel";
import UserStorage from "../frameworks/mongoose/model/usersDataStorage";
import { userRepoInterf } from "../interfaces/repositoryInterface";
import { userUseCaseInterf } from "../interfaces/usecaseInterface";
import { UserRepository } from "../repositories/userRepositories";
import { generateOtp, uploadCloudinary } from "../utils/utilities";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

export class CreateUsersData
  implements userUseCaseInterf<UserEntity, UserEntity>
{
  constructor(private userRepository: userRepoInterf) {}

  async execute(user: UserEntity): Promise<UserEntity> {
    try {
      const existingUserByEmail = await this.userRepository.findByEmail(
        user.email
      );
      if (existingUserByEmail !== null) {
        throw new Error("User with this email already exists");
      }

      const existingUserByUsername = await this.userRepository.findByUsername(
        user.userName
      );
      if (existingUserByUsername !== null) {
        throw new Error("User with this username already exists");
      }

      let otp = generateOtp();
      console.log(otp);

      const storeInUsersDataStorage = await this.userRepository.createUsersData(
        user,
        otp
      );
      if (!storeInUsersDataStorage) {
        console.log("usersStorage is not worked");
        throw new Error("Failed to create new usersData");
      }

      return storeInUsersDataStorage;
    } catch (error) {
      console.error("Error during user registration:", error);
      throw error;
    }
  }
  async registerNewUser(
    formData: UserEntity,
    otp: number
  ): Promise<UserEntity> {
    const email = formData.email;

    try {
      const enteredOTP = otp;
      const generateOtp = await UserStorage.findOne({ email });

      if (enteredOTP !== Number(generateOtp?.otp)) {
        console.log("entered otp is not correct");
        throw new Error("OTP not matched");
      }
      const createNewUser = await this.userRepository.createUser(formData);
      if (createNewUser) {
        console.log("new user is created");
        const tokenData = {
          fistName: createNewUser.firstName,
          lastName: createNewUser.lastName,
          userNmae: createNewUser.userName,
          email: createNewUser.email,
          phoneNumber: createNewUser.phoneNumber,
        };
        if (!process.env.JWT_SECRET_KEY) {
          throw new Error("jwt secret key is undefined");
        }
        const createToken = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
          expiresIn: "1h",
        });
        console.log("jwt tocken created :", createToken);
        return createNewUser;
      } else {
        throw new Error("new user creation error");
      }
    } catch (error) {
      throw error;
    }
  }
  async loginUser(userData: UserEntity): Promise<boolean> {
    try {
      const { email, password } = userData;

      const isEmailExists = await this.userRepository.findByEmail(email);
      if (!isEmailExists) {
        return false;
      } else if (isEmailExists.isActive === false) {
        return false;
      }

      const isPasswordMatch = await bcrypt.compare(
        password,
        isEmailExists.password
      );
      if (!isPasswordMatch) {
        return false;
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
  async authenticatedUser(userEmail: UserEntity): Promise<UserEntity | null> {
    try {
      const userData = await this.userRepository.findByEmail(userEmail.email);
      if (!userData) {
        throw new Error("user data not getting");
      }
      return userData;
    } catch (error) {
      return null;
    }
  }
  async editUserProfile(userData: UserEntity): Promise<boolean | UserEntity> {
    try {
      const isUserExists = await this.userRepository.updateUser(userData);
      if (isUserExists) {
        return isUserExists;
        
      }
      throw new Error("user not updated");
    } catch (error) {
      throw error;
    }
  }
  async getUserProfileData(useremail: string): Promise<UserEntity> {
    try {
      const userData = await this.userRepository.findByEmail(useremail);
      if (userData !== null) {
        console.log(userData);
        return userData;
      }
      throw new Error("user not found");
    } catch (error) {
      throw error;
    }
  }
  async uploadProfilePicture(userEmail:string,filePath:string):Promise<boolean | UserEntity>{
    try {
      
      const imageLiveLink = await  uploadCloudinary(filePath);
      if(!imageLiveLink){
        throw new Error("cloudinary error")
      }
      if(imageLiveLink){
        const updatedUserProfile = await this.userRepository.updateUserImage(userEmail,imageLiveLink);
        if(updatedUserProfile){
          return true;
        }
        return false
      }
      
      return false
    } catch (error) {
      return false
    }
  }
}
