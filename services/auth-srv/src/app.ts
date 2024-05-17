import express from "express";
import { config } from "dotenv";
import connectDB from "./frameworks/mongoose/dbConnection";
import { userAuthRoute } from "./config/routes/authUser";
config();

const app = express();

const start = async () => {
  try {
    const port = process.env.PORT || 3000;

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    //Routes
    app.use("/auth/user", userAuthRoute);

    connectDB();

    app.listen(port, () => {
      console.log("User-srv running on PORT 3000 !!!");
    });

    return app;
  } catch (error) {
    console.log(error);
  }
};

export { start };
