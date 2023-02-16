import { Router } from "express";
import { addPostController, getAllPostsController } from "./controllers";

export const postsRouter = Router();

postsRouter.get("/", addPostController);
postsRouter.get("/all", getAllPostsController);
