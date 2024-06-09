import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import path from "path";
import fs from "fs";
import { UserEntity } from "../entiities/users";

interface EmailUserData {
  name: string;
  link: string;
}

//generate otp
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const mailSender = async (email: string, title: string, body: string) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: "upcoder education",
      to: email,
      subject: title,
      html: body,
    });
  } catch (error) {
    throw error;
  }
};


const passwordResetMailSender = async (email: string, name: string, link: string) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: '"UpCoder Education" <no-reply@upcoder.com>', // Sender address
      to: email,
      subject: "Password Reset Request", // Subject line
      html: `<h1>Hi ${name},</h1>
             <p>Please reset your password by clicking the link below:</p>
             <a href="${link}">Reset Password</a>` // HTML body
    });

    console.log("Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

// send otp by email
async function sendVerificationMail(email: string, otp: number) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification mail",
      `<h1>Please confirm your OTP</h1>
             <p>Here is your OTP code: ${otp}</p>`
    );
    console.log("email sent successfully");
  } catch (error) {
    throw error;
  }
}


//cloudinary config

const uploadCloudinary = async (imagePath: string) => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
  });

  try {
    const public_id = await uploadImage(imagePath);

    const imageTag = await createImageTag(public_id);
    if (!imageTag) {
      return null;
    }
    return imageTag;
  } catch (error) {
    throw error;
  }
};
//cloudinary sub functions
const uploadImage = async (imagePath: any) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };
  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
};
const createImageTag = async (publicId: any, ...colors: any) => {
  let imageTag = cloudinary.image(publicId, {
    transformation: [
      { width: 300, height: 300, gravity: "faces", crop: "thumb" },
    ],
  });
  return imageTag;
};

const uploadDir = "./uploads";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

export {
  sendVerificationMail,
  generateOtp,
  uploadCloudinary,
  upload,
  passwordResetMailSender,
};
