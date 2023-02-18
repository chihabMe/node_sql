import { NextFunction, query, Request, Response } from "express";
import { Post } from "./models";
export const addPostController = async (req: Request, res: Response) => {
  // const post = await Post.findById(1);
  const { body } = req.body;
  let post = new Post({ body, user_id: 1 });
  post = await post.save();
  res.status(200).json(post);
};
export const getAllPostsController = async (req: Request, res: Response) => {
  const posts = await Post.findAll();
  console.log(posts);
  res.status(200).json(posts);
};
export const getPostByIdController = async (
  req: Request<{ id: number }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);
    return res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};
export const updatePostController = async (
  req: Request<{ id: number }>,
  res: Response,
  next: NextFunction
) => {
  const postId = req.params.id;
  const { body } = req.body;
  try {
    const post = await Post.updateById(postId, ["body"], [body]);
    return res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};
export const deletePostController = async (
  req: Request<{ id: number }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const post = await Post.deleteById(id);
    return res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};
