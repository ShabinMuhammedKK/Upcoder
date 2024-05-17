import UserModel from "../../frameworks/mongoose/model/userModel";
import { UserEntity } from "../../entiities/users";

export const createUser = async(userData:UserEntity):Promise <UserEntity | void> =>{
    try {
        const user = new UserModel(userData);
        await user.save();
        console.log("new use created")
        
    } catch (error) {
        console.log(error)
    }
}