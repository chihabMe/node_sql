import { Request, Response } from "express";
import { Post } from "./models";
export const addPostController = async (req: Request, res: Response) => {
  // const post = await Post.findById(1);
  const { body } = req.body;
  let post = new Post({ body });
  post = await post.save();
  res.status(200).json(post);
};
export const getAllPostsController = async (req: Request, res: Response) => {
  const posts = await Post.findAll();
  console.log(posts);
  res.status(200).json(posts);
};
