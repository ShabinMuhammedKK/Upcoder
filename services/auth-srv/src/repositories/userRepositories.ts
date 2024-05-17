import { UserEntity } from "../entiities/users";
import User from "../frameworks/mongoose/model/userModel";
import { userRepoInterf } from "../interfaces/userRepoInterf";

export class UserRepository implements userRepoInterf {
  async createUser(user: UserEntity): Promise<UserEntity> {
    const createdUser = new User(user);
    await createdUser.save();
    console.log("User created successfully !!!");
    return createdUser.toObject();
  }
}
