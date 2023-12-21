import { Schema, model } from "mongoose";

const FakeshopSchema = new Schema({
   id: { type: Number, required: true },
   title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: false },
  category: { type: String, required: true },
  image: { type: String, required: true },
});

export default model("FakeShop", FakeshopSchema);
