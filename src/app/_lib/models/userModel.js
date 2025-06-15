import mongoose from "mongoose";

const UserScema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address:{
      city: { type: String, required: true },
      street: { type: String, required: true },
      suite: { type: String, required: true },
    }
});

export const UserModel=mongoose.models.User || mongoose.model("User", UserScema);