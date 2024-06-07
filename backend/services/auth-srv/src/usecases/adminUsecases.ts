import { AdminEntity } from "../entiities/admin";
import { UserEntity } from "../entiities/users";
import { adminRepoInterf } from "../interfaces/repositoryInterface";
import { adminUseCaseInterface} from "../interfaces/usecaseInterface";
import bcrypt from "bcrypt";






export class AdminUseCases implements adminUseCaseInterface<AdminEntity, UserEntity> {
    constructor(private adminRepository: adminRepoInterf) {}

    async adminLogin(adminData: AdminEntity): Promise<AdminEntity> {
        const {email,password} = adminData;
        try {
            
            const isExistingAdmin = await this.adminRepository.findAdminbyEmail(email);
            if(!isExistingAdmin){
                throw new Error("admin not exist");
            }
            const isPasswordMatch = await bcrypt.compare(password,isExistingAdmin.password);
            if(!isPasswordMatch){
                throw new Error("password not match");
            }
            console.log("Authentication successful");
            return isExistingAdmin
        } catch (error) {
            throw new Error("admin logi error");
        }
    }
    async getAllUsers(): Promise<UserEntity[]> {
        try {
            const getAllUsers = await this.adminRepository.getAllUsers();
            return getAllUsers
        } catch (error) {
            throw new Error("users not find");
        }
    }
    async userAction(userData: UserEntity): Promise<boolean | UserEntity> {
        try {
            const userBlockorUnblock = await this.adminRepository.userAction(userData);
            if(userBlockorUnblock){
                return true
            }
            return false;
        } catch (error) {
            throw new Error;
        }
    }

}