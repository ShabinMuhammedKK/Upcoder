import { AdminEntity } from "../entiities/admin";
import { UserEntity } from "../entiities/users";

export interface userUseCaseInterf <TRequest,TResponse>{
    execute(request:TRequest):Promise<TResponse>;
    authenticatedUser(request:TRequest):Promise<TResponse | null>;
    editUserProfile(Request:TRequest):Promise<boolean>;
}
export interface adminUseCaseInterface<TRequest,TResponse>{
    adminLogin(adminData:AdminEntity):Promise<AdminEntity>;
    getAllUsers():Promise<UserEntity[]>;
    userAction(_id:UserEntity):Promise<UserEntity | boolean>;
}