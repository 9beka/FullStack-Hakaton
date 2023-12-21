import FakeShop from "../../models/fakeProducts.js";
export const fakeshopDetailController = async (req, res) => {
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
}