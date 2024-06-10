import { Payments } from "./payments";
import { Enrollment } from "./enrollment";

export interface UserEntity {
    name: string;
    id: string;
    user: UserEntity;
    _id?:string;
    userID?:string;
    password:string;
    confirmPassword:string;
    otp:number;
    expireAt?:Date;
    hashedPassword:string;
    firstName:string;
    lastName:string;
    userName:string;
    phoneNumber:number;
    email:string;
    updatedAt?:Date;
    isActive:boolean;
    profilePic:string;
    purchaseHistory:Payments[];
    createdAt?:Date;
    enrollmentHistory:Enrollment[];
    status:boolean;
    token:string;
    link:string;
    newPassword:string;
}
