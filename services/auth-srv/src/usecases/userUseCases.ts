import { UserEntity } from "../entiities/users";
import { userRepoInterf } from "../interfaces/userRepoInterf";
import { userUseCaseInterf } from "../interfaces/userUseCaseInterf";
import { UserRepository } from "../repositories/userRepositories";
import { generateOtp } from "../utils/utilities";
import dotenv from "dotenv";
dotenv.config();
import jwt, { JwtPayload } from "jsonwebtoken";

export class RegisterUser implements userUseCaseInterf<UserEntity, UserEntity> {
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

      //a prompt will show to input the
      const enteredOTP = otp;

      if (enteredOTP === otp) {
        const createNewUser = await this.userRepository.createUser(user);
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
          const createToken = jwt.sign(tokenData, process.env.JWT_SECRET_KEY);
          console.log("jwt tocken created :", createToken);
          return createNewUser;
        } else {
          throw new Error("new user creation error");
        }
      } else {
        console.log("entered otp is not correct");
      }

      return storeInUsersDataStorage;
    } catch (error) {
      console.error("Error during user registration:", error);
      throw error;
    }
  }
}
