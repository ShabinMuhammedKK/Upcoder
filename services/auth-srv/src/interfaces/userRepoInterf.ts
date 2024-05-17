import { UserEntity } from "../entiities/users";

export interface userRepoInterf {
    createUser(user:UserEntity):Promise<UserEntity>;

}