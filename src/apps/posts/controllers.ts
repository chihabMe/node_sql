import { Request, Response } from "express";
import { Post } from "./models";
export const getAllPostsController = async (req: Request, res: Response) => {
  const post = await Post.findById(1);
  res.status(200).json(post);
};
export const addPostController = async (req: Request, res: Response) => {
  const post = await Post.findById(1);
  res.status(200).json(post);
};
