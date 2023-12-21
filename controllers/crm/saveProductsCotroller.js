import { fetchCocktails } from "../../module/saveFakeShopDB.js";
export const saveProductsCotroller = async (req,res) =>{
   try {
      await fetchCocktails();
      res.status(200).send({ message: "Products were saved in DB" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
}