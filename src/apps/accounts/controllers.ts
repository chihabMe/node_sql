import { NextFunction, Request, Response } from "express";
import { User } from "./models";
export const registrationController = async (
  req: Request<{}, {}, { username: string; email: string; password: string }>,
  res: Response,
  next: NextFunction
) => {
  const { email, username, password } = req.body;
  try {
    let user = new User({ email, username });
    user.setPassword(password);
    user = await user.save();
    return res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};
export const loginController = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const user = await User.findByX("email", email);
  if (!user) return res.status(400).json("invalid credentials");
  console.log(user);
  const valid = user.comparePassword(password);
  if (!valid) return res.status(400).json("invalid credentials");
  return res.status(200).json(user);
};
