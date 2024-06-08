import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import connectDB from "./frameworks/mongoose/dbConnection";
import { userAuthRoute } from "./config/routes/userRouter";
import cors from "cors";
import { adminAuthRoute } from "./config/routes/adminRouter";
config();

const app = express();

const start = async () => {
  try {
    const port = process.env.PORT || 3000;

    app.use(
      cors({
        origin: "http://localhost:5173",
        credentials: true,
      })
    );

    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(express.static(__dirname + "/public"));
    app.use("/uploads", express.static("uploads"));

    //Routes
    app.use("/auth/user", userAuthRoute);
    app.use("/auth/admin", adminAuthRoute);

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
