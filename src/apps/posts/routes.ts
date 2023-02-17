import { Router } from "express";
import {
  addPostController,
  deletePostController,
  getAllPostsController,
  getPostByIdController,
  updatePostController,
} from "./controllers";

export const postsRouter = Router();

postsRouter.get("/", getAllPostsController);
postsRouter.post("/", addPostController);
postsRouter.get("/:id", getPostByIdController);
postsRouter.put("/:id", updatePostController);
postsRouter.delete("/:id", deletePostController);
