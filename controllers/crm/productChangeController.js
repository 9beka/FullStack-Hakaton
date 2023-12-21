import FakeShop from "../../models/fakeProducts.js";
export const productChange = async (req, res) => {
  const { title, price, category } = req.body;
  const itemId = req.params.id;
  console.log(itemId);
  let updateData = {};

  if (title) updateData.title = title;
  if (price) updateData.price = price;
  if (category) updateData.category = category;

  if (req.file) {
    const img = `${req.file.location}`;
    updateData.image = img;
  }

  try {
    const updatedItem = await FakeShop.findByIdAndUpdate(
      itemId,
      { $set: updateData },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).send({ message: "Item not found" });
    }

    res.status(200).send([{ updatedItem }]);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
