import dotenv from "dotenv";
dotenv.config();

export const getDbConfig = () => {
  const user = process.env.DB_USER ?? "";
  const port = Number.parseInt(process.env.PORT ?? "3306");
  const password = process.env.DB_PASS;
  const host = process.env.DB_HOST;
  const database = process.env.DB_NAME;
  if (!user || !database || !port || !password || !host)
    throw new Error("please check our databases env variables");
  return {
    user,
    port,
    password,
    host,
    database,
  };
};

export const database = process.env.DB_NAME;
