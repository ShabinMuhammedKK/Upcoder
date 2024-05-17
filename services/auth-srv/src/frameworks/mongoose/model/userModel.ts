import mongoose, { mongo } from "mongoose";
import { UserEntiti } from "../../../entiities/users";

const userSchema = new mongoose.Schema<UserEntiti>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  phoneNumber:{
    type:Number,
    required:true,
    minlength:10,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  confirmPassword: {
    type: String,
    required: true,
    minlength: 6,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
