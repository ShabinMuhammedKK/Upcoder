import { UserEntiti } from "../entiities/users"
import { createUser } from "../interfaces/repositories/userRepositories";

export const registerUser = async(userData:UserEntiti):Promise<UserEntiti | void>=>{
    try {
        const createdUser = createUser(userData)
    } catch (error) {
        console.log(error)
    }
}