import dotenv from "dotenv";
import express, { Express } from "express";
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
  app.listen(process.env.PORT ?? 3000, () => {
    console.log(`running  server on port ${process.env.PORT} `);
  });
};

if (require.main === module) server();
export default server;
