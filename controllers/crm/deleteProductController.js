import FakeShop from "../../models/fakeProducts.js";
export const deleteProductController =async (req, res) => {
   try {
     const deletedItem = await FakeShop.findByIdAndDelete(req.params.id);
     if (!deletedItem) res.status(404).send({ message: "Item not found" });
     else res.status(200).send({ message: "Item deleted successfully" });
   } catch (error) {
     res.status(500).send({ message: error.message });
   }
 }