import { check } from "express-validator";

export const validateRegister = [
  check("name")
    .notEmpty()
    .withMessage("Name is required BACKEND")
    .isLength({ min: 5 })
    .withMessage("Minimum 5 symbols are required BACKEND")
    .isLength({ max: 20 })
    .withMessage("Maximum 20 symbols are required BACKEND")
    .matches(/^[a-z]+$/)
    .withMessage("Name should contain lowercase letters BACKEND"),
  check("email").isEmail().withMessage("Invalid email BACKEND"),
  check("password")
    .isLength({ min: 8, max: 15 })
    .withMessage("Password length must be between 8 and 15 symbols BACKEND")
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage("must be at least 1 symbol,1 uppercase letter,1 number BACKEND"),
];
