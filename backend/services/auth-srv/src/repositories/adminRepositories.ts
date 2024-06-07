import { AdminEntity } from "../entiities/admin";
import { UserEntity } from "../entiities/users";
import Admin from "../frameworks/mongoose/model/adminModel";
import User from "../frameworks/mongoose/model/userModel";
import { adminRepoInterf } from "../interfaces/repositoryInterface";

export class AdminRepositoty implements adminRepoInterf {
  async findAdminbyEmail(email: string): Promise<AdminEntity> {
    try {
      const isExistingAdmin = await Admin.findOne({ email });
      if (isExistingAdmin) {
        return isExistingAdmin;
      }
      throw new Error("credentials not exist");
    } catch (error) {
      throw error;
    }
  }
  async getAllUsers(): Promise<UserEntity[]> {
    try {
      const allUsers = await User.find();
      if (!allUsers) {
        throw new Error("user data base is empty");
      }
      return allUsers;
    } catch (error) {
      throw new Error("user cant find in database");
    }
  }
  async userAction(userData:UserEntity): Promise<boolean | UserEntity> {
    try {
      const userChangeStatus = await User.findOneAndUpdate(
        { _id: userData.id },
        { $set: { isActive: userData.status } },
        { new: true } 
      );
  
      if (userChangeStatus) {
        return userChangeStatus; 
      }
      return false;
    } catch (error) {
      console.error('Error updating user status:', error); 
      throw error;
    }
  }
  
}
