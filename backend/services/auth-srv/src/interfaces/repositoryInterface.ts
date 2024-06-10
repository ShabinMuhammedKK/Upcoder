import { AdminEntity } from "../entiities/admin";
import { UserEntity } from "../entiities/users";

export interface userRepoInterf {
    getOtpFromUsersStorage: any;
    createUser(user:UserEntity):Promise<UserEntity | null>;
    findByEmail(email:string):Promise<UserEntity | null>;
    findByUsername(userName:string):Promise<UserEntity | null>;
    createUsersData(user:UserEntity,otp:number):Promise<UserEntity>
    updateUser(userData:UserEntity):Promise<boolean | UserEntity>
    updateUserImage(userEmail:string,liveLink:string):Promise<boolean | UserEntity>
    setNewPassword(userData:UserEntity):Promise<UserEntity | boolean>
}

export interface adminRepoInterf{
    findAdminbyEmail(email:string):Promise<AdminEntity>;
    getAllUsers():Promise<UserEntity[]>
    userAction(userData:UserEntity):Promise< UserEntity | boolean>
}