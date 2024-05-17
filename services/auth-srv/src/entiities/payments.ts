export interface Payments {
    _id:string;
    purchaseDate:Date;
    transactionID:string;
    price:number;
    userID: string;
    courceID:string;
    paymentMethod:string;
}