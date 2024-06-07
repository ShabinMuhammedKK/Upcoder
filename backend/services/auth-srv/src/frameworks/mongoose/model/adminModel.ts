import mongoose from "mongoose";
import { AdminEntity } from "../../../entiities/admin";

const adminSchema = new mongoose.Schema<AdminEntity>({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
},{
  timestamps:true,
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;