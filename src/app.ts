import dotenv from "dotenv";
import express from "express";
import http from "node:http";
const server = async () => {
  const app = express();
  app.listen(process.env.PORT ?? 3000, () => {
    console.log(`running  server on port ${process.env.PORT} `);
  });
};

if (require.main === module) server();
export default server;
