import { UserEntity } from "../entiities/users";
import Token from "../frameworks/mongoose/model/resetTokenModel";
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
  async updateUser(userData: UserEntity): Promise<boolean | UserEntity> {
    try {
      const findExitingUser = await User.findOneAndUpdate(
        {
          email: userData.email,
        },
        {
          $set: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            userName: userData.userName,
            phoneNumber: userData.phoneNumber,
            email: userData.email,
          },
        },
        {
          new: true,
        }
      );

      if (findExitingUser) {
        return findExitingUser;
      }
      return false;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async updateUserImage(
    userEmail: string,
    liveLink: string
  ): Promise<boolean | UserEntity> {
    try {
      const urlRegex = /https?:\/\/[^\s]+/;
      const match = liveLink.match(urlRegex);
      const sanitizedOutput = match ? match[0] : "";

      const isUpdated = await User.findOneAndUpdate(
        { email: userEmail },
        { $set: { profilePic: sanitizedOutput } },
        { new: true }
      );

      if (isUpdated) {
        return isUpdated;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
  async setNewPassword(userData: UserEntity): Promise<UserEntity | boolean> {
    try {
      const { token, userID, newPassword } = userData;
      const passwordResetToken = await Token.findOne({ userID });
      if (!passwordResetToken) {
        throw new Error("Invalid or expired password reset token");
      }
      const isValid = await bcrypt.compare(token, passwordResetToken.token);
      if (!isValid) {
        throw new Error("Invalid or expired password reset token");
      }

      const hash = await bcrypt.hash(newPassword, 10);

      const updatedUser = await User.findOneAndUpdate(
        { _id: userID },
        { $set: { password: hash } },
        { new: true }
      );

      if(updatedUser){
        return updatedUser
      }
      return false
    } catch (error) {
      throw error;
    }
  }
}
