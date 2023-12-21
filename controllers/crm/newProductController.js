import FakeShop from "../../models/fakeProducts.js";

export const newProduct = async (req, res) => {
  const { title, price, category, id } = req.body;
  console.log(title, price, category, id);
  let updateData = {};

  if (title) updateData.title = title;
  if (price) updateData.price = price;
  if (category) updateData.category = category;
  if (id) updateData.id = id;

  if (req.file) {
    const img = `${req.file.location}`;
    updateData.image = img;
  }
  console.log(updateData);
  const newItem = await FakeShop.create({
    id: updateData.id,
    title: updateData.title,
    price: updateData.price,
    category: updateData.category,
    image: updateData.image,
  });
  const sortedItems = await FakeShop.find({}).sort("-createdAt");
  try {
    await FakeShop.updateMany(
      { createdAt: { $exists: false } },
      { $set: { createdAt: new Date() } }
    );
    res.status(201).send({
      sortedItems,
      message: "ITEM ADDED",
    });

    console.log(newItem, "From MongoDB");
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
