import { UserEntity } from "../entiities/users";
import User from "../frameworks/mongoose/model/userModel";
import UserStorage from "../frameworks/mongoose/model/usersDataStorage";
import { userRepoInterf } from "../interfaces/repositoryInterface";
import bcrypt from "bcrypt";

export class UserRepository implements userRepoInterf {
  async createUser(user: UserEntity): Promise<UserEntity> {
    try {
      if (user.password !== user.confirmPassword) {
        throw new Error("passwords not match");
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);

      const userDatas = {
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        password: hashedPassword,
      };

      const createdUser = new User(userDatas);
      await createdUser.save();
      console.log("User created successfully !!!");
      return createdUser.toObject();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async findByEmail(email: string): Promise<UserEntity | null> {
    try {
      return await User.findOne({ email });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async findByEmailOfOTP(email: string): Promise<UserEntity | null> {
    try {
      return await UserStorage.findOne({ email });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async findByUsername(userName: string): Promise<UserEntity | null> {
    try {
      return await User.findOne({ userName });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async createUsersData(user: UserEntity, otp: number): Promise<UserEntity> {
    try {
      const isUserAlreadyExists = await UserStorage.findOne({
        email: user.email,
      });
      if (isUserAlreadyExists) {
        const expireAt = new Date();
        const updatedOTP = await UserStorage.updateOne(
          { email: user.email },
          { $set: { otp: otp, expireAt } }
        );
        if (updatedOTP) {
          console.log("otp updated");
        }
        return isUserAlreadyExists;
      }

      const usersData = {
        userName: user.userName,
        email: user.email,
        otp: otp,
      };
      const createUsersData = new UserStorage(usersData);
      const savedUser = await createUsersData.save();
      return savedUser.toObject();
    } catch (error) {
      console.log("usersData Repo failed", error);
      throw error;
    }
  }
  async otpValidation(
    generateOtp: number,
    enteredOTP: number
  ): Promise<boolean> {
    try {
      return generateOtp === enteredOTP;
    } catch (error) {
      throw error;
    }
  }
  async getOtpFromUsersStorage(user: UserEntity): Promise<number | null> {
    try {
      const userOTP = await UserStorage.findOne({ email: user.email });
      if (!userOTP) {
        return null;
      }
      return userOTP.otp;
    } catch (error) {
      console.log("didt get userStorage otp");
      throw error;
    }
  }
  async getOtpFromUsersData(user: UserEntity): Promise<number | null> {
    try {
      
      const userData = await this.findUserByEmailOrUsername(user.email);
      if (userData) {
        
        return userData.otp; // Return the stored OTP
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Error getting OTP from user data:", error);
      throw error;
    }
  }
  async findUserByEmailOrUsername(email: string): Promise<UserEntity | null> {
    try {
      const user = await UserStorage.findOne({ email });
      return user;
    } catch (error) {
      console.error("Error finding user by email or username:", error);
      throw error;
    }
  }
  async updateUser(userData: UserEntity): Promise<boolean> {
    try {
      const findExitingUser = await User.findOneAndUpdate(
        {
          email: userData.email,
        },
        { $set: {
          firstName: userData.firstName,
        lastName: userData.lastName,
        userName: userData.userName,
        phoneNumber: userData.phoneNumber,
        email: userData.email,
        } }
      );

      if(findExitingUser){
        return true;
      }
      return false
    } catch (error) {
      console.log(error);
      throw error
    }
  }
}