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