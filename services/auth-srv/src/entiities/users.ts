import { Payments } from "./payments";
import { Enrollment } from "./enrollment";

export interface UserEntity {
    _id:string;
    password:string;
    confirmPassword:string;
    firstName:string;
    lastName:string;
    userName:string;
    phoneNumber:number;
    email:string;
    updatedAt:Date;
    isActive:boolean;
    profilePic:string;
    purchaseHistory:Payments[];
    createdAt:Date;
    enrollmentHistory:Enrollment[]
}
