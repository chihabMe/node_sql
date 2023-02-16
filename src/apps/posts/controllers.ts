import { Request, Response } from "express";
import { Post } from "./models";
export const addPostController = async (req: Request, res: Response) => {
  // const post = await Post.findById(1);
  const post = new Post({ body: "hello body v1" });
  const r = await post.save();
  console.log(r);

  res.status(200).json(post);
};
export const getAllPostsController = async (req: Request, res: Response) => {
  const posts = await Post.findAll();
  console.log(posts);
  res.status(200).json(posts);
};
