export interface UserEntiti {
    _id:string;
    password:string;
    firstName:string;
    lastName:string;
    email:string;
    updatedAt:Date;
    isActive:boolean;
    profilePic:string;
    purchaseHistory:Payments[];
    createdAt:Date;
    enrollmentHistory:Enrollment[]
}

export interface Payments {
    _id:string;
    purchaseDate:Date;
    transactionID:string;
    price:number;
    userID: string;
    courceID:string;
    paymentMethod:string;
}

export interface Enrollment {
    _id:string;
    userID:string;
    enrollmentDate:Date;
    courseID:string;
    courseCompletion:completionStatus;
    lastAccessedDate:Date;
}

export enum completionStatus {
    incomplete = "incomplete",
    complete = "complete"
}