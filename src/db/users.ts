import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true },
});

export const UserModal = mongoose.model("User", UserSchema);
