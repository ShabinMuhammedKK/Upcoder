import mongoose, { Connection } from "mongoose";

type ConnFunc = () => Promise<void>;

const connectDB: ConnFunc = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb://auth-mongo-srv:27017/auth"
    );
    console.log("Mongodb connected !!!");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
