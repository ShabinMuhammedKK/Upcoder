import { UserEntity } from "../entiities/users";
import { userRepoInterf } from "../interfaces/userRepoInterf";
import { userUseCaseInterf } from "../interfaces/userUseCaseInterf";
import { UserRepository } from "../repositories/userRepositories";

export class RegisterUser implements userUseCaseInterf<UserEntity, UserEntity> {
  constructor(private userRepository: userRepoInterf) {}

  async execute(user: UserEntity): Promise<UserEntity> {
    try {
      const existingUserByEmail = await this.userRepository.findByEmail(user.email);
      if (existingUserByEmail !== null) {
        throw new Error("User with this email already exists");
      }
  
      const existingUserByUsername = await this.userRepository.findByUsername(user.userName);
      if (existingUserByUsername !== null) {
        throw new Error("User with this username already exists");
      }
  
      // Creating the new user
      const newUserCreated = await this.userRepository.createUser(user);
      if(!newUserCreated){
        throw new Error("Failed to create new user");
        
      }
      return newUserCreated;
    } catch (error) {
      console.error("Error during user registration:", error);
      throw error;
    }
  }
}
