import FakeShop from "../../models/fakeProducts.js";
export const editProductController = async (req, res) => {
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
};
