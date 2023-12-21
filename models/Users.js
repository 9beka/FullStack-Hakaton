import { Schema, model } from "mongoose";

const AuthSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
  },
  hash_pass: {
    type: String,
    required: true,
  },
  verified:{
    type:Boolean,
    default:false
  },
  image:{
    type:String,
    required: false
  }
});
export default model("Users", AuthSchema);
