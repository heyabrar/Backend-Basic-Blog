import { BlogsModel } from "../db/blogs";

export const getBlogs = async () => BlogsModel.find();

export const getBlogById = async (id: string) =>
  BlogsModel.findById({ _id: id });

export const getAllReadBlogs = ({ markAsRead }: { markAsRead: boolean }) => {
  return BlogsModel.find({ markAsRead });
};

export const createBlog = async (payload: Record<string, any>) =>
  new BlogsModel(payload).save().then((res) => res.toJSON());

export const updateBlogById = async (
  id: string,
  payload: Record<string, any>
) => BlogsModel.findByIdAndUpdate({ _id: id }, payload);

export const deleteBlogById = async (id: string) =>
  BlogsModel.findByIdAndDelete({ _id: id });
