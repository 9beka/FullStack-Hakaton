import Users from "../models/Users.js";
import jwt from "jsonwebtoken";
export const verifyEmailController = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findOneAndUpdate(
      { email: decoded.email },
      { verified: true },
      { new: true }
    );
    if (!user) return res.status(404).send({ message: "User not found" });
    // res.status(200).send({ message: "verify success" })
    return res.redirect("http://localhost:3000/");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Internal Server Error from verifyEmailController" });
  }
};
