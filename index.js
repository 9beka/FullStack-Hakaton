import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { createUserFcn } from "./controllers/createUser.js";
import { validateRegister } from "./validators/registerValidator.js";
import { validationErrors } from "./midleWares/validationErrors.js";
import { loginController } from "./controllers/loginController.js";
import {upload} from "./aws/awsConfig.js";
import { fetchCocktails } from "./module/saveFakeShopDB.js";
import FakeShop from "./models/fakeProducts.js";
import { verifyToken } from "./midleWares/verifyToken.js";
import { getProfileInfoController } from "./controllers/getProfileInfoController.js";
import { verifyEmailController } from "./controllers/verifyEmailController.js";
import { changeUserController } from "./controllers/changeUserController.js";
import { productChange } from "./controllers/productChange.js";
import { newProduct } from "./controllers/newProduct.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
export const port = process.env.PORT || 5057;

// ENDPOINTS

app.get("/get/user", verifyToken, getProfileInfoController);

app.get("/verify-email/:token", verifyEmailController);

app.post("/create-user", validateRegister, validationErrors, createUserFcn);
app.post("/login", loginController);
app.post("/post/new-product" ,upload.single("image"),newProduct)

// 
app.patch("/change-user/:id", upload.single("image"), changeUserController);
// 


app.patch("/items/:id", upload.single("image"), productChange);

app.get("/save-products", async (req, res) => {
  try {
    await fetchCocktails();
    res.status(200).send({ message: "Products were saved in DB" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});
app.get("/get-fakeshop", async (req, res) => {
  try {
    const items = await FakeShop.find({});
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get("/fakeshop/detail/:id", async (req, res) => {
  try {
    const idItems = await FakeShop.find({ id: req.params.id });

    if (idItems.length === 0) {
      res.status(404).send({ message: "No items found in this category" });
    } else {
      res.status(200).send(idItems);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
app.delete("/fakeshop/:id", async (req, res) => {
  try {
    const deletedItem = await FakeShop.findByIdAndDelete(req.params.id);
    if (!deletedItem) res.status(404).send({ message: "Item not found" });
    else res.status(200).send({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.patch("/edit/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedItem = await FakeShop.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedItem) {
      res.status(404).send({ message: "Item not found" });
    } else {
      res.status(200).send(updatedItem);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
// fakeshop ENDPOINTS

app.post("/upload", upload.single("image"), (req, res) => {
  try {
    const file = req.file;
    console.log(file);
    console.log(req.file.destination + req.file.filename);
    res
      .status(200)
      .send({ message: "image uploaded successfully", file: req.file });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

// ENDPOINTS
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => console.error("Error connecting to MongoDB", err));

app.listen(port, () => {
  console.log("Server is running at localhost: " + port);
});
