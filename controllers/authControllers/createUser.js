import Users from "../../models/Users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.mail.ru",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAILRU_EMAIL,
    pass: process.env.MAILRU_PASSWORD,
    authMethod: "LOGIN",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const createUserFcn = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password, "from Controller");
    const findUser = await Users.findOne({ email });
    if (findUser)
      return res.status(401).send({ message: "User already exists" });
    const hash_pass = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      name,
      email,
      hash_pass,
    });
    console.log(newUser, "From MongoDB");

    const token = jwt.sign(
      { email: newUser.email, userId: newUser._id },
      process.env.JWT_SECRET
    );
    const verificationLink = `http://localhost:${process.env.PORT}/authRoutes/verify-email/${token}`;
    const mailOptions = {
      from: process.env.MAILRU_EMAIL,
      to: email,
      subject: "Email Verification",
      html: `<p>Please verify your email by clicking the link below:</p><a href="${verificationLink}">${verificationLink}</a>`,
    };
    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error(error);
        await Users.findByIdAndDelete(newUser._id);
        return res
          .status(500)
          .send({ message: "Error sending verification email" });
      } else {
        console.log(`Email sent: ${info.response}`);
        res.status(201).send({
          token,
          message:
            "Register success. Please check your email to verify your account",
        });
      }
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server error" });
  }
};
