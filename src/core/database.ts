import { createPool } from "mysql2";

export const DB = createPool({
  user: process.env.DB_USER ?? "",
  port: Number.parseInt(process.env.PORT ?? "3306"),
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
});
