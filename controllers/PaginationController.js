import FakeShop from "../models/fakeProducts.js"
export const getDataController = async (req, res) => {
  // ?page=1
  const page = parseInt(req.query.page) || 1;
  const pageSize = req.query.pageSize || 8;
  const searchQuery = req.query.search || "";
  const category = req.query.category || "";

  try {
    const query = {};
console.log(searchQuery , "and ", query);
    if (searchQuery) {
      query.name = { $regex: searchQuery, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    const total = await FakeShop.countDocuments(query);
    const pages = Math.ceil(total / pageSize);
    const products = await FakeShop.find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.status(200).send({
      pages,
      products,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
