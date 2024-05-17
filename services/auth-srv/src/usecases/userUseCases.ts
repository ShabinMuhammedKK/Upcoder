import { UserEntity } from "../entiities/users";
import { userRepoInterf } from "../interfaces/userRepoInterf";
import { userUseCaseInterf } from "../interfaces/userUseCaseInterf";

export class RegisterUser implements userUseCaseInterf<UserEntity, UserEntity> {
  constructor(private userRepository: userRepoInterf) {}

  async execute(user: UserEntity): Promise<UserEntity> {
    if (user.password !== user.confirmPassword) {
      throw new Error("Password is not correct");
    }
    return this.userRepository.createUser(user);
  }
}
