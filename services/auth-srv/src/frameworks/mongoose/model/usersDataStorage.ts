import mongoose from "mongoose";
import { UserEntity } from "../../../entiities/users";
import { sendVerificationMail } from "../../../utils/utilities";

const usersDataSchema = new mongoose.Schema<UserEntity>({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:Number,
        required:true,
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: '2m' },
      },
})


usersDataSchema.pre("save",async function (next){
    console.log("new usersData document is created");
    if(this.isNew){
        await sendVerificationMail(this.email,this.otp)
    }
    next();
})

const UserStorage = mongoose.model("usersData",usersDataSchema);

export default UserStorage;