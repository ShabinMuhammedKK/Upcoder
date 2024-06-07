import mongoose, { Connection } from "mongoose";

type ConnFunc = () => Promise<void>;

const connectDB: ConnFunc = async () => {
  try {
    // mongodb://auth-mongo-srv:27017/auth
    const connect = await mongoose.connect(
      "mongodb+srv://shabinmkk3:X8OWc0LXVlrXQsdc@cluster0.gctq1ud.mongodb.net/auth"
    );
    console.log("Mongodb connected !!!");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
