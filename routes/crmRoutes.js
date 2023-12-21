import express from "express";
import { upload } from "../aws/awsConfig.js";
import { newProduct } from "../controllers/crm/newProductController.js";
import { productChange } from "../controllers/crm/productChangeController.js";
import { saveProductsCotroller } from "../controllers/crm/saveProductsCotroller.js";
import { getFakeshop } from "../controllers/crm/getFakeshopController.js";
import { fakeshopDetailController } from "../controllers/crm/fakeshopDetailController.js";
import { editProductController } from "../controllers/crm/editProductController.js";
import { deleteProductController } from "../controllers/crm/deleteProductController.js";
const router = express.Router();
router.post("/post/new-product" ,upload.single("image"),newProduct )
router.patch("/items/:id" ,upload.single("image"),productChange )
router.patch("/edit/:id" ,upload.single("image"), editProductController)
router.get("/save-products" , saveProductsCotroller) /// для получение из FAKESHOP API и добавления в БД 
router.get("/get-fakeshop" ,getFakeshop)
router.get("/fakeshop/detail/:id" ,fakeshopDetailController)
router.delete("/fakeshop/:id" , deleteProductController)
export default router;