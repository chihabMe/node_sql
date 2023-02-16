import { Router } from "express";
import {
  addPostController,
  getAllPostsController,
  updatePostController,
} from "./controllers";

export const postsRouter = Router();

postsRouter.get("/", getAllPostsController);
postsRouter.post("/", addPostController);
postsRouter.put("/:id", updatePostController);
