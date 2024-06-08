import mongoose, { mongo } from "mongoose";
import { UserEntity } from "../../../entiities/users";

const userSchema = new mongoose.Schema<UserEntity>({
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
  profilePic:{
    type:String,
    default:"",
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  isActive:{
    type: Boolean,
    required:true,
    default:true,
    
  }
},{
  timestamps:true,
});

const User = mongoose.model("User", userSchema);

export default User;
