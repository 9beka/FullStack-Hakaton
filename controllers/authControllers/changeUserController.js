import Users from "../../models/Users.js";
export const changeUserController = async (req, res) => {
  const { name, email, password, image } = req.body;
  const itemId = req.params.id;
  console.log(itemId);
  let updateData = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (password) updateData.password = password;

  if (req.file.location) {
    const img = `${req.file.location}`;
    updateData.image = img;
  }

  try {
    const updatedItem = await Users.findByIdAndUpdate(
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
