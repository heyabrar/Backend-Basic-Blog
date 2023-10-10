import mongoose from "mongoose";

const BlogsSchema = new mongoose.Schema({
  blog: String,
  title: String,
  createdAt: String,
  markAsRead: Boolean,
  image: String,
});

export const BlogsModel = mongoose.model("Blogs", BlogsSchema);
