import axios from "axios";
import FakeShop from "../models/fakeProducts.js";

const delay = () => {
   return new Promise((resolve) => setTimeout(resolve, 1000));
 };
export const fetchCocktails = async () =>{
   const response = await axios.get("https://fakestoreapi.com/products")
   for (let item of response.data) {
      await saveMongoDB(
         item.id,
         item.title,
         item.price,
         item.description,
         item.category,
         item.image,
      )
      await delay();
   }
}

const saveMongoDB = async(id,title,price,description,category,image)=>{
   const newProducts = new FakeShop({
      id,
      title,
      price,
      description,
      category,
      image
   })
   await  newProducts.save()
}

