import { Router } from "express";
import {
  addPostController,
  getAllPostsController,
  getPostByIdController,
  updatePostController,
} from "./controllers";

export const postsRouter = Router();

postsRouter.get("/", getAllPostsController);
postsRouter.post("/", addPostController);
postsRouter.get("/:id", getPostByIdController);
postsRouter.put("/:id", updatePostController);
