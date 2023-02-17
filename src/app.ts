import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";

import { postsRouter } from "./apps/posts/routes";
const registerApps = (app: Express) => {
  app.use("/api/v1/posts", postsRouter);
};
const server = async () => {
  const app = express();
  //middleware
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  //register apps
  registerApps(app);
  //listen for requests
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack);
    console.log(err.message);
    console.log(err.name);
    if (err.message == "not found") next();
    else res.sendStatus(500);
  });
  app.use((req, res) => {
    res.sendStatus(404);
  });
  app.listen(process.env.PORT ?? 3000, () => {
    console.log(`running  server on port ${process.env.PORT} `);
  });
};

if (require.main === module) server();
export default server;
