import { Router } from "express";
import {
  createBlog,
  deleteBlogById,
  getAllReadBlogs,
  getBlogById,
  getBlogs,
  updateBlogById,
} from "../controllers/blogs.controllers";
import multer from "multer";

export const BlogsRouter = Router();
const upload = multer();

BlogsRouter.get("/get-blogs", async (req, res) => {
  const { id } = req.query;
  if (id) {
    try {
      const getAllBlogs = await getBlogById(id as string);
      res.send(getAllBlogs);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  } else {
    try {
      const getAllBlogs = await getBlogs();
      if (!getAllBlogs.length) {
        return res.send({ message: "Start Writing to see blogs!!!" });
      }
      res.send(getAllBlogs);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  }
});


// If required
BlogsRouter.get("/get-read-blogs/:markAsRead", async (req, res) => {
  const { markAsRead } = req?.params;
  try {
    const readBlogs = await getAllReadBlogs({
      markAsRead: Boolean(markAsRead),
    });
    res.send(readBlogs);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
});

BlogsRouter.post("/create-blog", upload.single("image"), async (req, res) => {
  try {
    const { title, blog, createdAt } = req.body;
    const payload = {
      title,
      blog,
      createdAt,
      image: req?.file?.buffer.toString("base64"),
    };
    await createBlog(payload);
    res.json({ message: "Blog Created" });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

BlogsRouter.patch(
  "/edit-blog/:id",
  upload.single("image"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, blog, markAsRead } = req.body;
      const payload = {
        title,
        blog,
        markAsRead,
        image: req.file?.buffer.toString("base64"),
      };
      const editBlog = await updateBlogById(id, payload);
      res.send({ message: "Updated Successfully" });
    } catch (error) {
      console.log(error);
      res.status(400);
    }
  }
);

BlogsRouter.delete("/delete-blog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteBlogById(id);
    res.send({ message: "Blog Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.send(400);
  }
});
