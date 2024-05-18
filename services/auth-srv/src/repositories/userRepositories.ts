import { UserEntity } from "../entiities/users";
import User from "../frameworks/mongoose/model/userModel";
import { userRepoInterf } from "../interfaces/userRepoInterf";

export class UserRepository implements userRepoInterf {
  async createUser(user: UserEntity): Promise<UserEntity> {
    try {
      
      const createdUser = new User(user);
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
  async findByUsername(userName: string): Promise<UserEntity | null> {
    try {
      
      return await User.findOne({ userName });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
