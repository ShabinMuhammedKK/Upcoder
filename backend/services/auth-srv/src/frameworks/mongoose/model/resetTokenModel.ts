import mongoose, { Schema } from "mongoose";
import { UserEntity } from "../../../entiities/users";


const tokenSchema = new mongoose.Schema<UserEntity>({
    userID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      token: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
      },
},{
  timestamps:true,
});

const Token = mongoose.model("Token", tokenSchema);

export default Token;