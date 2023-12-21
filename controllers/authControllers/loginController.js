import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../../models/Users.js";
export const loginController = async (req, res) => {
  console.log(Users.hash_pass);
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const existEmail = await Users.findOne({ email });
    console.log(existEmail);
    if (!existEmail) {
      return res.status(401).json({ message: "Email doesn't exist " });
    }
    const checkPassword = await bcrypt.compare(password, existEmail.hash_pass);
    console.log(checkPassword);
    if (!checkPassword) {
      return res.status(401).json({ message: "Invalid password " });
    }
    const token = jwt.sign(
      { email: existEmail.email, userId: existEmail._id },
      process.env.JWT_SECRET
    );
    console.log(token);
    return res.json({ token });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error from LOGIN" });
  }
};
