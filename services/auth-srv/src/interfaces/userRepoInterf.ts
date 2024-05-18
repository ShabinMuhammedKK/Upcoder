import { UserEntity } from "../entiities/users";

export interface userRepoInterf {
    createUser(user:UserEntity):Promise<UserEntity | null>;
    findByEmail(email:string):Promise<UserEntity | null>;
    findByUsername(userName:string):Promise<UserEntity | null>;
}